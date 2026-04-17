'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, Users, Heart, Zap, Search, BarChart, MessageSquare, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Dummy data removed. Real data will come from an AI agent.
const strategies = [
    {
        icon: Users,
        title: "Hyper-Personalize Your Service",
        description: "Large competitors can't offer the 1-on-1 attention you can. Use customer names, remember their past purchases, and offer bespoke advice. This builds a moat of loyalty."
    },
    {
        icon: Heart,
        title: "Champion Your Niche Identity",
        description: "Lean into what makes you unique. Highlight this in your marketing to create an authentic connection that Amazon can't replicate. You are an expert, not a generalist."
    },
    {
        icon: Zap,
        title: "Offer Curated, High-Quality Selections",
        description: "Instead of offering everything, offer the *best* things. Your expertise builds trust and positions you as a go-to authority, saving customers from decision fatigue."
    }
];

const competitorAnalysis: any = null;

export default function CompetitionTab() {
  return (
    <div className="space-y-8">
        <Card className="bg-gray-950/60 border-white/10 text-white">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Shield className="text-primary"/> Differentiate & Thrive</CardTitle>
                <CardDescription>Large competitors compete on price and speed. You can win by competing on value, expertise, and connection. This is your intrinsic advantage.</CardDescription>
            </CardHeader>
        </Card>
        
        <div className="grid md:grid-cols-3 gap-6">
            {strategies.map((strategy, index) => (
                <Card key={index} className="bg-gradient-to-br from-gray-900 to-gray-950 border-white/10 hover:border-primary/50 transition-colors flex flex-col">
                    <CardHeader>
                        <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4 border border-primary/20">
                            <strategy.icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle>{strategy.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-sm text-gray-400">{strategy.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>

        <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-accent/20">
            <CardHeader>
                 <CardTitle className="flex items-center gap-3"><Search className="text-accent" /> AI Competitor Analysis</CardTitle>
                <CardDescription>Enter a competitor in your survey to get AI-powered insights on their online presence.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
                {competitorAnalysis ? (
                    <>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-semibold text-white flex items-center gap-2 mb-3"><Tag className="text-accent"/> Top SEO Keywords</h4>
                                <div className="flex flex-wrap gap-2">
                                    {competitorAnalysis.keywords.map((kw: any) => (
                                        <Badge key={kw} variant="outline" className="bg-accent/10 border-accent/30 text-accent-foreground">{kw}</Badge>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white flex items-center gap-2 mb-2"><BarChart className="text-accent"/> Sample Ad Copy</h4>
                                <blockquote className="border-l-2 border-accent pl-4 text-sm italic text-gray-300">
                                {competitorAnalysis.adCopy}
                                </blockquote>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-semibold text-white flex items-center gap-2 mb-2"><MessageSquare className="text-accent"/> Social Media Sentiment</h4>
                                <p className="text-2xl font-bold text-white">{competitorAnalysis.socialSentiment}</p>
                                <p className="text-sm text-gray-400">{competitorAnalysis.sentimentAnalysis}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="md:col-span-2 flex flex-col items-center justify-center text-center text-gray-500 border-2 border-dashed border-gray-800 rounded-xl py-16">
                         <Search className="h-12 w-12 mb-4"/>
                         <p className="font-medium text-lg">No Competitor to Analyze</p>
                         <p>Provide a competitor's website in your survey to activate this feature.</p>
                     </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
