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

export const GenderToLabelMap: Record<Gender, string> = {
  [Gender.Male]: "Male",
  [Gender.Female]: "Female",
  [Gender.Other]: "Other",
};

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

export const EducationLevelToLabelMap: Record<EducationLevel, string> = {
  [EducationLevel.No]: "No",
  [EducationLevel.Primary]: "Primary",
  [EducationLevel.LowerSecondary]: "Lower Secondary",
  [EducationLevel.Secondary]: "Secondary",
  [EducationLevel.PostSecondary]: "Post-Secondary",
  [EducationLevel.Diploma]: "Diploma",
  [EducationLevel.Professional]: "Professional",
  [EducationLevel.Bachelor]: "Bachelor",
  [EducationLevel.Master]: "Master",
  [EducationLevel.Doctorate]: "Doctorate",
};

export enum CommitmentLevel {
  Adhoc = "Adhoc",
  Weekly = "Weekly",
  Monthly = "Monthly",
}

export const CommitmentLevelLabelMap: Record<CommitmentLevel, string> = {
  [CommitmentLevel.Adhoc]: "Adhoc",
  [CommitmentLevel.Weekly]: "Weekly",
  [CommitmentLevel.Monthly]: "Monthly",
};

export enum ImmigrationStatus {
  Citizen = "Citizen",
  Pr = "Pr",
  Ep = "Ep",
  Dp = "Dp",
  LOC = "LOC",
  WP = "WP",
  Vis = "Visitor",
}

export const ImmigrationStatusLabelMap: Record<ImmigrationStatus, string> = {
  [ImmigrationStatus.Citizen]: "Citizen",
  [ImmigrationStatus.Pr]: "PR",
  [ImmigrationStatus.Ep]: "EP",
  [ImmigrationStatus.Dp]: "DP",
  [ImmigrationStatus.LOC]: "LOC",
  [ImmigrationStatus.WP]: "WP",
  [ImmigrationStatus.Vis]: "Visitor",
};

export enum Salutation {
  Mr = "Mr",
  Mrs = "Mrs",
  Ms = "Ms",
  Miss = "Miss",
  Madam = "Madam",
  Dr = "Dr",
}

export const SalutationLabelMap: Record<Salutation, string> = {
  [Salutation.Mr]: "Mr",
  [Salutation.Mrs]: "Mrs",
  [Salutation.Ms]: "Ms",
  [Salutation.Miss]: "Miss",
  [Salutation.Madam]: "Madam",
  [Salutation.Dr]: "Dr",
};

export interface ProfilePostData {
  fullName: string;
  prefName: string;
  email: string;
  dob?: Date | null;
  description?: string | null;
  interests: number[];
  skills: number[];
  imageUrl?: string | null; //todo remove if not needed
  image?: File;
  gender?: Gender;

  driving: boolean;
  ownVehicle: boolean;
  availability: string;
  immigrationStatus: ImmigrationStatus;
  commitmentLevel: CommitmentLevel;
  educationLevel: EducationLevel;
  salutation: Salutation;
  //todo: did not include availability yet
}
