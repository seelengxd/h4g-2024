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

  driving: boolean;
  ownVehicle: boolean;
  availability: string;
  immigrationStatus: ImmigrationStatus;
  commitmentLevel: CommitmentLevel;
  educationLevel: EducationLevel;
  gender: Gender;
  salutation: Salutation;
}

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

export enum EducationLevel {
  No = "No",
  Primary = "Primary",
  LowerSecondary = "LowerSecondary",
  Secondary = "Secondary",
  PostSecondary = "PostSecondary",
  Diploma = "Diploma",
  Professional = "Professional",
  Bachelor = "Bachelor",
  Master = "Master",
  Doctorate = "Doctorate",
}

export enum CommitmentLevel {
  Adhoc = "Adhoc",
  Weekly = "Weekly",
  Monthly = "Monthly",
}

export enum ImmigrationStatus {
  Citizen = "Citizen",
  Pr = "Pr",
  Ep = "Ep",
  Dp = "Dp",
  LOC = "LOC",
  WP = "WP",
  Vis = "Visitor",
}

export enum Salutation {
  Mr = "Mr",
  Mrs = "Mrs",
  Ms = "Ms",
  Miss = "Miss",
  Madam = "Madam",
  Dr = "Dr",
}

export interface PostData {
  fullName: string;
  prefName: string;
  email: string;
  dob?: Date | null;
  description?: string | null;
  interests: number[];
  skills: number[];
  imageUrl?: string | null; //todo remove if not needed
  image?: File;
  gender: Gender;

  driving: boolean;
  ownVehicle: boolean;
  availability: string;
  immigrationStatus: ImmigrationStatus;
  commitmentLevel: CommitmentLevel;
  educationLevel: EducationLevel;
  salutation: Salutation;
  //todo: did not include availability yet
}
