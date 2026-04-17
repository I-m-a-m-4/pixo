'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bot, MapPin, DollarSign, BarChart, BrainCircuit, Activity, Zap } from 'lucide-react';
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function SimulationStatCard({ title, value, unit, icon: Icon, color = 'text-primary' }: { title: string, value: string, unit: string, icon: React.ElementType, color?: string }) {
    return (
        <div className="bg-white/[0.03] border border-white/10 p-6 rounded-lg text-center flex flex-col items-center">
            <div className={`w-12 h-12 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center mb-4 ${color}`}>
                 <Icon size={24} />
            </div>
            <p className="text-sm text-white/60 mb-1">{title}</p>
            <p className="text-4xl font-bold text-white tracking-tight">
                {value}
                {unit && <span className="text-2xl text-white/50 ml-1">{unit}</span>}
            </p>
        </div>
    );
}


export default function SimulationsTab() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSimulate = () => {
      setIsLoading(true);
      setResult(null);
      setTimeout(() => {
          setResult({
              projectedRevenue: (Math.random() * 150000 + 50000).toFixed(0),
              breakevenMonths: (Math.random() * 12 + 6).toFixed(1),
              confidence: (Math.random() * 20 + 75).toFixed(1),
          });
          setIsLoading(false);
      }, 2000);
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-1 bg-gray-950/60 border-white/10 text-white">
            <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary border border-primary/20">
                        <BrainCircuit size={20} />
                    </div>
                    <CardTitle className="text-xl">Scenario Simulator</CardTitle>
                </div>
                <CardDescription>Model potential outcomes for strategic decisions. Our AI will analyze market data to provide projections.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="location"><MapPin className="inline-block mr-2 h-4 w-4" /> New Location (City, State)</Label>
                    <Input id="location" placeholder="e.g., Austin, TX" className="animated-input" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="investment"><DollarSign className="inline-block mr-2 h-4 w-4" /> Initial Investment ($)</Label>
                    <Input id="investment" placeholder="e.g., 50000" type="number" className="animated-input" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="marketing"><BarChart className="inline-block mr-2 h-4 w-4" /> Monthly Marketing Budget ($)</Label>
                    <Input id="marketing" placeholder="e.g., 5000" type="number" className="animated-input" />
                </div>
                <Button onClick={handleSimulate} disabled={isLoading} className="w-full cursor-pointer">
                    {isLoading ? "Running Simulation..." : "Run Simulation"}
                </Button>
            </CardContent>
        </Card>

        <div className="md:col-span-2 relative">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-primary/20 text-white flex flex-col min-h-full shadow-2xl shadow-primary/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Bot className="text-primary"/> AI-Powered Simulation Results</CardTitle>
                    <CardDescription>Projections based on your inputs and our market models.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex items-center justify-center p-6">
                    {isLoading && (
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                            <div className="flex flex-col items-center space-y-3 p-4 bg-white/5 rounded-lg">
                                <Skeleton className="h-10 w-10 rounded-lg" />
                                <Skeleton className="h-5 w-24" />
                                <Skeleton className="h-10 w-32" />
                            </div>
                            <div className="flex flex-col items-center space-y-3 p-4 bg-white/5 rounded-lg">
                                <Skeleton className="h-10 w-10 rounded-lg" />
                                <Skeleton className="h-5 w-24" />
                                <Skeleton className="h-10 w-32" />
                            </div>
                            <div className="flex flex-col items-center space-y-3 p-4 bg-white/5 rounded-lg">
                                <Skeleton className="h-10 w-10 rounded-lg" />
                                <Skeleton className="h-5 w-24" />
                                <Skeleton className="h-10 w-32" />
                            </div>
                        </div>
                    )}
                    {!isLoading && result && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                            <SimulationStatCard title="Projected 1-Year Revenue" value={`$${Number(result.projectedRevenue).toLocaleString()}`} unit="" icon={DollarSign} />
                            <SimulationStatCard title="Est. Breakeven Point" value={result.breakevenMonths} unit="months" icon={Activity} color="text-white" />
                            <SimulationStatCard title="Confidence Score" value={result.confidence} unit="%" icon={Zap} color="text-accent" />
                        </div>
                    )}
                    {!isLoading && !result && (
                        <div className="text-center text-gray-500 flex flex-col items-center">
                            <div className="w-24 h-24 border-2 border-dashed border-gray-700 rounded-full flex items-center justify-center mb-6">
                                <Bot className="h-12 w-12 text-gray-600"/>
                            </div>
                            <p className="text-lg font-medium text-white/80">Your simulation results will appear here.</p>
                            <p className="text-sm">Enter your parameters and run the simulation.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
