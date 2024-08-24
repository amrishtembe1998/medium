import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  console.log("*****************", blogs);
  return (
    <div>
      <Appbar publishButton={true}></Appbar>
      <div className="justify-center px-80 pt-4 max-w-full">
        {loading ? (
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        ) : null}
        {loading === false
          ? blogs.map((blogPost: any) => {
              return (
                <BlogCard
                  id={blogPost.id}
                  authorName={blogPost.author.name}
                  title={blogPost.title}
                  content={blogPost.content}
                  publishedDate="15th Aug"
                ></BlogCard>
              );
            })
          : null}
      </div>
    </div>
  );
};
