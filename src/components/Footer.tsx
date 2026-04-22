import { Instagram, Twitter, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const Footer = () => {
  return (
    <footer className="relative mt-12 md:mt-20 pt-10 md:pt-16 pb-28 md:pb-32 px-5 md:px-8 bg-black/60 backdrop-blur-3xl border-t border-white/5 z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <img 
              src="/beinghomelogo.jpeg"
              alt="Being Home Logo" 
              className="h-12 sm:h-14 md:h-16 w-12 sm:w-14 md:w-16 object-cover rounded-full border-2 border-primary/50"
            />
            <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-widest leading-tight">
              Being Home <span className="text-primary">Foods</span>
            </h3>
          </div>
          <p className="text-white/50 text-xs md:text-sm font-light leading-relaxed max-w-md">
            Elevating the art of plant-based culinary experiences. We believe in pushing boundaries, exploring deep flavors, and honoring the earth's natural ingredients through aggressive, avant-garde molecular gastronomy.
          </p>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-sm md:text-md font-bold text-white uppercase tracking-widest">Our Vision</h4>
          <ul className="space-y-2 text-white/50 text-xs md:text-sm font-light">
            <li><Link to="#" className="hover:text-primary transition-all duration-300">The Philosophy</Link></li>
            <li><Link to="#" className="hover:text-primary transition-all duration-300">Ingredient Sourcing</Link></li>
            <li><Link to="#" className="hover:text-primary transition-all duration-300">Our Chefs</Link></li>
            <li><Link to="#" className="hover:text-primary transition-all duration-300">Reservations & Contact</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm md:text-md font-bold text-white uppercase tracking-widest">Follow the Journey</h4>
          <div className="flex gap-3 md:gap-4">
            <a href="#" className="p-2.5 md:p-3 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-all duration-300 text-white/70">
              <Instagram className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            <a href="#" className="p-2.5 md:p-3 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-all duration-300 text-white/70">
              <Twitter className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            <a href="#" className="p-2.5 md:p-3 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-all duration-300 text-white/70">
              <Facebook className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 md:mt-16 pt-8 border-t border-white/5 text-center text-white/20 text-[10px] md:text-xs font-light uppercase tracking-[0.2em]">
        © {new Date().getFullYear()} BeingHomeFoods. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
