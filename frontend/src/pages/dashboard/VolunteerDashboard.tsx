import { useEffect, useState } from "react";
import CardContainer from "../../components/dashboard/CardContainer";
import { useAppSelector } from "../../reducers/hooks";
import { selectUser } from "../../reducers/authSlice";
import EventCard from "./EventCard";
import ActivityInfoCard from "../activities/ActivityInfoCard";
import { ActivityRowData } from "../../utils/activities";
import activitiesAPI from "../../api/activities/activities";
import VolunteeringOpportunityCard from "../activities/VolunteertingOpportunityCard";
import registrationsAPI from "../../api/registrations/registrations";
import { Registration } from "../../types/registrations/registrations";
import { format, isFuture, isPast } from "date-fns";
import blogsAPI from "../../api/blogs/blogs";
import BlogCardContainer from "../../components/blog/CardContainer";
import { Blog } from "../../types/blogs/blogs";

const VolunteerDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [activities, setActivities] = useState<ActivityRowData[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    activitiesAPI
      .getAllActivities()
      .then((activities) => setActivities(activities))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    registrationsAPI
      .getAllRegistrations()
      .then((registrations) => setRegistrations(registrations));
  }, []);

  useEffect(() => {
    blogsAPI.getAllBlogs().then((blog) => setBlogs(blog));
  }, []);

  const user = useAppSelector(selectUser);
  return (
    <div className="items-center justify-between h-[calc(100vh-60px)] px-12 py-6 mx-auto mt-8 lg:px-8">
      <div className="flex justify-between px-16">
        <h1 className="text-4xl tracking-wide">
          Welcome back, {user?.preferredName}!
        </h1>
        <div className="relative">
          <input
            type="search"
            id="default-search"
            className="block p-2 text-sm bg-gray-50 rounded-xl min-w-96 ps-4"
            placeholder="Search"
            onChange={(e) => {
              setSearchValue(e.currentTarget.value);
            }}
          />
          <div className="absolute inset-y-0 flex items-center pointer-events-none end-0 pe-4 opacity-80">
            <svg
              className="w-4 h-4"
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
        </div>
      </div>
      <div className="grid grid-cols-3 grid-rows-2 p-8 px-16 gap-x-12 gap-y-8 h-[calc(100vh-100px)]">
        <div className="col-span-1">
          <CardContainer label={"Upcoming Events"} vertical>
            {registrations
              .filter(
                (registration) =>
                  isFuture(new Date(registration.session.start)) &&
                  registration.session.activity.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
              )
              .map((registration) => (
                <EventCard registration={registration} />
              ))}
          </CardContainer>
        </div>
        {/* Volunteer Activities? */}
        <div className="col-span-2">
          <CardContainer>
            {activities
              .filter((activity) =>
                activity.name.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((activity) => (
                <VolunteeringOpportunityCard
                  activity={activity}
                  showButton={false}
                  dashboard
                />
              ))}
          </CardContainer>
        </div>
        {/* Blogs */}
        <div className="col-span-2">
          <CardContainer>
            {blogs
              .filter((blog) =>
                blog.title.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((blog) => (
                <BlogCardContainer
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
                  dashboard
                />
              ))}
          </CardContainer>
        </div>
        <div className="col-span-1">
          <CardContainer
            label={"Outstanding Volunteer Feedback"}
            description="Leave feedback on your attended volunteer sessions to help us better understand how we can improve your volunteering experience!"
            vertical
            feedback
          >
            {registrations
              .filter(
                (registration) =>
                  isPast(new Date(registration.session.start)) &&
                  !registration.feedback &&
                  registration.session.activity.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
              )
              .map((registration) => (
                <EventCard registration={registration} showFeedback />
              ))}
          </CardContainer>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
