"use client";

import { Showcase } from "@/components/showcase";
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconMail } from "@tabler/icons-react";


export default function Page() {
    return (
        <div className="flex flex-col">

            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-5xl text-center font-bold text-primary mb-4">jwilli.dev</h1>
                <p className="text-lg text-center text-muted-foreground mb-2">
                    i&apos;m a software engineer and musician.
                </p>
                <div className="flex flex-row gap-4 text-primary/80">
                    <IconBrandGithub className="size-7" />
                    <IconBrandLinkedin className="size-7" />
                    <IconBrandTwitter className="size-7" />
                    <IconMail className="size-7" />
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col animate-bounce text-center font-mono text-lg">
                <span>|</span>
                <span>|</span>
                <span>▼</span>
            </div>

            <Showcase />
        </div>
    );
}
