// Language → accent color mapping. Used by project cards, case study headers,
// and anywhere we want a small per-language signal (the "dot").
//
// Colors are GitHub's linguist palette where reasonable, picked for
// recognizability rather than aesthetic. If a language is missing, the
// `default` fallback is used.

export type LanguageColor = {
  bg: string;
  text: string;
  border: string;
  accent: string;
};

export const languageColors: Record<string, LanguageColor> = {
  TypeScript: {
    bg: "hover:bg-[#3178c6]/[0.03]",
    text: "text-[#3178c6]",
    border: "hover:border-[#3178c6]/30",
    accent: "#3178c6",
  },
  JavaScript: {
    bg: "hover:bg-[#f1e05a]/[0.03]",
    text: "text-[#f1e05a]",
    border: "hover:border-[#f1e05a]/30",
    accent: "#f1e05a",
  },
  Python: {
    bg: "hover:bg-[#3572A5]/[0.03]",
    text: "text-[#3572A5]",
    border: "hover:border-[#3572A5]/30",
    accent: "#3572A5",
  },
  Go: {
    bg: "hover:bg-[#00ADD8]/[0.03]",
    text: "text-[#00ADD8]",
    border: "hover:border-[#00ADD8]/30",
    accent: "#00ADD8",
  },
  Rust: {
    bg: "hover:bg-[#dea584]/[0.03]",
    text: "text-[#dea584]",
    border: "hover:border-[#dea584]/30",
    accent: "#dea584",
  },
};

export const defaultLanguageColor: LanguageColor = {
  bg: "hover:bg-muted/5",
  text: "text-muted-foreground",
  border: "hover:border-muted-foreground/30",
  accent: "#888",
};

export type Language = keyof typeof languageColors | (string & {});

export function getLanguageColor(language: string | undefined): LanguageColor {
  if (!language) return defaultLanguageColor;
  return languageColors[language] ?? defaultLanguageColor;
}
