import { useState, useEffect } from "react";
import { Home, BookOpen, Utensils, Video, ChefHat, X, Heart, User, Info, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { RecipeService } from "@/api/recipeService";

const navLinks = [
  { icon: Home,     label: "Home",      path: "/" },
  { icon: BookOpen, label: "Recipes",   path: "/recipes" },
  { icon: Utensils, label: "K-Bank",   path: "/k-bank" },
  { icon: Heart,    label: "Favorites", path: "/favorites" },
  { icon: Video,    label: "Shorts",    path: "/profile?tab=shorts" },
  { icon: User,     label: "Profile",   path: "/profile" },
  { icon: Info,     label: "About",     path: "/info" },
];

const DesktopNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-desktop-menu', handleOpen);
    return () => window.removeEventListener('open-desktop-menu', handleOpen);
  }, []);

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path.split("?")[0])) return true;
    return false;
  };

  return (
    <>
      {/* Sidebar trigger is now managed by MainHeader via 'open-desktop-menu' event */}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="hidden lg:block fixed inset-0 bg-black/60 backdrop-blur-sm z-[65]"
            />

            {/* Sidebar panel */}
            <motion.nav
              key="sidebar"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="hidden lg:flex fixed top-0 right-0 h-full w-80 z-[70] flex-col bg-black/80 backdrop-blur-3xl border-l border-white/10 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-7 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <img src="/beinghomelogo.jpeg" alt="BeingHomeFoods" className="w-10 h-10 rounded-full object-cover border-2 border-primary/50" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary/80 leading-none">Being Home</p>
                    <p className="text-base font-black text-white uppercase tracking-widest leading-none mt-0.5">Foods</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav Links */}
              <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {navLinks.map(({ icon: Icon, label, path }, i) => (
                  <motion.div
                    key={path}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      to={path}
                      onClick={() => setIsOpen(false)}
                      onMouseEnter={() => {
                        if (path === "/recipes") {
                          RecipeService.getRecipes(1, 30).catch(() => {});
                        }
                      }}
                      className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${
                        isActive(path)
                          ? "bg-primary/15 border border-primary/30 text-primary"
                          : "text-white/70 hover:bg-white/5 hover:text-white border border-transparent"
                      }`}
                    >
                      <div className={`p-2 rounded-xl transition-colors ${isActive(path) ? "bg-primary/20" : "bg-white/5 group-hover:bg-white/10"}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-semibold tracking-wide">{label}</span>
                      {isActive(path) && (
                        <motion.div layoutId="activeNavIndicator" className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.6)]" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Footer CTA */}
              <div className="px-4 pb-8 border-t border-white/10 pt-4">
                <Link to="/create-recipe" onClick={() => setIsOpen(false)}>
                  <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold transition-all shadow-[0_4px_24px_rgba(242,101,34,0.4)] hover:shadow-[0_4px_32px_rgba(242,101,34,0.6)]">
                    <Plus className="w-5 h-5" />
                    Create Recipe
                  </button>
                </Link>
                <p className="text-center text-white/20 text-xs mt-4">© {new Date().getFullYear()} BeingHomeFoods</p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DesktopNav;
