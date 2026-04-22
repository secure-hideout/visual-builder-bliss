import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import InfoIconButton from "./ui/InfoIconButton";
import Magnetic from "./Magnetic";
import { RecipeService } from "@/api/recipeService";

interface MainHeaderProps {
  children?: React.ReactNode;
}

const MainHeader = ({ children }: MainHeaderProps) => {
  const openMenu = () => {
    window.dispatchEvent(new CustomEvent('open-desktop-menu'));
  };

  return (
    <div className="sticky top-0 w-full z-50 bg-black/60 backdrop-blur-3xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3 md:py-4">
        {/* Brand Row */}
        <div className="flex items-center justify-between">
          <Magnetic strength={0.15}>
            <Link 
              to="/" 
              className="flex items-center gap-3 active:scale-95 transition-transform"
              onMouseEnter={() => {
                // Prefetch home data (popular recipes)
                RecipeService.getPopularRecipes(1, 6).catch(() => {});
              }}
            >
              <img src="/beinghomelogo.jpeg" alt="BeingHomeFoods" className="w-10 h-10 rounded-full object-cover border-2 border-primary/50" />
              <div className="flex flex-col">
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 leading-none">Being Home</span>
                <span className="text-xs md:text-sm font-black uppercase tracking-widest text-white leading-none mt-1">Foods</span>
              </div>
            </Link>
          </Magnetic>
          
          <div className="flex items-center gap-3 md:gap-4">
            <InfoIconButton />
            <Magnetic strength={0.3}>
              <button
                onClick={openMenu}
                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 transition-all group"
              >
                <Menu className="w-5 h-5 text-white/50 group-hover:text-primary transition-colors" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">Menu</span>
              </button>
            </Magnetic>
          </div>
        </div>
        
        {/* Extra Content (e.g. Search Bar in Recipes Page) */}
        {children && (
          <div className="mt-4 md:mt-5">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainHeader;
