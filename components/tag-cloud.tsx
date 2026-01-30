"use client"

import React, { useEffect, useState, useRef, useMemo } from "react"
import { motion } from "framer-motion"

interface TagCloudProps {
    tags: string[]
    radius?: number
}

export function TagCloud({ tags, radius = 200 }: TagCloudProps) {
    const [rotation, setRotation] = useState({ x: 0, y: 0 })
    const containerRef = useRef<HTMLDivElement>(null)

    // Golden Angle increment
    const phi = Math.PI * (3 - Math.sqrt(5))

    const entries = useMemo(() => {
        return tags.map((tag, i) => {
            const y = 1 - (i / (tags.length - 1)) * 2 // y goes from 1 to -1
            const radiusAtY = Math.sqrt(1 - y * y) // Radius at y position

            const theta = phi * i // Golden angle increment

            const x = Math.cos(theta) * radiusAtY
            const z = Math.sin(theta) * radiusAtY

            return { tag, x, y, z }
        })
    }, [tags])

    useEffect(() => {
        let animationFrameId: number
        const animate = () => {
            setRotation(prev => ({
                x: prev.x + 0.002, // Constant slow rotation
                y: prev.y + 0.002
            }))
            animationFrameId = requestAnimationFrame(animate)
        }

        // animationFrameId = requestAnimationFrame(animate)
        // return () => cancelAnimationFrame(animationFrameId)
    }, [])

    // Mouse interaction for rotation
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        // Sensitive rotation based on mouse position
        setRotation({
            x: -y * 0.001,
            y: x * 0.001
        })
    }

    return (
        <div
            className="relative flex items-center justify-center w-full h-[500px] overflow-hidden cursor-move touch-none"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            style={{ perspective: "1000px" }}
        >
            <div
                className="relative w-full h-full transform-style-3d flex items-center justify-center"
            >
                {entries.map((entry, i) => {
                    // Rotate points
                    // Rotation matrix logic simplifed for visual effect
                    // We are essentially just applying CSS transforms based on calculated 3D positions that rotate over time

                    // Re-calculating position based on current 'rotation' state would be heavy in JS for many items without optimization
                    // Instead, let's use a simpler approach: 
                    // Pure CSS animation is smoother, but let's try a hybrid where we compute positions.

                    // For a true 3D tag cloud in React without heavy libs, we project 3D points to 2D.

                    return (
                        <Tag
                            key={i}
                            {...entry}
                            baseRadius={radius}
                            rotation={rotation}
                        />
                    )
                })}
            </div>
        </div>
    )
}

