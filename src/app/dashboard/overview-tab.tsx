'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, DollarSign, Target, ShoppingCart, BarChart } from 'lucide-react';
import {
  BarChart as ReBarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar as ReBar,
} from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from 'react';

function StatCard({ title, value, icon: Icon, description }: { title: string, value: string | number, icon: React.ElementType, description: string }) {
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-white/10 hover:border-primary/30 transition-colors cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
        <Icon className="h-5 w-5 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        <p className="text-xs text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function OverviewTab({ surveyData }: { surveyData: any }) {
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [recentSales, setRecentSales] = useState<any[]>([]);

  // Real data would be fetched here
  // useEffect(() => { ... fetch data ... }, []);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Annual Revenue" value={surveyData?.revenue || 'N/A'} icon={DollarSign} description="From your survey data" />
          <StatCard title="Team Size" value={surveyData?.teamSize || 'N/A'} icon={Users} description="From your survey data" />
          <StatCard title="Primary Goal" value={surveyData?.goal || 'N/A'} icon={Target} description="Your main objective for this year" />
          <StatCard title="Sales This Month" value="N/A" icon={ShoppingCart} description="Connect your sales platform" />
      </div>

      <div className="grid gap-8 mt-8 md:grid-cols-5">
          <Card className="md:col-span-3 bg-gray-950/60 border-white/10 text-white">
              <CardHeader>
                  <CardTitle>Monthly Revenue</CardTitle>
                  <CardDescription>Connect your payment provider to see your revenue trajectory.</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    {revenueData.length > 0 ? (
                      <ReBarChart data={revenueData}>
                          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                          <Tooltip cursor={{ fill: 'rgba(255,255,255,0.1)' }} contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)' }}/>
                          <ReBar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </ReBarChart>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                          <BarChart className="h-12 w-12 mb-4" />
                          <p className="font-medium">No Revenue Data</p>
                          <p className="text-sm">Connect your accounts in Settings to start seeing data.</p>
                      </div>
                    )}
                  </ResponsiveContainer>
              </CardContent>
          </Card>
           <Card className="md:col-span-2 bg-gray-950/60 border-white/10 text-white">
              <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>Your most recent transactions will appear here.</CardDescription>
              </CardHeader>
              <CardContent>
                  <Table>
                      <TableHeader>
                          <TableRow className="border-white/10 hover:bg-white/5">
                              <TableHead>Customer</TableHead>
                              <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {recentSales.length > 0 ? (
                            recentSales.map(sale => (
                                <TableRow key={sale.id} className="border-white/10 hover:bg-white/5 cursor-pointer">
                                    <TableCell>
                                        <div className="font-medium">{sale.customer}</div>
                                        <div className="text-sm text-gray-400">{sale.email}</div>
                                    </TableCell>
                                    <TableCell className="text-right">{sale.amount}</TableCell>
                                </TableRow>
                            ))
                          ) : (
                             <TableRow>
                                <TableCell colSpan={2} className="h-24 text-center text-gray-500">
                                  No recent sales.
                                </TableCell>
                              </TableRow>
                          )}
                      </TableBody>
                  </Table>
              </CardContent>
          </Card>
      </div>
    </>
  );
}
