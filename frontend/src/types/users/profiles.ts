import { Interest } from "../interests/interests";
import { Skill } from "../skills/skills";

export interface Profile {
    id: number;
    dob?: Date | null;
    description?: string | null;
    interests: Interest[];
    skills: Skill[];
    userId: number;
    imageUrl?: string | null;

    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
}

export interface PostData {
    fullName: string;
    prefName: string;
    email: string;
    dob?: Date | null;
    description?: string | null;
    interests: number[];
    skills: number[];
    imageUrl?: string | null;//todo remove if not needed
    image?: File;
    //todo: did not include availability yet
  }