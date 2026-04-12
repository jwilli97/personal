"use client";

import * as React from "react";

import {
    Example,
    ExampleWrapper,
} from "@/components/example";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    IconBrandGithub,
    IconExternalLink,
    IconBrandSpotify,
    IconBrandSoundcloud,
    IconHeadphones,
    IconTool,
} from "@tabler/icons-react";

const devProjects = [
    {
        name: "dpmweb",
        description: "Digital Paradise Media web platform",
        language: "TypeScript",
        url: "https://github.com/jwilli97/dpmweb",
    },
    {
        name: "chi-chi",
        description: "Project built with Go",
        language: "Go",
        url: "https://github.com/jwilli97/chi-chi",
    },
    {
        name: "SnapGPT",
        description: "Resume builder powered by GPT-3",
        language: "Python",
        url: "https://github.com/jwilli97/SnapGPT-hackathon-",
    },
    {
        name: "harvest_scraper",
        description: "Half Baked Harvest recipe scraper",
        language: "Python",
        url: "https://github.com/jwilli97/harvest_scraper",
    },
];

const musicProjects = [
    {
        name: "Digital Paradise Media",
        description: "Digital Paradise Media",
        url: "https://digitalparadisemedia.com",
        icon: <IconBrandSpotify className="size-4" />,
    },
    {
        name: "Song #2",
        description: "Song #2",
        url: "https://song2.digitalparadisemedia.com",
        icon: <IconBrandSoundcloud className="size-4" />,
    },
    {
        name: "Song #3",
        description: "Song #3",
        url: "https://song3.digitalparadisemedia.com",
        icon: <IconBrandSoundcloud className="size-4" />,
    },
];

const makerProjects = [
    {
        name: "Example Project",
        description: "Fusion 360 design / 3D print",
        url: "#",
        type: "CAD",
    },
    // Add more projects here
];

const languageColors: Record<string, string> = {
    "TypeScript": "bg-[#3178c6]",
    "JavaScript": "bg-[#f1e05a]",
    "Python": "bg-[#3572A5]",
    "Go": "bg-[#00ADD8]",
    "Rust": "bg-[#dea584]",
};

export function Showcase() {
    return (
        <ExampleWrapper>
            <DevCard />
            <MusicCard />
            <MakerCard />
        </ExampleWrapper>
    );
}

function DevCard() {
    return (
        <Example title="dev" className="items-stretch justify-start">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <IconBrandGithub className="size-5" />
                        <span>projects</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {devProjects.map((project) => (
                        <a
                            key={project.name}
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block rounded-lg border p-3 transition-colors hover:bg-muted/50"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                                    {project.name}
                                </h3>
                                <IconExternalLink className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                            </div>
                            <p className="text-muted-foreground text-xs mt-1">
                                {project.description}
                            </p>
                            <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                                <span
                                    className={`size-2.5 rounded-full ${languageColors[project.language] || "bg-gray-400"}`}
                                />
                                <span>{project.language}</span>
                            </div>
                        </a>
                    ))}
                </CardContent>
            </Card>
        </Example>
    );
}

function MusicCard() {
    return (
        <Example title="music" className="items-stretch justify-start">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <IconHeadphones className="size-5" />
                        <span>projects</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {musicProjects.map((project) => (
                        <a
                            key={project.name}
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block rounded-lg border p-3 transition-colors hover:bg-muted/50"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground group-hover:text-primary transition-colors">
                                        {project.icon}
                                    </span>
                                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                                        {project.name}
                                    </h3>
                                </div>
                                <IconExternalLink className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                            </div>
                        </a>
                    ))}
                </CardContent>
            </Card>
        </Example>
    );
}

function MakerCard() {
    return (
        <Example title="maker" className="items-stretch justify-start">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <IconTool className="size-5" />
                        <span>builds</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {makerProjects.map((project) => (
                        <a
                            key={project.name}
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block rounded-lg border p-3 transition-colors hover:bg-muted/50"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                                    {project.name}
                                </h3>
                                <IconExternalLink className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                            </div>
                            <p className="text-muted-foreground text-xs mt-1">
                                {project.description}
                            </p>
                            <div className="flex items-center gap-1.5 mt-2">
                                <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                                    {project.type}
                                </span>
                            </div>
                        </a>
                    ))}
                </CardContent>
            </Card>
        </Example>
    );
}
