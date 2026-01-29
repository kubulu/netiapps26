"use client";

import { useEffect, useRef } from "react";
import styles from "./Hero.module.scss";

interface HeroImageInteractProps {
    src: string;
    alt: string;
}

export default function HeroImageInteract({ src, alt }: HeroImageInteractProps) {
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!imageRef.current) return;

            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Calculate position relative to center ( -1 to 1 )
            const xPos = (clientX / innerWidth - 0.5);
            const yPos = (clientY / innerHeight - 0.5);

            // Movement values
            // Translate moves the image slightly
            const translateX = xPos * 40;
            const translateY = yPos * 40;

            // Rotate gives the 3D tilt effect
            const rotateY = xPos * 10; // Rotate around Y axis based on X position
            const rotateX = -yPos * 10; // Rotate around X axis based on Y position invert for natural feel

            imageRef.current.style.transform = `
        perspective(1000px)
        translate3d(${translateX}px, ${translateY}px, 0)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className={styles.imageWrapper} style={{ perspective: "1000px" }}>
            <img
                ref={imageRef}
                src={src}
                alt={alt}
                className={styles.heroImage}
                style={{
                    transition: "transform 0.1s ease-out",
                    willChange: "transform",
                }}
            />
        </div>
    );
}
