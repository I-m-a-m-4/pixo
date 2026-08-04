'use client';

import { useRouter } from 'next/navigation';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { LogOut, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAuth, signOut } from 'firebase/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreativeStudio from '@/components/studio/creative-studio';
import SettingsTab from '@/app/dashboard/settings-tab';
import { useEffect } from 'react';


function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background text-white p-6 md:p-8">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-background/95 backdrop-blur-sm -mx-6 md:-mx-8 px-6 md:px-8">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full bg-muted/50" />
            <Skeleton className="h-6 w-24 bg-muted/50" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-32 hidden md:block bg-muted/50" />
            <Skeleton className="h-8 w-8 rounded-full bg-muted/50" />
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto mt-8">
        <Skeleton className="h-10 w-72 mb-8 bg-muted/50" />
        <div className="border-b border-white/10">
          <div className="flex items-center gap-4 h-12">
            <Skeleton className="h-6 w-20 bg-muted/50" />
            <Skeleton className="h-6 w-20 bg-muted/50" />
            <Skeleton className="h-6 w-24 bg-muted/50" />
            <Skeleton className="h-6 w-28 bg-muted/50" />
          </div>
        </div>
        <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-28 rounded-lg bg-muted/50" />
          <Skeleton className="h-28 rounded-lg bg-muted/50" />
          <Skeleton className="h-28 rounded-lg bg-muted/50" />
          <Skeleton className="h-28 rounded-lg bg-muted/50" />
        </div>
        <div className="grid gap-8 mt-8 md:grid-cols-5">
          <Skeleton className="md:col-span-3 h-96 rounded-lg bg-muted/50" />
          <Skeleton className="md:col-span-2 h-96 rounded-lg bg-muted/50" />
        </div>
      </main>
    </div>
  );
}


export default function DashboardPage() {
  return (
    <div className="h-screen overflow-hidden bg-background text-white flex flex-col">
      <main className="flex-grow overflow-hidden relative">
        <Tabs defaultValue="studio" className="w-full h-full flex flex-col">
          <TabsContent value="studio" className="m-0 h-full flex-grow overflow-hidden relative">
            <CreativeStudio />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

