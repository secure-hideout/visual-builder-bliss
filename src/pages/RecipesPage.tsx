import { useState, useEffect, useRef } from "react";
import MainHeader from "../components/MainHeader";
import { Search, ChefHat, Plus, Loader2, Filter, X, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MobileHeader from "@/components/MobileHeader";
import RecipeCard from "@/components/RecipeCard";
import RandomRecipeModal from "@/components/RandomRecipeModal";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { RecipeService, type RecipeListItem, type RandomRecipeResponse } from "@/api/recipeService";
import { RECIPE_CATEGORIES, type RecipeCategory } from "@/api/config";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import CinematicText from "../components/CinematicText";
import Magnetic from "../components/Magnetic";

const RecipesPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<RecipeListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDietaryType, setSelectedDietaryType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Random recipe modal state
  const [isRandomModalOpen, setIsRandomModalOpen] = useState(false);
  const [randomRecipe, setRandomRecipe] = useState<RandomRecipeResponse | null>(null);
  const [isLoadingRandom, setIsLoadingRandom] = useState(false);

  const categories = ["All", ...RECIPE_CATEGORIES];
  const dietaryTypes = ["All", "Veg", "Non-Veg", "Egg", "Vegan"];
  
  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // 500ms debounce
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Sync search from URL
  useEffect(() => {
    const paramSearch = searchParams.get('search') || '';
    if (paramSearch !== searchQuery) {
      setSearchQuery(paramSearch);
    }
  }, [searchParams]);

  // Robust Fetching Logic
  const fetchRecipes = async () => {
    try {
      setIsLoading(true);
      
      const hasFilters = debouncedSearchQuery.trim() || selectedCategory !== "All" || selectedDietaryType !== "All";
      
      let response;
      if (hasFilters) {
        // Try Search API
        response = await RecipeService.searchRecipes({
          search: debouncedSearchQuery.trim() || undefined,
          meal_type: selectedCategory !== "All" ? selectedCategory as RecipeCategory : undefined,
          dietary_type: selectedDietaryType !== "All" ? selectedDietaryType : undefined,
          page: 1, limit: 30
        });
      } else {
        // Default to main recipes endpoint for maximum robustness
        response = await RecipeService.getRecipes(1, 30);
      }

      if (response.success && response.data) {
        setRecipes(response.data);
      } else {
        setRecipes([]);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [selectedCategory, selectedDietaryType, debouncedSearchQuery]);

  // Floating Button Expansion Logic (Safari optimized)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) setIsExpanded(true);
        else if (currentScrollY < lastScrollY - 20) setIsExpanded(false);
      } else {
        setIsExpanded(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleWhatToCook = async () => {
    setIsRandomModalOpen(true);
    await fetchRandomRecipe();
  };

  const fetchRandomRecipe = async () => {
    setIsLoadingRandom(true);
    try {
      const response = await RecipeService.getRandomRecipe();
      if (response.success && response.data) setRandomRecipe(response.data);
    } catch (error) {
      console.error('Error fetching random recipe:', error);
    } finally {
      setIsLoadingRandom(false);
    }
  };

  const handleStartCooking = (recipeId: number) => {
    setIsRandomModalOpen(false);
    navigate(`/recipes/${recipeId}`);
  };

  const handleTryAnother = async () => {
    setRandomRecipe(null);
    await fetchRandomRecipe();
  };

  return (
    <div className="min-h-screen bg-transparent pb-32">
      <MobileHeader />
      
      {/* Editorial Depth Layer */}
      <div className="fixed top-24 left-6 pointer-events-none select-none z-0 opacity-[0.02]">
        <h1 className="text-[15vw] font-black uppercase leading-none tracking-tighter text-white">
          COLLECTION
        </h1>
      </div>

      <MainHeader>
        <div className="flex flex-col gap-6 py-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-8 bg-primary/60"></div>
                <span className="text-primary/70 text-[9px] font-black uppercase tracking-[0.4em]">Explore Collections</span>
              </div>
              <div className="overflow-hidden">
                <motion.h1 
                  initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl sm:text-6xl md:text-9xl font-black text-white uppercase tracking-tighter leading-[0.85]"
                >
                  ALL <span className="text-transparent bg-clip-text bg-gradient-to-b from-primary via-primary/80 to-primary/40">RECIPES</span>
                </motion.h1>
              </div>
            </div>
            
            {/* Standard Premium Filter Bar */}
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-3xl w-full md:w-auto overflow-hidden">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
                <input
                  type="text" placeholder="Search..." value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-11 pr-4 bg-transparent text-white placeholder:text-white/25 text-sm focus:outline-none"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <div className="h-6 w-px bg-white/10 hidden md:block" />
              <Select value={selectedDietaryType} onValueChange={setSelectedDietaryType}>
                <SelectTrigger className="w-28 h-10 border-none bg-transparent text-white text-xs font-bold focus:ring-0">
                  <SelectValue placeholder="Diet" />
                </SelectTrigger>
                <SelectContent className="bg-charcoal/90 backdrop-blur-xl border-white/10">
                  {dietaryTypes.map((type) => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                </SelectContent>
              </Select>
              <button onClick={fetchRecipes} className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20 transition-transform active:scale-95">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
            {categories.map((category) => (
              <button
                key={category} onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all border whitespace-nowrap ${
                  selectedCategory === category 
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                    : "bg-white/5 text-white/40 border-white/5 hover:bg-white/10 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </MainHeader>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 relative z-10">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] rounded-3xl bg-white/5 border border-white/5 animate-pulse" />
              ))}
            </motion.div>
          ) : recipes.length > 0 ? (
            <motion.div key="grid" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe, i) => (
                  <motion.div
                    key={recipe.recipe_id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay: (i % 6) * 0.08 }}
                  >
                    <RecipeCard {...recipe} />
                  </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                <ChefHat className="w-10 h-10 text-white/20" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">No Recipes Found</h3>
              <p className="text-white/40 font-light max-w-sm">We couldn't find any recipes matching your filters. Try adjusting your search or category.</p>
              <Button onClick={() => { setSelectedCategory("All"); setSelectedDietaryType("All"); setSearchQuery(""); }} variant="link" className="mt-6 text-primary uppercase text-xs font-black tracking-widest">Clear All Filters</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-28 right-6 z-40 flex flex-col gap-3">
        <Link to="/create-recipe">
          <Button className={`bg-white/10 text-white border border-white/20 hover:bg-white/20 rounded-full transition-all duration-500 shadow-2xl backdrop-blur-xl ${isExpanded ? 'px-6 min-w-[200px] h-14' : 'w-14 h-14 p-0'}`}>
            <Plus className="w-5 h-5 flex-shrink-0" />
            <AnimatePresence>
              {isExpanded && (
                <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="ml-3 text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap">Create Recipe</motion.span>
              )}
            </AnimatePresence>
          </Button>
        </Link>
        <Magnetic strength={0.3}>
          <Button onClick={handleWhatToCook} className={`bg-primary text-white hover:bg-primary/90 rounded-full transition-all duration-500 shadow-2xl shadow-primary/20 ${isExpanded ? 'px-6 min-w-[200px] h-14' : 'w-14 h-14 p-0'}`}>
            <ChefHat className="w-5 h-5 flex-shrink-0" />
            <AnimatePresence>
              {isExpanded && (
                <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="ml-3 text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap">What to Cook</motion.span>
              )}
            </AnimatePresence>
          </Button>
        </Magnetic>
      </div>

      <RandomRecipeModal
        isOpen={isRandomModalOpen} onClose={() => setIsRandomModalOpen(false)}
        recipe={randomRecipe} isLoading={isLoadingRandom}
        onStartCooking={handleStartCooking} onTryAnother={handleTryAnother}
      />
    </div>
  );
};

export default RecipesPage;