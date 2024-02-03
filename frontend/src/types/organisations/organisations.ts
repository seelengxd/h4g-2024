import { ActivityMiniData } from "../activities/activities";
import { Interest } from "../interests/interests";

export interface Organisation {
  id: number;
  name: string;
  description: string;
  categories: Interest[];
  activities: ActivityMiniData[];
  imageUrl?: string;
  websiteUrl?: string;
}

export interface OrganisationsPostData {
  name: string;
  description: string;
  categories: Interest[];
  websiteUrl?: string;
  image?: File;
}
