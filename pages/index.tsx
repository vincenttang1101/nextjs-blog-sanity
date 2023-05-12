import Head from "next/head";
import { sanityClient, urlFor } from "../sanity";
import { PostType, CategoryType } from "../typing";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import InfiniteScroll from "react-infinite-scroll-component";
import { Category } from "../components/Category";
import { Post } from "../components/Post";
import Image from "next/image";
import moment from "moment";
import { Loader } from "../components/Loader";
import Link from "next/link";
import styles from "../styles/styles.module.css";

interface Props {
  posts: [PostType];
  categories: [CategoryType];
}

export default function Home({ posts, categories }: Props) {
  const [listOfPosts, setListOfPosts] = useState(posts);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [currentPost, setCurrentPost] = useState(3);

  const getMorePosts = async () => {
    const query = `
    *[_type == "post"]
    | order(publishedAt desc)
    [${currentPost}...${currentPost} + 3] {
      _id,
      title,
      author -> {
        name,
        "image": image.asset->url,
      },
      categories[] -> {
        _id,
        title,
      },
      description,
      "mainImage": mainImage.asset->url,
      slug,
      publishedAt,
    }`;

    const newPosts = await sanityClient.fetch(query);
    if (newPosts.length === 0) {
      setHasMorePosts(false);
    }
    setCurrentPost((prevCurrentPost) => prevCurrentPost + 2);
    setListOfPosts((prevPosts): any => [...prevPosts, ...newPosts]);
  };

  useEffect(() => {
    const query = `
      *[_type == "post"]`;

    const subscription = sanityClient.listen(query).subscribe(async (event) => {
      const postSubscription: any = event.result;
      const currentPosts: [PostType] = [...listOfPosts];

      // Fix error can't ref author because use query also can't work
      const authorRef = postSubscription?.author._ref;
      const authorData = await sanityClient.fetch(
        `*[_type == "author" && _id == "${authorRef}"]`
      );

      if (event.transition === "update") {
        const index = currentPosts.findIndex(
          (post) => post._id === postSubscription?._id
        );
        if (index !== -1) {
          postSubscription.author = authorData[0];
          currentPosts[index] = postSubscription;
          setListOfPosts(currentPosts);
        }
      } else if (event.transition === "appear") {
        postSubscription.author = authorData[0];
        const newPosts: any = [postSubscription, ...listOfPosts];
        setListOfPosts(newPosts);
      } else if (event.transition === "disappear") {
        const deletedPostId = event.documentId;
        const index = currentPosts.findIndex(
          (post) => post._id === deletedPostId
        );
        if (index !== -1) {
          currentPosts.splice(index, 1);
          setListOfPosts(currentPosts);
        }
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [listOfPosts]);

  return (
    <>
      <Head>
        <title>Tech Blog | Explore the new horizon</title>
        <link rel="icon" href="../favicon.ico" />
      </Head>
      <main className="font-bodyFont bg-mainBgColor">
        {/* <categories> */}
        <div
          className={`${styles["categories-list"]} flex gap-5 justify-center flex-wrap pt-10`}
        >
          {categories.map((category) => (
            <Category key={category._id} category={category} />
          ))}
        </div>
        {/* <categories /> */}

        {/* <posts> */}
        <div className={`${styles.posts} max-w-7xl mx-auto pt-10 flex gap-9`}>
          {/* <posts-list> */}
          <div className={`${styles["posts-list"]} w-2/3`}>
            <InfiniteScroll
              className="text-center"
              style={{ overflow: "hidden" }}
              dataLength={listOfPosts.length}
              next={getMorePosts}
              hasMore={hasMorePosts}
              loader={<Loader />}
              endMessage={
                <p className="text-center text-3xl pb-4 font-bold">
                  Yay! You have seen it all
                </p>
              }
            >
              {listOfPosts.map((post) => (
                <Post key={post._id} post={post} categories={categories} />
              ))}
            </InfiniteScroll>
          </div>
          {/* <posts-list /> */}

          {/* <recent-posts> */}
          <div
            className={`${styles["recent-posts"]} w-1/3 h-full bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 flex flex-col`}
          >
            <p className="font-bold pb-5">Recent Posts</p>
            <hr className="border-b-1 border-primaryColor" />
            {listOfPosts.slice(0, 3).map((post) => (
              <div key={post._id} className="flex items-center gap-5 py-4">
                <Image
                  className="object-cover w-12 h-12 rounded-full"
                  src={post?.author?.image}
                  alt="avatar"
                  width={380}
                  height={0}
                />
                <div className="flex flex-col">
                  <p className="font-light">
                    {moment(post.publishedAt).format("DD/MM/YYYY")}
                  </p>
                  <Link href={`/post/${post?.slug?.current}`}>
                    <p className="transition duration-700 cursor-pointer hover:text-hoverTextColor font-medium">
                      {post.title}
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {/* <recent-posts /> */}
        </div>
        {/* <posts> */}
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const postQuery = `
  *[_type == "post"]
  | order(publishedAt desc)
  [0...3] {
    _id,
    title,
    author -> {
      name,
      "image": image.asset->url,
    },
    categories[] -> {
      _id,
      title,
    },
    description,
    "mainImage": mainImage.asset->url,
    slug,
    publishedAt,
  }`;
  const categoryQuery = `
    *[_type == "category"] {
      _id,
      title,
    }`;

  const posts = await sanityClient.fetch(postQuery);
  const categories = await sanityClient.fetch(categoryQuery);

  return {
    props: {
      posts,
      categories,
    },
  };
};
