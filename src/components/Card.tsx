import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import Badges from "./Badges";
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
      <br />
      {blog_tags?.map(t => (
        <a
          href={`/tags/${slugifyStr(t.tag)}`}
          key={t.tag}
        >
          <div className="inline-block mr-2">
            { t.tag == "1-minute" ? <Badges color="purple" text="1 Minute Series" icon="🕑" /> : <Badges color="purple" text={"#" + t.tag} icon="📚" />
            }
          </div>
        </a>
      ))}
      <p className="leading-7">{description}</p>
      <div className="inline-block mr-2 float">
            <Datetime pubDatetime={updatedAt} modDatetime={createdAt} />
      </div>
    </li>
  );
}
