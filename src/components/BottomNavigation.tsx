import { Home, BookOpen, Utensils, Video, ChefHat } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { RecipeService, type RandomRecipeResponse } from "@/api/recipeService";
import { toast } from "sonner";
import RandomRecipeModal from "@/components/RandomRecipeModal";

const navItems = [
  { icon: Home,     label: "Home",    path: "/" },
  { icon: BookOpen, label: "Recipes", path: "/recipes" },
  { icon: Utensils, label: "K-Bank",  path: "/k-bank" },
  { icon: Video,    label: "Shorts",  path: "/profile?tab=shorts" },
  { icon: ChefHat,  label: "Cook",    path: "#", isAction: true },
];

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isRandomModalOpen, setIsRandomModalOpen] = useState(false);
  const [randomRecipe, setRandomRecipe] = useState<RandomRecipeResponse | null>(null);
  const [isLoadingRandom, setIsLoadingRandom] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && path !== "#" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleWhatToCook = async () => {
    setIsRandomModalOpen(true);
    setIsLoadingRandom(true);
    try {
      const response = await RecipeService.getRandomRecipe();
      if (response.success && response.data) {
        setRandomRecipe(response.data);
      } else {
        toast.error("Failed to get random recipe");
      }
    } catch {
      toast.error("Failed to get random recipe. Please try again.");
    } finally {
      setIsLoadingRandom(false);
    }
  };

  return (
    <div className="lg:hidden">
      {/* ===================================================
          MOBILE BOTTOM NAV
          position:fixed is ONLY reliable when NO ancestor
          has a CSS transform applied. App.tsx is written to
          guarantee this. Do not add transform to App wrapper.
          =================================================== */}
      <nav
        className="lg:hidden"
        style={{
          position: "fixed",
          bottom: "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "calc(100% - 2.5rem)",
          maxWidth: "420px",
          zIndex: 9999,
        }}
      >
        <div
          style={{
            background: "rgba(10, 10, 15, 0.85)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "1.75rem",
            boxShadow: "0 25px 50px rgba(0,0,0,0.8), 0 0 0 0.5px rgba(255,255,255,0.05) inset",
            padding: "0.5rem 0.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            if (item.isAction) {
              return (
                <button
                  key={item.label}
                  onClick={handleWhatToCook}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "3px",
                    padding: "8px 12px",
                    borderRadius: "1.25rem",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.5)",
                    minWidth: "52px",
                    transition: "color 0.2s",
                  }}
                >
                  <motion.div whileTap={{ scale: 0.75 }}>
                    <Icon size={22} strokeWidth={1.8} />
                  </motion.div>
                  <span style={{ fontSize: "10px", fontWeight: 500, fontFamily: "'Outfit', sans-serif" }}>
                    {item.label}
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "3px",
                  padding: "8px 12px",
                  borderRadius: "1.25rem",
                  textDecoration: "none",
                  color: active ? "hsl(160, 30%, 40%)" : "rgba(255,255,255,0.5)",
                  backgroundColor: active ? "rgba(82, 123, 108, 0.15)" : "transparent",
                  minWidth: "52px",
                  transition: "all 0.2s",
                }}
              >
                <motion.div whileTap={{ scale: 0.75 }}>
                  <Icon size={22} strokeWidth={active ? 2.2 : 1.8} />
                </motion.div>
                <span style={{ fontSize: "10px", fontWeight: active ? 600 : 500, fontFamily: "'Outfit', sans-serif" }}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Floating Dock */}
      <nav className="hidden lg:block" style={{ position: "fixed", bottom: "2rem", left: "50%", transform: "translateX(-50%)", zIndex: 9999 }}>
        <div
          style={{
            background: "rgba(10, 10, 15, 0.85)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "9999px",
            boxShadow: "0 25px 50px rgba(0,0,0,0.7)",
            padding: "0.5rem 1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            if (item.isAction) {
              return (
                <button
                  key={item.label}
                  onClick={handleWhatToCook}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "2px",
                    padding: "8px 16px",
                    borderRadius: "9999px",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.5)",
                    transition: "all 0.2s",
                  }}
                >
                  <motion.div whileTap={{ scale: 0.8 }}>
                    <Icon size={20} />
                  </motion.div>
                  <span style={{ fontSize: "11px", fontWeight: 500 }}>{item.label}</span>
                </button>
              );
            }
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "2px",
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  textDecoration: "none",
                  color: active ? "hsl(160, 30%, 40%)" : "rgba(255,255,255,0.5)",
                  backgroundColor: active ? "rgba(82, 123, 108, 0.15)" : "transparent",
                  transition: "all 0.2s",
                }}
              >
                <motion.div whileTap={{ scale: 0.8 }}>
                  <Icon size={20} strokeWidth={active ? 2.2 : 1.8} />
                </motion.div>
                <span style={{ fontSize: "11px", fontWeight: active ? 600 : 500 }}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <RandomRecipeModal
        isOpen={isRandomModalOpen}
        onClose={() => { setIsRandomModalOpen(false); setRandomRecipe(null); }}
        recipe={randomRecipe}
        isLoading={isLoadingRandom}
        onStartCooking={(id) => { setIsRandomModalOpen(false); navigate(`/recipes/${id}`); }}
        onTryAnother={async () => {
          setRandomRecipe(null);
          setIsLoadingRandom(true);
          try {
            const r = await RecipeService.getRandomRecipe();
            if (r.success && r.data) setRandomRecipe(r.data);
          } catch { toast.error("Failed"); }
          finally { setIsLoadingRandom(false); }
        }}
      />
    </div>
  );
};

export default BottomNavigation;