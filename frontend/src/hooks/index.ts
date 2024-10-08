import axios from "axios";
import { useState, useEffect } from "preact/hooks";
import { BACKEND_URL } from "../config";
interface Blog {
  loading: boolean;
  title: string;
  content: string;
  authorId: string;
  published: boolean;
  id: string;
  author: { name: string };
}

interface UserInfo {
  user: { id: string; name: string; email: string; password: string };
}

export const useBlog = (id: string) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();
  useEffect(() => {
    async function fetchBlog() {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBlog(response.data.post);
      setLoading(false);
    }
    fetchBlog();
  }, [id]);

  return {
    loading,
    blog,
  };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    console.log(`${BACKEND_URL}/api/v1/blog/bulk?page=1&limit=100`);
    async function fetchBlogs() {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/blog/bulk?page=1&limit=100`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setBlogs(response.data);
      setLoading(false);
    }
    fetchBlogs();
  }, []);

  return {
    loading,
    blogs,
  };
};

export const useUserInfo = () => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  useEffect(() => {
    async function fetchUserInfo() {
      const response = await axios.get(`${BACKEND_URL}/api/v1/user`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUserInfo(response.data);
      setLoading(false);
    }
    fetchUserInfo();
  }, []);
  return { loading, userInfo };
};
