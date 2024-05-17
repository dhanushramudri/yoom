import shell from "shelljs";
import fs from "fs";

fs.writeFileSync("./company_details_scraper/company_details.json", "{}");

shell.exec("node ./company_details_scraper/scraper.js");
