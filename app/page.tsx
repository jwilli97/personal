import { Showcase } from "@/components/showcase";
import { ContributionGridMinimal } from "@/components/contribution-grid-minimal";
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconMail } from "@tabler/icons-react";

export default function Page() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <div className="relative flex flex-col items-center min-h-screen px-4">
                {/* Hero content - centered in upper area */}
                <div className="flex flex-col items-center justify-center flex-1 pb-40">
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

                {/* Grid + Arrow - positioned at bottom */}
                <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-8">
                    <div className="w-full max-w-4xl px-4 mb-24 animate-in fade-in duration-700 delay-500 fill-mode-backwards">
                        <ContributionGridMinimal />
                    </div>
                    <div className="flex flex-col text-center font-mono text-lg animate-in fade-in duration-700 delay-700 fill-mode-backwards">
                        <div className="animate-bounce">
                            <span className="block">|</span>
                            <span className="block">|</span>
                            <span className="block">▼</span>
                        </div>
                    </div>
                </div>
            </div>

            <Showcase />
        </div>
    );
}
