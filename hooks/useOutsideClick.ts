import { useEffect, useRef } from 'react';

export function useOutsideClick(handler: () => void, listenCapturing: boolean = true) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClick(e: UIEvent) {
      if (!e) return;
      const target = e.target as Node;
      if (ref.current && !ref.current.contains(target)) handler();
    }

    document.addEventListener('click', handleClick, listenCapturing);

    return () => document.removeEventListener('click', handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
}
