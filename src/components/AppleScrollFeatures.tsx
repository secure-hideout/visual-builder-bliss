import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, BookOpen, Sparkles } from "lucide-react";

const features = [
  {
    icon: Leaf,
    tag: "Pure & Natural",
    title: "Vegetarian First",
    desc: "Every recipe celebrates plant-based ingredients. Real food, real flavours — crafted with love for the earth and your health.",
    color: "from-green-500/20 to-emerald-500/5",
    iconColor: "text-green-400",
  },
  {
    icon: BookOpen,
    tag: "Community Driven",
    title: "Cooked by Home Chefs",
    desc: "Not a restaurant chain. Not a food corporation. Every recipe here is submitted by a real home cook — your neighbour, your family, you.",
    color: "from-primary/20 to-orange-500/5",
    iconColor: "text-primary",
  },
  {
    icon: Sparkles,
    tag: "Smart Discovery",
    title: "Cook What You Have",
    desc: "Out of ideas? Tell us what's in your kitchen and we'll find the perfect recipe. No grocery runs, no waste — just inspired cooking.",
    color: "from-purple-500/20 to-violet-500/5",
    iconColor: "text-purple-400",
  },
];

export default function AppleScrollFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  return (
    <section ref={containerRef} className="py-8 mb-8">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12 px-2"
      >
        <p className="text-primary text-sm font-bold uppercase tracking-[0.3em] mb-3">Why Us</p>
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
          Made for<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
            Real Cooks
          </span>
        </h2>
      </motion.div>

      {/* Feature cards — staggered whileInView cascade (Apple style) */}
      <div className="space-y-5">
        {features.map(({ icon: Icon, tag, title, desc, color, iconColor }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.12,
              ease: [0.25, 0.46, 0.45, 0.94], // Apple's signature easing
            }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className={`relative overflow-hidden p-6 md:p-8 rounded-3xl bg-gradient-to-br ${color} border border-white/10 backdrop-blur-md cursor-default`}
          >
            {/* Subtle glow orb */}
            <div className={`absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${color} blur-2xl opacity-60`} />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10">
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <span className={`text-xs font-bold uppercase tracking-[0.25em] ${iconColor}`}>{tag}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight">{title}</h3>
              <p className="text-white/60 font-light leading-relaxed">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll progress bar (Apple page indicator style) */}
      <div className="flex justify-center gap-2 mt-8">
        {features.map((_, i) => (
          <motion.div
            key={i}
            style={{
              opacity: useTransform(
                scrollYProgress,
                [i / features.length, (i + 1) / features.length],
                [0.3, 1]
              ),
            }}
            className="w-8 h-1 rounded-full bg-primary"
          />
        ))}
      </div>
    </section>
  );
}
