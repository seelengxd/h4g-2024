import { Category } from "../categories/categories";

export interface Organisation {
  id: number;
  name: string;
  description: string;
  categories: Category[];
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
