'use client';
import {
  Trophy,
  ArrowRight,
  Users,
  Award,
  BrainCircuit,
  Blocks,
  Infinity,
  ShieldCheck,
  Database,
  Cpu,
  Bot,
  Cloud,
  Activity,
  FileBarChart2,
  Sparkles,
  TrendingUp,
  Lock,
  GitMerge,
  Glasses,
  ArrowDownRight,
  BarChart3,
  CheckCircle2,
  Zap,
  Leaf,
  Menu,
  Palette,
} from 'lucide-react';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

export default function Home() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    
    // Cleanup function for the observer
    return () => {
      document.querySelectorAll('.reveal').forEach((el) => {
        try {
          observer.unobserve(el);
        } catch(e) {
          // ignore error if element is already unobserved
        }
      });
    };
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <Palette className="text-primary" />
            <span className="text-lg font-semibold tracking-tighter text-white font-display">
              Pixo
            </span>
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#strategy" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              Strategy
            </a>
            <a href="#solutions" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              Solutions
            </a>
            <a href="#contact" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              Contact
            </a>
            <div className="flex items-center gap-2">
                <Link href="/login" className="h-9 px-4 rounded-full bg-transparent text-white border border-white/20 text-xs font-medium hover:bg-white/5 transition-all flex items-center justify-center cursor-pointer">
                  Login
                </Link>
                <Link href="/signup" className="h-9 px-4 rounded-full bg-primary text-black text-xs font-medium hover:bg-primary/90 transition-all flex items-center justify-center cursor-pointer">
                  Sign Up
                </Link>
            </div>
          </div>
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 cursor-pointer"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="bg-background/90 border-b-white/10 text-white pt-16">
                 <SheetHeader>
                   <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                </SheetHeader>
                <div className="grid gap-6 text-center text-lg font-medium">
                  <SheetClose asChild>
                    <a
                      href="#strategy"
                      className="hover:text-primary transition-colors cursor-pointer"
                    >
                      Strategy
                    </a>
                  </SheetClose>
                  <SheetClose asChild>
                    <a
                      href="#solutions"
                      className="hover:text-primary transition-colors cursor-pointer"
                    >
                      Solutions
                    </a>
                  </SheetClose>
                  <SheetClose asChild>
                    <a
                      href="#contact"
                      className="hover:text-primary transition-colors cursor-pointer"
                    >
                      Contact
                    </a>
                  </SheetClose>
                  <div className="flex flex-col items-center gap-4 mt-4">
                     <SheetClose asChild>
                        <Link href="/login" className="w-full h-11 px-6 rounded-full bg-transparent text-white border border-white/20 text-sm font-medium hover:bg-white/5 transition-all flex items-center justify-center cursor-pointer">
                            Login
                        </Link>
                     </SheetClose>
                      <SheetClose asChild>
                        <Link href="/signup" className="w-full h-11 px-6 rounded-full bg-primary text-black text-sm font-medium hover:bg-primary/90 transition-all flex items-center justify-center cursor-pointer">
                            Sign Up
                        </Link>
                      </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Page 1: Hero Section */}
      <section className="md:pt-48 md:pb-32 pt-32 pr-6 pb-20 pl-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute inset-0 bg-grid -z-10"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="reveal inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 mb-8">
            <Sparkles className="text-primary/80 text-xs" />
            <span className="text-xs font-medium text-primary/70 tracking-wide uppercase">
              Open-Source Graphic Design Studio
            </span>
          </div>

          <h1 className="reveal delay-100 md:text-7xl leading-[1.1] text-5xl text-white tracking-tight mb-6 font-display font-medium">
            The Open Alternative to Canva
          </h1>

          <p className="reveal delay-200 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Don&apos;t just generate pixels. Manipulate designs. Pixo uses AI tool-calling to build, edit, and optimize your creative assets locally and transparently.
          </p>

          <div className="reveal delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="h-10 px-6 rounded-full bg-white text-black text-sm font-medium hover:bg-gray-200 transition-all flex items-center gap-2 cursor-pointer">
              Get Started Free
              <ArrowRight className="text-black" />
            </Link>
          </div>
        </div>

        <div className="reveal delay-400 mt-24 pt-8 border-t border-white/5 max-w-5xl mx-auto">
          <p className="text-center text-xs text-gray-500 mb-8 uppercase tracking-widest font-medium">
            Trusted by the next generation of builders
          </p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-xl font-bold tracking-tighter text-white font-display cursor-pointer">
              Bench
            </span>
            <span className="text-xl font-serif italic text-white cursor-pointer">
              armoire
            </span>
            <span className="text-xl font-bold tracking-tight text-white uppercase font-display cursor-pointer">
              PROVEN
            </span>
            <span className="text-xl font-semibold tracking-wide text-white font-display cursor-pointer">
              Glossier.
            </span>
          </div>
        </div>
      </section>

      {/* Page 1.5: Introduction */}
      <section id="strategy" className="py-24 px-6 border-b border-white/5 bg-surface/30 scroll-mt-16">
        <div className="max-w-3xl mx-auto text-center reveal">
          <h2 className="text-3xl md:text-4xl tracking-tight text-white mb-6 font-display font-medium">
            Design at the Speed of Thought
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Pixo isn&apos;t just another design tool. It&apos;s a platform where AI agents collaborate with you on the canvas. Instead of static diffusion outputs, we focus on functional tool-calling that keeps every layer editable and every design professional.
          </p>
        </div>
      </section>

      {/* Page 2: Why GrowthOS? */}
      <section className="pt-24 pr-6 pb-24 pl-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 reveal">
            <h2 className="text-3xl text-white tracking-tight mb-4 font-display font-medium">
              Why GrowthOS?
            </h2>
            <div className="flex gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Users className="text-primary" />
                <span>100+ AI Experts</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="text-primary" />
                <span>50+ Google Cloud Certifications</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="reveal delay-100 glass-card p-6 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-gray-900 border border-white/10 flex items-center justify-center mb-4 text-blue-400 group-hover:scale-110 transition-transform">
                <BrainCircuit width="20" />
              </div>
              <h3 className="text-sm font-medium text-white mb-2">
                Proven AI Expertise
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Decades of combined AI knowledge applied to real-world problems.
              </p>
            </div>

            <div className="reveal delay-200 glass-card p-6 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-gray-900 border border-white/10 flex items-center justify-center mb-4 text-pink-400 group-hover:scale-110 transition-transform">
                <Blocks width="20" />
              </div>
              <h3 className="text-sm font-medium text-white mb-2">
                Tailored Solutions
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Custom AI architectures designed for your specific business
                challenges.
              </p>
            </div>

            <div className="reveal delay-300 glass-card p-6 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-gray-900 border border-white/10 flex items-center justify-center mb-4 text-purple-400 group-hover:scale-110 transition-transform">
                <Infinity width="20" />
              </div>
              <h3 className="text-sm font-medium text-white mb-2">
                End-to-End Delivery
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Comprehensive support from strategy to implementation and
                maintenance.
              </p>
            </div>

            <div className="reveal delay-400 glass-card p-6 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-gray-900 border border-white/10 flex items-center justify-center mb-4 text-green-400 group-hover:scale-110 transition-transform">
                <ShieldCheck width="20" />
              </div>
              <h3 className="text-sm font-medium text-white mb-2">
                Secure Infrastructure
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Reliable, flexible, and enterprise-grade secure AI
                environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Page 3: How We Work (Flow Animation) */}
      <section className="border-y bg-gray-950 border-white/5 pt-24 pr-6 pb-24 pl-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal text-xs font-semibold tracking-widest text-gray-500 uppercase mb-16">
            How It Works
          </h2>

          <div className="relative grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-0">
            <div className="hidden md:block absolute top-6 left-0 w-full h-[1px] bg-white/10 -z-10"></div>
            <div className="hidden md:block absolute top-6 left-0 w-full h-[1px] animated-line-h animate-flow-h -z-10"></div>

            <div className="relative group reveal delay-100">
              <div className="w-12 h-12 rounded-full bg-gray-900 border border-white/20 flex items-center justify-center mx-auto md:ml-0 mb-4 z-10 relative shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:border-primary group-hover:shadow-[0_0_20px_hsl(var(--primary)_/_0.5)] transition-all duration-300">
                <span className="text-xs font-mono text-gray-300">01</span>
              </div>
              <h3 className="text-sm font-medium text-white mb-1 md:pr-4">
                Discover
              </h3>
              <p className="text-xs text-gray-500">
                Requirements &amp; Analysis
              </p>
            </div>

            <div className="relative group reveal delay-200">
              <div className="w-12 h-12 rounded-full bg-gray-900 border border-white/20 flex items-center justify-center mx-auto md:ml-0 mb-4 z-10 relative group-hover:border-primary group-hover:shadow-[0_0_20px_hsl(var(--primary)_/_0.5)] transition-all duration-300">
                <span className="text-xs font-mono text-gray-300">02</span>
              </div>
              <h3 className="text-sm font-medium text-white mb-1 md:pr-4">
                Prototype
              </h3>
              <p className="text-xs text-gray-500">Design &amp; Feasibility</p>
            </div>

            <div className="relative group reveal delay-300">
              <div className="w-12 h-12 rounded-full bg-gray-900 border border-white/20 flex items-center justify-center mx-auto md:ml-0 mb-4 z-10 relative group-hover:border-primary group-hover:shadow-[0_0_20px_hsl(var(--primary)_/_0.5)] transition-all duration-300">
                <span className="text-xs font-mono text-gray-300">03</span>
              </div>
              <h3 className="text-sm font-medium text-white mb-1 md:pr-4">
                Build
              </h3>
              <p className="text-xs text-gray-500">Model Training</p>
            </div>

            <div className="relative group reveal delay-400">
              <div className="w-12 h-12 rounded-full bg-gray-900 border border-white/20 flex items-center justify-center mx-auto md:ml-0 mb-4 z-10 relative group-hover:border-primary group-hover:shadow-[0_0_20px_hsl(var(--primary)_/_0.5)] transition-all duration-300">
                <span className="text-xs font-mono text-gray-300">04</span>
              </div>
              <h3 className="text-sm font-medium text-white mb-1 md:pr-4">
                Deploy
              </h3>
              <p className="text-xs text-gray-500">Launch &amp; Optimize</p>
            </div>

            <div className="relative group reveal delay-500">
              <div className="w-12 h-12 rounded-full bg-gray-900 border border-white/20 flex items-center justify-center mx-auto md:ml-0 mb-4 z-10 relative group-hover:border-primary group-hover:shadow-[0_0_20px_hsl(var(--primary)_/_0.5)] transition-all duration-300">
                <span className="text-xs font-mono text-gray-300">05</span>
              </div>
              <h3 className="text-sm font-medium text-white mb-1 md:pr-4">
                Scale
              </h3>
              <p className="text-xs text-gray-500">Growth Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Page 4: Workflow - Behind the Scenes */}
      <section id="solutions" className="py-24 px-6 overflow-hidden scroll-mt-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="reveal text-3xl tracking-tight text-center text-white mb-16 font-display font-medium">
            Behind the Scenes Workflow
          </h2>

          <div className="relative flex flex-col items-center gap-12">
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2 -z-10"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] animated-line-v animate-flow-v -translate-x-1/2 -z-10 opacity-70"></div>

            <div className="reveal delay-100 relative glass-card px-8 py-4 rounded-lg border border-blue-500/20 shadow-[0_0_30px_-10px_rgba(99,102,241,0.2)] w-64 text-center cursor-pointer">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-950 px-2 text-[10px] text-blue-400 uppercase tracking-wider">
                Step 1
              </div>
              <Database className="text-gray-300 mb-2 mx-auto" width="20" />
              <div className="text-sm font-medium text-white">
                Data Ingestion
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Collection &amp; Cleaning
              </div>
            </div>

            <div className="reveal delay-200 relative glass-card px-8 py-4 rounded-lg border border-pink-500/20 w-64 text-center cursor-pointer">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-950 px-2 text-[10px] text-pink-400 uppercase tracking-wider">
                Step 2
              </div>
              <Cpu className="text-gray-300 mb-2 mx-auto" width="20" />
              <div className="text-sm font-medium text-white">
                Model Development
              </div>
              <div className="text-xs text-gray-500 mt-1">
                NLP, CV &amp; Predictive
              </div>
            </div>

            <div className="reveal delay-300 flex gap-8 md:gap-16">
              <div className="relative glass-card px-6 py-4 rounded-lg border border-white/10 w-48 text-center bg-gray-900/80 cursor-pointer">
                <Bot className="text-gray-300 mb-2 mx-auto" width="20" />
                <div className="text-sm font-medium text-white">AI Agents</div>
              </div>
              <div className="relative glass-card px-6 py-4 rounded-lg border border-white/10 w-48 text-center bg-gray-900/80 cursor-pointer">
                <Cloud className="text-gray-300 mb-2 mx-auto" width="20" />
                <div className="text-sm font-medium text-white">
                  Cloud Deployment
                </div>
              </div>
            </div>

            <div className="reveal delay-400 relative glass-card px-8 py-4 rounded-lg border border-purple-500/20 w-64 text-center cursor-pointer">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-950 px-2 text-[10px] text-purple-400 uppercase tracking-wider">
                Outcome
              </div>
              <Activity className="text-gray-300 mb-2 mx-auto" width="20" />
              <div className="text-sm font-medium text-white">Optimization</div>
              <div className="text-xs text-gray-500 mt-1">
                Monitoring &amp; Scale
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Page 5: Capabilities */}
      <section className="py-24 px-6 bg-surface/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal text-3xl tracking-tight text-white mb-12 font-display font-medium">
            Our Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-lg overflow-hidden">
            <div className="reveal delay-100 bg-gray-950 p-8 hover:bg-gray-900 transition-colors cursor-pointer">
              <FileBarChart2 className="text-gray-400 mb-4" width="24" />
              <h3 className="text-sm font-medium text-white mb-2">
                Data Strategy
              </h3>
              <p className="text-xs text-gray-500">
                Governance &amp; Architecture
              </p>
            </div>

            <div className="reveal delay-100 bg-gray-950 p-8 hover:bg-gray-900 transition-colors cursor-pointer">
              <Sparkles className="text-gray-400 mb-4" width="24" />
              <h3 className="text-sm font-medium text-white mb-2">
                Generative AI
              </h3>
              <p className="text-xs text-gray-500">
                LLM Integration &amp; Fine-tuning
              </p>
            </div>

            <div className="reveal delay-200 bg-gray-950 p-8 hover:bg-gray-900 transition-colors cursor-pointer">
              <TrendingUp className="text-gray-400 mb-4" width="24" />
              <h3 className="text-sm font-medium text-white mb-2">
                Predictive Modeling
              </h3>
              <p className="text-xs text-gray-500">
                Forecasting &amp; Analytics
              </p>
            </div>

            <div className="reveal delay-200 bg-gray-950 p-8 hover:bg-gray-900 transition-colors cursor-pointer">
              <Lock className="text-gray-400 mb-4" width="24" />
              <h3 className="text-sm font-medium text-white mb-2">
                Secure Cloud
              </h3>
              <p className="text-xs text-gray-500">Enterprise Deployment</p>
            </div>

            <div className="reveal delay-300 bg-gray-950 p-8 hover:bg-gray-900 transition-colors cursor-pointer">
              <GitMerge className="text-gray-400 mb-4" width="24" />
              <h3 className="text-sm font-medium text-white mb-2">
                MLOps Pipelines
              </h3>
              <p className="text-xs text-gray-500">DevOps for AI</p>
            </div>

            <div className="reveal delay-300 bg-gray-950 p-8 hover:bg-gray-900 transition-colors cursor-pointer">
              <Glasses className="text-gray-400 mb-4" width="24" />
              <h3 className="text-sm font-medium text-white mb-2">
                Computer Vision
              </h3>
              <p className="text-xs text-gray-500">Image Analysis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Page 6: Cloud Partner */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 to-black pointer-events-none"></div>
        <div className="reveal max-w-4xl mx-auto glass-card rounded-2xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none animate-pulse-slow"></div>

          <div className="flex justify-center mb-8 gap-4 items-center">
            <div className="flex flex-col items-start">
              <span className="text-2xl tracking-tight text-white mb-1 font-display font-medium">
                Google Cloud
              </span>
              <div className="h-0.5 w-8 bg-primary"></div>
            </div>
            <div className="h-8 w-[1px] bg-white/20"></div>
            <div className="text-left">
              <div className="text-xs font-semibold text-white uppercase tracking-wider">
                Partner Network
              </div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest">
                Advanced Tier Services
              </div>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl tracking-tight text-white mb-6 font-display font-medium">
            Google Cloud AI/ML Certified Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-black/40 p-4 rounded border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                <h4 className="text-sm font-medium text-white">
                  Certified Experts
                </h4>
              </div>
              <p className="text-xs text-gray-500">
                Google Cloud AI/ML certified engineers managing your
                infrastructure.
              </p>
            </div>
            <div className="bg-black/40 p-4 rounded border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                <h4 className="text-sm font-medium text-white">
                  Advanced Tier
                </h4>
              </div>
              <p className="text-xs text-gray-500">
                Recognized for deep technical expertise and customer success.
              </p>
            </div>
            <div className="bg-black/40 p-4 rounded border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                <h4 className="text-sm font-medium text-white">Secure Ops</h4>
              </div>
              <p className="text-xs text-gray-500">
                Enterprise-grade security architecture following Well-Architected
                Framework.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 flex justify-center">
            <span className="px-3 py-1 rounded bg-white/5 text-xs text-gray-300 font-mono">
              gcp CERTIFIED
            </span>
          </div>
        </div>
      </section>

      {/* Page 7: ROI */}
      <section className="py-24 px-6 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal text-xs font-semibold tracking-widest text-gray-500 uppercase mb-12 text-center">
            How We Deliver ROI
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="reveal delay-100 text-center group">
              <div className="w-16 h-16 mx-auto rounded-full bg-surface border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <ArrowDownRight
                  className="text-purple-400"
                  width="24"
                />
              </div>
              <h3 className="text-2xl text-white tracking-tight mb-1 font-display font-medium">
                40%
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                Cost Reduction
              </p>
            </div>

            <div className="reveal delay-200 text-center group">
              <div className="w-16 h-16 mx-auto rounded-full bg-surface border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="text-blue-400" width="24" />
              </div>
              <h3 className="text-2xl text-white tracking-tight mb-1 font-display font-medium">
                2.5x
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                Increased Revenue
              </p>
            </div>

            <div className="reveal delay-300 text-center group">
              <div className="w-16 h-16 mx-auto rounded-full bg-surface border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle2
                  className="text-purple-400"
                  width="24"
                />
              </div>
              <h3 className="text-2xl text-white tracking-tight mb-1 font-display font-medium">
                99%
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                Enhanced Quality
              </p>
            </div>

            <div className="reveal delay-400 text-center group">
              <div className="w-16 h-16 mx-auto rounded-full bg-surface border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="text-purple-400" width="24" />
              </div>
              <h3 className="text-2xl text-white tracking-tight mb-1 font-display font-medium">
                3x
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                Faster Deployment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Page 8: Footer & Newsletter */}
      <footer id="contact" className="pt-24 pb-12 px-6 bg-black scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="reveal flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-8">
            <div>
              <h2 className="text-3xl tracking-tight text-white mb-2 font-display font-medium">
                Join 10,000+ AI leaders
              </h2>
              <p className="text-gray-500 text-sm">
                Get the latest strategies delivered to your inbox.
              </p>
            </div>
            <form className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="animated-input px-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none w-full md:w-64 rounded-lg"
              />
              <button type="submit" className="bg-white text-black text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                Subscribe
              </button>
            </form>
          </div>

          <div className="reveal delay-100 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/10 pt-16">
            <div className="col-span-2 md:col-span-1">
              <span className="text-lg font-semibold tracking-tighter text-white block mb-4 font-display">
                Pixo
              </span>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                The Open-Source Graphic Design Studio.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
                Company
              </h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-white transition-colors cursor-pointer">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors cursor-pointer">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors cursor-pointer">
                    Resources
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
                Services
              </h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-white transition-colors cursor-pointer">
                    Strategy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors cursor-pointer">
                    Agent Studio
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors cursor-pointer">
                    Cloud Partnership
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
                Resources
              </h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-white transition-colors cursor-pointer">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors cursor-pointer">
                    Webinars
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors cursor-pointer">
                    Whitepapers
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="reveal delay-200 mt-16 pt-8 border-t border-white/5 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-700">
            <p>© 2026 Pixo. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-500 cursor-pointer">
                Privacy
              </a>
              <a href="#" className="hover:text-gray-500 cursor-pointer">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
