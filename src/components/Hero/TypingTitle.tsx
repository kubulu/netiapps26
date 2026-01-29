"use client";

import { useEffect, useState, useRef } from "react";

interface TypingTitleProps {
    text: string;
    isTyping: boolean;
    typingSpeed?: number;
}

export default function TypingTitle({ text, isTyping, typingSpeed = 50 }: TypingTitleProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [hasCompleted, setHasCompleted] = useState(false);
    const animationRef = useRef<number>(null);

    useEffect(() => {
        // Reset when not typing (slide inactive) or text changes
        if (!isTyping) {
            setDisplayedText("");
            setHasCompleted(false);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            return;
        }

        // Parse the HTML string into tokens (text characters and HTML tags)
        // This allows us to "type" text but preserve HTML structure instantly
        const tokens: string[] = [];
        const tagRegex = /(<[^>]*>)/;
        const parts = text.split(tagRegex);

        parts.forEach((part) => {
            if (tagRegex.test(part)) {
                // It's a tag, treat as a single token
                tokens.push(part);
            } else {
                // It's text, split into characters
                part.split("").forEach((char) => tokens.push(char));
            }
        });

        let currentIndex = 0;
        let lastTime = 0;

        const animate = (time: number) => {
            if (!lastTime) lastTime = time;
            const deltaTime = time - lastTime;

            if (deltaTime > typingSpeed) {
                if (currentIndex < tokens.length) {
                    setDisplayedText((prev) => prev + tokens[currentIndex]);
                    currentIndex++;
                    lastTime = time;
                } else {
                    setHasCompleted(true);
                    return;
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [text, isTyping, typingSpeed]);

    // If typing is done/static fallback, verify valid HTML
    // While typing, the HTML might be temporarily unclosed if we cut mid-tag, 
    // BUT our token logic adds full tags instantly, so structure should be preserved 
    // assuming tags are not split.

    return (
        <div
            dangerouslySetInnerHTML={{ __html: displayedText }}
            style={{ minHeight: '1.1em' }} // Prevent layout shift 
        />
    );
}
