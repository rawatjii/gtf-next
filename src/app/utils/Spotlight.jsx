"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function Spotlight() {
    const portalRef = useRef(null);
    const spotlightRef = useRef(null);
    const rafRef = useRef(null);
    const pointer = useRef({ x: 0, y: 0, dirty: false });

    const [mounted, setMounted] = useState(false);

    // Create portal root once
    useEffect(() => {
        const div = document.createElement("div");
        div.className = "spotlight-portal-root";
        portalRef.current = div;

        document.body.appendChild(div);
        setMounted(true);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            if (portalRef.current) {
                document.body.removeChild(portalRef.current);
            }
        };
    }, []);

    // Mouse & touch tracking
    useEffect(() => {
        if (!mounted) return;

        const updateSpotlight = () => {
            rafRef.current = null;

            if (!spotlightRef.current) return;

            if (pointer.current.dirty) {
                const { x, y } = pointer.current;

                // Final gradient (safe & optimized)
                spotlightRef.current.style.background =
                    `radial-gradient(circle at ${x}px ${y}px,
                        rgba(230,170,90,0.10),
                        transparent 25%)`;

                pointer.current.dirty = false;
            }
        };

        const handleMove = (e) => {
            pointer.current.x = e.clientX;
            pointer.current.y = e.clientY;
            pointer.current.dirty = true;

            if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(updateSpotlight);
            }
        };

        const handleTouchMove = (e) => {
            if (!e.touches?.length) return;
            const t = e.touches[0];
            handleMove({ clientX: t.clientX, clientY: t.clientY });
        };

        window.addEventListener("mousemove", handleMove, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: true });

        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("touchmove", handleTouchMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [mounted]);

    if (!mounted) return null;

    return createPortal(
        <div
            ref={spotlightRef}
            className="spotlight-layer"
            aria-hidden="true"
        />,
        portalRef.current
    );
}
