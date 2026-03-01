import { motion } from 'motion/react';

interface TikTokLoaderProps {
  isAnimating?: boolean;
}

export default function TikTokLoader({ isAnimating = true }: TikTokLoaderProps) {
  const distance = 10;
  const duration = 0.8;

  return (
    <div className="relative flex items-center justify-center w-12 h-12">
      {/* Red Dot (Left) */}
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-[#fe2c55]"
        initial={{ x: -distance, scale: 1, zIndex: 10 }}
        animate={isAnimating ? {
          x: [ -distance, distance, -distance ],
          scale: [ 1, 0.75, 1 ],
          zIndex: [ 10, 0, 10 ]
        } : { x: -distance, scale: 1, zIndex: 10 }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Cyan Dot (Right) */}
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-[#25f4ee]"
        initial={{ x: distance, scale: 0.75, zIndex: 0 }}
        animate={isAnimating ? {
          x: [ distance, -distance, distance ],
          scale: [ 0.75, 1, 0.75 ],
          zIndex: [ 0, 10, 0 ]
        } : { x: distance, scale: 0.75, zIndex: 0 }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
