import { useEffect, useState, useMemo, RefObject } from "react";

function useIsInViewport(ref: RefObject<HTMLElement>) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting)
      ),
    []
  );

  useEffect(() => {
    if(!ref.current) return
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
}
export default useIsInViewport;