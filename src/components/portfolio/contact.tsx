import { useState } from "react";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { GlassCard, MagneticButton, Reveal, SectionHeading } from "./primitives";

const channels = [
  { icon: Mail, href: "mailto:unix.official.bs@gmail.com" },
  { icon: MessageCircle, href: "https://wa.me/201157151213" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/youssef-mohamed-694b15247" },
  { icon: Instagram, href: "https://www.instagram.com/yusev250/" },
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61592037479404" },
  { icon: Github, href: "https://github.com/macman1990" },
];

export function Contact() {
  const [sent, setSent] = useState(false);
  const { messages, isArabic } = useLocale();

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-x-10 top-20 -z-10 h-64 rounded-full bg-primary/15 blur-[140px]" />
      <SectionHeading
        eyebrow={messages.contact.eyebrow}
        title={messages.contact.title}
        description={messages.contact.description}
        align="center"
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <GlassCard className="h-full p-7">
            <ul className={isArabic ? "space-y-5 text-right" : "space-y-5"}>
              {messages.contact.channels.map((c, index) => {
                const channel = channels[index];
                if (!channel) return null;

                const Icon = channel.icon;
                return (
                  <li key={c.label}>
                    <a
                      href={channel.href}
                      target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={channel.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      className="group flex items-center gap-4 transition-colors"
                    >
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-surface-2 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon size={16} />
                      </span>
                      <span>
                        <span className="block text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                          {c.label}
                        </span>
                        <span className="block text-sm">{c.value}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.1}>
          <GlassCard className="h-full p-7">
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={messages.contact.name} id="name" placeholder={messages.contact.placeholders.name} />
                <Field label={messages.contact.email} id="email" type="email" placeholder={messages.contact.placeholders.email} />
              </div>
              <Field label={messages.contact.subject} id="subject" placeholder={messages.contact.placeholders.subject} />
              <div>
                <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {messages.contact.message}
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder={messages.contact.placeholders.message}
                  className="w-full resize-none rounded-2xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/25"
                />
              </div>
              <div className="flex items-center gap-4">
                <MagneticButton type="submit">
                  {messages.contact.submit} <Send size={15} />
                </MagneticButton>
                {sent && (
                  <p className="text-xs text-muted-foreground">{messages.contact.success}</p>
                )}
              </div>
            </form>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  type = "text",
  placeholder,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/25"
      />
    </div>
  );
}
