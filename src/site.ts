// Everything about you and the site lives here. Values in [brackets] are placeholders to replace.

export const SITE = {
  title: 'Rainbow Engineer',
  url: 'https://rainbowengineer.com',
  description: 'Things I\'ve built, and how I built them. Hardware and software builds, tools and reviews.',

  // Info panel on the home page
  name: 'Allie',
  basedIn: 'SF Bay Area',
  writesAbout: 'Hardware and software builds, tools, reviews',
  email: 'social@rainbowengineer.com',
  github: 'rainbowengineer',

  // The one-way link to the company site (footer and "Want one?" blocks)
  company: { name: 'Stasis Systems', url: 'https://stasis-systems.com' },

  // giscus comments (https://giscus.app). Leave repoId empty to hide comments.
  giscus: {
    repo: 'rainbowengineer/rainbowengineer.com',
    repoId: 'R_kgDOVUXqTQ',
    category: 'Comments',
    categoryId: '', // from giscus.app once Discussions and the giscus app are set up
  },
} as const;

export const githubUrl = SITE.github ? `https://github.com/${SITE.github}` : '#';
export const githubLabel = `github.com/${SITE.github || '[username]'}`;
export const mailto = SITE.email.startsWith('[') ? 'mailto:' : `mailto:${SITE.email}`;
