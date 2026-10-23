import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const accent = z.enum(['lavender', 'pink', 'peach', 'teal']);

const projects = defineCollection({
  // One folder per project: src/content/projects/<slug>/index.md plus its photos
  loader: glob({ pattern: '*/index.md', base: './src/content/projects', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      number: z.number().int().positive(),
      summary: z.string(),
      status: z.enum(['in-progress', 'complete', 'paused']).default('in-progress'),
      updated: z.coerce.date(),
      accent: accent.optional(),
      cover: image(),
      coverAlt: z.string(),
      hero: image().optional(),
      heroAlt: z.string().optional(),
      // Numbered markers on the hero photo. x and y are percentages from the top left.
      callouts: z.array(z.object({ x: z.number(), y: z.number(), label: z.string() })).default([]),
      repo: z.url().optional(),
      license: z.string().optional(),
      buyUrl: z.url().optional(),
      draft: z.boolean().default(false),
    }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      date: z.coerce.date(),
      kind: z.enum(['post', 'review']).default('post'),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

const tools = defineCollection({
  loader: file('./src/data/tools.yaml'),
  schema: z.object({
    name: z.string(),
    category: z.string(),
    note: z.string(),
    url: z.url().optional(),
  }),
});

export const collections = { projects, posts, tools };
