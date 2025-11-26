"use client";

import { FiLoader } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const STATUS_MESSAGES = [
  "Calibrating security layers",
  "Syncing intelligence feeds",
  "Preparing industry playbooks",
  "Optimizing zero-trust perimeter",
  "Tuning AI-assisted defenses"
];

const ROUTE_SIMULATION_MS = 900;
const MIN_INITIAL_DISPLAY_MS = 600;

export default function PageLoadingOverlay() {
  const pathname = usePathname();
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [progress, setProgress] = useState(12);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const progressIntervalRef = useRef<number | null>(null);
  const statusIntervalRef = useRef<number | null>(null);
  const completionTimeoutRef = useRef<number | null>(null);
  const firstNavigationRef = useRef(true);

  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }

    const scheduleCompletion = () => {
      if (completionTimeoutRef.current) {
        window.clearTimeout(completionTimeoutRef.current);
      }
      completionTimeoutRef.current = window.setTimeout(() => {
        setInitialLoadComplete(true);
      }, MIN_INITIAL_DISPLAY_MS);
    };

    if (document.readyState === "complete") {
      scheduleCompletion();
    } else {
      window.addEventListener("load", scheduleCompletion, { once: true });
    }

    return () => {
      window.removeEventListener("load", scheduleCompletion);
      if (completionTimeoutRef.current) {
        window.clearTimeout(completionTimeoutRef.current);
        completionTimeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (firstNavigationRef.current) {
      firstNavigationRef.current = false;
      return;
    }

    setShouldRender(true);
    setIsFadingOut(false);
    setProgress(18);
    setInitialLoadComplete(false);

    const timer = window.setTimeout(() => {
      setInitialLoadComplete(true);
    }, ROUTE_SIMULATION_MS);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  const isActive = !initialLoadComplete;

  useEffect(() => {
    if (!isActive) {
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      if (statusIntervalRef.current) {
        window.clearInterval(statusIntervalRef.current);
        statusIntervalRef.current = null;
      }

      setProgress(100);
      setIsFadingOut(true);

      const timeout = window.setTimeout(() => {
        setShouldRender(false);
      }, 420);

      return () => window.clearTimeout(timeout);
    }

    setShouldRender(true);
    setIsFadingOut(false);

    progressIntervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 96) {
          return prev;
        }
        return prev + Math.random() * 6;
      });
    }, 180);

    statusIntervalRef.current = window.setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 1600);

    return () => {
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      if (statusIntervalRef.current) {
        window.clearInterval(statusIntervalRef.current);
        statusIntervalRef.current = null;
      }
    };
  }, [isActive]);

  if (!shouldRender) {
    return null;
  }

  const visibilityClass = !isActive || isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100";

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#041734]/95 via-[#051B45]/96 to-[#020A1E]/98 px-6 py-8 transition-opacity duration-300 ${visibilityClass}`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="w-full max-w-xs rounded-[28px] border border-white/10 bg-white/5 p-8 text-center text-white shadow-[0_40px_140px_rgba(4,23,52,0.55)] backdrop-blur-xl sm:max-w-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-300/30 via-sky-500/50 to-indigo-500/40">
          <FiLoader className="h-8 w-8 text-sky-100 animate-spin" aria-hidden />
        </div>
        <p className="mt-6 text-[0.65rem] uppercase tracking-[0.55em] text-sky-200/80">Loading</p>
        <p className="mt-3 text-xl font-semibold text-white">{STATUS_MESSAGES[statusIndex]}</p>
        <div className="mt-6 flex items-center justify-center gap-1">
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className="h-2 w-2 rounded-full bg-sky-300/70 animate-pulse"
              style={{ animationDelay: `${index * 120}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
