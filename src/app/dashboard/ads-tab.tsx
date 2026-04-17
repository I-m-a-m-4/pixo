'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Lightbulb, DollarSign, Target, BarChart as BarChartIcon } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

// Dummy data removed.
const adPlatforms: any[] = [];

export default function AdsTab() {
  const recommendedPlatforms = adPlatforms.filter(p => p.recommended);

  return (
    <div className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-primary/20">
                <CardHeader className="flex flex-row items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                        <Lightbulb className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle>AI-Powered Recommendation</CardTitle>
                        <CardDescription className="text-gray-300 mt-1">
                            Based on your industry and goals, our AI will recommend where to focus your ad spend to maximize ROI.
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    {recommendedPlatforms.length > 0 ? (
                        <>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={recommendedPlatforms} layout="vertical" margin={{ left: 20, right: 20 }}>
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="platform" hide />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.1)' }}
                                    contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)' }}
                                />
                                <Bar dataKey="budget" fill="hsl(var(--primary))" background={{ fill: 'rgba(255,255,255,0.05)' }}>
                                    {recommendedPlatforms.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                             <div className="flex justify-around text-xs text-gray-400 mt-2">
                                {recommendedPlatforms.map(p => (
                                    <div key={p.platform} className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></div>
                                        <span>{p.platform}: {p.budget}%</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                         <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 py-10">
                            <BarChartIcon className="h-12 w-12 mb-4" />
                            <p className="font-medium">No Recommendations Yet</p>
                            <p className="text-sm">Strategic analysis is running. Your ad budget recommendations will appear here.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
             <div className="space-y-4">
                <h3 className="text-lg font-semibold tracking-tight text-white">Key Metrics Glossary</h3>
                <div className="grid gap-4">
                    <div className="flex items-start gap-3 p-3 bg-gray-950/60 rounded-lg border border-white/10">
                        <DollarSign className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold">Return on Investment (ROI)</h4>
                            <p className="text-sm text-gray-400">Measures the profit generated from your ad spend. A higher ROI means better profitability.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-950/60 rounded-lg border border-white/10">
                        <Target className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold">Cost Per Click (CPC)</h4>
                            <p className="text-sm text-gray-400">The average amount you pay each time someone clicks on your ad.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <Card className="bg-gray-950/60 border-white/10 text-white">
            <CardHeader>
                <CardTitle>Detailed Platform Analysis</CardTitle>
                <CardDescription>A complete breakdown of potential ad platforms for your business.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow className="border-white/10 hover:bg-white/5">
                            <TableHead>Platform</TableHead>
                            <TableHead>Est. ROI</TableHead>
                            <TableHead>Avg. CPC</TableHead>
                            <TableHead className="w-[50%]">AI Recommendation & Notes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {adPlatforms.length > 0 ? adPlatforms.map(platform => (
                            <TableRow key={platform.platform} className={`border-white/10 ${platform.recommended ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-white/5'}`}>
                                <TableCell className="font-medium">{platform.platform}</TableCell>
                                <TableCell className="font-semibold">{platform.roi}</TableCell>
                                <TableCell>{platform.avgCpc}</TableCell>
                                <TableCell className="text-gray-400">
                                    {platform.recommended && <span className="font-bold text-primary block mb-1">Recommended</span>}
                                    {platform.notes}
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center text-gray-500">
                                AI is analyzing data. Platform analysis will appear here.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
