import { codeTheme, type CodeThemeProps } from '@tailus/themer';
import React from 'react';

export interface CodeProps extends React.HTMLAttributes<HTMLPreElement>, CodeThemeProps {}
export const Code = React.forwardRef<HTMLPreElement, CodeProps>(
  ({ intent = 'primary', children, className, ...props }, ref) => {
    return (
      <code ref={ref} className={codeTheme({ intent, className })} {...props}>
        {children}
      </code>
    );
  }
);
