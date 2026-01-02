export type NavItem = {
  label: string;
  href: string;
  requiredPermission: string | null;
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    requiredPermission: "dashboard.view",
  },
  {
    label: "Admin",
    href: "/admin",
    requiredPermission: "admin.view",
  }
];