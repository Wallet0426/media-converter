'use client';

import { RefreshCw } from 'lucide-react';

export default function SpinningLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-gradient-to-br from-red-600 to-rose-500 p-1.5 rounded-lg ${className}`}>
      <RefreshCw className="text-white w-6 h-6 animate-[spin_3s_linear_infinite]" />
    </div>
  );
}

