"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
    IconArrowUpRight,
    IconCode,
    IconLock,
} from "@tabler/icons-react";
import type { Project } from "@/lib/projects";
import { getLanguageColor } from "@/lib/language-colors";

// =============================================================================
// ANIMATION
// =============================================================================

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

const hoverLift = {
    y: -4,
    scale: 1.01,
    transition: { duration: 0.25, ease: "easeOut" as const },
};

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
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: smoothEase,
        },
    },
};

// =============================================================================
// CARDS
// =============================================================================

function FeaturedCard({ project }: { project: Project }) {
    return (
        <motion.a
            href={`/projects/${project.slug}`}
            variants={itemVariants}
            whileHover={hoverLift}
            className="group relative md:col-span-2 row-span-2 border border-primary/20 hover:border-primary/40 bg-primary/[0.02] hover:bg-primary/[0.04] transition-colors duration-300"
        >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="h-full min-h-[340px] p-8 flex flex-col justify-between">
                <div>
                    <div className="flex items-start justify-between mb-10">
                        <span className="text-[11px] font-mono text-primary/70 tracking-wider uppercase">
                            featured
                        </span>
                        <IconArrowUpRight className="size-5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>

                    <h3 className="text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                        {project.name}
                    </h3>
                    <p className="text-muted-foreground text-base mb-4">
                        {project.tagline}
                    </p>
                    <p className="text-muted-foreground/60 text-sm max-w-md leading-relaxed line-clamp-3">
                        {project.description.split("\n\n")[0]}
                    </p>
                </div>

                <div className="flex items-center gap-6 mt-8 flex-wrap">
                    <div className="flex gap-3 flex-wrap">
                        {project.tech.map((tech) => (
                            <span
                                key={tech}
                                className="text-xs font-mono text-primary/60"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                    {project.highlight && (
                        <span className="text-xs font-mono text-muted-foreground/40">
                            {project.highlight}
                        </span>
                    )}
                </div>
            </div>
        </motion.a>
    );
}

function ProjectCard({ project }: { project: Project }) {
    const colors = getLanguageColor(project.language);
    const isPrivate = project.status === "private" || !project.url;

    return (
        <motion.a
            href={`/projects/${project.slug}`}
            variants={itemVariants}
            whileHover={hoverLift}
            className={`group relative border border-border/50 ${colors.border} ${colors.bg} transition-colors duration-300`}
        >
            <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: colors.accent }}
            />

            <div className="h-full min-h-[160px] p-6 flex flex-col justify-between">
                <div>
                    <div className="flex items-start justify-between mb-4">
                        {isPrivate ? (
                            <IconLock
                                className="size-4 opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ color: colors.accent }}
                            />
                        ) : (
                            <IconCode
                                className="size-4 opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ color: colors.accent }}
                            />
                        )}
                        <IconArrowUpRight className="size-4 text-muted-foreground/20 group-hover:text-foreground/60 transition-colors duration-300" />
                    </div>
                    <h4
                        className="text-base font-medium text-foreground transition-colors duration-300"
                        style={{ "--lang-color": colors.accent } as React.CSSProperties}
                    >
                        <span className="group-hover:text-[var(--lang-color)]">{project.name}</span>
                    </h4>
                    <p className="text-sm text-muted-foreground/60 mt-2 line-clamp-2">
                        {project.tagline}
                    </p>
                </div>

                <div className="flex items-center gap-2 mt-4">
                    {project.language && (
                        <>
                            <span
                                className="size-2 rounded-full transition-transform duration-300 group-hover:scale-125"
                                style={{ backgroundColor: colors.accent }}
                            />
                            <span
                                className="text-xs font-mono transition-colors duration-300 text-muted-foreground/50 group-hover:text-[var(--lang-color)]"
                                style={{ "--lang-color": colors.accent } as React.CSSProperties}
                            >
                                {project.language}
                            </span>
                        </>
                    )}
                    {project.highlight && (
                        <span className="ml-auto text-[10px] font-mono uppercase tracking-wider text-muted-foreground/40">
                            {project.highlight}
                        </span>
                    )}
                </div>
            </div>
        </motion.a>
    );
}

// =============================================================================
// GRID
// =============================================================================

export function ProjectGrid({ projects }: { projects: Project[] }) {
    const featured = projects.find((p) => p.tier === 1);
    const rest = projects.filter((p) => p.slug !== featured?.slug);

    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            {featured && <FeaturedCard project={featured} />}
            {rest.map((p) => (
                <ProjectCard key={p.slug} project={p} />
            ))}
        </motion.div>
    );
}
