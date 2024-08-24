import { Link } from "react-router-dom";

interface BlogCardProp {
  id: number;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProp) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b-2 border-slate-300 pb-4 pt-2 cursor-pointer">
        <div className="flex">
          <div className="flex justify-center flex-col">
            <Avatar authorName={authorName}></Avatar>
          </div>
          <div className="font-medium px-1">
            {!authorName ? "Anonymous" : authorName}
          </div>
          <div className="flex justify-center flex-col px-1">
            <Circle></Circle>
          </div>
          <div className="font-light text-sm flex justify-center flex-col text-slate-800">
            {publishedDate}
          </div>
        </div>
        <div className="font-bold text-2xl pt-2">{title}</div>
        <div className="font-medium pt-1">
          {content.length > 500 ? `${content.slice(0, 300)}...` : content}
        </div>
        <div className="text-slate-500 text-sm pt-4">
          {content.length > 10
            ? `${Math.ceil(content.length / 100)} min read`
            : null}
        </div>
      </div>
    </Link>
  );
};

function Circle() {
  return <div className="rounded-full bg-gray-700 h-1 w-1"></div>;
}

export function Avatar({
  authorName,
  size = "small",
}: {
  authorName: string | null;
  size?: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${
        size === "small"
          ? "w-6 h-6 dark:bg-gray-300"
          : "w-10 h-10 dark:bg-gray-500"
      } overflow-hidden rounded-full `}
    >
      <span
        className={`${
          size === "small"
            ? "text-xs dark:text-gray-700"
            : "text-sm dark:text-gray-200 font-medium"
        }  `}
      >
        {!authorName ? "A" : authorName.split(" ")[0][0]}
        {!authorName ? "A" : authorName.split(" ")[1][0]}
      </span>
    </div>
  );
}
