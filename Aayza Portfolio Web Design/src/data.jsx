// src/data.jsx — Content aligned to Aayza Ahmed's CV

const WORK = [
  {
    role: "Software Engineer",
    company: "Ascent Platform",
    period: "Oct 2024 — Present",
    color: "#A78BFA",
    logo: "◐",
    summary: "Fast-moving startup environment with high autonomy and end-to-end ownership — from design through implementation and release.",
    highlights: [
      "Designed an AI-powered document classification & validation system that auto-identifies uploads and verifies them against outstanding requests",
      "Led delivery of a modular dashboard & widget system inside an existing web app, surfacing cross-platform insights",
      "Built a bespoke reporting system for a high-profile financial institution client, enabling data analysis on platform-gathered data",
      "Contributed to R&D and product discovery sessions exploring future platform capabilities",
    ],
    stack: ["TypeScript", "React", "Node.js", "Figma"],
  },
  {
    role: "Graduate Software Engineer",
    company: "Pulsion Technology",
    period: "Jun 2024 — Oct 2024",
    color: "#FF6B9D",
    logo: "✦",
    summary: "Promoted after completing the apprenticeship programme — continued delivering client web applications across the stack.",
    highlights: [
      "Full-stack delivery on C#, React, JavaScript, SQL Server projects",
      "Ongoing work with POS and management-system clients",
      "Code reviews, sprint retrospectives, and deployment ownership",
    ],
    stack: ["C#", "React", "SQL Server", "Azure DevOps"],
  },
  {
    role: "Graduate Software Engineer Apprentice",
    company: "Pulsion Technology",
    period: "Sep 2020 — Jun 2024",
    color: "#6EE7B7",
    logo: "❋",
    summary: "Owned a full SDLC of a risk assessment product (dissertation project) while delivering across varied client projects.",
    highlights: [
      "Built a risk assessment product end-to-end using C#, React, JavaScript, SQL Server",
      "Shipped POS and management systems for multiple clients",
      "Developed & tested APIs with Postman against MongoDB and SQL Server",
      "Managed deployment pipelines via Azure DevOps, maintained legacy projects",
    ],
    stack: ["C#", "React", "MongoDB", "Postman"],
  },
  {
    role: "Product Consultant",
    company: "Pulsion Technology",
    period: "Jun 2019 — Sep 2020",
    color: "#FBBF24",
    logo: "◆",
    summary: "Client-facing role training users and extending software products with JavaScript customisations.",
    highlights: [
      "Trained clients on company software products",
      "Built digital forms + templates with JavaScript, added complex functionality",
      "Ran feature & regression testing on product websites and apps",
      "First-line support on the company helpdesk",
    ],
    stack: ["JavaScript", "Digital Forms", "Testing"],
  },
];

const PROJECTS = [
  {
    title: "AI Document Classifier",
    type: "Work",
    year: "2025",
    tint: "#A78BFA",
    size: "lg",
    blurb: "AI-powered system that auto-identifies uploaded document types and validates them against outstanding document requests — shipped at Ascent Platform.",
    tech: ["TypeScript", "AI / LLM", "React"],
    link: "#",
    icon: "lumen",
  },
  {
    title: "Modular Dashboard & Widgets",
    type: "Work",
    year: "2025",
    tint: "#FF6B9D",
    size: "md",
    blurb: "Led design and build of a bespoke widget system inside an existing web app — surfacing actionable insights from across the platform.",
    tech: ["TypeScript", "React", "Figma"],
    link: "#",
    icon: "loop",
  },
  {
    title: "Financial Reporting System",
    type: "Work",
    year: "2024",
    tint: "#6EE7B7",
    size: "sm",
    blurb: "Bespoke reporting tool built with a high-profile financial institution client — enabling data analysis on platform-gathered data.",
    tech: ["TypeScript", "Node.js", "SQL"],
    link: "#",
    icon: "parakeet",
  },
  {
    title: "Risk Assessment Platform",
    type: "Personal",
    year: "2024",
    tint: "#FBBF24",
    size: "md",
    blurb: "Full SDLC ownership as my Honours dissertation project — a risk assessment product built with C#, React, JavaScript and SQL Server.",
    tech: ["C#", "React", "SQL Server"],
    link: "#",
    icon: "tangerine",
  },
  {
    title: "POS + Management Systems",
    type: "Work",
    year: "2023",
    tint: "#67E8F9",
    size: "sm",
    blurb: "Shipped a spread of client-facing web apps at Pulsion — point-of-sale, management systems, and custom internal tools.",
    tech: ["React", "C#", "MongoDB"],
    link: "#",
    icon: "pebble",
  },
  {
    title: "Digital Forms Toolkit",
    type: "Work",
    year: "2020",
    tint: "#F0ABFC",
    size: "lg",
    blurb: "JavaScript-powered digital forms and templates extending our product with complex workflow logic for enterprise clients.",
    tech: ["JavaScript", "HTML", "CSS"],
    link: "#",
    icon: "atlas",
  },
];

