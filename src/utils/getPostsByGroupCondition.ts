import type { CollectionEntry } from "astro:content";

type GroupKey = string | number | symbol;

interface GroupFunction<T> {
  (item: T, index?: number): GroupKey;
}

const getPostsByGroupCondition = (
  posts: CollectionEntry<"strapiPostsLoader">[] | undefined,
  groupFunction: GroupFunction<CollectionEntry<"strapiPostsLoader">>
) => {
  if (!posts) {
    throw new Error("Posts array is undefined");
  }

  const result: Record<GroupKey, CollectionEntry<"strapiPostsLoader">[]> = {};
  for (let i = 0; i < posts.length; i++) {
    const item = posts[i];
    if (!item) {
      continue;
    }
    const groupKey = groupFunction(item, i);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push();
  }
  return result;
};

export default getPostsByGroupCondition;
