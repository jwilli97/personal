"use client";

import * as React from "react";

import {
    Example,
    ExampleWrapper,
} from "@/components/example";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    IconBrandGithub,
    IconStar,
    IconGitFork,
    IconExternalLink,
    IconPlayerPlay,
    IconBrandSpotify,
    IconBrandSoundcloud,
    IconBrandApple,
    IconMusic,
    IconHeadphones,
    IconFileText,
} from "@tabler/icons-react";

const devProjects = [
    {
        name: "jwilli.dev",
        description: "My personal website",
        language: "TypeScript",
        url: "https://jwilli.dev",
        icon: <IconBrandGithub />,
    },
    {
        name: "audioviz",
        description: "Customizable audio visualizer",
        language: "TypeScript",
        url: "https://github.com/jwilli97/audioviz",
        icon: <IconMusic />,
    },
    {
        name: "resume helper",
        description: "Resume helper",
        language: "TypeScript",
        url: "https://github.com/jwilli97/resume-helper",
        icon: <IconFileText />,
    },
]

const musicProjects = [
    {
        name: "Digital Paradise Media",
        description: "Digital Paradise Media",
        language: "TypeScript",
        url: "https://digitalparadisemedia.com",
        icon: <IconBrandSpotify />,
    },
    {
        name: "Song #2",
        description: "Song #2",
        language: "TypeScript",
        url: "https://song2.digitalparadisemedia.com",
        icon: <IconBrandSoundcloud />,
    },
    {
        name: "Song #3",
        description: "Song #3",
        language: "TypeScript",
        url: "https://song3.digitalparadisemedia.com",
        icon: <IconBrandSoundcloud />,
    },
]

const languageColors = {
    "TypeScript": "bg-[#3178c6]",
    "JavaScript": "bg-[#f1e05a]",
    "Python": "bg-[#3572A5]",
    "Java": "bg-[#b07219]",
    "C#": "bg-[#178600]",
    "C++": "bg-[#f34b7d]",
    "C": "bg-[#555555]",
    "Ruby": "bg-[#701516]",
    "PHP": "bg-[#4F5D95]",
    "SQL": "bg-[#e38c00]",
    "HTML": "bg-[#e34c26]",
    "CSS": "bg-[#563d7c]",
    "Swift": "bg-[#F05138]",
    "Kotlin": "bg-[#A97BFF]",
    "Go": "bg-[#00ADD8]",
    "Rust": "bg-[#dea584]",
    "Scala": "bg-[#c22d40]",
    "Haskell": "bg-[#5e5086]",
    "Erlang": "bg-[#B83998]",
}

export function Showcase() {
    return (
        <ExampleWrapper>
            <CodeCard />
            <MusicCard />
        </ExampleWrapper>
    )
}

function CodeCard() {
    return (
        <Example title="dev" className="items-stretch justify-start">
            <Card className="w=full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <IconBrandGithub className="size-5"/>
                        <span>github projects</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {devProjects.map((project) => (
                        <div key={project.name} className="group rounded-lg border p-4 transition-colors hover:bg-muted/50">
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{project.name}</h3>
                                <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                    <IconExternalLink className="size-4" />
                                </a>
                            </div>
                            <p className="text-muted-foreground text-xs mt-1">{project.description}</p>
                            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                                <span className="flex items-center gap-4 mt-3 text-xs font-muted-foreground">
                                    <span className={`size-2.5 rounded-full ${languageColors[project.language as keyof typeof languageColors] || "bg-gray-400"}`} />
                                    <span>{project.language}</span>
                                </span>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </Example>
    )
}

function MusicCard() {
    return (
        <Example title="music" className="items-stretch justify-start">
            <Card className="w=full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <IconHeadphones className="size-5"/>
                        <span>music projects</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {musicProjects.map((project) => (
                        <div key={project.name} className="group rounded-lg border p-4 transition-colors hover:bg-muted/50">
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{project.name}</h3>
                                <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                                    <IconExternalLink className="size-4" />
                                </a>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </Example>
    )
}
