import type { HeadingHierarchy } from '@components/TOCHeading';
import TOCHeading from '@components/TOCHeading';
import { useCallback, useEffect } from 'react';

{
  /* <script>
  import TOCHeading from './TOCHeading';

  export let toc = [];
  const hasToC = toc.length > 1;

  // ACTIVE NAVIGATION
  const handler = () => {
    const allHeadings = toc.map((heading) => document.getElementById(heading.slug));
    console.log(allHeadings);
  };

  handler();
</script> */
}

type Props = {
  toc: HeadingHierarchy[];
};
function TOC({ toc }: Props) {
  const hasToC = toc.length > 1;
  const isElementInView = useCallback((element: HTMLElement) => {
    const bounding = element.getBoundingClientRect();
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }, []);

  const handler = useCallback<IntersectionObserverCallback>((entries) => {
    const allHeadings = toc.map((heading) => document.getElementById(heading.slug));
    const allLinks = toc.map((heading) => document.querySelector(`a[href="#${heading.slug}"]`));

    const allEntries = new Set(entries.filter((entry) => entry.isIntersecting).map((entry) => entry.target));

    let activeHeading = null;

    for (let i = 0; i < allHeadings.length; i++) {
      activeHeading = allHeadings[i];

      if (activeHeading && (isElementInView(activeHeading) || allEntries.has(activeHeading))) {
        // add data-active=true to the active link
        allLinks.forEach((link) => link?.setAttribute('data-active', 'false'));
        allLinks[i]?.setAttribute('data-active', 'true');
        allLinks[i]?.scrollIntoView({ block: 'center', behavior: 'smooth' });
        break;
      }
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handler, { threshold: 0.5 });
    const allHeadings = toc.map((heading) => document.getElementById(heading.slug));
    allHeadings.forEach((heading) => heading && observer.observe(heading));
    return () => {
      allHeadings.forEach((heading) => heading && observer.unobserve(heading));
    };
  }, []);

  return (
    <aside className="toc hidden xl:block prose mx-auto lg:px-4 dark:prose-invert xl:pt-10 2xl:px-0 fixed top-1/2 -translate-y-1/2 max-h-[500px] px-0 overflow-y-auto left-0">
      <ul className="">
        {toc.map((heading) => (
          <TOCHeading key={heading.slug} heading={heading} />
        ))}
      </ul>
    </aside>
  );
}

export default TOC;
