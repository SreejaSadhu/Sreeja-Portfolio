"use client";
import React, { useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
    navItems,
    className,
    actionButtons,
}: {
    navItems: {
        name: string;
        link: string;
        icon?: JSX.Element;
    }[];
    className?: string;
    actionButtons?: React.ReactNode;
}) => {
    const { scrollYProgress } = useScroll();

    const [visible, setVisible] = useState(false);

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        // Check if current is not undefined and is a number
        if (typeof current === "number") {
            let direction = current - scrollYProgress.getPrevious()!;

            if (scrollYProgress.get() < 0.05) {
                // Hidden at top to allow embedded navbar to show
                setVisible(false);
            } else {
                if (direction < 0) {
                    // Visible on scroll up
                    setVisible(true);
                } else {
                    // Hidden on scroll down
                    setVisible(false);
                }
            }
        }
    });

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 1,
                    y: -100,
                }}
                animate={{
                    y: visible ? 0 : -100,
                    opacity: visible ? 1 : 0,
                }}
                transition={{
                    duration: 0.2,
                }}
                className={cn(
                    "flex max-w-fit fixed top-8 inset-x-0 mx-auto border border-white/10 rounded-full bg-os-tealdark/95 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.3)] z-[5000] px-6 py-3 items-center justify-center space-x-4",
                    className
                )}
            >
                {navItems.map((navItem: any, idx: number) => (
                    <a
                        key={`link=${idx}`}
                        href={navItem.link}
                        className={cn(
                            "relative items-center flex space-x-1 text-white/70 hover:text-white transition-colors text-base font-medium"
                        )}
                    >
                        <span className="block sm:hidden">{navItem.icon}</span>
                        <span className="hidden sm:block text-base">{navItem.name}</span>
                    </a>
                ))}
                {actionButtons && (
                    <div className="flex items-center gap-2 pl-4 border-l border-white/10">
                        {actionButtons}
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
};
