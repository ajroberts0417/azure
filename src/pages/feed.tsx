import React, { useState } from "react"
import { InfiniteCards, Card, InfiniteCardsState, colors } from '@/components/Card'
import { useMotionTemplate, useMotionValue, useTransform } from "framer-motion";

const Feed: React.FC = () =>{
    const [dragStart, setDragStart] = useState<InfiniteCardsState>({
        axis: null,
        animation: { x: 0, y: 0 }
      });
      const x = useMotionValue(0);
      const y = useMotionValue(0);
      const scale = useTransform(dragStart.axis === 'x' ? x : y, [-175, 0, 175], [1, .5, 1]);
      const shadowBlur = useTransform(dragStart.axis === 'x' ? x : y, [-175, 0, 175], [0, 25, 0]);
      const shadowOpacity = useTransform(dragStart.axis === 'x' ? x : y, [-175, 0, 175], [0, .2, 0]);
      const boxShadow = useMotionTemplate`0 ${shadowBlur}px 25px -5px rgba(0, 0, 0, ${shadowOpacity})`;


      return (
    <div className="flex min-h-full flex-col justify-center items-center py-12 sm:px-6 lg:px-8 bg-[url('/bg.png')] bg-cover bg-center">
        <Card 
          card={{ text: 'Up or down', background: colors[0] }}
          style={{
            // scale, 
            boxShadow
          }}
        />
    </div>
)
}
export default Feed