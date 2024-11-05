import type { CollectionEntry } from "astro:content";

type GroupKey = string | number | symbol;

interface GroupFunction<T> {
  (item: T, index?: number): GroupKey;
}

const getPostsByGroupCondition = (
  posts: CollectionEntry<"blog">[] | undefined,
  groupFunction: GroupFunction<CollectionEntry<"blog">>
) => {
  if (!posts) {
    throw new Error("Posts array is undefined");
  }

  const result: Record<GroupKey, CollectionEntry<"blog">[]> = {};
  for (let i = 0; i < posts.length; i++) {
    const item = posts[i];
    if (!item) {
      continue;
    }
    const groupKey = groupFunction(item, i);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
  }
  return result;
};

export default getPostsByGroupCondition;
