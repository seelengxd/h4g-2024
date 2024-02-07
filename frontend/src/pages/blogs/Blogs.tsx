import { useEffect, useState } from "react";
import Button from "../../components/buttons/Button";
import CardContainer from "../../components/blog/CardContainer";
import { Link } from "react-router-dom";
import { Blog } from "../../types/blogs/blogs";
import blogsAPI from "../../api/blogs/blogs";
import { selectUser } from "../../reducers/authSlice";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const Blogs: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [userFilter, setUserFilter] = useState(false);
  const currUserId = useSelector(selectUser)?.id;

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    blogsAPI.getAllBlogs().then((blog) => setBlogs(blog));
  }, []);

  console.log("blogs ==> ", blogs);

  return (
    <div className="bg-primary-100 w-full h-screen pl-28 pr-10 flex justify-between">
      <div className="flex h-screen py-20">
        <div className="w-1/4 min-w-80">
          <h1 className="text-2xl font-bold pb-2">Blog</h1>
          <div className="flex items-center">
            <input
              type="search"
              id="default-search"
              className="block text-sm rounded-xl w-72 bg-gray-100 border-primary-300 ps-4 focus:ring-primary-500 focus:border-primary-500 "
              placeholder="Search"
              onChange={(e) => {
                setSearchValue(e.currentTarget.value);
              }}
            />
            <svg
              className="hover:scale-105 relative -translate-x-10 w-4 h-4 text-gray-500 dark:text-gray-400 ml-2 cursor-pointer"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="checkbox"
            id="userFilterCheckbox"
            className="mr-2 my-6 rounded-sm bg-primary-300 border border-primary-600"
            checked={userFilter}
            onChange={() => setUserFilter((prev) => !prev)}
          />{" "}
          <p className="inline text-sm text-gray-600">Written by me </p>
        </div>

        {/* right side */}
        <div className="flex-1 flex flex-col items-end h-full overflow-auto ml-8">
          <Link to="/blogs/new" className="pb-4">
            <Button type="submit" roundness="xl">
              Write New Post
            </Button>
          </Link>

          <div
            className={
              "h-full overflow-y-auto pt-4 grid gap-2 " +
              (windowDimensions.width > 1000 ? "grid-cols-2" : "grid-cols-1")
            }
          >
            {blogs
              .filter((blog: Blog) =>
                userFilter ? blog.user.id === currUserId : blog
              )
              .filter((blog: Blog) =>
                blog.title.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((blog: Blog) => (
                <Link to={`${blog.id}`}>
                  <CardContainer
                    title={blog.title}
                    subtitle={
                      "by " +
                      blog.user.preferredName +
                      ", " +
                      format(new Date(blog.createdAt), "dd MMM yyyy")
                    }
                    blogPreview={blog.description}
                    profileImageUrl={
                      blog.user.profile?.imageUrl
                        ? blog.user.profile.imageUrl
                        : "uploads/placeholder-image.png"
                    }
                    blogImageUrl={
                      blog.imageUrl
                        ? blog.imageUrl
                        : "uploads/placeholder-image.png"
                    }
                  />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
