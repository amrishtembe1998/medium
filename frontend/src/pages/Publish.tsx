import axios from "axios";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { useState } from "preact/hooks";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postStatus, setPostStatus] = useState(false);
  const navigate = useNavigate();
  const postBlogHandler = async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/blog`,
      { title, content },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    setPostStatus(true);
    console.log("************", response.data);
    navigate(`/blog/${response.data.postId}`);
  };
  return (
    <div>
      <Appbar publishButton={false}></Appbar>
      <div className="flex justify-center max-w-screen-lg mx-auto pt-5">
        <input
          onChange={(e) => {
            setTitle((e.target as HTMLInputElement).value);
          }}
          type="text"
          placeholder="Title"
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
        />
      </div>
      <div className="flex justify-center max-w-screen-lg mx-auto pt-5">
        <textarea
          onChange={(e) => {
            setContent((e.target as HTMLInputElement).value);
          }}
          placeholder="Content"
          maxLength={2000}
          rows={5} // Adjust the number of rows as needed
          className="w-full h-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
        ></textarea>
      </div>
      <div className="flex justify-center max-w-screen-lg mx-auto pt-5">
        <button
          onClick={postBlogHandler}
          type="button"
          className="mr-6 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Publish new Blog
        </button>
      </div>
      <div className="flex justify-center max-w-screen-lg mx-auto pt-1 pr-5 text-green-800 font-bold">
        {postStatus ? <>Post Created Successfully</> : null}
      </div>
    </div>
  );
};
