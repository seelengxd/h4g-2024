import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Blog } from "../../types/blogs/blogs";
import blogsAPI from "../../api/blogs/blogs";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { selectUser } from "../../reducers/authSlice";
import Button from "../../components/buttons/Button";
import ConfirmationDialog from "../../components/feedback/ConfirmationDialog";

const ViewBlog: React.FC = () => {
  //console.log("arrived on page");
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog>();
  const [imageDisplayUrl, setImageDisplayUrl] = useState(blog?.imageUrl || "");
  const [dialogOpen, setDialogOpen] = useState(false);

  const navigate = useNavigate();
  const handleDelete = () => {
    blogsAPI.deleteBlog(Number(id)).then(() => navigate("/blogs"));
  };

  useEffect(() => {
    blogsAPI.getBlog(Number(id)).then((blog) => setBlog(blog));
  }, [id]);

  useEffect(() => {
    setImageDisplayUrl(blog?.imageUrl || "");
  });

  //console.log("here is the current ", blog);
  const user = useSelector(selectUser)!.id;
  const isOwner = user === blog?.user.id;

  console.log("in view: ", imageDisplayUrl);
  console.log("blog ", blog);

  return (
    <div className="flex px-20 py-20">
      {/* left half */}
      <div className="flex flex-col w-2/3 min-w-80">
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

        <div className="flex justify-between pr-4">
          <div className="flex flex-col">
            <h2 className="text-gray-600 text-sm pb-2">
              by {blog?.user.preferredName}
            </h2>
            <h2 className="text-gray-600 text-sm">
              Posted on{" "}
              {blog ? format(new Date(blog.createdAt), "dd MMM yyyy") : ""}
            </h2>
          </div>
          {isOwner ? (
            <div className="flex gap-2">
              <Button onClick={() => setDialogOpen(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-8 h-6 hover:scale-95"
                >
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg>
              </Button>

              <Link to={`/blogs/${id}/edit`}>
                <Button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    className="w-8 h-6 hover:scale-95"
                  >
                    <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" />
                  </svg>
                </Button>
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>

        <p className="py-7 text-gray-800">{blog?.description}</p>
      </div>

      {/* right half */}
      <div className="width-1/3 pl-8 pt-8">
        <img
          className="bg-white max-w-96"
          src={
            process.env.REACT_APP_BACKEND_URL +
            "/" +
            (imageDisplayUrl
              ? imageDisplayUrl
              : "uploads/placeholder-image.png")
          }
        />
      </div>

      <div>
        {dialogOpen && (
          <ConfirmationDialog
            message="Delete this blog post?"
            onDelete={handleDelete}
            onCancel={() => setDialogOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ViewBlog;
