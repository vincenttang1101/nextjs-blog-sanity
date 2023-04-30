import Image from "next/image";
import { urlFor } from "../sanity";
import Link from "next/link";
import moment from "moment";
import { CategoryType, PostType } from "../typing";

interface Props {
  post: PostType;
  categories: [CategoryType];
}

export const Post = ({ post, categories }: Props) => {
  return (
    <div className="bg-secondaryColor shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-6">
      <div className="relative overflow-hidden shadow-md pb-96 mb-6">
        <Image
          src={urlFor(post.mainImage).url()}
          width={800}
          height={0}
          alt="banner"
          className="object-top absolute h-full w-full object-cover shadow-lg rounded-lg"
          priority={true}
        />
      </div>
      <Link href={`/post/${post.slug.current}`}>
        <h1 className="transition duration-700 text-center cursor-pointer hover:text-highlightColor text-3xl font-semibold">
          {post.title}
        </h1>
      </Link>
      <div className="flex flex-col items-center gap-2 py-5">
        <h1 className="bg-primaryColor font-semibold text-1xl text-secondaryColor transition duration-700 hover:text-highlightColor cursor-pointer px-5 py-1 rounded-2xl">
          {categories
            .filter(
              (category) =>
                category._id ===
                ((post.categories[0] as CategoryType)._ref ||
                  (post.categories[0] as CategoryType)._id)
            )
            .map((category) => (
              <div key={category._id}>{category.title}</div>
            ))}
        </h1>
        <p>{moment(post.publishedAt).format("DD/MM/YYYY")}</p>
      </div>
      <div className="flex flex-wrap items-center justify-center mb-8 w-full">
        <Image
          className="object-cover w-12 h-12 rounded-full"
          src={urlFor(post.author.image).url()}
          alt="avatar"
          width={200}
          height={0}
        />
        <p className="inline align-middle text-highlightColor ml-2 font-bold text-lg">
          {post.author.name}
        </p>
      </div>
      <p className="text-center text-lg text-gray-600 font-normal px-4 lg:px-20 mb-8">
        {post.description.substring(0, 150)} ...
      </p>
      <Link
        className="w-100 mt-5"
        key={post._id}
        href={`/post/${post.slug.current}`}
      >
        <div className="text-center">
          <button className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-highlightColor text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
            Continue Reading
          </button>
        </div>
      </Link>
    </div>
  );
};
