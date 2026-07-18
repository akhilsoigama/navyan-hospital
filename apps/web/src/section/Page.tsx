import type { ReactNode } from 'react';

interface PageProps {
  title: string;
  children?: ReactNode;
}

/**
 * Standard page wrapper that provides consistent padding and title semantics.
 * All route-level page components should be wrapped in this.
 */
const Page = ({ title, children }: PageProps) => (
  <div className="flex flex-col gap-6 p-6 min-h-full">
    <div className="flex items-center gap-3">
      <h2 className="text-lg font-bold text-primary">{title}</h2>
    </div>
    {children ?? (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-secondary text-sm">Page under construction.</p>
      </div>
    )}
  </div>
);

export default Page;
