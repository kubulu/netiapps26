"use client";

import { useEffect, useRef } from "react";

interface DottedWaveProps {
    color?: string;
}

export default function DottedWave({ color = "rgba(51, 51, 51, 0.3)" }: DottedWaveProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        // Grid configuration
        const DOT_GAP = 10; // Wider gap for grid looks better
        const FIELD_OF_VIEW = 1900;

        // Canvas state
        let cols = 0;
        let rows = 0;
        let width = 0;
        let height = 0;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            cols = Math.ceil(width / DOT_GAP) + 15;
            rows = Math.ceil(height / DOT_GAP) + 15;
        };

        window.addEventListener("resize", resize);
        resize();

        // Helper to calculate 3D -> 2D projection for a grid point
        const project = (c: number, r: number, t: number) => {
            // Base positions centered
            const startX = -(cols * DOT_GAP) / 2;
            const startY = -(rows * DOT_GAP) / 2;

            const x = startX + c * DOT_GAP;
            const y = startY + r * DOT_GAP;

            // 1. Calculate Wave Height (Z)
            const wave1 = Math.sin(c * 0.2 + t) * 40;
            const wave2 = Math.cos(r * 0.2 + t) * 40;
            const z = wave1 + wave2;

            // 2. 3D Transforms (Tilt) - Rotate around X axis
            const tiltX = 0.5; // Tilt forward
            // y' = y*cos(theta) - z*sin(theta)
            // z' = y*sin(theta) + z*cos(theta)
            const yRotated = y * Math.cos(tiltX) - z * Math.sin(tiltX);
            const zRotated = y * Math.sin(tiltX) + z * Math.cos(tiltX) + 400; // Push back significantly

            // 3. Perspective Projection
            // scale = fov / (fov + z_depth)
            const scale = FIELD_OF_VIEW / (FIELD_OF_VIEW + zRotated);

            const x2d = (x * scale) + width / 2;
            const y2d = (yRotated * scale) + height / 2 - 0; // Move up by 100px

            return { x: x2d, y: y2d, scale };
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.strokeStyle = color;

            // Calculate all projected points first
            // We store them in a 1D array for performance: p[r * cols + c]
            // or just calculate "current" and "next" on the fly?
            // For grid lines, we need (r, c) to connect to (r, c+1) and (r+1, c).

            // Optimization: We can compute just the current row and the previous row to save memory?
            // But grid is small enough (~50x30 points), full array is fine.

            const projected = new Array(rows * cols);

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    projected[r * cols + c] = project(c, r, time);
                }
            }

            ctx.beginPath();

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const curr = projected[r * cols + c];
                    if (curr.scale <= 0) continue; // Behind camera

                    // Draw Horizontal Line (to right neighbor)
                    if (c < cols - 1) {
                        const right = projected[r * cols + c + 1];
                        if (right.scale > 0) {
                            ctx.moveTo(curr.x, curr.y);
                            ctx.lineTo(right.x, right.y);
                        }
                    }

                    // Draw Vertical Line (to bottom neighbor)
                    if (r < rows - 1) {
                        const bottom = projected[(r + 1) * cols + c];
                        if (bottom.scale > 0) {
                            ctx.moveTo(curr.x, curr.y);
                            ctx.lineTo(bottom.x, bottom.y);
                        }
                    }
                }
            }

            ctx.stroke();

            time += 0.015;
            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [color]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 0,
            }}
        />
    );
}
