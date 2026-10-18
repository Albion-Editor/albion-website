'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      void fetch('/api/track-visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pagePath: pathname || '/' }),
      });
    } catch {
      // Ignore background tracking failures
    }
  }, [pathname]);

  return null;
}
