export interface Organisation {
  id: number;
  name: string;
  description: string;
  image_url?: string;
  website_url?: string;
}

export interface OrganisationsPostData {
  name: string;
  description: string;
  websiteUrl?: string;
  image?: File;
}
