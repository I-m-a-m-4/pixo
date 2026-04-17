
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUser, useFirestore } from '@/firebase';
import { saveSurveyAnswers } from '@/firebase/users';
import { surveyQuestions } from '@/app/lib/questions';
import { Combobox } from '@/components/ui/combobox';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

const generateSchema = () => {
  const schemaShape: { [key: string]: z.ZodType<any, any> } = {};
  surveyQuestions.forEach(q => {
    let validator: z.ZodString;
    if (q.type === 'combobox') {
      validator = z.string().min(1, { message: 'Please select an industry.' });
    } else {
       validator = z.string().min(1, { message: 'This field is required.' });
    }
     if (q.id === 'websiteUrl' || q.id === 'competitorUrl') {
        validator = validator.url({ message: 'Please enter a valid URL.' });
    }
    schemaShape[q.id] = validator;
  });
  return z.object(schemaShape);
};

const surveySchema = generateSchema();
type SurveyFormValues = z.infer<typeof surveySchema>;

function SurveySkeleton() {
  return (
     <div className="flex h-screen w-full items-center justify-center bg-background auth-bg px-4">
      <Card className="w-full max-w-2xl text-white bg-black/50 backdrop-blur-lg border border-white/10">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex w-full gap-1 pt-4">
            {Array.from({ length: surveyQuestions.length }).map((_, index) => (
              <div key={index} className="h-1.5 flex-1 rounded-full bg-muted/20" />
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 pt-4">
            <div className="space-y-3">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-10 w-full" />
            </div>
             <div className="flex justify-between pt-4">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function SurveyPage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SurveyFormValues>({
    resolver: zodResolver(surveySchema),
    defaultValues: surveyQuestions.reduce((acc, q) => ({ ...acc, [q.id]: '' }), {}),
    mode: 'onChange',
  });

  const onSubmit = async (data: SurveyFormValues) => {
    if (!user || !firestore) return;
    setIsSubmitting(true);
    try {
      await saveSurveyAnswers(firestore, user.uid, data);
      router.push('/dashboard');
    } catch (error) {
      console.error("Survey submission failed:", error);
      setIsSubmitting(false);
      // The global error handler will show the permission error, 
      // but we reset the button state here.
    }
  };

  const handleNext = async () => {
    const fieldName = surveyQuestions[currentStep].id as keyof SurveyFormValues;
    const isValid = await form.trigger(fieldName);
    
    if (isValid) {
      if (currentStep < surveyQuestions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        form.handleSubmit(onSubmit)();
      }
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      // Prevent Enter in textareas from advancing the form
      if ((event.target as HTMLElement).tagName.toLowerCase() !== 'textarea') {
        event.preventDefault(); // Prevent default form submission
        handleNext();
      }
    }
  };

  if (isUserLoading || !user) {
    return <SurveySkeleton />;
  }

  const currentQuestion = surveyQuestions[currentStep];

  const renderInput = (field: any) => {
    switch (currentQuestion.type) {
      case 'select':
        return (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="animated-input">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {(currentQuestion.options as string[]).map((option) => (
                <SelectItem key={option} value={option} className="cursor-pointer">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'combobox':
        return (
          <Combobox
            options={currentQuestion.options as { label: string; value: string }[]}
            value={field.value}
            onChange={field.onChange}
            placeholder="Select your industry..."
            searchPlaceholder="Search industry..."
            emptyPlaceholder="No industry found."
          />
        );
      case 'textarea':
        return <Textarea {...field} placeholder={currentQuestion.placeholder} className="animated-input" rows={4} />;
      default:
        return <Input {...field} placeholder={currentQuestion.placeholder} className="animated-input" />;
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background auth-bg px-4 relative">
       <Link href="/" className="absolute top-8 left-8 text-white hover:text-primary transition-colors cursor-pointer z-20">
        <ArrowLeft className="h-6 w-6" />
        <span className="sr-only">Back to Home</span>
      </Link>
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <Card className="w-full max-w-2xl text-white bg-black/50 backdrop-blur-lg border border-white/10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Tell Us About Your Business</CardTitle>
          <CardDescription className="text-gray-400">This will help us tailor your experience.</CardDescription>
           <div className="flex w-full gap-1 pt-4">
            {surveyQuestions.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  index < currentStep ? 'bg-primary' : 'bg-white/10'
                } ${index === currentStep ? 'bg-primary' : ''}`}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onKeyDown={handleKeyDown} onSubmit={(e) => e.preventDefault()} className="space-y-6 min-h-[170px]">
              <FormField
                key={currentQuestion.id} // Important: This forces re-mount on question change
                control={form.control}
                name={currentQuestion.id as keyof SurveyFormValues}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">{currentQuestion.label}</FormLabel>
                    <FormControl>{renderInput(field)}</FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={handleBack} disabled={currentStep === 0} className="cursor-pointer text-white border-white/20 hover:bg-white/10">
                  Back
                </Button>
                <Button type="button" onClick={handleNext} className="bg-primary hover:bg-primary/90 text-black cursor-pointer" disabled={isSubmitting}>
                  {isSubmitting && currentStep === surveyQuestions.length - 1 ? <Loader2 className="animate-spin" /> : currentStep === surveyQuestions.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
