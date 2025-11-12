import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollSmoother from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger,ScrollSmoother);

export const useBodySmoothScroll = () => {
    if (typeof window === "undefined") return;
  
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  
    useGSAP(() => {
      const smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: isSafari ? 0.5 : 1, 
        effects: !isSafari, 
        normalizeScroll: !isSafari, 
        smoothTouch: isSafari ? false : 0.1,
      });
  
      const handleResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener('resize', handleResize);
  
      const handleAnchorClick = (e) => {
        e.preventDefault();
        const target = e.currentTarget.getAttribute('href');
        smoother.scrollTo(target, true, 'top top');
      };
  
      const links = document.querySelectorAll('a[href^="#"]');
      links.forEach((link) => link.addEventListener('click', handleAnchorClick));
  
      return () => {
        window.removeEventListener('resize', handleResize);
        links.forEach((link) => link.removeEventListener('click', handleAnchorClick));
        smoother.kill();
      };
    }, []);
  };