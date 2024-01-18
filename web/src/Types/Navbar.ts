import { LinkProps } from 'next/link';
import { ReactNode } from 'react';

export interface NavbarDropdownProps {
  userId?: string;
  children: ReactNode;
}

export interface NavbarLinkProps extends LinkProps {
  children: ReactNode;
}