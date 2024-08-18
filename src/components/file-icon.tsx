import {
  IconBrandGolang,
  IconBrandJavascript,
  IconBrandReact,
  IconBrandTypescript,
  IconCommand,
  IconFile,
  IconJson,
  IconMarkdown,
} from '@tabler/icons-react';

const FileIcons: { [key: string]: React.ComponentType } = {
  markdown: IconMarkdown,
  md: IconMarkdown,
  mdx: IconMarkdown,
  js: IconBrandJavascript,
  jsx: IconBrandReact,
  ts: IconBrandTypescript,
  tsx: IconBrandReact,
  bash: IconCommand,
  sh: IconCommand,
  go: IconBrandGolang,
  json: IconJson,
};

export const FileIcon: React.FC<{ ext: string }> = ({ ext }) => {
  const Icon = FileIcons[ext] || IconFile;

  return <Icon />;
};
