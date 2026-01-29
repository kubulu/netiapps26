import React from "react";
import styles from "./Ripple.module.scss";

interface RippleProps {
    mainCircleSize?: number;
    mainCircleOpacity?: number;
    numCircles?: number;
}

const Ripple = React.memo(function Ripple({
    mainCircleSize = 210,
    mainCircleOpacity = 0.24,
    numCircles = 8,
}: RippleProps) {
    return (
        <div className={styles.container}>
            {Array.from({ length: numCircles }).map((_, i) => {
                const size = mainCircleSize + i * 70;
                const opacity = mainCircleOpacity - i * 0.03;
                const animationDelay = `${i * 0.06}s`;
                const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
                const borderOpacity = 5 + i * 5;

                return (
                    <div
                        key={i}
                        className={styles.circle}
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            opacity: opacity, // This is base opacity, usually 
                            animationDelay: animationDelay,
                            borderStyle: "solid",
                            borderWidth: "1px",
                            borderColor: `rgba(0,0,0, ${opacity * 0.5})`, // Adjust color as needed
                            // @ts-ignore
                            "--i": i,
                        } as React.CSSProperties}
                    ></div>
                );
            })}
        </div>
    );
});

export default Ripple;
