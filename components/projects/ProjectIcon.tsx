import type { ProjectIconName } from "@/lib/data";

interface ProjectIconProps {
  name: ProjectIconName;
  color: string;
}

const SIZE = 88;
const VIEW_BOX = "0 0 64 64";

export default function ProjectIcon({ name, color }: ProjectIconProps) {
  const common = {
    width: SIZE,
    height: SIZE,
    viewBox: VIEW_BOX,
    fill: "none" as const,
  };
  switch (name) {
    case "lumen":
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="22" fill={color} opacity=".3" />
          <circle cx="32" cy="32" r="14" fill={color} />
          <circle cx="32" cy="32" r="5" fill="#fff" />
        </svg>
      );
    case "loop":
      return (
        <svg {...common}>
          <path
            d="M20 32a12 12 0 1 1 24 0 12 12 0 1 1-24 0z"
            stroke={color}
            strokeWidth="4"
          />
          <circle cx="44" cy="32" r="5" fill={color} />
        </svg>
      );
    case "parakeet":
      return (
        <svg {...common}>
          <path
            d="M16 44l12-24 10 14 10-12"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="48" cy="22" r="4" fill={color} />
        </svg>
      );
    case "tangerine":
      return (
        <svg {...common}>
          <rect x="14" y="14" width="16" height="16" rx="3" fill={color} />
          <rect
            x="34"
            y="14"
            width="16"
            height="16"
            rx="8"
            fill={color}
            opacity=".5"
          />
          <rect
            x="14"
            y="34"
            width="16"
            height="16"
            rx="8"
            fill={color}
            opacity=".5"
          />
          <rect x="34" y="34" width="16" height="16" rx="3" fill={color} />
        </svg>
      );
    case "pebble":
      return (
        <svg {...common}>
          <path
            d="M14 42c0-16 12-22 18-22s18 6 18 22-36 16-36 0z"
            fill={color}
          />
          <rect x="22" y="34" width="20" height="3" fill="#fff" rx="1" />
        </svg>
      );
    case "atlas":
      return (
        <svg {...common}>
          <circle
            cx="32"
            cy="32"
            r="20"
            stroke={color}
            strokeWidth="3"
            fill="none"
          />
          <ellipse
            cx="32"
            cy="32"
            rx="20"
            ry="9"
            stroke={color}
            strokeWidth="3"
            fill="none"
          />
          <line
            x1="12"
            y1="32"
            x2="52"
            y2="32"
            stroke={color}
            strokeWidth="3"
          />
        </svg>
      );
  }
}
