'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign, BarChart, Target } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

// Dummy data removed. Real data will need to be fetched or passed as props.
const goalData = {
  targetSales: 0,
  currentSales: 0,
  targetEngagement: 0,
  currentEngagement: 0,
};

const salesProgressData: any[] = [];

export default function GoalsTab() {
  const salesProgress = goalData.targetSales > 0 ? (goalData.currentSales / goalData.targetSales) * 100 : 0;
  const engagementProgress = goalData.targetEngagement > 0 ? (goalData.currentEngagement / goalData.targetEngagement) * 100 : 0;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-8">
        <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-primary/20 text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-3"><DollarSign className="text-primary"/> Sales Goal</CardTitle>
            <p className="text-3xl font-bold text-primary">{salesProgress.toFixed(0)}%</p>
          </CardHeader>
          <CardContent>
            <Progress value={salesProgress} className="h-2" />
            <div className="flex justify-between items-center mt-3 text-sm">
              <span className="text-gray-400">Current: <span className="text-white font-medium">${goalData.currentSales.toLocaleString()}</span></span>
              <span className="text-gray-400">Target: <span className="text-white font-medium">${goalData.targetSales.toLocaleString()}</span></span>
            </div>
            <p className="text-xs text-gray-500 mt-4">Set your yearly sales goal in the Settings tab.</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-accent/20 text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-3"><BarChart className="text-accent"/> Social Engagement</CardTitle>
             <p className="text-3xl font-bold text-accent">{engagementProgress.toFixed(0)}%</p>
          </CardHeader>
          <CardContent>
            <Progress value={engagementProgress} className="h-2 [&>*]:bg-accent" />
            <div className="flex justify-between items-center mt-3 text-sm">
                <span className="text-gray-400">Current: <span className="text-white font-medium">{goalData.currentEngagement.toLocaleString()}</span></span>
                <span className="text-gray-400">Target: <span className="text-white font-medium">{goalData.targetEngagement.toLocaleString()}</span></span>
            </div>
             <p className="text-xs text-gray-500 mt-4">Connect your social accounts to track engagement.</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-gray-950/60 border-white/10 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-3"><Target/> Sales vs. Target Trajectory</CardTitle>
          <CardDescription>Monthly progress towards your annual sales goal.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            {salesProgressData.length > 0 ? (
                <LineChart data={salesProgressData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                  <YAxis stroke="#888888" fontSize={12} tickFormatter={(value) => `$${Number(value/1000)}k`} />
                  <Tooltip contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)' }} />
                  <Line type="monotone" dataKey="target" stroke="hsl(var(--accent))" strokeWidth={2} name="Target" dot={false} />
                  <Line type="monotone" dataKey="actual" stroke="hsl(var(--primary))" strokeWidth={2} name="Actual Sales" dot={false} />
                </LineChart>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                    <BarChart className="h-12 w-12 mb-4" />
                    <p className="font-medium">No Sales Data</p>
                    <p className="text-sm">Your sales trajectory will appear here once data is available.</p>
                </div>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
