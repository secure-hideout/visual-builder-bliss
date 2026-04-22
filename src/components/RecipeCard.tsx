import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Eye, Clock } from "lucide-react";
import StarRating from "./StarRating";
import FavoriteHeartButton from "./ui/FavoriteHeartButton";
import EnhancedImage from "./EnhancedImage";
import { logImageAnalysis } from "@/utils/imageDebugger";
import { motion } from "framer-motion";

interface RecipeCardProps {
  // Support both old and new API formats
  id?: string;
  recipe_id?: number;
  title?: string;
  name?: string;
  image?: string;
  image_url?: string;
  rating: number;
  category?: string;
  categories?: string[] | string | null;
  cook_time?: number;
  views?: number;
  is_popular?: boolean;
}

const RecipeCard = ({
  id,
  recipe_id,
  title,
  name,
  image,
  image_url,
  rating,
  category,
  categories,
  cook_time,
  views,
  is_popular
}: RecipeCardProps) => {
  // Use new API format if available, fallback to old format
  const recipeId = recipe_id?.toString() || id || '';
  const recipeName = name || title || '';

  // Determine the image URL, filtering out empty strings
  const recipeImage = (image_url && image_url.trim() !== '') ? image_url :
                      (image && image.trim() !== '') ? image :
                      '';

  // Debug: Analyze the image URL only if it exists
  if (recipeImage) {
    logImageAnalysis(recipeImage, `RecipeCard #${recipeId} - ${recipeName}`);
  } else {
    console.warn(`⚠️ RecipeCard #${recipeId} - ${recipeName}: No image URL provided, will use fallback`);
  }

  const viewCount = views || 0;

  // Determine which categories to display
  const displayCategories = Array.isArray(categories)
    ? categories
    : (typeof categories === 'string' && categories.length > 0)
    ? categories.split(',').map(c => c.trim())
    : category
    ? [category]
    : [];

  return (
    <Link to={`/recipes/${recipeId}`} className="block h-full group">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[2.5rem] h-full w-full light-sweep border border-white/10 shadow-2xl bg-black"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <EnhancedImage
            src={recipeImage}
            alt={recipeName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out-expo"
            fallbackSrc="https://placehold.co/400x300/1a1a1a/ffffff?text=Recipe"
            aspectRatio="video"
            showLoadingSpinner={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent z-10" />
          <FavoriteHeartButton recipeId={recipeId} />
          {is_popular && (
            <div className="absolute top-4 left-4 bg-primary text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl z-20">
              Popular
            </div>
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
          <h3 className="font-black text-2xl text-white uppercase tracking-tighter mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-500">
            {recipeName}
          </h3>
          
          <div className="flex items-center justify-between pt-6 border-t border-white/10 transition-colors group-hover:border-primary/30">
            <div className="flex items-center gap-4">
               {cook_time && (
                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/5">
                   <Clock className="w-3.5 h-3.5 text-primary" />
                   <span className="text-white text-[10px] font-black">{cook_time}M</span>
                 </div>
               )}
               <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/80 uppercase tracking-widest">
                 <Eye className="w-3.5 h-3.5 text-primary/70" />
                 {viewCount}
               </div>
            </div>
            
            <div className="flex items-center gap-2">
               <div className="text-[10px] font-black text-primary/90 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                 View Case →
               </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default RecipeCard;