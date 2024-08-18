import Button from '@components/ui/button';
import Dropdown from '@components/ui/dropdown';
import { IconMoon, IconSun } from '@tabler/icons-react';
import * as React from 'react';

export function ModeToggle() {
  const [theme, setThemeState] = React.useState<'theme-light' | 'dark' | 'system'>('theme-light');

  const setTheme = (theme: 'theme-light' | 'dark' | 'system') => {
    setThemeState(theme);
    localStorage.setItem('theme', theme);

    const preference = { theme };
    fetch('/api/preference', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preference),
    });
  };

  React.useEffect(() => {
    const isDarkMode = localStorage.getItem('theme') === 'dark';
    setThemeState(isDarkMode ? 'dark' : 'theme-light');
  }, []);

  React.useEffect(() => {
    const isDark =
      theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
  }, [theme]);

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <Button.Root variant="soft" size="sm" intent="gray">
          <Button.Icon type="only">
            <IconSun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          </Button.Icon>
          <IconMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button.Root>
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content align="end" mixed sideOffset={5}>
          <Dropdown.Item onClick={() => setTheme('theme-light')}>Light</Dropdown.Item>
          <Dropdown.Item onClick={() => setTheme('dark')}>Dark</Dropdown.Item>
          <Dropdown.Item onClick={() => setTheme('system')}>System</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
}
