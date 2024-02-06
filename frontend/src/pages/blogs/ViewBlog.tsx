import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Blog } from "../../types/blogs/blogs";
import blogsAPI from "../../api/blogs/blogs";
import { format } from "date-fns";

const ViewBlog: React.FC = () => {
  //console.log("arrived on page");
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog>();
  const [imageDisplayUrl, setImageDisplayUrl] = useState("");


  useEffect(() => {
    blogsAPI.getBlog(Number(id)).then((blog) => setBlog(blog));
  }, [id]);

  useEffect(() => {
    setImageDisplayUrl(blog?.imageUrl || "");
  }, []);

  console.log("here is the current ", blog);
  console.log(imageDisplayUrl ? imageDisplayUrl : "uploads/placeholder-image.png")

  return (
    <div className="flex px-20 py-20">
      {/* left half */}

      <div className="flex flex-col w-2/3">
        <Link to="/blogs" className="flex justify-start items-center ">
          <svg
            className="w-4 h-4 "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>

          <p className="pl-2 font-semibold">Back to Blog Posts</p>
        </Link>

        <h1 className="text-primary-600 font-semibold text-4xl pt-8 pb-4">
          {blog?.title}
        </h1>
        <h2 className="text-gray-600 text-sm pb-2">
          by {blog?.user.preferredName}
        </h2>
        <h2 className="text-gray-600 text-sm">
          Posted on {blog ? format(new Date(blog.createdAt), "dd MMM yyyy"): ""}
        </h2>

        <p className="py-7 text-gray-800">{blog?.description}</p>
      </div>

      {/* right half */}
      <div className="width-1/3 pl-8 pt-8">
      <img
          className="bg-white"
          src={process.env.REACT_APP_BACKEND_URL + "/" + (imageDisplayUrl ? imageDisplayUrl : "uploads/placeholder-image.png")}
        />
        
      </div>
    </div>
  );
};

export default ViewBlog;
