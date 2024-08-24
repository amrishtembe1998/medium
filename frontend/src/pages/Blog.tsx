import { useParams } from "react-router-dom";

import { useBlog } from "../hooks";
import { Appbar } from "../components/Appbar";
import { Avatar } from "../components/BlogCard";
import { Spinner } from "../components/Spinner";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog(id || "");
  console.log("*********", blog);
  if (loading) {
    return (
      <div>
        <Appbar publishButton={true}></Appbar>
        <div className="h-screen flex flex-col justify-center w-screen">
          <div className="flex justify-center">
            <Spinner></Spinner>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Appbar publishButton={true}></Appbar>
      <div className="flex flex-row px-10 py-10">
        <div className="basis-8/12">
          <div className="font-extrabold text-5xl max-w-screen-sm text-slate-800">
            {blog?.title}
          </div>
          <div className="font-bold text-slate-400 py-2">
            Posted on {new Date().toDateString()}
          </div>
          <div className="font-medium text-xl">{blog?.content}</div>
        </div>
        <div className="basis-4/12">
          <div className="font-semibold text-slate-800">Author</div>
          <div className="flex pt-3">
            <div className="flex flex-col justify-center pr-2">
              <Avatar authorName={blog?.author.name || ""} size="big"></Avatar>
            </div>
            <div>
              <div className="font-bold text-2xl">{blog?.author.name}</div>
              <div className="text-slate-700 text-lg">
                This is a random information/ability of the author to do
                something unique
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
