import { motion } from "framer-motion";
import { ArrowUpRight, FileText, Quote } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { GlassCard, Reveal, SectionHeading } from "./primitives";
import { YouTubeVideo } from "./youtube-video";

export function Projects() {
  const { messages, isArabic } = useLocale();
  return (
    <section id="work" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SectionHeading
        eyebrow={messages.work.eyebrow}
        title={messages.work.title}
        description={messages.work.description}
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {messages.work.items.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.1}>
            <GlassCard className="group h-full overflow-hidden">
              <YouTubeVideo videoId={p.videoId} title={p.title} />
              <div className="p-7">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-surface-2 px-3 py-1 text-[11px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Experience() {
  const { messages, isArabic } = useLocale();
  return (
    <section id="experience" className="relative mx-auto max-w-4xl px-6 py-28 sm:py-36">
      <SectionHeading eyebrow={messages.experience.eyebrow} title={messages.experience.title} />
      <div className={isArabic ? "relative mt-14 pr-8" : "relative mt-14 pl-8"}>
        <div className={isArabic ? "absolute right-0 top-2 h-full w-px bg-gradient-to-b from-primary via-border to-transparent" : "absolute left-0 top-2 h-full w-px bg-gradient-to-b from-primary via-border to-transparent"} />
        {messages.experience.items.map((t, i) => (
          <Reveal key={t.role} delay={i * 0.08}>
            <div className="relative pb-12">
              <span className={isArabic ? "absolute -right-8 top-1.5 grid h-3 w-3 place-items-center rounded-full bg-primary shadow-[0_0_0_5px_var(--color-glow)]" : "absolute -left-8 top-1.5 grid h-3 w-3 place-items-center rounded-full bg-primary shadow-[0_0_0_5px_var(--color-glow)]"} />
              <p className="text-[11px] uppercase tracking-[0.18em] text-primary">{t.period}</p>
              <h3 className="mt-2 text-lg font-semibold">{t.role}</h3>
              <p className="text-sm text-muted-foreground/80">{t.org}</p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {t.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Testimonials() {
  const { messages } = useLocale();
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SectionHeading eyebrow={messages.testimonials.eyebrow} title={messages.testimonials.title} align="center" />
      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {messages.testimonials.items.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.35 }} className="h-full">
              <GlassCard className="flex h-full flex-col p-7">
                <Quote size={22} className="text-primary" />
                <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  “{t.quote}”
                </p>
                <div className="mt-7 border-t border-border pt-5">
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </GlassCard>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
