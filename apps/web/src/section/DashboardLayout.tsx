import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import type { User } from '../types';

interface DashboardLayoutProps {
  user: User | null | undefined;
}

/**
 * The main authenticated shell: sidebar on the left, navbar on top, page
 * content rendered via `<Outlet />` in the scrollable main area.
 */
const DashboardLayout = ({ user }: DashboardLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  return (
    <div className="flex h-screen overflow-hidden bg-app-theme">
      {/* Sidebar (desktop fixed + mobile drawer) */}
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Right column: navbar + scrollable content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar
          user={user}
          onMobileMenuOpen={() => setMobileOpen(true)}
        />

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
