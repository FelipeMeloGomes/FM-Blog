export function ArrowUpIcon({ className }: { className?: string }) {
  return (
     <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label="Enviar imagem"
    >
      <title>Enviar imagem</title>
      <rect x="2" y="2" width="20" height="20" rx="4" strokeWidth="1.2" strokeDasharray="2.5 2" />
      <line x1="12" y1="15" x2="12" y2="7" />
      <polyline points="8,11 12,7 16,11" />
    </svg>
  );
}