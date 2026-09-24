export const profile = {
  name: "aryan mistry",
  role: "(secure) software engineer",
  bio: "",
  socials: {
    email: "mistryaryan2005@gmail.com",
    github: "https://github.com/AryanMistry",
    twitter: "https://x.com/aryanmistry_",
    linkedin: "https://www.linkedin.com/in/aryan-mistry-70722825b/",
  },
};

export const experience = [
  {
    company: "Microsoft",
    role: "Software Engineer",
    period: "May 2026 - Aug 2026",
    achievements: [
      "Identity and Network Access",
    ],
  },
  {
    company: "Department of National Defence",
    role: "Software Engineer",
    period: "Sept 2025 - Apr 2025",
    achievements: [
      "Azure devops and SBOM generation",
    ],
  },
  {
    company: "Department of National Defence",
    role: "Embedded Software Engineer",
    period: "May 2025 - Aug 2025",
    achievements: [
      "Linux embedded development in Rust",
    ],
  },
  {
    company: "Department of National Defence",
    role: "Software Engineer",
    period: "Jan 2025 - Apr 2025",
    achievements: [
      "Open-source malware analysis tool used across the Government of Canada",
    ],
  },
];

export const projects = [
  {
    name: "zk-ferris",
    description:
      "A STARK proof system built from scratch in Rust with no cryptography libraries.",
    tech: ["Rust", "ZK-STARKs", "FRI", "NTT"],
    github: "https://github.com/AryanMistry/zk-stark-vm",
    live: null,
    writeup: "/posts/zk-starks-from-scratch/",
    image: "/projects/zk-ferris_pic.png",
  },
  {
    name: "Assemblyline",
    description: "Open-source malware analysis tool used across the Government of Canada",
    tech: ["Python", "Docker", "FastAPI", "PostgreSQL"],
    github: "https://github.com/CybercentreCanada/assemblyline",
    live: null,
    writeup: null,
    image: "/projects/assemblyline_pic.png",
  },
  {
    name: "IntelliBin",
    description: "Automated garbage sorting system",
    tech: ["Python", "Arduino", "YoloV8", "OpenCV"],
    github: "https://github.com/AryanMistry/IntelliBin",
    live: null,
    writeup: null,
    image: "/projects/intellibin_pic.png",
  },
  {
    name: "Sbom Analyzer",
    description: "Automated SBOM analysis platform for vulnerability scanning and dependency insights",
    tech: ["Python", "React", "MongoDB", "NVD API", "OSV API"],
    github: "https://github.com/AryanMistry/sbom_analyzer",
    live: null,
    writeup: null,
    image: null,
  },
];

export const education = [
  {
    institution: "McMaster University",
    degree: "Computer Science",
    period: "2023 - 2027",
    gradDate: null,
  },
];

export const tools = [
  "Kali Linux",
  "Ghidra",
  "GDB",
  "Wireshark",
  "Burp Suite",
  "Metasploit",
  "IDA Pro",
  "Radare2",
];

export const ctfs = [
  {
    event: "ISSessions CTF",
    date: "Feb 2026",
    rank: "3rd / 40+ teams",
    challenges: ["Pwn", "Forensics", "Misc", "Reverse Engineering", "Web"],
    writeups: null,
  },
  {
    event: "PicoCTF",
    date: "Ongoing",
    rank: null,
    challenges: ["Pwn", "Forensics", "Misc"],
    writeups: ["https://github.com/AryanMistry/ctf_writeups/tree/main/picoCTF"],
  },
  {
    event: "CyberSci",
    date: "Nov 2025",
    rank: "3rd in Canada",
    challenges: ["Web Exploitation", "Reverse Engineering", "ROP chains"],
    writeups: null,
  },
  {
    event: "Unleashing the Cyber Champions CTF",
    date: "Oct 2025",
    rank: "5th / 60+ teams",
    challenges: ["Pwn", "Forensics", "Misc", "Splunk"],
    writeups: null,
  },
  {
    event: "Hack the Halt",
    date: "Feb 2023",
    rank: "3rd in Canada",
    challenges: ["General Skills", "Web", "Binary Exploitation", "Table Top"],
    writeups: null,
  },
];

