import React, { useState, useContext } from 'react';
import { motion, useMotionValue, useTransform, useMotionTemplate, DragHandlers, AnimationProps, MotionProps, PanInfo } from 'framer-motion';


type CardColor = '#FFBE0B' | '#FB5607' | '#FF006E' | '#8338EC' | '#3A86FF';

interface CardType {
    text: string;
    background: CardColor;
}

interface CardProps {
    card: CardType;
    style: MotionProps["style"];
    onDirectionLock?: DragHandlers["onDirectionLock"];
    onDragStart?: DragHandlers["onDragStart"];
    onDragEnd?: DragHandlers["onDragEnd"];
    animate?: AnimationProps["animate"];
}

export interface InfiniteCardsState {
    axis: "x" | "y" | null;
    animation: AnimationProps["animate"];
}

export const colors: CardColor[] = ['#FFBE0B', '#FB5607', '#FF006E', '#8338EC', '#3A86FF'];

const randomColor = (current: CardColor) => {
  while (true) {
    const index = Math.floor(Math.random() * colors.length);
    if (current != colors[index]) {
      return colors[index];
    } 
  }
}


export const Card = ({
  card,
  style,
  onDirectionLock,
  onDragStart,
  onDragEnd,
  animate,
}: CardProps) => (
  <motion.div
    className="bg-white p-4 my-4 rounded-xl shadow-xl flex items-center justify-center text-sm font-bold cursor-pointer break-words"
    drag
    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
    dragDirectionLock
    onDirectionLock={onDirectionLock}
    onDragEnd={onDragEnd}
    animate={animate}
    style={{ ...style }}
    transition={{ ease: [0.6, 0.05, -0.01, 0.9] }}
    whileTap={{ scale: 0.85 }}
  >
    <p>{card.text}</p>
  </motion.div>
);
export const InfiniteCards = () => {
  const [cards, setCards] = useState([
    { text: 'Up or down', background: colors[0] }, 
    { text: 'Left or right', background: colors[1] }, 
    { text: 'Swipe me!', background: colors[2] }
  ]);
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
  const onDirectionLock: DragHandlers["onDirectionLock"] = axis => setDragStart({ ...dragStart, axis: axis });
  const animateCardSwipe = (animation: AnimationProps["animate"]) => {
    setDragStart({ ...dragStart, animation });
      
    setTimeout(() => {
      setDragStart({ axis: null, animation: { x: 0, y: 0 } });
      x.set(0);
      y.set(0);
      setCards([{ 
          text: 'just an another card', 
          background: randomColor(cards[0].background) 
        }, ...cards.slice(0, cards.length - 1)]);
    }, 200);
  }
  const onDragEnd = (info: PanInfo) => {
    if (dragStart.axis === 'x') {
      if (info.offset.x >= 100) 
        animateCardSwipe({ x: 175, y: 0 });
      else if (info.offset.x <= -100)
        animateCardSwipe({ x: -175, y: 0 }); 
    } else {
      if (info.offset.y >= 100)
        animateCardSwipe({ x: 0, y: 175 }); 
      else if (info.offset.y <= -100)
        animateCardSwipe({ x: 0, y: -175 }); 
    }
  }
  const renderCards = () => {
    return cards.map((card, index) => {
      if (index === cards.length - 1) {
        return (
          <Card 
            card={card}
            key={index}
            style={{ x, y, zIndex: index }}
            onDirectionLock={axis => onDirectionLock(axis)}
            onDragEnd={(e, info) => onDragEnd(info)}
            animate={dragStart.animation}
          />
        )
      } else return (
        <Card 
          card={card}
          key={index}
          style={{
            scale, 
            boxShadow,
            zIndex: index
          }}
        />
      )
    })
  }
  return (
    <div className="infinite-cards">
      {renderCards()}
    </div>
  )
}