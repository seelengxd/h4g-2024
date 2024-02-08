import { ActivityType } from "../activities/activities";
import { SessionWithMinutesData } from "../sessions/sessions";
import { User, UserData } from "../users/users";

interface VolunteerActivityData {
  id: number;
  name: string;
  type: ActivityType;
  description: string;
  location: string;
  capacity: number;
  sessions: SessionWithMinutesData[];
}

// Stores counts for graphs.
interface DataPoint {
  y: number;
  label: string;
}

interface VolunteerActivityReportRow {
  // ID / Name are from the interest model
  id: number;
  name: string;
  volunteers: {
    dataPoints: DataPoint[];
    users: UserData[][];
  };
  minutes: {
    dataPoints: DataPoint[];
    activities: VolunteerActivityData[][];
  };
}

export interface VolunteerDemographicReport {
  gender: {
    dataPoints: DataPoint[];
    users: Array<{
      // name of gender
      name: string;
      users: User[];
    }>;
  };
  immigrationStatus: {
    dataPoints: DataPoint[];
    users: Array<{
      // name of gender
      name: string;
      users: User[];
    }>;
  };
  skills: {
    dataPoints: DataPoint[];
    users: Array<{
      // name of gender
      name: string;
      users: User[];
    }>;
  };
  interests: {
    dataPoints: DataPoint[];
    users: Array<{
      // name of gender
      name: string;
      users: User[];
    }>;
  };
  age: {
    dataPoints: DataPoint[];
    users: Array<{
      // name of gender
      name: string;
      users: User[];
    }>;
  };
}

export type VolunteerActivityReport = VolunteerActivityReportRow[];
