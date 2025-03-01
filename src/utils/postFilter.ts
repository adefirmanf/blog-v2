import { SITE } from "@config";
import type { CollectionEntry } from "astro:content";

const postFilter = ({ data }: CollectionEntry<"strapiPostsLoader">) => {
  const isPublishTimePassed =
    Date.now() > new Date(data.updatedAt).getTime() - SITE.scheduledPostMargin;
  return !data.archive && (import.meta.env.DEV || isPublishTimePassed);
};

export default postFilter;
