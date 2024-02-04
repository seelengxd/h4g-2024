import { useNavigate, useParams } from "react-router-dom";
import activitiesAPI from "../../api/activities/activities";
import {
  ActivityMiniData,
  ActivityPostData,
  Image,
} from "../../types/activities/activities";

import ActivityForm from "../activities/ActivityForm";
import { useEffect, useState } from "react";

async function downloadAndConvertToBlob(images: Image[]) {
  let imageFiles: File[] = [];

  for (const image of images) {
    const imageUrl = image.imageUrl;
    // Fetch the image data
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/${imageUrl}`
    );

    // Read the image data as blob
    const blob = await response.blob();

    // Create a File object from the blob
    const file = new File([blob], imageUrl, {
      type: response.headers.get("content-type")!,
    });

    console.log({ blob, file });

    imageFiles.push(file);
  }

  return imageFiles;
}

const UpdateActivity: React.FC = () => {
  const [activity, setActivity] = useState<ActivityMiniData | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    activitiesAPI
      .getActivity(Number(id))
      .then(async (activity) => {
        return {
          activity: activity,
          images: await downloadAndConvertToBlob(activity.images),
        };
      })
      .then(({ activity, images }) => {
        setActivity({ ...activity, loadedImages: images });
      })
      .catch(() => navigate("/activities"));
  }, [id, navigate]);

  return (
    activity && (
      <ActivityForm
        label="Update Activity"
        initialData={activity}
        handleValues={(values) =>
          activitiesAPI.updateActivity(
            parseInt(id!),
            values as ActivityPostData
          ) as unknown as Promise<void>
        }
      />
    )
  );
};

export default UpdateActivity;
