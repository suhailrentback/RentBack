// components/ClientErrorReporter.tsx
"use client";

import { useEffect } from "react";

export default function ClientErrorReporter() {
  useEffect(() => {
    const onErr = (event: ErrorEvent) => {
      try {
        navigator.sendBeacon?.(
          "/api/log",
          new Blob(
            [
              JSON.stringify({
                type: "error",
                message: event?.error?.message || event?.message,
                stack: event?.error?.stack,
                href: location.href,
                ua: navigator.userAgent,
                ts: Date.now(),
              }),
            ],
            { type: "application/json" }
          )
        );
      } catch {}
    };

    const onRejection = (event: PromiseRejectionEvent) => {
      try {
        navigator.sendBeacon?.(
          "/api/log",
          new Blob(
            [
              JSON.stringify({
                type: "unhandledrejection",
                reason: String(event?.reason),
                href: location.href,
                ua: navigator.userAgent,
                ts: Date.now(),
              }),
            ],
            { type: "application/json" }
          )
        );
      } catch {}
    };

    window.addEventListener("error", onErr);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onErr);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return null;
}
