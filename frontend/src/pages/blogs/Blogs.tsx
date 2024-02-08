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
    <div className="flex justify-between w-full h-screen bg-primary-100 px-28">
      <div className="flex justify-between w-screen py-20">
        <div className="w-1/4 min-w-80">
          <h1 className="pb-2 text-2xl font-bold">Blog</h1>
          <div className="flex items-center">
            <input
              type="search"
              id="default-search"
              className="block text-sm bg-gray-100 rounded-xl w-72 border-primary-300 ps-4 focus:ring-primary-500 focus:border-primary-500 "
              placeholder="Search"
              onChange={(e) => {
                setSearchValue(e.currentTarget.value);
              }}
            />
            <svg
              className="relative w-4 h-4 ml-2 text-gray-500 -translate-x-10 cursor-pointer hover:scale-105 dark:text-gray-400"
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
            className="my-6 mr-2 border rounded-sm bg-primary-300 border-primary-600"
            checked={userFilter}
            onChange={() => setUserFilter((prev) => !prev)}
          />{" "}
          <p className="inline text-sm text-gray-600">Written by me </p>
        </div>

        {/* right side */}
        <div className="right-0 flex flex-col items-end flex-1 h-full ml-8 overflow-auto">
          <Link to="/blogs/new" className="pb-4">
            <Button type="submit" roundness="xl">
              Write New Post
            </Button>
          </Link>

          <div
            className={
              "h-full overflow-y-auto pt-4 grid gap-5 " +
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
