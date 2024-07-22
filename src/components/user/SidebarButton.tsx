'use client';
import { Button } from '@/components/ui/button';
import { FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';

interface SidebarButtonProps {
  icon: ReactNode;
  label: string;
  variant?: 'ghost' | 'secondary';
  link: string;
  className?: string;
}

const SidebarButton: FC<SidebarButtonProps> = ({
  icon,
  label,
  link,
  variant = 'ghost',
  className,
}) => {
  const location = usePathname();

  const navigate = useRouter();
  return (
    <Button
      onClick={() => navigate.push(link)}
      variant={variant}
      size="sm"
      className={cn(
        `w-full justify-start ${location == link ? 'bg-secondary' : ''}`,
        className
      )}
    >
      {icon}
      {label}
    </Button>
  );
};

export default SidebarButton;
