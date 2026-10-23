import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

export const ACCENTS = ['lavender', 'pink', 'peach', 'teal'] as const;
export type Accent = (typeof ACCENTS)[number];

export const STATUS_LABEL = {
  'in-progress': 'In progress',
  complete: 'Complete',
  paused: 'Paused',
} as const;

/** Published projects in number order, as on the artboard. */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects', ({ data }) => import.meta.env.DEV || !data.draft);
  return all.sort((a, b) => a.data.number - b.data.number);
}

export function accentFor(p: Project): Accent {
  return p.data.accent ?? ACCENTS[(p.data.number - 1) % ACCENTS.length];
}

export const projectLabel = (n: number) => `Project ${String(n).padStart(2, '0')}`;

/** 2026-10-22 style, matching the mono metadata. Dates are calendar dates, so format in UTC. */
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

/** "github.com/user/repo" from a repo URL. */
export const repoLabel = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');
