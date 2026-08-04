import { motion } from "framer-motion";
import {
  Bot,
  Clapperboard,
  Palette,
  Scissors,
  Sparkles,
  Youtube,
} from "lucide-react";
import aboutImg from "@/assets/portrait-about.jpg";
import { useLocale } from "@/i18n/LocaleProvider";
import { Counter, GlassCard, Reveal, SectionHeading } from "./primitives";

export function About() {
  const { messages, isArabic } = useLocale();
  const stats = messages.about.stats;
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
        <Reveal className="order-2 lg:order-1">
          <div className="glow-ring overflow-hidden rounded-[2rem] border border-border">
            <img
              src={aboutImg}
              alt={messages.about.imageAlt}
              loading="lazy"
              width={1008}
              height={1200}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow={messages.about.eyebrow}
            title={messages.about.title}
            description={messages.about.description}
          />
          <Reveal delay={0.1}>
            <ul className={isArabic ? "mt-8 space-y-3 text-sm text-muted-foreground text-right" : "mt-8 space-y-3 text-sm text-muted-foreground"}>
              {messages.about.bullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <GlassCard className="h-full p-6">
              <p className="font-display text-3xl font-semibold sm:text-4xl">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                {s.label}
              </p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const services = [
  { icon: Scissors },
  { icon: Palette },
  { icon: Sparkles },
  { icon: Clapperboard },
  { icon: Youtube },
  { icon: Bot },
];

export function Services() {
  const { messages } = useLocale();
  return (
    <section id="services" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SectionHeading
        eyebrow={messages.services.eyebrow}
        title={messages.services.title}
        description={messages.services.description}
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {messages.services.items.map((item, i) => (
          <Reveal key={item.title} delay={(i % 3) * 0.08}>
            <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.35 }} className="h-full">
              <GlassCard className="group h-full p-7">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/15 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  {(() => {
                  const Icon = services[i].icon;
                  return <Icon size={19} />;
                })()}
                </div>
                <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </GlassCard>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Skills() {
  const { messages, isArabic } = useLocale();
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SectionHeading
        eyebrow={messages.skills.eyebrow}
        title={messages.skills.title}
        align="center"
      />
      <div className="mt-14 flex flex-wrap justify-center gap-3">
        {messages.skills.items.map((skill, i) => (
          <Reveal key={skill} delay={i * 0.03} y={14}>
            <motion.span
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
              className="glass inline-block rounded-full px-5 py-2.5 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              {skill}
            </motion.span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
