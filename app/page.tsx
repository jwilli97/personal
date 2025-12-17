"use client";

import { Showcase } from "@/components/showcase";
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconMail } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function Page() {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="flex flex-col bg-background min-h-screen">
            {mounted && (
                <>
                    <div className="flex flex-col items-center justify-center min-h-screen">
                        <h1 className="text-5xl text-center font-bold text-primary mb-4 animate-in fade-in duration-700 fill-mode-backwards">
                            jwilli.dev
                        </h1>
                        <p className="text-lg text-center text-muted-foreground mb-2 animate-in fade-in duration-700 delay-200 fill-mode-backwards">
                            i&apos;m a software engineer and musician.
                        </p>
                        <div className="flex flex-row gap-4 text-primary/80 animate-in fade-in duration-700 delay-400 fill-mode-backwards">
                            <IconBrandGithub className="size-7" />
                            <IconBrandLinkedin className="size-7" />
                            <IconBrandTwitter className="size-7" />
                            <IconMail className="size-7" />
                        </div>
                    </div>

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col text-center font-mono text-lg animate-in fade-in duration-700 delay-700 fill-mode-backwards">
                        <div className="animate-bounce">
                            <span className="block">|</span>
                            <span className="block">|</span>
                            <span className="block">▼</span>
                        </div>
                    </div>

                    <Showcase />
                </>
            )}
        </div>
    );
}
