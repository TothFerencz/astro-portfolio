import { defineCollection, z } from 'astro:content';

const works = defineCollection({
  schema: z.object({
    title: z.string(),
    year: z.number(),
    client: z.string(),
    tools: z.array(z.string()),
    service: z.string(),
    images: z.array(z.string()),
  }),
});

const skills = defineCollection({
  schema: z.object({
    company: z.string(),
    role: z.string(),
    startYear: z.number(),
    endYear: z.number().optional(),
  }),
});

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    category: z.string(),
    date: z.date(),
    cover: z.string(),
  }),
});



export const collections = {
  works,
  skills,
  blog
};
