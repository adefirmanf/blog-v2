import type { CollectionEntry } from "astro:content";
import getSortedPosts from "./getSortedPosts";
import { slugifyAll } from "./slugify";

const getPostsByTag = (posts: CollectionEntry<"strapiPostsLoader">[], tag: string) =>
  getSortedPosts(
    posts.filter(post => {
      const blogTags = post.data.blog_tags?.map(n => n.tag);
      return blogTags !== undefined && slugifyAll(blogTags).includes(tag);
    })
  );

export default getPostsByTag;
