import { CategoryType } from "../typing";
import { Post } from "./Post";

interface Props {
  category: CategoryType;
}

export const Category = ({ category }: Props) => {
  return (
    <h2 className="bg-primaryColor font-semibold text-1xl text-secondaryColor transition duration-700 hover:text-highlightColor cursor-pointer px-10 py-1 rounded-2xl">
      {category.title}
    </h2>
  );
};
