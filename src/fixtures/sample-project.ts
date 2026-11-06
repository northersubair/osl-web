// SAMPLE DATA ONLY. Nothing here is a real project or a real account.
// The API is not available to this repo yet; remove this file once the page
// loads real data. Never present these values as real.
import type { ProjectHeaderProps } from "@/components/ProjectHeader";

export const SAMPLE_PROJECT_LABEL = "Sample data. Not a real project.";

export const sampleProject: ProjectHeaderProps = {
  name: "Sample Open Source Project",
  description:
    "A made-up project used to preview the header. Do not send funds to the address below.",
  // Obviously fake: not a valid Stellar key and not a real account.
  paymentAddress: "GSAMPLEFAKEADDRESSDONOTSENDFUNDSXXXXXXXXXXXXXXXXXXXXXXXX",
};
