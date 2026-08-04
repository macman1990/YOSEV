import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp, Github, Instagram, Linkedin, Moon, Sun, Menu, X, Languages } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/LocaleProvider";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX }}
      aria-hidden
      className="fixed left-0 top-0 z-[70] h-[2px] w-full origin-left bg-gradient-to-r from-primary via-accent to-primary"
    />
  );
}

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden lg:block"
      style={{
        background: `radial-gradient(520px circle at ${pos.x}px ${pos.y}px, var(--color-glow), transparent 70%)`,
        transition: "background 220ms ease-out",
      }}
    />
  );
}

export function Loader() {
  const [done, setDone] = useState(false);
  const { messages, isArabic } = useLocale();
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1100);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-background"
        >
          <div className={cn("text-center", isArabic ? "text-right" : "text-left")}>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-sm uppercase tracking-[0.4em] text-muted-foreground"
            >
              {messages.common.loading}
            </motion.p>
            <div className="mx-auto mt-5 h-px w-40 overflow-hidden bg-border">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="h-full w-full bg-primary"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ScrollToTop() {
  const [show, setShow] = useState(false);
  const { messages } = useLocale();
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.08 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={messages.common.scrollTop}
          className="glass fixed bottom-6 right-6 z-[60] grid h-12 w-12 place-items-center rounded-full text-foreground"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function ThemeToggle() {
  const [light, setLight] = useState(false);
  const { messages } = useLocale();
  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
  }, [light]);
  return (
    <button
      onClick={() => setLight((v) => !v)}
      aria-label={messages.common.themeToggle}
      className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:text-foreground"
    >
      {light ? <Moon size={15} /> : <Sun size={15} />}
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { messages, locale, setLocale, isArabic } = useLocale();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: messages.nav.about, href: "#about" },
    { label: messages.nav.services, href: "#services" },
    { label: messages.nav.skills, href: "#skills" },
    { label: messages.nav.work, href: "#work" },
    { label: messages.nav.experience, href: "#experience" },
    { label: messages.nav.contact, href: "#contact" },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[65] transition-all duration-500",
        scrolled ? "py-3" : "py-6",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500",
          scrolled ? "glass w-[92%] shadow-[0_16px_50px_-30px_var(--color-glow)]" : "w-[94%]",
        )}
      >
        <a href="#top" className="font-display text-sm font-semibold tracking-tight">
          YM<span className="text-primary">.</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="nav-link text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            aria-label={messages.common.localeSwitcher}
          >
            <Languages size={14} />
            <span>{isArabic ? messages.common.localeLabel : messages.common.localeLabelAr}</span>
          </button>
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:brightness-110 sm:inline-block"
          >
            {messages.nav.hire}
          </a>
          <button
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass mx-auto mt-3 w-[92%] space-y-1 rounded-3xl p-4 md:hidden"
          >
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm text-muted-foreground hover:bg-surface-2 hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  const { messages, isArabic } = useLocale();
  return (
    <footer className="border-t border-border py-10">
      <div className={cn("mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-6 sm:flex-row", isArabic ? "text-right" : "text-left")}>
        <p className="text-xs text-muted-foreground">
          {messages.footer.label.replace("{year}", new Date().getFullYear().toString())}
        </p>
        <div className="flex items-center gap-4 text-muted-foreground">
          <a href="https://github.com/macman1990" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-foreground">
            <Github size={17} />
          </a>
          <a href="https://www.linkedin.com/in/youssef-mohamed-694b15247" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-foreground">
            <Linkedin size={17} />
          </a>
          <a href="https://www.instagram.com/yusev250/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-colors hover:text-foreground">
            <Instagram size={17} />
          </a>
        </div>
      </div>
    </footer>
  );
}
