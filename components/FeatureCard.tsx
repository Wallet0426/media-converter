'use client';

import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-8 rounded-3xl bg-white border border-slate-100 hover:border-slate-300 transition-colors">
      <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
        <Icon className="text-red-600 w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold mb-3 font-display">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}

