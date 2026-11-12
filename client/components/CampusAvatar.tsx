const portraits = [
  { skin: "#d99c76", hair: "#25202b", shirt: "#7882e8", background: "#e8e9ff", hairShape: "M17 37c-4-18 7-29 23-29 17 0 28 11 24 30l-5 8H22z", fringe: "M18 31c8-3 12-12 15-17 8 8 18 10 31 9l1 13c-8-6-15-9-24-9-8 0-15 3-22 8z" },
  { skin: "#a96e4f", hair: "#17191d", shirt: "#e89774", background: "#ffeadf", hairShape: "M16 36c-2-18 8-28 24-28 17 0 26 12 23 30l-4 9H21z", fringe: "M18 28c8 1 13-8 17-13 7 8 16 11 28 9l2 11c-8-5-15-7-23-7-9 0-16 3-23 8z" },
  { skin: "#f0c7a2", hair: "#3d2924", shirt: "#65ad91", background: "#e1f4e9", hairShape: "M15 37c-3-19 8-29 25-29 18 0 28 12 25 31l-6 9H21z", fringe: "M17 30c8-2 12-10 16-16 8 7 18 10 31 8l2 12c-8-5-15-7-24-7s-17 3-24 8z" },
  { skin: "#c68a62", hair: "#25252e", shirt: "#5990d4", background: "#e2edff", hairShape: "M17 37c-3-18 7-29 23-29 17 0 27 12 24 30l-5 9H21z", fringe: "M18 29c9-1 14-8 18-15 8 7 17 10 28 8l1 12c-8-5-15-7-23-7-9 0-16 3-23 8z" },
];

export default function CampusAvatar({ name, initials, className = "" }: { name: string; initials: string; className?: string }) {
  const index = [...initials].reduce((total, character) => total + character.charCodeAt(0), 0) % portraits.length;
  const portrait = portraits[index];

  return (
    <svg role="img" aria-label={`${name} cartoon avatar`} viewBox="0 0 80 80" className={`shrink-0 overflow-hidden rounded-full ${className}`}>
      <circle cx="40" cy="40" r="40" fill={portrait.background} />
      <path d="M10 82c2-17 13-25 30-25s28 8 30 25" fill={portrait.shirt} />
      <path d="M34 52h12v12H34z" fill={portrait.skin} />
      <path d={portrait.hairShape} fill={portrait.hair} />
      <ellipse cx="40" cy="38" rx="17" ry="20" fill={portrait.skin} />
      <path d={portrait.fringe} fill={portrait.hair} />
      <circle cx="34" cy="39" r="1.5" fill="#302c32" />
      <circle cx="47" cy="39" r="1.5" fill="#302c32" />
      <path d="M36 47c2.5 2 5.5 2 8 0" fill="none" stroke="#9d5c51" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="22" cy="43" r="2" fill={portrait.skin} />
      <circle cx="58" cy="43" r="2" fill={portrait.skin} />
    </svg>
  );
}
