import React from 'react';

/**
 * ToothIcon - A clear tooth shape with wide rounded crown and two roots
 * Matches the style of existing clinic type icons
 */
export function ToothIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Tooth outline: wide crown at top with slight dip, narrowing to two roots at bottom */}
      <path d="M7 4h10c1.1 0 2 .9 2 2v5c0 1.7-.8 3-2 3.5v5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5v-5h-2v5c0 .8-.7 1.5-1.5 1.5S9 19.8 9 19v-5c-1.2-.5-2-1.8-2-3.5V6c0-1.1.9-2 2-2z" />
    </svg>
  );
}

/**
 * LotionIcon - A pump bottle with body, neck, and pump with spout
 * Matches the style of existing clinic type icons
 */
export function LotionIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Main bottle body - tall rounded rectangle */}
      <rect x="8" y="9" width="8" height="12" rx="2" />
      
      {/* Neck - narrower rectangle on top of body */}
      <rect x="10" y="6" width="4" height="3" rx="0.5" />
      
      {/* Pump - horizontal bar on top */}
      <line x1="9" y1="5" x2="15" y2="5" />
      
      {/* Spout pointing right */}
      <line x1="15" y1="5" x2="17" y2="5" />
      <line x1="17" y1="5" x2="17" y2="6" />
      
      {/* Small droplet near spout */}
      <path d="M18.5 5.5l0.5 0.8c0.2 0.3 0.2 0.7 0 1l-0.5 0.7" />
    </svg>
  );
}
