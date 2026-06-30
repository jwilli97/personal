"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconMail,
} from "@tabler/icons-react";
import { ContributionGridMinimal } from "@/components/contribution-grid-minimal";
import { Button } from "@/components/ui/button";

type ContributionDay = {
  date: string;
  count: number;
};

type ContributionData = {
  contributions: ContributionDay[];
  totalContributions: number;
  usernames: string[];
};

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: smoothEase },
  },
};

const iconHover = {
  y: -3,
  scale: 1.08,
  transition: { duration: 0.2, ease: "easeOut" as const },
};

export function HomePageClient({
  now,
  contributionData,
}: {
  now: string[];
  contributionData: ContributionData;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 sm:px-8 py-16">
      <div className="w-full flex justify-center">
        <motion.div
          className="flex flex-col md:flex-row md:items-center gap-12 md:gap-14 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col gap-8">
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl sm:text-6xl font-bold text-primary tracking-tight">
                joseph williams
              </h1>
              <p className="mt-2 font-mono text-sm text-muted-foreground/60 tracking-wide">
                jwilli.dev
              </p>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed"
            >
              engineer and musician based in austin.
            </motion.p>

            <motion.div variants={itemVariants} className="font-mono text-sm space-y-1">
              <div className="text-muted-foreground/50">
                <span className="text-primary/70">$</span> now
              </div>
              {now.map((line) => (
                <div key={line} className="text-muted-foreground/80 pl-4">
                  <span className="text-primary/40">&gt;</span> {line}
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-row gap-4 text-primary/70 pt-2"
            >
              <motion.a
                href="https://github.com/jwilli97"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="github"
                whileHover={iconHover}
                className="hover:text-primary transition-colors"
              >
                <IconBrandGithub className="size-6" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/jwilli97"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="linkedin"
                whileHover={iconHover}
                className="hover:text-primary transition-colors"
              >
                <IconBrandLinkedin className="size-6" />
              </motion.a>
              <motion.a
                href="https://twitter.com/jwilli97"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="twitter"
                whileHover={iconHover}
                className="hover:text-primary transition-colors"
              >
                <IconBrandTwitter className="size-6" />
              </motion.a>
              <motion.a
                href="mailto:hi@jwilli.dev"
                aria-label="email"
                whileHover={iconHover}
                className="hover:text-primary transition-colors"
              >
                <IconMail className="size-6" />
              </motion.a>
            </motion.div>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <div className="flex flex-col gap-4 w-full md:w-fit">
              <motion.div variants={itemVariants} className="w-full">
                <ContributionGridMinimal initialData={contributionData} />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="w-full flex gap-3 font-mono"
              >
                <Button asChild variant="outline" size="lg" className="flex-1">
                  <Link href="/projects">projects</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="flex-1">
                  <Link href="/music">music</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
