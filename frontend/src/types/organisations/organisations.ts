import { ActivityMiniData } from "../activities/activities";
import { Category } from "../categories/categories";

export interface Organisation {
  id: number;
  name: string;
  description: string;
  categories: Category[];
  activities: ActivityMiniData[];
  imageUrl?: string;
  websiteUrl?: string;
}

export interface OrganisationsPostData {
  name: string;
  description: string;
  categories: Category[];
  websiteUrl?: string;
  image?: File;
}
