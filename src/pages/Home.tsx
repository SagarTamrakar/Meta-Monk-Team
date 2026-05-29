/* eslint-disable */
import React from "react";
import {
  motion,
  useScroll,
  useInView,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  ChevronRight, Zap, Eye, Layers, Film, Activity, Menu, X,
  ArrowRight, Quote, Video, Sparkles, Clapperboard, Cpu,
  CheckCircle2, Play, MessageSquare, FileText, Rocket, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark, LogoFull } from "@/components/Logo";
import StarField from "@/components/StarField";
import FloatingSymbols from "@/components/FloatingSymbols";
import CinematicShowreel from "@/components/CinematicShowreel";

import heroImage from "@assets/MM_BANDAR.jpeg";
import TOOLS from "@/data/tools";
import AboutUs from "@/components/AboutUs";
import VideoSlider from "@/components/VideoSlider";
import ImageGrid from "@/components/ImageGrid";
// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

// Word-by-word animated heading (editionstudio.in style)
function AnimatedHeading({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = React.useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const words = text.split(" ");
  return (
    <h2 ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.07 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const heroRef = React.useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = React.useState(0);
  const [selectedCategory, setSelectedCategory] = React.useState("Motion Graphics");

  // Global scroll progress for the thin top bar
  const { scrollYProgress: globalProgress } = useScroll();
  const scaleX = useSpring(globalProgress, { stiffness: 100, damping: 30 });

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeCategory = (category: string) => {
    setSelectedCategory(category);
    // Delay scroll to ensure state updates first
    setTimeout(() => {
      const workSection = document.getElementById("video-slider");
      if (workSection) {
        const yOffset = workSection.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: yOffset, behavior: "smooth" });
      }
    }, 100);
    console.log("Selected category:", category);
  };

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden selection:bg-secondary/30 selection:text-secondary">

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* ── Space galaxy background (fixed, full-page) ── */}
      <StarField />

      {/* ─── Navigation ───────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-primary/15 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <LogoFull size={44} />
          <div className="hidden md:flex items-center gap-8 font-sans font-semibold tracking-wider text-sm">
            {["#services:SERVICES", "#process:PROCESS", "#work:OUR WORK", "#arsenal:TOOLS", "#contact:CONTACT"].map((item) => {
              const [href, label] = item.split(":");
              return (
                <a key={href} href={href} className="text-muted-foreground hover:text-secondary transition-all duration-300">{label}</a>
              );
            })}
            <Button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-primary/10 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:shadow-[0_0_25px_rgba(255,215,0,0.6)] font-heading rounded-none"
            >
              GET STARTED
            </Button>
          </div>
          <button className="md:hidden text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/97 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col gap-6 font-heading text-xl"
          >
            {["#services:SERVICES", "#process:PROCESS", "#work:OUR WORK", "#arsenal:TOOLS", "#contact:CONTACT"].map((item) => {
              const [href, label] = item.split(":");
              return (
                <a key={href} href={href} onClick={() => setIsMobileMenuOpen(false)} className="text-foreground hover:text-secondary border-b border-border/50 pb-4">{label}</a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 1. Hero — Full viewport parallax bg ──────────────────── */}
      <section ref={heroRef} className="relative w-full min-h-screen overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0" style={{ transform: `translateY(${scrollY * 0.35}px) scale(1.15)`, transformOrigin: "center top" }}>
          <img src={heroImage} alt="Meta Monk Visuals" className="w-full h-full object-cover" style={{ objectPosition: "65% 50%" }} />
        </div>
        <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "radial-gradient(ellipse at 65% 50%, transparent 20%, rgba(5,5,12,0.55) 60%, rgba(5,5,12,0.95) 100%)" }} />
        <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(5,5,12,0.97) 0%, rgba(5,5,12,0.85) 32%, rgba(5,5,12,0.3) 58%, transparent 75%)" }} />
        <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, rgba(5,5,12,1) 0%, rgba(5,5,12,0.9) 15%, rgba(5,5,12,0.4) 35%, transparent 55%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-48 z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, rgba(5,5,12,1))" }} />
        <div className="absolute top-0 left-0 right-0 h-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to top, transparent, rgba(5,5,12,0.7))" }} />
        {/* Warm amber LED glow at bottom — matches studio image */}
        <div className="absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(200,120,20,0.06), transparent)" }} />

        {/* ── Floating tool symbols ── */}
        <FloatingSymbols />

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-32 pb-24 md:pt-44 md:pb-32">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl flex flex-col items-start gap-7">
            <motion.div custom={0} className="inline-flex items-center gap-2 px-4 py-1.5 border border-secondary/40 bg-secondary/5 text-secondary text-xs font-bold tracking-[0.25em] uppercase backdrop-blur-sm" style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)" }}>
              <Activity className="w-3.5 h-3.5" /><span>Creative Multimedia Studio</span>
              <span className="ml-2 w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            </motion.div>

            {/* Animated heading */}
            <div className="overflow-hidden">
              <motion.h1 custom={0.1} className="text-5xl md:text-7xl lg:text-[5.5rem] font-black font-heading leading-[0.95] uppercase">
                <span className="block text-foreground drop-shadow-[0_0_30px_rgba(255,200,50,0.35)]">In The</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-400 to-[#FF8C00]">Search </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-400 to-[#FF8C00]">Of Infinity </span>
              </motion.h1>
            </div>

            <motion.p custom={0.3} className="text-base md:text-lg text-foreground/70 max-w-md leading-relaxed font-sans">
              A creative multimedia studio crafting cinematic video edits, motion graphics, VFX, CGI, and high-impact content — for brands and storytellers who demand the extraordinary.
            </motion.p>

            <motion.div custom={0.4} className="flex flex-wrap gap-4 mt-2">
              <Button size="lg" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })} className="bg-secondary text-secondary-foreground hover:bg-secondary/80 font-heading text-base tracking-wider rounded-none px-8 py-6 shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all hover:shadow-[0_0_40px_rgba(0,240,255,0.7)]" style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}>
                VIEW SERVICES <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="border border-primary/50 text-primary hover:bg-primary/10 font-heading text-base tracking-wider rounded-none px-8 py-6 backdrop-blur-sm" style={{ clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" }}>
                GET A QUOTE
              </Button>
            </motion.div>

            <motion.div custom={0.5} className="flex flex-wrap gap-2 mt-2">
              {["Video Editing", "Motion Graphics", "VFX", "CGI", "Content Production"].map((tag) => (
                <span key={tag} className="text-xs font-bold tracking-widest uppercase px-3 py-1 border border-primary/30 text-primary/80 bg-primary/5 backdrop-blur-sm font-heading">{tag}</span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <span className="text-xs tracking-[0.3em] text-secondary/60 font-heading uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-px h-8 bg-gradient-to-b from-secondary/60 to-transparent" />
        </motion.div>
      </section>

      {/* ─── 2. Stats ─────────────────────────────────────────────── */}
      <section className="py-12 border-y border-secondary/20 bg-card/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatBox value="250+" label="Projects Delivered" />
          <StatBox value="40+" label="Happy Clients" />
          <StatBox value="4+" label="Years of Craft" />
          <StatBox value="1+" label="Industry Awards" />
        </div>
      </section>

      {/* ─── 3. Services ──────────────────────────────────────────── */}
      <section id="services" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-secondary font-bold tracking-[0.2em] uppercase text-sm mb-2 block">// What We Do</motion.span>
              <AnimatedHeading text="Our Core Services" className="text-4xl md:text-6xl font-heading font-black uppercase" />
            </div>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-muted-foreground max-w-sm text-base font-sans">
              End-to-end multimedia production — from a single reel to a full-scale CGI pipeline.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard onChangeCategory={() => changeCategory("3D Animation")} icon={<Eye className="w-7 h-7 text-primary" />} title="3D-Animation" desc="From concept to final render, we bring 3D characters and environments to life." items={["Concept development", "Character animation", "Environment design", "Final rendering"]} accent="primary" delay={0.6} />
            <ServiceCard onChangeCategory={() => changeCategory("CGI & VFX")} icon={<Zap className="w-7 h-7 text-secondary" />} title="VFX & Compositing" desc="Visual effects, rotoscoping, particle systems — blurring the line between reality and imagination." items={["Green screen & rotoscoping", "Particle & simulation effects", "Environment extensions", "Seamless compositing"]} accent="secondary" delay={0.3} />
            <ServiceCard onChangeCategory={() => changeCategory("CGI & VFX")} icon={<Cpu className="w-7 h-7 text-primary" />} title="CGI Production" desc="Photorealistic 3D modeling, texturing, lighting, and rendering for any platform or medium." items={["3D product visualization", "Architectural walkthroughs", "Character & creature design", "Photorealistic renders"]} accent="primary" delay={0.4} />
            <ServiceCard onChangeCategory={() => changeCategory("Motion Graphics")} icon={<Layers className="w-7 h-7 text-primary" />} title="Motion Graphics" desc="Kinetic typography, animated logos, and abstract visual storytelling that moves with purpose." items={["Animated logo reveals", "Kinetic typography & titles", "Lower thirds & broadcast packages", "Animated infographics"]} accent="primary" delay={0.2} />
            <ServiceCard onChangeCategory={() => changeCategory("Video Editing")} icon={<Clapperboard className="w-7 h-7 text-secondary" />} title="Video Editing" desc="Cinematic cuts, color grading, and seamless storytelling that captivate from frame one." items={["Narrative & documentary editing", "Color correction & grading", "Sound design & audio mixing", "Multi-platform delivery"]} accent="secondary" delay={0.1} />
            <ServiceCard onChangeCategory={() => changeCategory("Video Editing")} icon={<Film className="w-7 h-7 text-secondary" />} title="Content Production" desc="End-to-end creative content for social media, advertising, brand campaigns, and streaming." items={["Short-form reels & TikToks", "Long-form brand films", "Corporate & training videos", "Ad creatives & commercials"]} accent="secondary" delay={0.5} />
          </div>
        </div>
      </section>

      {/* ─── 5. Industries ────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-card/30 relative z-10 border-y border-border/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-secondary font-bold tracking-[0.2em] uppercase text-sm mb-2 block">// Who We Serve</motion.span>
              <AnimatedHeading text="Industries We Specialize In" className="text-4xl md:text-5xl font-heading font-black uppercase" />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: "Advertising & Marketing", icon: "📣" },
              { name: "Music & Entertainment", icon: "🎵" },
              { name: "Film & Television", icon: "🎬" },
              { name: "Gaming & Esports", icon: "🎮" },
              { name: "Fashion & Lifestyle", icon: "✨" },
              { name: "Corporate & B2B", icon: "🏢" },
              { name: "E-Commerce & Retail", icon: "🛍️" },
              { name: "Sports & Fitness", icon: "⚡" },
              { name: "Education & E-Learning", icon: "📚" },
              { name: "Technology & SaaS", icon: "💻" },
              { name: "Health & Wellness", icon: "🌿" },
              { name: "Real Estate & Architecture", icon: "🏛️" },
            ].map((industry, i) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                whileHover={{ borderColor: "rgba(0,240,255,0.4)", transition: { duration: 0.2 } }}
                className="glass-panel p-4 flex items-center gap-3 border border-border/20 transition-all group cursor-default"
              >
                <span className="text-xl">{industry.icon}</span>
                <span className="text-sm font-sans font-semibold text-foreground/80 group-hover:text-secondary transition-colors">{industry.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. Process ───────────────────────────────────────────── */}
      <section id="process" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-secondary font-bold tracking-[0.2em] uppercase text-sm mb-2 block">// How We Work</motion.span>
            <AnimatedHeading text="Our Process" className="text-4xl md:text-6xl font-heading font-black uppercase" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent z-0" />
            {[
              { step: "01", icon: <MessageSquare className="w-6 h-6" />, title: "Discovery & Brief", desc: "We listen first. You share your vision, goals, audience, and timeline." },
              { step: "02", icon: <FileText className="w-6 h-6" />, title: "Concept & Strategy", desc: "Scripts, storyboards, moodboards — all aligned with your brand." },
              { step: "03", icon: <Play className="w-6 h-6" />, title: "Production", desc: "Editing, animating, compositing, rendering — with milestone reviews." },
              { step: "04", icon: <Rocket className="w-6 h-6" />, title: "Delivery & Launch", desc: "Final assets in all formats, optimized for every platform." },
            ].map((p, i) => (
              <motion.div key={p.step} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="glass-panel p-6 flex flex-col items-center text-center relative z-10">
                <div className="w-14 h-14 rounded-full border border-secondary/40 bg-secondary/10 flex items-center justify-center text-secondary mb-4 shadow-[0_0_20px_rgba(0,240,255,0.15)]">{p.icon}</div>
                <span className="font-heading text-xs tracking-[0.3em] text-secondary/60 mb-2">{p.step}</span>
                <h3 className="font-heading font-bold text-lg uppercase mb-3">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-sans">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. Tools ─────────────────────────────────────────────── */}
      <section id="arsenal" className="py-24 px-6 bg-card/30 relative z-10 border-y border-border/10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-secondary font-bold tracking-[0.2em] uppercase text-sm mb-2 block">// Tools of the Trade</motion.span>
          <AnimatedHeading text="Our Arsenal" className="text-4xl md:text-5xl font-heading font-black uppercase mb-4" />
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-muted-foreground max-w-2xl mx-auto text-lg mb-16">
            Industry-standard software wielded by specialists — giving your project technical precision.
          </motion.p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {TOOLS.map((tool, i) => (
              <motion.div key={tool.name} initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }} whileHover={{ scale: 1.12, y: -4 }} className="flex flex-col items-center gap-3 group cursor-default">
                <div className="w-16 h-16 flex items-center justify-center border border-border/30 bg-card/60 transition-all" style={{ boxShadow: `0 0 0 0 ${tool.color}40` }}>
                  <span className="font-heading font-black text-2xl" style={{ color: tool.color }}>{tool.label}</span>
                </div>
                <span className="text-xs text-muted-foreground font-sans tracking-wider group-hover:text-foreground transition-colors">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 10. Our Work — Cinematic Showreel ───────────────────── */}
      <section id="work" className="relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-secondary font-bold tracking-[0.2em] uppercase text-sm mb-2 block">// Selected Projects</motion.span>
          <AnimatedHeading text="Our Work" className="text-4xl md:text-6xl font-heading font-black uppercase" />
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-muted-foreground max-w-2xl mx-auto text-lg mb-16">
            A showcase of cinematic work crafted for brands and storytellers. Use the arrows or dots to navigate — or let it play.
          </motion.p>
        </div>
        {/* Full-width cinematic reel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* <CinematicShowreel /> */}
          <ImageGrid setSelectedCategory={setSelectedCategory} />
          <VideoSlider selectedCategory={selectedCategory} />
        </motion.div>
      </section>

      {/* ─── 11. Trusted By ───────────────────────────────────────── */}
      {/* <section className="py-16 px-6 bg-card/20 relative z-10 border-y border-border/10 overflow-hidden">
        <p className="text-xs font-heading tracking-[0.4em] text-muted-foreground/50 uppercase text-center mb-10">Trusted by brands &amp; creators worldwide</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {["NEXUS CORP", "VOID STUDIOS", "APEX MEDIA", "NEON LABS", "ORBIT BRANDS", "STARFIELD CO"].map((brand, i) => (
            <motion.span key={brand} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="font-heading font-bold text-lg md:text-xl tracking-widest text-muted-foreground/25 hover:text-muted-foreground/60 transition-colors cursor-default">
              {brand}
            </motion.span>
          ))}
        </div>
      </section> */}

      {/* ─── 12. Testimonials ─────────────────────────────────────── */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-secondary font-bold tracking-[0.2em] uppercase text-sm mb-2 block">// What They Say</motion.span>
            <AnimatedHeading text="Client Signals" className="text-4xl md:text-6xl font-heading font-black uppercase" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard quote="Meta Monk Visuals has been instrumental in elevating our content strategy. Their attention to detail and creative vision are unmatched." author="Aman IT" role="Youtube Content Creator" />
            <TestimonialCard quote="Meta monk has helped us achieve our marketing goals with their innovative graphic solutions." author="RYU HASHEGI" role="Marketing Director, battlefy.com/" />
            <TestimonialCard quote="Meta Monk Visuals transformed our brand campaign into a cinematic experience. Their motion graphics work is unlike anything we've seen — every frame is intentional." author="Ali Azhar" role="Individual Creator" />
            <TestimonialCard quote="The VFX and CGI quality is extraordinary. They delivered a full production pipeline — editing, compositing, 3D — on time and beyond expectations." author="Gouranshi." role="Marketing Head, Hyperlinq Technologies" />
            <TestimonialCard quote="From concept to final delivery, the process was seamless. They understood our brand voice immediately and elevated everything with their visual storytelling." author="Dev Sharma" role="Broker" />
          </div>
        </div>
      </section>

      {/* ─── 13. Pricing ──────────────────────────────────────────── */}
      {/* <section className="py-24 px-6 bg-card/30 relative z-10 border-y border-border/10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <span className="text-secondary font-bold tracking-[0.2em] uppercase text-sm mb-2 block">// Transparent Pricing</span>
              <AnimatedHeading text="Competitive Rates. Exceptional Results." className="text-3xl md:text-5xl font-heading font-black uppercase mb-6 leading-tight" delay={0.1} />
              <p className="text-muted-foreground text-lg mb-6 font-sans">Flexible packages for individual creators, growing brands, and large-scale productions — with no hidden fees.</p>
              <ul className="space-y-3 mb-8">
                {["Project-based and retainer options", "Clear milestones and revision rounds", "Deliverables in all required formats", "Dedicated creative point of contact"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground/80 font-sans text-sm">
                    <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
              <a href="mailto:metamonkvisuals@gmail.com">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading tracking-wider rounded-none px-10 py-6 shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_35px_rgba(255,215,0,0.6)]">
                  GET A FREE QUOTE <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col gap-4">
              {[
                { name: "Starter", desc: "Short-form content, reels, social media clips", price: "From $299" },
                { name: "Studio", desc: "Brand films, motion graphics packages, explainer videos", price: "From $999" },
                { name: "Enterprise", desc: "Full CGI, VFX pipelines and ongoing retainers", price: "Custom" },
              ].map((pkg, i) => (
                <motion.div key={pkg.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="glass-panel p-6 border border-border/20 hover:border-secondary/30 transition-all flex justify-between items-center gap-4 group">
                  <div>
                    <h3 className="font-heading font-bold text-lg uppercase mb-1 group-hover:text-secondary transition-colors">{pkg.name}</h3>
                    <p className="text-muted-foreground text-sm font-sans">{pkg.desc}</p>
                  </div>
                  <span className="font-heading font-black text-primary text-lg whitespace-nowrap">{pkg.price}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* ─── 14. CTA ──────────────────────────────────────────────── */}
      <section id="contact" className="py-40 px-6 relative z-10 text-center">
        <div className="absolute inset-0 bg-primary/5 blur-[100px] -z-10" />
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="max-w-3xl mx-auto glass-panel p-12 md:p-20 border-primary/30 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-secondary/20 rounded-full blur-[50px]" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex justify-center mb-8"
          >
            <LogoMark size={96} />
          </motion.div>
          <AnimatedHeading text="Start a Project" className="text-4xl md:text-6xl font-heading font-black uppercase mb-6 text-glow-gold" delay={0.1} />
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-xl text-muted-foreground mb-10 font-sans">
            Ready to bring your vision to life? Whether it's a social campaign, a full brand film, or a CGI production — we're ready to build something extraordinary together.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:metamonkvisuals@gmail.com">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-xl tracking-widest rounded-none px-12 py-8 shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:shadow-[0_0_40px_rgba(255,215,0,0.7)] w-full sm:w-auto">
                GET IN TOUCH
              </Button>
            </a>
            <a href="mailto:metamonkvisuals@gmail.com">
              <Button size="lg" variant="outline" className="border-secondary/50 text-secondary hover:bg-secondary/10 font-heading text-xl tracking-widest rounded-none px-12 py-8 w-full sm:w-auto">
                SEND A BRIEF
              </Button>
            </a>
          </div>
        </motion.div>
      </section>
      {/* ─── NN. CTA ──────────────────────────────────────────────── */}
      <section id="contact" className="py-40 px-6 relative z-10 text-center">
        <div className="absolute inset-0 bg-primary/5 blur-[100px] -z-10" />
        <AboutUs />
      </section>


      {/* ─── 15. Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-border/20 py-12 px-6 bg-background relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div className="col-span-1">
              <LogoFull size={36} />
              <p className="text-muted-foreground text-sm font-sans mt-4 leading-relaxed">A creative multimedia studio turning bold ideas into cinematic reality — one frame at a time.</p>
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm tracking-widest uppercase mb-4 text-foreground/80">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground font-sans">
                {["Video Editing", "Motion Graphics", "VFX & Compositing", "CGI Production", "Content Production", "3D Animation"].map((s) => (
                  <li key={s}><a href="#services" className="hover:text-secondary transition-colors">{s}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm tracking-widest uppercase mb-4 text-foreground/80">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground font-sans">
                {[["#process", "Our Process"], ["#work", "Our Work"], ["#arsenal", "Tools We Use"], ["#contact", "Get a Quote"]].map(([href, label]) => (
                  <li key={label}><a href={href} className="hover:text-secondary transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm tracking-widest uppercase mb-4 text-foreground/80">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground font-sans">
                <li><a href="https://www.instagram.com/metamonkvisuals/" className="hover:text-secondary transition-colors">Instagram</a></li>
                <li><a href="https://www.linkedin.com/in/meta-monk-visuals-4a6a11408?utm_source=share_via&utm_content=profile&utm_medium=member_android" className="hover:text-secondary transition-colors">LinkedIn</a></li>
                <li><a href="https://www.youtube.com/@MetaMonkVisuals" className="hover:text-secondary transition-colors">YouTube</a></li>
                <li><a href="https://wa.me/9026811800" className="hover:text-secondary transition-colors">WhatsApp</a></li>
                <li><a href="mailto:metamonkvisuals@gmail.com" className="hover:text-secondary transition-colors">metamonkvisuals@gmail.com</a></li>
                <li><a href="tel:+917007926299" className="hover:text-secondary transition-colors">+91-7007926299</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm font-sans">© {new Date().getFullYear()} Meta Monk Visuals. All rights reserved.</p>
            <p className="text-xs text-muted-foreground/40 font-sans">Video Editing · Motion Graphics · VFX · CGI · Content Production</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Subcomponents ────────────────────────────────────────────────────────────

function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
      <p className="text-3xl md:text-5xl font-heading font-black text-primary mb-1" style={{ textShadow: "0 0 20px rgba(255,215,0,0.4)" }}>{value}</p>
      <p className="text-muted-foreground text-sm uppercase tracking-widest font-sans">{label}</p>
    </motion.div>
  );
}

function ServiceCard({ icon, title, desc, items, accent, delay, onChangeCategory }: { icon: React.ReactNode; title: string; desc: string; items: string[]; accent: string; delay: number; onChangeCategory: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className={`glass-panel p-6 border border-border/20 ${accent === "secondary" ? "hover:border-secondary/40" : "hover:border-primary/40"} transition-all group flex flex-col gap-4`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-11 h-11 flex items-center justify-center border ${accent === "secondary" ? "border-secondary/30 bg-secondary/10" : "border-primary/30 bg-primary/10"}`} style={{ clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%)" }}>
          {icon}
        </div>
        <h3 className="font-heading font-bold text-lg uppercase">{title}</h3>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed font-sans">{desc}</p>
      <ul className="space-y-1.5 mt-auto">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-xs font-sans text-foreground/70">
            <span className={`w-1 h-1 rounded-full ${accent === "secondary" ? "bg-secondary" : "bg-primary"} flex-shrink-0`} />
            {item}
          </li>
        ))}
      </ul>
      <button onClick={onChangeCategory} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase transition-all duration-300 group/btn hover:text-secondary cursor-pointer">
        Know More
        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
}

function WorkCard({ bg, label, title, desc, delay, className }: { bg: string; label: string; title: string; desc: string; delay: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      className={`relative bg-gradient-to-br ${bg} border border-border/20 hover:border-secondary/30 transition-all overflow-hidden group cursor-pointer flex flex-col justify-end p-6 ${className ?? "h-56"}`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
      <motion.div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <span className="text-xs font-heading tracking-widest text-secondary/80 uppercase block mb-1">{label}</span>
        <h3 className="font-heading font-bold text-xl uppercase mb-1">{title}</h3>
        <p className="text-muted-foreground text-sm font-sans">{desc}</p>
      </div>
      <motion.div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100" transition={{ duration: 0.2 }}>
        <ArrowRight className="w-5 h-5 text-secondary" />
      </motion.div>
    </motion.div>
  );
}

function TestimonialCard({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className="glass-panel p-6 border border-border/20 hover:border-secondary/20 text-left flex flex-col gap-4 transition-all"
    >
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />)}
      </div>
      <Quote className="w-6 h-6 text-secondary/40 flex-shrink-0" />
      <p className="text-foreground/80 font-sans italic leading-relaxed text-sm">{quote}</p>
      <div className="mt-auto pt-4 border-t border-border/20">
        <p className="font-heading font-bold text-sm uppercase">{author}</p>
        <p className="text-muted-foreground text-xs font-sans">{role}</p>
      </div>
    </motion.div>
  );
}
