import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import type { User } from '../types';
import {
  FaBars,
  FaSearch,
  FaSun,
  FaMoon,
  FaChevronDown,
  FaSignOutAlt,
  FaUserCircle,
  FaCog,
} from 'react-icons/fa';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Derive a human-readable page title from the current pathname. */
const usePageTitle = (): string => {
  const { pathname } = useLocation();

  const segments = pathname
    .replace(/^\/dashboard\/?/, '')
    .split('/')
    .filter(Boolean);

  if (segments.length === 0) return 'Dashboard';

  return segments
    .map((s) =>
      s
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
    )
    .join(' › ');
};

// ---------------------------------------------------------------------------
// Sub-component: User avatar dropdown
// ---------------------------------------------------------------------------

interface UserDropdownProps {
  user: User | null | undefined;
}

const UserDropdown = ({ user }: UserDropdownProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  const initials = user?.initials ?? user?.fullName?.charAt(0) ?? '?';
  const displayName = user?.fullName ?? 'Unknown User';
  const role = user?.role ?? 'Staff';

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        id="user-dropdown-trigger"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl neumorph-btn-vanilla transition-all duration-150"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {/* Avatar */}
        <span className="size-8 rounded-lg bg-orange flex items-center justify-center text-white text-xs font-bold shrink-0">
          {initials}
        </span>

        {/* Name + role (hidden on small screens) */}
        <div className="hidden sm:flex flex-col text-left leading-tight">
          <span className="text-xs font-semibold text-primary truncate max-w-[100px]">
            {displayName}
          </span>
          <span className="text-[10px] text-secondary truncate max-w-[100px]">
            {role}
          </span>
        </div>

        <FaChevronDown
          className={[
            'size-3 text-secondary transition-transform duration-200',
            open ? 'rotate-180' : '',
          ].join(' ')}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          id="user-dropdown-panel"
          className="absolute right-0 top-full mt-2 w-52 neumorph-outset rounded-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150"
          role="menu"
        >
          {/* User info header */}
          <div className="px-4 py-3 border-b border-theme">
            <p className="text-sm font-semibold text-primary truncate">
              {displayName}
            </p>
            <p className="text-xs text-secondary truncate">{role}</p>
          </div>

          {/* Menu items */}
          <ul className="py-1">
            <li>
              <button
                type="button"
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-secondary hover:bg-orange-light/40 hover:text-orange transition-colors text-left"
                role="menuitem"
              >
                <FaUserCircle className="size-4 shrink-0" />
                My Profile
              </button>
            </li>
            <li>
              <button
                type="button"
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-secondary hover:bg-orange-light/40 hover:text-orange transition-colors text-left"
                role="menuitem"
              >
                <FaCog className="size-4 shrink-0" />
                Settings
              </button>
            </li>
            <li className="border-t border-theme mt-1 pt-1">
              <button
                type="button"
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-orange hover:bg-orange-light transition-colors text-left"
                role="menuitem"
              >
                <FaSignOutAlt className="size-4 shrink-0" />
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

interface NavbarProps {
  user: User | null | undefined;
  onMobileMenuOpen: () => void;
}

const Navbar = ({ user, onMobileMenuOpen }: NavbarProps) => {
  const pageTitle = usePageTitle();
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-30 w-full h-14 flex items-center bg-card-theme border-b border-theme px-4 gap-3 shrink-0"
    >
      {/* ── Mobile hamburger ───────────────────────────────────────────── */}
      <button
        id="mobile-menu-toggle"
        type="button"
        onClick={onMobileMenuOpen}
        className="lg:hidden p-2 rounded-lg neumorph-btn-vanilla transition-all duration-150"
        aria-label="Open navigation menu"
      >
        <FaBars className="size-4 text-secondary" />
      </button>

      {/* ── Page title ─────────────────────────────────────────────────── */}
      <h1 className="text-sm font-bold text-primary truncate flex-1 hidden sm:block">
        {pageTitle}
      </h1>

      {/* ── Spacer (mobile) ────────────────────────────────────────────── */}
      <div className="flex-1 sm:hidden" />

      {/* ── Search input ───────────────────────────────────────────────── */}
      <div
        id="patient-search-wrapper"
        className="relative hidden md:flex items-center"
      >
        <FaSearch className="absolute left-3 size-3.5 text-secondary pointer-events-none" />
        <input
          id="patient-search-input"
          type="search"
          placeholder="Search Patient (Mobile Number)"
          className="pl-9 pr-4 py-2 text-xs rounded-xl w-64 neumorph-inset text-primary placeholder:text-secondary/60 focus:outline-none focus:ring-1 focus:ring-orange-light/40 bg-transparent transition-all duration-150"
          aria-label="Search patient by mobile number"
        />
      </div>

      {/* ── Theme toggle ───────────────────────────────────────────────── */}
      <button
        id="theme-toggle"
        type="button"
        onClick={toggleTheme}
        className="p-2 rounded-lg neumorph-btn-vanilla transition-all duration-150 shrink-0"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      >
        {theme === 'dark' ? (
          <FaSun className="size-4 text-secondary" />
        ) : (
          <FaMoon className="size-4 text-secondary" />
        )}
      </button>

      {/* ── User dropdown ──────────────────────────────────────────────── */}
      <UserDropdown user={user} />
    </header>
  );
};

export default Navbar;
