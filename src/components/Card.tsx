import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import "@styles/custom.css";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"strapiPostsLoader">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, updatedAt, createdAt, description, blog_tags } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  return (
    <li className="my-6">
      <a
        href={href}
        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
      </a>
      
      {blog_tags?.some(t => t.tag === "1-minute") && (
        <a className="ml-10 gumroad-button" href="/tags/1-minute">1 Minute Series</a>
      )}
      <Datetime pubDatetime={updatedAt} modDatetime={createdAt} />
      <p>{description}</p>
    </li>
  );
}
