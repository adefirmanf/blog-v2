import { slugifyStr } from "./slugify";
import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

interface Tag {
  tag: string;
  tagName: string;
}

const getUniqueTags = (posts: CollectionEntry<"strapiPostsLoader">[]) => {
  const tags: Tag[] = posts
    .filter(postFilter)
    .flatMap(post => post.data.blog_tags)
    .map(tag => ({ tag: slugifyStr(tag.tag), tagName: slugifyStr(tag.tag) }))
  return tags;
};

export default getUniqueTags;
