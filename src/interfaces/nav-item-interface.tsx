export interface INavItem {
  name: string;
  link?: string;
  children?: {
    icon: React.ReactNode;
    name: string;
    description: string;
    link: string;
  }[];
  isOpen?: boolean;
  toggleDropdown?: any;
}