const TECH = [
  { name: "TypeScript", color: "#3178C6", ring: 0, glyph: "TS" },
  { name: "JavaScript", color: "#F7DF1E", ring: 0, glyph: "JS" },
  { name: "React",      color: "#61DAFB", ring: 0, glyph: "⚛" },
  { name: "Node.js",    color: "#8CC84B", ring: 0, glyph: "N" },
  { name: "C# / .NET",  color: "#9B4F96", ring: 1, glyph: "C#" },
  { name: "Python",     color: "#3776AB", ring: 1, glyph: "Py" },
  { name: "SQL Server", color: "#CC2927", ring: 1, glyph: "SQL" },
  { name: "PostgreSQL", color: "#336791", ring: 1, glyph: "Pg" },
  { name: "MongoDB",    color: "#47A248", ring: 2, glyph: "M" },
  { name: "Tailwind",   color: "#06B6D4", ring: 2, glyph: "TW" },
  { name: "Figma",      color: "#A259FF", ring: 2, glyph: "Fi" },
  { name: "GraphQL",    color: "#E10098", ring: 2, glyph: "◈" },
  { name: "React Native", color: "#61DAFB", ring: 2, glyph: "RN" },
];

const HOBBIES = [
  { front: "Remote work", back: "Fully remote since 2020 across distributed teams — async-first communication is a superpower.", emoji: "🌍", color: "#A78BFA" },
  { front: "Urdu poetry", back: "Love reading classical Urdu poetry — finding the rhythm between languages is its own kind of programming.", emoji: "✒️", color: "#FF6B9D" },
  { front: "AI tinkering", back: "Building AI-powered workflow automation at work and off-clock — prompt-craft, classifiers, small agentic tools.", emoji: "🤖", color: "#6EE7B7" },
  { front: "Chai & code", back: "Glasgow winters + good chai + a side project. The standard ritual.", emoji: "☕", color: "#FBBF24" },
  { front: "Community volunteering", back: "Set up events and did food-bank admin at Crookston Community Group for two years. Stay involved.", emoji: "🤝", color: "#67E8F9" },
  { front: "Design + build", back: "Happiest when I can Figma something, ship it, and iterate on the feedback the same week.", emoji: "🎨", color: "#F0ABFC" },
];

const FACTS = [
  "First-Class Honours with Distinction from the University of Strathclyde.",
  "Seven years remote — Glasgow-based, distributed teams everywhere.",
  "AWS Certified Cloud Practitioner since 2019.",
  "Year Programme Representative two years running at uni.",
  "Completed a full Graduate Apprenticeship — industry + academic study in parallel.",
  "I translate complex technical concepts for non-technical stakeholders for a living.",
];

const PHOTOS = [
  { caption: "glasgow mornings", rot: -4, tint: "#A78BFA" },
  { caption: "async standup",    rot: 3,  tint: "#FF6B9D" },
  { caption: "ascent offsite",   rot: -2, tint: "#6EE7B7" },
  { caption: "graduation day",   rot: 5,  tint: "#FBBF24" },
  { caption: "late night ship",  rot: -3, tint: "#67E8F9" },
  { caption: "figma → prod",     rot: 2,  tint: "#F0ABFC" },
  { caption: "client workshop",  rot: -5, tint: "#FB923C" },
  { caption: "weekend tinker",   rot: 4,  tint: "#A78BFA" },
];

Object.assign(window, { WORK, PROJECTS, TECH, HOBBIES, FACTS, PHOTOS });
