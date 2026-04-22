import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top of the page when the route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use instant to avoid jarring visible scroll
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
