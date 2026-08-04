import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { About, Services, Skills } from "@/components/portfolio/about";
import {
  CursorGlow,
  Footer,
  Loader,
  Navbar,
  ScrollProgress,
  ScrollToTop,
} from "@/components/portfolio/chrome";
import { Contact } from "@/components/portfolio/contact";
import { Hero } from "@/components/portfolio/hero";
import { Experience, Projects, Testimonials } from "@/components/portfolio/work";

const title = "Youssef Mohamed — Video Editor & AI Automation";
const description =
  "Portfolio of Youssef Mohamed: professional video editor, DaVinci Resolve colorist, short-form content specialist and AI workflow builder.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Youssef Mohamed",
          jobTitle: "Video Editor & AI Automation Specialist",
          description,
          knowsAbout: [
            "Video Editing",
            "Color Grading",
            "Motion Graphics",
            "AI Workflow Automation",
          ],
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative"
    >
      <Loader />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <div className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
      <ScrollToTop />
    </motion.main>
  );
}
