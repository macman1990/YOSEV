import { motion } from "framer-motion";
import { ArrowDownToLine, ArrowUpRight, Facebook, Github, Instagram, Linkedin } from "lucide-react";
import portrait from "@/assets/portrait-hero.jpg";
import { useLocale } from "@/i18n/LocaleProvider";
import { MagneticButton } from "./primitives";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/macman1990" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/youssef-mohamed-694b15247" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/yusev250/" },
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/profile.php?id=61592037479404" },
];

export function Hero() {
  const { messages, isArabic } = useLocale();
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ y: [0, -30, 0], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 top-24 h-[420px] w-[420px] rounded-full bg-primary/25 blur-[130px]"
        />
        <motion.div
          animate={{ y: [0, 34, 0], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-24 bottom-0 h-[460px] w-[460px] rounded-full bg-accent/20 blur-[150px]"
        />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            {messages.hero.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="text-gradient mt-7 text-[clamp(3rem,8vw,5.75rem)] font-semibold leading-[0.95]"
          >
            {messages.hero.headlineFirst}
            <br />
            {messages.hero.headlineSecond}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 font-display text-sm tracking-[0.14em] text-primary sm:text-base"
          >
            {messages.hero.role}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground"
          >
            {messages.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className={isArabic ? "mt-10 flex flex-wrap items-center justify-end gap-3" : "mt-10 flex flex-wrap items-center gap-3"}
          >
            <MagneticButton href="#work">
              {messages.hero.ctaWork} <ArrowUpRight size={16} />
            </MagneticButton>
            <MagneticButton href="#" variant="outline">
              {messages.hero.ctaCv} <ArrowDownToLine size={15} />
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              {messages.hero.ctaHire}
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className={isArabic ? "mt-12 flex items-center justify-end gap-5 text-muted-foreground" : "mt-12 flex items-center gap-5 text-muted-foreground"}
          >
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div className="glow-ring overflow-hidden rounded-[2rem] border border-border">
            <img
              src={portrait}
              alt={messages.hero.imageAlt}
              width={912}
              height={1200}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute -bottom-6 -left-6 rounded-2xl px-5 py-4"
          >
            <p className="font-display text-2xl font-semibold">4.9M+</p>
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              {messages.hero.statLabel}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
