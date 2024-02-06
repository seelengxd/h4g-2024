import { ActivityType } from "../activities/activities";
import { SessionWithMinutesData } from "../sessions/sessions";
import { UserData } from "../users/users";

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
  name: number;
  volunteers: {
    dataPoints: DataPoint[];
    users: UserData[][];
  };
  minutes: {
    dataPoints: DataPoint[];
    activities: VolunteerActivityData[][];
  };
}

export type VolunteerActivityReport = VolunteerActivityReportRow[];
