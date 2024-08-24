import { useUserInfo } from "../hooks";
import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

interface AppbarProps {
  publishButton: boolean;
}

export const Appbar: React.FC<AppbarProps> = ({ publishButton }) => {
  const { loading, userInfo } = useUserInfo();
  console.log(userInfo?.user);
  return (
    <div className="border-b-2 py-4 flex justify-between px-10">
      <Link to={"/blogs"}>
        <div className="flex flex-col justify-center cursor-pointer">
          Medium
        </div>
      </Link>
      {publishButton ? (
        <div className="flex flex-row justify-center">
          <Link to={"/publish"}>
            <button
              type="button"
              className="mr-6 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Publish new Blog
            </button>
          </Link>
          {!loading ? (
            <Avatar
              size={"big"}
              authorName={userInfo?.user.name || "Anonymous User"}
            />
          ) : (
            <></>
          )}
        </div>
      ) : null}
    </div>
  );
};
