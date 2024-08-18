import { cn } from '@lib/utils';
import type { MarkdownHeading } from 'astro';

type Props = {
  heading: HeadingHierarchy;
};
export interface HeadingHierarchy extends MarkdownHeading {
  subheadings: HeadingHierarchy[];
}
function TOCHeading(props: Props) {
  const { heading } = props;
  return (
    <li className={cn('group transition-transform decoration-clone list-none list-outside my-0')}>
      <a
        className="data-[active='true']:text-primary-500 decoration-clone no-underline overflow-ellipsis max-w-0 opacity-75 hover:opacity-100 font-light transition-[opacity,color,translate] data-[active='true']:font-semibold hover:translate-x-3 text-xs"
        href={`#${heading.slug}`}
        data-active="false"
      >
        {heading.text}
      </a>
      {heading.subheadings.length > 0 && (
        <ul className="my-0">
          {heading.subheadings.map((subheading) => (
            <TOCHeading key={subheading.slug} heading={subheading} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default TOCHeading;
