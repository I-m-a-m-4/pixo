
'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { saveUserSettings } from '@/firebase/users';
import { Loader2, Settings, Globe, Users, ShoppingCart, Target, Link as LinkIcon, BarChart2, CreditCard, MessageSquare, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const settingsSchema = z.object({
  websiteUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  twitterHandle: z.string().optional(),
  instagramHandle: z.string().optional(),
  linkedinHandle: z.string().optional(),
  yearlySalesGoal: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive().optional()
  ),
  yearlyEngagementGoal: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive().optional()
  ),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

const integrations = [
    { name: 'Google Analytics', icon: BarChart2, category: 'Analytics' },
    { name: 'Stripe', icon: CreditCard, category: 'Payments' },
    { name: 'Shopify', icon: ShoppingCart, category: 'E-commerce' },
    { name: 'Meta (Facebook/IG)', icon: MessageSquare, category: 'Social Media' },
    { name: 'X (Twitter)', icon: MessageSquare, category: 'Social Media' },
    { name: 'LinkedIn', icon: Briefcase, category: 'Social Media' },
];

export default function SettingsTab() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const userDocRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, `users/${user.uid}`);
  }, [firestore, user]);

  const { data: userData, isLoading: isUserDataLoading } = useDoc(userDocRef);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
        websiteUrl: '',
        twitterHandle: '',
        instagramHandle: '',
        linkedinHandle: '',
    }
  });

  useEffect(() => {
    if (userData) {
      form.reset({
        websiteUrl: userData.websiteUrl || '',
        twitterHandle: userData.twitterHandle || '',
        instagramHandle: userData.instagramHandle || '',
        linkedinHandle: userData.linkedinHandle || '',
        yearlySalesGoal: userData.yearlySalesGoal,
        yearlyEngagementGoal: userData.yearlyEngagementGoal,
      });
    }
  }, [userData, form]);

  const onSubmit = async (data: SettingsFormValues) => {
    if (!user || !firestore) return;
    
    try {
      await saveUserSettings(firestore, user.uid, data);
      toast({
        title: "Settings Saved",
        description: "Your information has been updated successfully.",
      });
    } catch (error) {
      console.error("Failed to save settings:", error);
       toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Could not save your settings. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="bg-gray-950/60 border-white/10 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Globe /> Online Presence</CardTitle>
              <CardDescription>Link your digital properties so our AI can analyze them.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://yourbusiness.com" {...field} className="animated-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="twitterHandle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter / X Handle</FormLabel>
                    <FormControl>
                      <Input placeholder="@yourhandle" {...field} className="animated-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instagramHandle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram Handle</FormLabel>
                    <FormControl>
                      <Input placeholder="@yourhandle" {...field} className="animated-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedinHandle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn Handle</FormLabel>
                    <FormControl>
                      <Input placeholder="yourhandle" {...field} className="animated-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="bg-gray-950/60 border-white/10 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Target /> Business Goals</CardTitle>
              <CardDescription>Set your top-line goals for the year.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
               <FormField
                control={form.control}
                name="yearlySalesGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yearly Sales Goal ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="1000000" {...field} className="animated-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="yearlyEngagementGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yearly Social Engagement Goal</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="50000" {...field} className="animated-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
              <Button type="submit" className="cursor-pointer" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Settings
              </Button>
          </div>
        </form>
      </Form>
      
      <Card className="bg-gray-950/60 border-white/10 text-white">
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><LinkIcon /> Integrations</CardTitle>
            <CardDescription>Connect your accounts to unlock the full power of GrowthOS.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {integrations.map((integration) => (
                    <div key={integration.name} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg">
                        <div className="flex items-center gap-4">
                            <integration.icon className="h-8 w-8 text-white/70" />
                            <div>
                                <p className="font-semibold text-white">{integration.name}</p>
                                <p className="text-xs text-white/50">{integration.category}</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="text-xs border-white/20 hover:bg-white/10 hover:text-white cursor-pointer">Connect</Button>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
