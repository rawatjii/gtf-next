'use client';

import { useEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import { FaPlay, FaPause } from "react-icons/fa";

export default function Cursor() {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const isHovered = useRef(false);
  const glowRef = useRef(null);
  const video_cursor_btns = useRef(null);

  const [isVideoClicked, setIsVideoClicked] = useState(false);
  const [isVideoPlay, setIsVideoPlay] = useState(true);

  useEffect(() => {
    const cursor = cursorRef.current;
    const text = textRef.current;
    const glow = glowRef.current;
    const video_cursor = video_cursor_btns.current;

    if (!cursor || !text || !glow) return;

    // Hide default cursor
    // document.body.style.cursor = 'none';

    const moveCursor = (e) => {
      // Main cursor
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.9,
        ease: "power3.out"
      });

      // Radial glow (slightly delayed for trailing effect)
      gsap.to(glow, {
        x:e.clientX,
        y:e.clientY,
        duration:0.6,
        ease:"power2.out"
      })
    };

    const onEnter = (e) => {
      if (isHovered.current) return;

      const target = e.target;
      const hoverable = target.closest('a.cursor-hover, button.cursor-hover, [data-cursor-hover], [data-cursor="hover"], .cursor-hover');
      const videoCursorHover = target.closest('.video_cursor');

      if(videoCursorHover){
        isHovered.current = true;
        document.body.style.cursor = 'none';  // This hides the default cursor

        gsap.to(cursor, {
          width: 50,
          height: 50,
          alignItems:"center",
          justifyContent:"center",
          backgroundColor: '#e24397',
          duration: 0.5,
          opacity: 1,
          ease: "back.out(1.7)"
        });

        gsap.to(video_cursor, {
          opacity:1,
          duration: 0.5,
          ease: "back.out(1.7)"
        })
      }

      

      if (hoverable) {
        isHovered.current = true;
        document.body.style.cursor = 'auto';

        gsap.to(cursor, {
          width: 90,
          height: 90,
          backgroundColor: 'white',
          duration: 0.5,
          ease: "back.out(1.7)"
        });

        gsap.to(glow, {
          // scale: 1.6,
          // opacity: 0.6,
          duration: 0.5,
          ease: "power2.out",
        });

        gsap.to(text, {
          opacity: 1,
          duration: 0.3,
          delay: 0.2,
          color:"#555"
        });
      }else{

        gsap.to(text, {
          opacity: 0,
          duration: 0.2
        });

        gsap.to(video_cursor, {
          opacity: 0,
          duration: 0.2
        });
      }
    };

    const onLeave = () => {
      if (!isHovered.current) return;

      isHovered.current = false;

      document.body.style.cursor = '';

      gsap.to(cursor, {
        width: 15,
        height: 15,
        backgroundColor: '#ef4444',
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });

      gsap.to(glow, {
        scale: 1,
        // opacity: 0.35,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(text, {
        opacity: 0,
        duration: 0.2
      });

      gsap.to(video_cursor, {
        opacity:0,
        duration: 0.2,
        ease: "power2.out",
      })
    };

    // Track mouse position (uses real pointer, works with Lenis)
    document.addEventListener('mousemove', moveCursor);

    // Global hover detection
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);

    // Optional: Add to specific elements only
    // const links = document.querySelectorAll('a, button, [data-cursor-hover]');
    // links.forEach(el => {
    //   el.addEventListener('mouseenter', onEnter);
    //   el.addEventListener('mouseleave', onLeave);
    // });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (

    <>
      <div
        ref={glowRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 600,
          height: 600,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255,0,0,0.35) 0%, rgba(255,0,0,0) 70%)',
          filter: 'blur(40px)',
          opacity: 0.28,
        }}
      />

      
    <div
      ref={cursorRef}
      className='flex items-center justify-center'
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 15,
        height: 15,
        backgroundColor: '#ef4444',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        mixBlendMode: 'difference', // Magic: auto inverts color!
      }}
    >
      <div
        ref={textRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '14px',
          textTransform:"uppercase",
          fontWeight: '600',
          letterSpacing: '0.5px',
          opacity: 0,
          zIndex:'99',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        View
      </div>

      <div
        ref={video_cursor_btns}
        className='video_cursor_btns flex items-center justify-center'
          style={{
            opacity:0,

          }}
        >
          {!isVideoClicked ? (
            <FaPlay size={14} />
          ) : (
            <FaPause size={14} />
          )}
      </div>
    </div>
    </>
  );
}