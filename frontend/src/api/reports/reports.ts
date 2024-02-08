import client from "../base";
import {
  VolunteerActivityReport,
  VolunteerDemographicReport,
} from "../../types/reports/reports";

class ReportsAPI {
  protected getReportsUrl(): string {
    return "/reports";
  }

  public async getVolunteerActivityReport(): Promise<VolunteerActivityReport> {
    const response = await client.get(
      this.getReportsUrl() + "/volunteer-activity-report"
    );
    return response.data.data;
  }

  public async getVolunteerDemographicReport(): Promise<VolunteerDemographicReport> {
    const response = await client.get(
      this.getReportsUrl() + "/volunteer-demographic-report"
    );
    return response.data.data;
  }
}

const reportsApi = new ReportsAPI();
export default reportsApi;
