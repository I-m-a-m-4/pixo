'use client';

import * as React from 'react';
import NProgress from 'nprogress';

type PushStateInput = [data: any, unused: string, url?: string | URL | null | undefined];

export function NextTopLoader() {
  React.useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleAnchorClick = (event: MouseEvent) => {
      try {
        const targetUrl = new URL((event.currentTarget as HTMLAnchorElement).href);
        const currentUrl = new URL(location.href);
        if (targetUrl.origin === currentUrl.origin && targetUrl.pathname !== currentUrl.pathname) {
          NProgress.start();
        }
      } catch (err) {
        // External URL or invalid, start progress bar anyway
        NProgress.start();
      }
    };

    const handleMutation: MutationCallback = () => {
      const anchorElements = document.querySelectorAll('a:not([data-nprogress-handled])');
      anchorElements.forEach((anchor) => {
        anchor.setAttribute('data-nprogress-handled', 'true');
        anchor.addEventListener('click', handleAnchorClick);
      });
    };

    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document, { childList: true, subtree: true });

    const originalPushState = history.pushState;
    history.pushState = function (...args: PushStateInput) {
      NProgress.done();
      return originalPushState.apply(history, args);
    };

    const handlePopState = () => {
      NProgress.done();
    };
    window.addEventListener('popstate', handlePopState);
    
    // Initial run
    handleMutation([]);

    return () => {
      mutationObserver.disconnect();
      history.pushState = originalPushState;
      window.removeEventListener('popstate', handlePopState);
      // Clean up added event listeners from anchors
      document.querySelectorAll('a[data-nprogress-handled]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
        anchor.removeAttribute('data-nprogress-handled');
      });
    };
  }, []);

  return null;
}
