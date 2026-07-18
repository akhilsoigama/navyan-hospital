import { useState, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { modules } from '../routers/modulePath';
import type { SidebarLink, SubLink } from '../types/sidebar';
import { FaChevronDown, FaChevronRight, FaTimes, FaBars } from 'react-icons/fa';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SidebarProps {
  /** Controlled mobile drawer open state (managed by Navbar). */
  mobileOpen: boolean;
  onMobileClose: () => void;
}

// ---------------------------------------------------------------------------
// Sub-component: individual sub-link row
// ---------------------------------------------------------------------------

const SubLinkItem = ({ link }: { link: SubLink }) => {
  const { pathname } = useLocation();
  const isActive = pathname === link.to || pathname.startsWith(link.to + '/');

  return (
    <NavLink
      to={link.to}
      end
      className={() =>
        [
          'flex items-center gap-3 pl-10 pr-3 py-2 rounded-lg text-sm font-medium transition-all duration-150',
          isActive
            ? 'bg-orange-light text-orange font-semibold'
            : 'text-secondary hover:bg-orange-light/40 hover:text-orange',
        ].join(' ')
      }
    >
      <span className="size-4 shrink-0 opacity-70">{link.icon}</span>
      <span className="truncate">{link.label}</span>
      {isActive && (
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-orange shrink-0" />
      )}
    </NavLink>
  );
};

// ---------------------------------------------------------------------------
// Sub-component: top-level link row (may have sub-links)
// ---------------------------------------------------------------------------

const LinkItem = ({
  link,
  collapsed,
}: {
  link: SidebarLink;
  collapsed: boolean;
}) => {
  const { pathname } = useLocation();

  // A link is "active" if we're on it OR any of its sub-links
  const isParentActive =
    pathname === link.to ||
    pathname.startsWith(link.to + '/') ||
    (link.subLinks?.some(
      (sl) => pathname === sl.to || pathname.startsWith(sl.to + '/'),
    ) ??
      false);

  const [open, setOpen] = useState<boolean>(isParentActive);

  const hasSubLinks = (link.subLinks?.length ?? 0) > 0;

  const handleToggle = useCallback(() => {
    if (hasSubLinks) setOpen((prev) => !prev);
  }, [hasSubLinks]);

  if (!hasSubLinks) {
    // Plain nav link
    return (
      <NavLink
        to={link.to}
        end
        title={collapsed ? link.label : undefined}
        className={() =>
          [
            'group flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-150',
            isParentActive
              ? 'bg-orange-light text-orange'
              : 'text-secondary hover:bg-orange-light/40 hover:text-orange',
            collapsed ? 'justify-center' : '',
          ].join(' ')
        }
      >
        <span
          className={[
            'size-5 shrink-0 transition-colors',
            isParentActive
              ? 'text-orange'
              : 'text-secondary group-hover:text-primary',
          ].join(' ')}
        >
          {link.icon}
        </span>

        {!collapsed && (
          <span className="truncate text-sm">{link.label}</span>
        )}

        {!collapsed && isParentActive && (
          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-orange shrink-0" />
        )}
      </NavLink>
    );
  }

  // Parent link with sub-links
  return (
    <div>
      <button
        type="button"
        onClick={handleToggle}
        title={collapsed ? link.label : undefined}
        className={[
          'group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-150 text-left',
          isParentActive
            ? 'bg-orange-light text-orange'
            : 'text-secondary hover:bg-orange-light/40 hover:text-orange',
          collapsed ? 'justify-center' : '',
        ].join(' ')}
      >
        <span
          className={[
            'size-5 shrink-0 transition-colors',
            isParentActive
              ? 'text-orange'
              : 'text-secondary group-hover:text-primary',
          ].join(' ')}
        >
          {link.icon}
        </span>

        {!collapsed && (
          <>
            <span className="truncate text-sm flex-1">{link.label}</span>
            <span className="ml-auto size-3 shrink-0 opacity-60 transition-transform duration-200">
              {open ? <FaChevronDown /> : <FaChevronRight />}
            </span>
          </>
        )}
      </button>

      {/* Sub-links — hidden when collapsed or closed */}
      {!collapsed && open && (
        <div className="mt-0.5 flex flex-col gap-0.5 animate-in slide-in-from-top-1 duration-150">
          {link.subLinks!.map((sl) => (
            <SubLinkItem key={sl.to} link={sl} />
          ))}
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Sub-component: module group section
// ---------------------------------------------------------------------------

const ModuleSection = ({
  moduleName,
  links,
  collapsed,
}: {
  moduleName: string;
  links: SidebarLink[];
  collapsed: boolean;
}) => (
  <div className="flex flex-col gap-0.5">
    {/* Group label — hidden when collapsed */}
    {!collapsed && (
      <p className="px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-secondary/50 select-none">
        {moduleName}
      </p>
    )}

    {links.map((link) => (
      <LinkItem key={link.to} link={link} collapsed={collapsed} />
    ))}
  </div>
);

// ---------------------------------------------------------------------------
// Inner sidebar panel (shared between desktop + mobile)
// ---------------------------------------------------------------------------

const SidebarPanel = ({
  collapsed,
  onToggleCollapse,
  onClose,
  isMobile,
}: {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onClose?: () => void;
  isMobile: boolean;
}) => (
  <div
    className={[
      'flex flex-col h-full bg-card-theme border-r border-theme transition-all duration-300',
      collapsed && !isMobile ? 'w-16' : 'w-64',
    ].join(' ')}
  >
    {/* Header */}
    <div
      className={[
        'flex items-center border-b border-theme h-14 shrink-0 px-3',
        collapsed && !isMobile ? 'justify-center' : 'justify-between',
      ].join(' ')}
    >
      {(!collapsed || isMobile) && (
        <div className="flex items-center gap-2 min-w-0">
          <img src="/logo.png" alt="" width={120} height={100} />
        </div>
      )}

      {/* Close on mobile / collapse toggle on desktop */}
      {isMobile ? (
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg text-secondary hover:bg-orange-light/40 hover:text-orange transition-colors"
          aria-label="Close sidebar"
        >
          <FaTimes className="size-4" />
        </button>
      ) : (
        <button
          type="button"
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-secondary hover:bg-orange-light/40 hover:text-orange transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <FaBars className="size-4" />
        </button>
      )}
    </div>

    {/* Nav links */}
    <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-2 flex flex-col gap-1">
      {modules.map((mod) => (
        <ModuleSection
          key={mod.moduleName}
          moduleName={mod.moduleName}
          links={mod.links}
          collapsed={collapsed && !isMobile}
        />
      ))}
    </nav>

    {/* Footer / divider */}
    <div className="shrink-0 h-10 border-t border-theme flex items-center px-4">
      {(!collapsed || isMobile) && (
        <span className="text-[10px] text-secondary/40 font-medium tracking-wide">
          v1.0.0
        </span>
      )}
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

const Sidebar = ({ mobileOpen, onMobileClose }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const handleToggleCollapse = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  return (
    <>
      {/* ── Desktop sidebar ────────────────────────────────────────────── */}
      <aside className="hidden lg:flex shrink-0 h-screen sticky top-0 z-30">
        <SidebarPanel
          collapsed={collapsed}
          onToggleCollapse={handleToggleCollapse}
          isMobile={false}
        />
      </aside>

      {/* ── Mobile backdrop ────────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile drawer ──────────────────────────────────────────────── */}
      <aside
        className={[
          'fixed inset-y-0 left-0 z-50 lg:hidden transition-transform duration-300',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
        aria-label="Mobile navigation"
      >
        <SidebarPanel
          collapsed={false}
          onToggleCollapse={handleToggleCollapse}
          onClose={onMobileClose}
          isMobile={true}
        />
      </aside>
    </>
  );
};

export default Sidebar;
