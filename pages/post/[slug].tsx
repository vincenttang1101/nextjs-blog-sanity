import PortableText from "react-portable-text";
import { GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import { sanityClient, urlFor } from "../../sanity";
import { PostType } from "../../typing";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import moment from "moment";
import { useRouter } from "next/router";
import { Loader } from "../../components/Loader";
import Image from "next/image";

interface Props {
  post: PostType;
}

type Inputs = {
  _id: string;
  name: string;
  email: string;
  comment: string;
};

const Post = ({ post }: Props) => {
  const { data: session } = useSession();
  const [userErr, setUserErr] = useState("");
  const [listOfComments, setListOfComments] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { slug } = router.query;

  const getComments = async () => {
    const query = `
    *[_type == "comment" && post._ref == "${post._id}"] 
    | order(_createdAt desc)
  `;
    const comments = await sanityClient.fetch(query);
    setListOfComments(comments);
    setLoading(false);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  const handleUserErr = () => {
    if (!session) {
      setUserErr("Please sign in to Comment!");
    } else {
      setUserErr("");
    }
  };

  useEffect(() => {
    if (slug) {
      getComments();
      const query = `
      *[_type == "comment"] 
    `;
      const subscription = sanityClient
        .listen(query)
        .subscribe(async (event) => {
          const newComment = event.result;
          setListOfComments((prevComments): any => [
            newComment,
            ...prevComments,
          ]);
        });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [loading]);

  return (
    <div className="bg-mainBgColor">
      <div className="max-w-4xl mx-auto bg-secondaryColor">
        {/* <image> */}
        <div className="relative">
          <img
            src={urlFor(post.mainImage).url()}
            className="object-cover w-full h-50"
            alt="banner"
          />
          <div className="absolute inset-x-0 top-0 h-5 bg-mainBgColor" />
        </div>
        {/* <image /> */}

        {/* <article> */}
        <article className="px-6">
          <h1 className="font-titleFont font-bold text-[35px] border-b-[2px] border-b-cyan-800 mt-10 mb-3">
            {post.title}
          </h1>
          <h2 className="font-bodyFont text-[18px] text-gray-500 mb-2">
            {post.description}
          </h2>
          <div>
            <img
              className="object-cover w-12 h-12 rounded-full"
              src={urlFor(post.author.image).url()}
              alt="authorImg"
            />
            <p className="text-base font-bodyFont">
              Blog post by{" "}
              <span className="font-bold text-highlightColor">
                {post.author.name}{" "}
              </span>
              Published at {moment(post.publishedAt).format("DD/MM/YYYY")}
            </p>
          </div>
          <div className="mt-10">
            <PortableText
              content={post.body}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
              serializers={{
                h1: (props: any) => (
                  <h1
                    className="my-5 text-3xl font-bold font-titleFont"
                    {...props}
                  />
                ),
                h2: (props: any) => (
                  <h2
                    className="my-5 text-2xl font-bold font-titleFont"
                    {...props}
                  />
                ),
                h3: (props: any) => (
                  <h3
                    className="my-5 text-xl font-bold font-titleFont"
                    {...props}
                  />
                ),
                li: ({ children }: any) => (
                  <li className="ml-4 list-disc">{children}</li>
                ),
                link: ({ href, children }: any) => (
                  <a href={href} className="text-cyan-500 hover:underline">
                    {children}
                  </a>
                ),
              }}
            />
          </div>
        </article>
        {/* <article> */}

        {/* <comment> */}
        <div className="pt-4 mx-5">
          <span className="text-xs font-bold uppercase font-titleFont">
            Enjoyed this article?
          </span>
          <h3 className="text-3xl font-bold font-titleFont">
            Leave a Comment below!
          </h3>
          <hr className="h-px my-5 bg-secondaryColor border-0 dark:bg-primaryColor" />
          <input
            {...register("_id")}
            type="hidden"
            name="_id"
            value={post._id}
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="flex flex-col">
              <span className="text-base font-semibold font-titleFont">
                Name
              </span>
              <input
                {...register("name", { required: true })}
                className="text-base placeholder:text-sm border-b-[1px] py-1 px-4 outline-none focus-within:shadow-xl"
                type="text"
                placeholder="Enter your Name"
              />
              {errors.name && (
                <p className="px-4 my-1 text-sm font-semibold text-red-500 font-titleFont">
                  <span className="mr-2 text-base italic font-bold">!</span>
                  Name is required!
                </p>
              )}
            </label>
            <label className="flex flex-col">
              <span className="text-base font-semibold font-titleFont">
                Email
              </span>
              <input
                {...register("email", { required: true })}
                className="text-base placeholder:text-sm border-b-[1px] py-1 px-4 outline-none focus-within:shadow-xl"
                type="text"
                placeholder="Enter your Email"
              />
              {errors.email && (
                <p className="px-4 my-1 text-sm font-semibold text-red-500 font-titleFont">
                  <span className="mr-2 text-base italic font-bold">!</span>
                  Email is required!
                </p>
              )}
            </label>
            <label className="flex flex-col">
              <span className="text-base font-semibold font-titleFont">
                Comment
              </span>
              <textarea
                {...register("comment", { required: true })}
                className="text-base placeholder:text-sm border-b-[1px] border-secondaryColor py-1 px-4 outline-none focus-within:shadow-xl"
                placeholder="Enter your Comments"
                rows={6}
              />
              {errors.comment && (
                <p className="px-4 my-1 text-sm font-semibold text-red-500 font-titleFont">
                  <span className="mr-2 text-base italic font-bold">!</span>
                  Comment is required!
                </p>
              )}
            </label>
            {session && (
              <button
                onClick={handleUserErr}
                className="w-full py-2 text-base font-semibold tracking-wider text-secondaryColor uppercase rounded-lg font-titleFont transition duration-500 ease transform hover:translate-y-1 bg-highlightColor"
                type="submit"
              >
                Submit
              </button>
            )}
          </form>
          {!session && (
            <button
              onClick={handleUserErr}
              className="w-full py-2 text-base font-semibold tracking-wider text-secondaryColor uppercase rounded-lg font-titleFont transition duration-500 ease transform hover:translate-y-1 bg-highlightColor"
              type="submit"
            >
              Submit
            </button>
          )}
          {userErr && (
            <p
              className="px-4 my-1 text-sm font-semibold text-center text-red-500 underline font-titleFont underline-offset-2 animate-bounce cursor-pointer"
              onClick={() => signIn()}
            >
              <span className="mr-2 text-base italic font-bold">!</span>
              {userErr}
            </p>
          )}
          <div className="flex flex-col w-full p-10 mx-auto my-5 space-y-2 shadow-lg shadow-gray-500">
            <h3 className="text-3xl font-semibold font-titleFont">Comments</h3>
            <hr className="h-px my-5 bg-secondaryColor border-0 dark:bg-primaryColor" />{" "}
            {loading ? (
              <Loader />
            ) : (
              listOfComments.map((comment: any) => (
                <div key={comment._id}>
                  <span className="text-gray-700 font-semibold">
                    {moment(comment._createdAt).format("DD/MM/YYYY, h:mm:ss a")}
                  </span>
                  <p>
                    <span className="text-highlightColor font-bold pr-5">
                      {comment.email}
                    </span>{" "}
                    {comment.comment}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const query = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    publishedAt,
    title,
    slug,
    author -> {
      name,
      image,
    },
    categories[] -> {
      title
    },
    description,
    mainImage,
    body,
  }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 5,
  };
};

export const getStaticPaths = async () => {
  const query = `
  *[_type == "post"]{
    _id,
    slug {
      current,
    },
  }`;

  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: PostType) => ({
    params: {
      slug: post.slug.current,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};
