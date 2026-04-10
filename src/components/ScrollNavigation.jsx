import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = ['/', '/project', '/resume', '/experience', '/education', '/skills', '/achievement', '/contact'];

export default function ScrollNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const isScrolling = useRef(false);
  const lastScrollTime = useRef(0);

  useEffect(() => {
    const handleWheel = (e) => {
      // Threshold to prevent accidental scrolls
      if (Math.abs(e.deltaY) < 30) return;

      const now = Date.now();
      if (now - lastScrollTime.current < 1200) return; // Cooldown period

      const currentIndex = navItems.indexOf(location.pathname);
      if (currentIndex === -1) return;

      if (e.deltaY > 0 && currentIndex < navItems.length - 1) {
        // Scroll Down -> Next Page
        lastScrollTime.current = now;
        navigate(navItems[currentIndex + 1], { state: { direction: 'down' } });
      } else if (e.deltaY < 0 && currentIndex > 0) {
        // Scroll Up -> Previous Page
        lastScrollTime.current = now;
        navigate(navItems[currentIndex - 1], { state: { direction: 'up' } });
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaY) < 50) return;

      const now = Date.now();
      if (now - lastScrollTime.current < 1200) return;

      const currentIndex = navItems.indexOf(location.pathname);
      if (currentIndex === -1) return;

      if (deltaY > 50 && currentIndex < navItems.length - 1) {
        // Swipe Up -> Next Page
        lastScrollTime.current = now;
        navigate(navItems[currentIndex + 1], { state: { direction: 'down' } });
      } else if (deltaY < -50 && currentIndex > 0) {
        // Swipe Down -> Previous Page
        lastScrollTime.current = now;
        navigate(navItems[currentIndex - 1], { state: { direction: 'up' } });
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [location.pathname, navigate]);

  return null;
}
