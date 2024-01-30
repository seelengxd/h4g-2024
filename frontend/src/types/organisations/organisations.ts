export interface Organisation {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  websiteUrl?: string;
}

export interface OrganisationsPostData {
  name: string;
  description: string;
  websiteUrl?: string;
  image?: File;
}
