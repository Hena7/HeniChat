"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      {/* Navbar */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            <MessageCircle className="h-6 w-6 text-primary" />
            HeniChat
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link
              href="#features"
              className="hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="#about"
              className="hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="https://github.com/Hena7/HeniChat"
              target="_blank"
              className="hover:text-primary transition-colors"
            >
              GitHub
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setTheme("dark")}>
              Dark
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setTheme("light")}>
              Light
            </Button>
            <Link href="/login">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="max-w-3xl mx-auto space-y-8"
            >
              <motion.div
                variants={item}
                className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-background/50 backdrop-blur-sm"
              >
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                v1.0 is now live
              </motion.div>

              <motion.h1
                variants={item}
                className="text-5xl md:text-7xl font-bold tracking-tight"
              >
                Connect with anyone, <br />
                <span className="bg-gradient-to-r from-primary via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  anywhere, anytime.
                </span>
              </motion.h1>

              <motion.p
                variants={item}
                className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              >
                Experience the next generation of messaging. Fast, secure, and
                beautifully designed for the modern web.
              </motion.p>

              <motion.div
                variants={item}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
              >
                <Link href="/login">
                  <Button
                    size="lg"
                    className="h-12 px-8 text-base rounded-full group"
                  >
                    Start Chatting Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="https://github.com/Hena7/HeniChat" target="_blank">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-8 text-base rounded-full"
                  >
                    View on GitHub
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Floating Chat UI Preview */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-20 relative max-w-4xl mx-auto"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur opacity-20"></div>
              <div className="relative rounded-2xl border bg-background shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 border-b bg-muted/50 p-4">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mx-auto text-xs font-medium text-muted-foreground">
                    HeniChat - Premium Messenger
                  </div>
                </div>
                <div className="grid md:grid-cols-[280px_1fr] h-[400px]">
                  <div className="border-r bg-muted/10 p-4 hidden md:block">
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-muted animate-pulse"></div>
                          <div className="space-y-2 flex-1">
                            <div className="h-3 w-20 bg-muted rounded animate-pulse"></div>
                            <div className="h-2 w-full bg-muted rounded animate-pulse"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col justify-between bg-background">
                    <div className="space-y-4">
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%]">
                          <p className="text-sm">
                            Hey! Have you tried the new HeniChat app? 🚀
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-none px-4 py-2 max-w-[80%]">
                          <p className="text-sm">
                            Yeah! The UI is absolutely stunning. Love the dark
                            mode! 🌙
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%]">
                          <p className="text-sm">
                            And it's super fast too. The animations are smooth
                            as butter.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="h-10 w-full bg-muted/50 rounded-full border flex items-center px-4 text-sm text-muted-foreground">
                        Type a message...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Everything you need</h2>
              <p className="text-muted-foreground">
                Built with the latest technology to ensure the best possible
                experience.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Zap className="h-10 w-10 text-yellow-500" />}
                title="Lightning Fast"
                description="Powered by Next.js 14 and Firestore for real-time message delivery with zero latency."
              />
              <FeatureCard
                icon={<Shield className="h-10 w-10 text-green-500" />}
                title="Secure & Private"
                description="Your conversations are private. We prioritize security and data protection."
              />
              <FeatureCard
                icon={<Globe className="h-10 w-10 text-blue-500" />}
                title="Cross Platform"
                description="Works seamlessly on desktop, tablet, and mobile devices with a responsive design."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-lg">
            <MessageCircle className="h-5 w-5 text-primary" />
            HeniChat
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 HeniChat. Built by Henock M.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="hover:text-foreground">
              Twitter
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-background p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4 bg-muted/50 w-fit p-3 rounded-xl">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
