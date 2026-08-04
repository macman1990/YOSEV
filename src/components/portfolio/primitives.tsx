import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 26,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        {eyebrow}
      </span>
      <h2 className="mt-6 text-4xl font-semibold leading-[1.05] sm:text-5xl">{title}</h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">{description}</p>
      )}
    </Reveal>
  );
}

export function GlassCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glass glow-ring rounded-3xl shadow-[0_20px_60px_-30px_var(--color-glow)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Counter({
  to,
  suffix = "",
  duration = 1.6,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {Math.round(value).toLocaleString()}
      {suffix}
    </span>
  );
}

export function MagneticButton({
  children,
  href,
  variant = "primary",
  className,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.28);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
  };

  const styles = {
    primary:
      "bg-primary text-primary-foreground shadow-[0_18px_40px_-16px_var(--color-glow)] hover:brightness-110",
    outline: "border border-border bg-surface hover:bg-surface-2",
    ghost: "text-muted-foreground hover:text-foreground",
  }[variant];

  const inner = (
    <motion.span
      style={{ x: sx, y: sy }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-[filter,background-color,color] duration-300",
        styles,
        className,
      )}
    >
      {children}
    </motion.span>
  );

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="inline-block"
    >
      {href ? (
        <a href={href} onClick={onClick}>
          {inner}
        </a>
      ) : (
        <button type={type} onClick={onClick}>
          {inner}
        </button>
      )}
    </div>
  );
}
