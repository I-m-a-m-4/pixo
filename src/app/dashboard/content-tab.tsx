'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, TrendingUp, Video, Newspaper, Bot, BrainCircuit, CheckCircle, ListOrdered } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { generateContentStrategy, ContentStrategyOutput } from "@/ai/flows/content-strategy-flow";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";


const ideaIcons: { [key: string]: React.ElementType } = {
    'Video': Video,
    'Blog Post': Newspaper,
    'Social Media': Sparkles,
    'Infographic': Bot, // Using Bot for infographic as an example
};


export default function ContentTab() {
  const [isLoading, setIsLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState<ContentStrategyOutput['plan'] | null>(null);

  const handleGenerate = async () => {
    if (!topic) return;
    setIsLoading(true);
    setGeneratedPlan(null);
    try {
        const result = await generateContentStrategy({ topic });
        setGeneratedPlan(result.plan);
    } catch (e) {
        console.error("Failed to generate content strategy:", e);
        // You might want to show a toast notification here
    } finally {
        setIsLoading(false);
    }
  }

  const renderSkeleton = () => (
    <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
    </div>
  );

  return (
    <div className="space-y-8">
        <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-primary/20">
            <CardHeader>
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                        <Sparkles className="h-6 w-6 text-primary"/>
                    </div>
                    <div>
                        <CardTitle>AI Content Architect</CardTitle>
                        <CardDescription className="mt-1">Describe your business niche, a product, or a topic. Our AI-powered agent will research the web and build a 100-day content strategy to help you dominate your market.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <Textarea 
                    placeholder="e.g., A boutique coffee shop in Austin, TX specializing in single-origin, ethically sourced beans." 
                    className="animated-input bg-gray-950/80"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                />
                <Button onClick={handleGenerate} disabled={isLoading || !topic} className="cursor-pointer w-full sm:w-auto">
                    {isLoading ? "Generating Your Strategy..." : "Generate 7-Day Starter Plan"}
                </Button>
            </CardContent>
        </Card>
        
        <div className="space-y-6">
             <h2 className="text-2xl font-bold tracking-tight">Your Strategic Content Plan</h2>
            
            {isLoading && renderSkeleton()}

            {!isLoading && generatedPlan && generatedPlan.length > 0 && (
                <Accordion type="single" collapsible className="w-full space-y-2">
                    {generatedPlan.map((idea, index) => {
                        const Icon = ideaIcons[idea.format] || Bot;
                        return (
                        <AccordionItem key={index} value={`item-${index}`} className="bg-gray-950/60 border border-white/10 rounded-lg px-6 hover:border-primary/50 transition-colors">
                            <AccordionTrigger className="text-left hover:no-underline">
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col items-center justify-center text-primary">
                                        <span className="text-xs font-mono">DAY</span>
                                        <span className="text-2xl font-bold">{idea.day}</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <Icon className="h-5 w-5 text-primary"/>
                                            <Badge variant="outline" className="border-primary/50 bg-primary/10 text-primary font-medium">{idea.format}</Badge>
                                        </div>
                                        <h3 className="font-semibold text-white text-lg">{idea.title}</h3>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 border-t border-white/10">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-semibold text-white flex items-center gap-2 mb-2"><Sparkles size={16} className="text-accent"/> Catchy Hook</h4>
                                            <p className="text-sm text-gray-300 italic">"{idea.hook}"</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white flex items-center gap-2 mb-2"><TrendingUp size={16} className="text-accent"/> Why it Works</h4>
                                            <p className="text-sm text-gray-300">{idea.impact}</p>
                                        </div>
                                    </div>
                                    <div>
                                         <h4 className="font-semibold text-white flex items-center gap-2 mb-3"><ListOrdered size={16} className="text-accent"/> Creation Steps</h4>
                                         <ul className="space-y-3">
                                            {idea.steps.map((step, stepIndex) => (
                                                <li key={stepIndex} className="flex items-start gap-3">
                                                    <CheckCircle size={16} className="text-primary mt-1 flex-shrink-0"/>
                                                    <p className="text-sm text-gray-400">{step}</p>
                                                </li>
                                            ))}
                                         </ul>
                                         {idea.format === 'Video' && (
                                            <Button variant="secondary" className="w-full mt-6 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20">Generate AI Video (Coming Soon)</Button>
                                         )}
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    )})}
                </Accordion>
            )}

             {!isLoading && (!generatedPlan || generatedPlan.length === 0) && (
                 <div className="flex flex-col items-center justify-center text-center text-gray-500 border-2 border-dashed border-gray-800 rounded-xl py-16 bg-white/[0.01]">
                     <div className="w-24 h-24 border-2 border-dashed border-gray-700 rounded-full flex items-center justify-center mb-6">
                        <BrainCircuit className="h-12 w-12 text-gray-600"/>
                     </div>
                     <p className="font-medium text-lg text-white/80">Your Strategic Content Plan Awaits</p>
                     <p className="max-w-md mx-auto">Describe your business above and let our AI agent build a powerful, multi-day content strategy designed to attract and engage your target audience.</p>
                 </div>
            )}
        </div>
    </div>
  );
}
