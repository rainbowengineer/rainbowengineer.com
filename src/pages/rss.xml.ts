import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../site';

export async function GET(context: APIContext) {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  const posts = await getCollection('posts', ({ data }) => !data.draft);

  const items = [
    ...projects.map((p) => ({
      title: p.data.title,
      description: p.data.summary,
      pubDate: p.data.updated,
      link: `/projects/${p.id}/`,
      categories: ['project'],
    })),
    ...posts.map((p) => ({
      title: p.data.title,
      description: p.data.summary,
      pubDate: p.data.date,
      link: `/posts/${p.id}/`,
      categories: [p.data.kind],
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items,
  });
}
