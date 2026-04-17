'use server';
/**
 * @fileOverview A content strategy AI agent.
 *
 * - generateContentStrategy - A function that creates a content plan.
 * - ContentStrategyInput - The input type for the generateContentStrategy function.
 * - ContentStrategyOutput - The return type for the generateContentStrategy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ContentStrategyInputSchema = z.object({
  topic: z.string().describe('The business niche, product, or topic for the content strategy.'),
});
export type ContentStrategyInput = z.infer<typeof ContentStrategyInputSchema>;

const ContentIdeaSchema = z.object({
    day: z.number().describe("The day number in the plan (e.g., 1, 2, 3)."),
    title: z.string().describe("A catchy, SEO-friendly title for the content piece."),
    format: z.enum(['Video', 'Blog Post', 'Social Media', 'Infographic']).describe("The format of the content."),
    hook: z.string().describe("A compelling hook or opening line to grab the audience's attention."),
    impact: z.string().describe("A brief explanation of why this piece of content will be effective and its potential impact on the business."),
    steps: z.array(z.string()).describe("A list of actionable, step-by-step instructions for creating this content. If it's a video, include shot ideas or talking points.")
});

const ContentStrategyOutputSchema = z.object({
    plan: z.array(ContentIdeaSchema).describe("A 7-day content strategy plan.")
});
export type ContentStrategyOutput = z.infer<typeof ContentStrategyOutputSchema>;


export async function generateContentStrategy(input: ContentStrategyInput): Promise<ContentStrategyOutput> {
  return contentStrategyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contentStrategyPrompt',
  input: {schema: ContentStrategyInputSchema},
  output: {schema: ContentStrategyOutputSchema},
  prompt: `You are an expert-level content strategist and growth hacker named 'GrowthOS'.
  Your task is to create a 7-day '100-Day Streak' starter content strategy for a user based on their business topic.

  The user's topic is: '{{{topic}}}'

  For each day of the 7-day plan, you must provide a complete content idea. Your response MUST be in the structured JSON format requested.
  - The plan should be diverse, using different formats like 'Video', 'Blog Post', 'Social Media', and 'Infographic'.
  - Each idea must be actionable and tailored to the user's topic.
  - The 'hook' should be attention-grabbing and designed for modern audiences.
  - The 'impact' should clearly explain the business value (e.g., builds trust, drives traffic, captures leads).
  - The 'steps' should be a practical guide that a business owner can follow to create the content. For videos, describe shots and narration. For blog posts, outline the sections.

  Generate a 7-day plan.`,
});

const contentStrategyFlow = ai.defineFlow(
  {
    name: 'contentStrategyFlow',
    inputSchema: ContentStrategyInputSchema,
    outputSchema: ContentStrategyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
