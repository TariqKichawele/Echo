import { cn } from '@workspace/ui/lib/utils'
import React from 'react'

interface Props {
    children: React.ReactNode;
    className?: string;
}

const WidgetHeader = ({ children, className }: Props) => {
  return (
    <header className={cn("bg-gradient-to-b to-[#0b63f3] p-4 text-primary-foreground", className)}>
        {children}
    </header>
  )
}

export default WidgetHeader