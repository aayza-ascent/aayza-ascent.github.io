import type { ProjectIconName } from "@/lib/data";

interface ProjectIconProps {
  name: ProjectIconName;
}

const PROPS = {
  width: "100%",
  height: "100%",
  viewBox: "0 0 64 64",
  fill: "none" as const,
  preserveAspectRatio: "xMidYMid meet" as const,
};

export default function ProjectIcon({ name }: ProjectIconProps) {
  switch (name) {
    case "lumen":
      return (
        <svg {...PROPS}>
          <circle cx="32" cy="32" r="22" fill="currentColor" opacity=".25" />
          <circle cx="32" cy="32" r="14" fill="currentColor" opacity=".7" />
          <circle cx="32" cy="32" r="5" fill="currentColor" />
        </svg>
      );
    case "loop":
      return (
        <svg {...PROPS}>
          <path
            d="M20 32a12 12 0 1 1 24 0 12 12 0 1 1-24 0z"
            stroke="currentColor"
            strokeWidth="3"
          />
          <circle cx="44" cy="32" r="4" fill="currentColor" />
        </svg>
      );
    case "parakeet":
      return (
        <svg {...PROPS}>
          <path
            d="M16 44l12-24 10 14 10-12"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="48" cy="22" r="3.5" fill="currentColor" />
        </svg>
      );
    case "tangerine":
      return (
        <svg {...PROPS}>
          <rect x="14" y="14" width="16" height="16" rx="3" fill="currentColor" />
          <rect x="34" y="14" width="16" height="16" rx="8" fill="currentColor" opacity=".5" />
          <rect x="14" y="34" width="16" height="16" rx="8" fill="currentColor" opacity=".5" />
          <rect x="34" y="34" width="16" height="16" rx="3" fill="currentColor" />
        </svg>
      );
    case "pebble":
      return (
        <svg {...PROPS}>
          <path
            d="M14 42c0-16 12-22 18-22s18 6 18 22-36 16-36 0z"
            fill="currentColor"
            opacity=".75"
          />
          <rect x="22" y="34" width="20" height="3" fill="#0a1628" rx="1" />
        </svg>
      );
    case "atlas":
      return (
        <svg {...PROPS}>
          <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2.5" />
          <ellipse cx="32" cy="32" rx="20" ry="9" stroke="currentColor" strokeWidth="2.5" />
          <line x1="12" y1="32" x2="52" y2="32" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      );
  }
}
