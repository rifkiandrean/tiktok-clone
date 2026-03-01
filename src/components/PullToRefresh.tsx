import { useState, useEffect } from 'react';
import { motion, useAnimation, PanInfo, useMotionValue, useTransform } from 'motion/react';
import TikTokLoader from './TikTokLoader';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

export default function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const controls = useAnimation();
  const y = useMotionValue(0);
  const threshold = 80;

  // Remove rotation, keep opacity and loaderY
  const opacity = useTransform(y, [0, 20], [0, 1]);
  const loaderY = useTransform(y, (latest) => Math.min(latest, threshold));

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY <= 5); // Small buffer
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDragEnd = async (_: any, info: PanInfo) => {
    const currentY = y.get();

    if (currentY > threshold && !isRefreshing) {
      setIsRefreshing(true);
      await controls.start({ y: threshold });
      
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        controls.start({ y: 0 });
      }
    } else {
      controls.start({ y: 0 });
    }
  };

  return (
    <div className="relative min-h-screen overscroll-y-contain">
      {/* Loading Indicator */}
      <motion.div 
        className="absolute top-0 left-0 right-0 flex justify-center items-start pointer-events-none z-0"
        style={{ 
          height: threshold,
          opacity,
          y: loaderY
        }}
      >
        <div className="mt-4">
          <TikTokLoader isAnimating={isRefreshing} />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        drag={isAtTop && !isRefreshing ? "y" : false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.6}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ y, touchAction: 'pan-y' }}
        className="bg-white min-h-screen relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
}
