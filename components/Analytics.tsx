// components/Analytics.tsx
"use client";

import Script from "next/script";

export default function Analytics() {
  return (
    <>
      <Script
        src="https://plausible.io/js/script.js"
        data-domain="rentback.app"
        strategy="afterInteractive"
      />
      <noscript>
        {/* noop – analytics will just be disabled without JS */}
      </noscript>
    </>
  );
}
