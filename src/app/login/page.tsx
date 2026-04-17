
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useAuth, useUser } from '@/firebase';
import { initiateEmailSignIn } from '@/firebase/non-blocking-login';
import Link from 'next/link';
import { Leaf, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginSkeleton() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background auth-bg px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Skeleton className="h-8 w-32 mx-auto mb-4" />
          <Skeleton className="h-6 w-48 mx-auto" />
          <Skeleton className="h-4 w-64 mx-auto mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-48 mx-auto mt-2" />
        </CardContent>
      </Card>
    </div>
  );
}


export default function LoginPage() {
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const onSubmit = (data: LoginFormValues) => {
    if (!auth) return;
    initiateEmailSignIn(auth, data.email, data.password);
  };

  if (isUserLoading || user) {
    return <LoginSkeleton />;
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background auth-bg px-4 relative">
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <Card className="w-full max-w-md text-white bg-black/50 backdrop-blur-lg border border-white/10">
        <CardHeader className="text-center">
            <Link href="/" className="flex items-center justify-center gap-2 mb-4 cursor-pointer">
                <Leaf className="text-primary h-8 w-8" />
                <span className="text-2xl font-bold tracking-tighter text-white font-display">
                    GrowthOS
                </span>
            </Link>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription className="text-gray-400">
            Sign in to access your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} className="animated-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" {...field} className="animated-input pr-10" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute inset-y-0 right-0 h-full px-3 text-gray-400 hover:text-white"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-black cursor-pointer" disabled={form.formState.isSubmitting}>
                 {form.formState.isSubmitting ? <Loader2 className="animate-spin" /> : 'Login'}
              </Button>
            </form>
          </Form>
           <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline text-primary cursor-pointer">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
