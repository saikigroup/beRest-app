"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  label: string;
}

export function AnimatedCounter({ value, label }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center md:text-left">
      <p
        className={`text-[28px] md:text-[36px] font-extrabold text-[#2C7695] leading-none transition-all duration-700 ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        {value}
      </p>
      <p
        className={`text-[13px] text-[#94A3B8] mt-1 font-medium transition-all duration-700 delay-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {label}
      </p>
    </div>
  );
}