function Tag({ tag, x, y, z, baseRadius, rotation }: { tag: string, x: number, y: number, z: number, baseRadius: number, rotation: { x: number, y: number } }) {
    // We need to continuously animate. 
    // The parent state update might be too jittery if done on every frame via React state.
    // A better way for smooth animation without Three.js is using a ref for values and requestAnimationFrame, 
    // updating DOM styles directly.
    // However, for simplicity and "React-way", let's use a self-contained animator or CSS.

    // Let's go with a simpler version: The cloud auto-rotates via CSS keyframes or we accept static positions for now
    // clearly user wants "Interactive".

    // Let's use a standard implementation:
    // Create a 3D effect by calculating position based on time.

    const [style, setStyle] = useState<React.CSSProperties>({})

    // Use a ref to track the current angle to avoid re-renders if possible, 
    // but we need to render the style updates.

    // Actually, let's look at the `rotation` prop. It's driven by mouse in the parent.
    // We rotate the point (x,y,z) by rotation.x and rotation.y

    const rx = rotation.x
    const ry = rotation.y

    // Rotate around X axis
    // y' = y*cos(rx) - z*sin(rx)
    // z' = y*sin(rx) + z*cos(rx)

    // Rotate around Y axis
    // x'' = x*cos(ry) + z'*sin(ry)
    // z'' = -x*sin(ry) + z'*cos(ry)

    // We need to accumulate rotation... changing rotation X/Y directly sets the speed.
    // This isgetting complicated for a single file. 

    // Alternative: Use a library-like structure inside the component.

    // Let's use a simpler "CSS 3D" approach where the container rotates? 
    // No, then text rotates with it (upside down).

    // Let's stick to the classic JS math approach:

    const [pos, setPos] = useState({ x, y, z })

    useEffect(() => {
        let animationFrameId: number
        let angleX = Math.random() * 0.01 // Start with random rotation speed
        let angleY = Math.random() * 0.01

        const animate = () => {
            // Apply rotation from props (interactive) + constant background
            // If parent updates 'rotation' (speed), we use it.

            // Actually, `rotation` prop in parent `handleMouseMove` seems to be setting 'velocity' or 'target angle'.
            // Let's treat parent `rotation` as the *velocity* target.

            const targetX = rotation.x
            const targetY = rotation.y

            // Smoothly interpolate current speed to target speed
            angleX += (targetX - angleX) * 0.05
            angleY += (targetY - angleY) * 0.05

            // Apply rotation matrix to current pos
            setPos(prev => {
                const cosX = Math.cos(angleX)
                const sinX = Math.sin(angleX)
                const cosY = Math.cos(angleY)
                const sinY = Math.sin(angleY)

                // Rotate X
                const y1 = prev.y * cosX - prev.z * sinX
                const z1 = prev.y * sinX + prev.z * cosX

                // Rotate Y
                const x2 = prev.x * cosY + z1 * sinY
                const z2 = -prev.x * sinY + z1 * cosY

                return { x: x2, y: y1, z: z2 }
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        // animate() 
        // We can't actually do this nicely with React State for 20+ tags x 60fps -> 1200 re-renders.
        // It will lag.

        // BETTER APPROACH:
        // Update DOM ref directly via requestAnimationFrame.
        // Or use `framer-motion` MotionValues?

        return () => cancelAnimationFrame(animationFrameId)
    }, [rotation]) // Re-run if rotation velocity changes? No, we need a stable loop.

    // Let's try the direct DOM manipulation approach in the PARENT for performance.

    return null
}

// ----------------------------------------------------
// Re-write: Perforant Implementation
// ----------------------------------------------------

export function TagCloud3D({ tags, radius = 250 }: { tags: string[], radius?: number }) {
    const containerRef = useRef<HTMLDivElement>(null)

    // Golden Angle configuration
    const phi = Math.PI * (3 - Math.sqrt(5))

    useEffect(() => {
        if (!containerRef.current) return

        const container = containerRef.current
        const items = Array.from(container.children) as HTMLElement[]

        const state = {
            angleX: 0.001,
            angleY: 0.001,
            mouseX: 0,
            mouseY: 0
        }

        // Initial positions
        const coords = items.map((item, i) => {
            const y = 1 - (i / (items.length - 1)) * 2
            const r = Math.sqrt(1 - y * y)
            const theta = phi * i
            const x = Math.cos(theta) * r
            const z = Math.sin(theta) * r
            return { x: x * radius, y: y * radius, z: z * radius }
        })

        let animationFrame: number

        const animate = () => {
            // Update angles based on mouse
            // Damping
            state.angleX += (state.mouseY * 0.0001 - state.angleX) * 0.05
            state.angleY += (state.mouseX * 0.0001 - state.angleY) * 0.05

            const cosX = Math.cos(state.angleX)
            const sinX = Math.sin(state.angleX)
            const cosY = Math.cos(state.angleY)
            const sinY = Math.sin(state.angleY)

            coords.forEach((pos, i) => {
                // Rotation math
                // Rot X
                const y1 = pos.y * cosX - pos.z * sinX
                const z1 = pos.y * sinX + pos.z * cosX
                // Rot Y
                const x2 = pos.x * cosY + z1 * sinY
                const z2 = -pos.x * sinY + z1 * cosY

                // Update stored pos
                pos.x = x2
                pos.y = y1
                pos.z = z2

                // Apply to DOM
                const scale = (z2 + radius * 2) / (radius * 1.5) // Perspective scale
                const alpha = (z2 + radius) / (radius * 2) // Fade back items

                const item = items[i]
                if (item) {
                    // Optimize with translate3d
                    item.style.transform = `translate3d(${x2}px, ${y1}px, 0) scale(${Math.max(0.5, Math.min(1.2, scale))})`
                    item.style.opacity = Math.max(0.2, Math.min(1, alpha)).toString()
                    item.style.zIndex = Math.floor(z2).toString()
                }
            })

            animationFrame = requestAnimationFrame(animate)
        }

        animate()

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect()
            state.mouseX = e.clientX - rect.left - rect.width / 2
            state.mouseY = e.clientY - rect.top - rect.height / 2
        }

        const handleMouseLeave = () => {
            state.mouseX = 0
            state.mouseY = 0
        }

        container.addEventListener('mousemove', handleMouseMove)
        container.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            cancelAnimationFrame(animationFrame)
            container.removeEventListener('mousemove', handleMouseMove)
            container.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [tags, radius, phi])

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[500px] flex items-center justify-center overflow-hidden"
        >
            {tags.map((tag, i) => (
                <div
                    key={i}
                    className="absolute text-primary font-bold text-lg select-none cursor-pointer hover:text-blue-500 transition-colors duration-300"
                    style={{ willChange: 'transform, opacity' }}
                >
                    {tag}
                </div>
            ))}
        </div>
    )
}
