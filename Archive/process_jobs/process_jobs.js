import greenhouse_jobs_data from "../jobs_data/greenhouse_jobs_data.json" assert { type: "json" };
import lever_jobs_data from "../jobs_data/lever_jobs_data.json" assert { type: "json" };
import company_details from "../company_details_scraper/company_details.json" assert { type: "json" };
import { supabase } from "../supabase.js";

const jobBoards = [
  "greenhouse",
  "lever",
  // "ashby",
];

const jobBoardData = {
  greenhouse: greenhouse_jobs_data,
  lever: lever_jobs_data,
  // ashby: ashby_jobs_data
};

for (const jobBoard of jobBoards) {
  for (const job of jobBoardData[jobBoard]) {
    const existing_job = await supabase
      .from("jobs")
      .select("*")
      .eq("application_link", job["application_link"]);
    if (existing_job.data.length === 0) {
      await supabase.from("jobs").insert([
        {
          job_title: job["job_title"],
          company_name: job["company_name"],
          application_link: job["application_link"],
          location: job["location"],
          description: job["description"],
          company_logo: job["company_logo"],
          company_slug: job["company_slug"],
          job_slug: job["job_slug"],
          job_board: jobBoard,
          industry: company_details[job["company_name"]]?.industry,
          about: company_details[job["company_name"]]?.about,
          linkedin_link: company_details[job["company_name"]]?.linkedin_link,
        },
      ]);
    } else {
      await supabase
        .from("jobs")
        .update({
          job_title: job["job_title"],
          company_name: job["company_name"],
          application_link: job["application_link"],
          location: job["location"],
          description: job["description"],
          company_logo: job["company_logo"],
          company_slug: job["company_slug"],
          job_slug: job["job_slug"],
          job_board: jobBoard,
          industry: company_details[job["company_name"]]?.industry,
          about: company_details[job["company_name"]]?.about,
          linkedin_link: company_details[job["company_name"]]?.linkedin_link,
        })
        .eq("application_link", job["application_link"]);
    }
  }
}
