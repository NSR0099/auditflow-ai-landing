import { motion } from "framer-motion";

const DynamicBackground = () => {
    return (
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[100px]" />

            {/* Animated Gradient Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.6, 0.4],
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -top-[10%] -left-[10%] h-[50vh] w-[50vh] rounded-full bg-primary/30 blur-[90px]"
            />

            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.5, 0.3],
                    x: [0, -150, 0],
                    y: [0, 100, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
                className="absolute top-[20%] right-[10%] h-[40vh] w-[40vh] rounded-full bg-accent/30 blur-[90px]"
            />

            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.5, 0.3],
                    x: [0, 50, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5,
                }}
                className="absolute -bottom-[20%] left-[20%] h-[60vh] w-[60vh] rounded-full bg-primary/20 blur-[100px]"
            />

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
            }} />
        </div>
    );
};

export default DynamicBackground;
