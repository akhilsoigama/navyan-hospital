import type { ReactNode } from 'react';
import type { PermissionKeys } from '../utils/permission';

export interface SubLink {
    to: string;
    label: string;
    icon: ReactNode;
    permissions: (PermissionKeys | string)[];
}

export interface SidebarLink {
    to: string;
    label: string;
    icon: ReactNode;
    permissions: (PermissionKeys | string)[];
    subLinks?: SubLink[];
}
export interface LinkItem {
    label: string;
    path: string;
    subLinks?: LinkItem[];
}
export interface Module {
    moduleName: string;
    permissions: (PermissionKeys | string)[];
    links: SidebarLink[];
}

export interface FilteredSidebarLink extends Omit<SidebarLink, 'subLinks'> {
    subLinks?: SubLink[];
}

export interface FilteredModule extends Omit<Module, 'links'> {
    links: FilteredSidebarLink[];
}