import { SITE } from "@config";
import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { strapiLoader, strapiSingleLoader } from "./strapiloader";
// Define the Strapi posts collection
// This sets up a custom loader for Strapi content
const strapiPostsLoader = defineCollection({
  type: "content_layer",
  loader: strapiLoader({ contentType: "blog-post" }),
});

const welcomePage = defineCollection({
  type: "content_layer",
  loader: strapiSingleLoader({ contentType: "welcome-page" }),
});

const tags = defineCollection({
  type: "content_layer",
  loader: strapiLoader({ contentType: "blog-tag" }),
});

const blog = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image()
        .refine(img => img.width >= 1200 && img.height >= 630, {
          message: "OpenGraph image must be at least 1200 X 630 pixels!",
        })
        .or(z.string())
        .optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      // Set default to true, because the future post will use strapi loader
      deleted: z.boolean().optional().default(true),
      editPost: z
        .object({
          disabled: z.boolean().optional(),
          url: z.string().optional(),
          text: z.string().optional(),
          appendFilePath: z.boolean().optional(),
        })
        .optional(),
    }),
});

export const collections = { blog, strapiPostsLoader, welcomePage, tags };
