import { motion } from "framer-motion";
import { Mail, Phone, ChefHat, Leaf, Star, Users } from "lucide-react";
import MainHeader from "../components/MainHeader";

const stats = [
  { icon: ChefHat, label: "Recipes", value: "500+" },
  { icon: Users,   label: "Cooks",   value: "10K+" },
  { icon: Star,    label: "Reviews", value: "50K+" },
  { icon: Leaf,    label: "Veg First", value: "100%" },
];

const features = [
  { title: "Home-cooked Goodness", desc: "Every recipe is crafted by real home cooks — no fancy restaurants, just pure love on a plate." },
  { title: "Discover & Share",     desc: "Submit your own family recipes, discover regional classics, and build a personal cookbook." },
  { title: "Ingredient-First",     desc: "Search by what's in your kitchen. We help you cook with what you have, not what you wish you had." },
];

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-transparent pb-28" style={{ position: "relative" }}>
      <MainHeader />

      <main className="max-w-2xl mx-auto px-5 pt-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="w-24 h-24 mx-auto mb-8 rounded-3xl overflow-hidden border-2 border-primary/30 shadow-[0_0_60px_rgba(82,123,108,0.3)] bg-white/5 flex items-center justify-center p-2">
            <img src="/beinghomelogo.jpeg" alt="BeingHomeFoods" className="w-full h-full object-contain rounded-2xl" />
          </div>
          <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
            Being Home<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Foods</span>
          </h1>
          <p className="text-white/60 text-lg font-light leading-relaxed">
            Where every meal is a memory. A community-built recipe platform celebrating the art of home cooking.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-4 gap-3 mb-16"
        >
          {stats.map(({ icon: Icon, label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <Icon className="w-5 h-5 text-primary" />
              <span className="text-xl font-black text-white">{value}</span>
              <span className="text-xs text-white/40 uppercase tracking-wider">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Cards */}
        <div className="space-y-4 mb-16">
          {features.map(({ title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-primary/30 hover:bg-black/50 transition-all group"
            >
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-primary transition-colors">{title}</h3>
              <p className="text-white/60 font-light leading-relaxed text-sm">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-orange-500/5 border border-primary/20 backdrop-blur-md text-center mb-8"
        >
          <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Get In Touch</h2>
          <p className="text-white/50 text-sm mb-6">Want to partner with us or have a question?</p>
          <div className="space-y-3">
            <a href="mailto:john@example.com" className="flex items-center justify-center gap-3 text-white/80 hover:text-primary transition-colors group">
              <div className="p-2 rounded-full bg-white/5 group-hover:bg-primary/10 transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <span className="font-medium">john@example.com</span>
            </a>
            <a href="tel:+1123456678" className="flex items-center justify-center gap-3 text-white/80 hover:text-primary transition-colors group">
              <div className="p-2 rounded-full bg-white/5 group-hover:bg-primary/10 transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <span className="font-medium">+1 123 456 678</span>
            </a>
          </div>
        </motion.div>

        <p className="text-center text-white/20 text-xs pb-4">© {new Date().getFullYear()} BeingHomeFoods. Made with ❤️</p>
      </main>
    </div>
  );
}
