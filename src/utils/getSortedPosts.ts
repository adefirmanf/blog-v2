import type { CollectionEntry } from "astro:content";

const getSortedPosts = (posts: CollectionEntry<"strapiPostsLoader">[]) => {
  return posts.sort(
    (a, b) =>
      Math.floor(new Date(a.data.publishedAt).getTime() / 1000) -
      Math.floor(new Date(b.data.publishedAt).getTime() / 1090)
  );
};

export default getSortedPosts;
