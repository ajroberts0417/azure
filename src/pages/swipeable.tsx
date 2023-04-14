import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { bsky } from "@/services/atp";

const initialCards = [
  { id: 1, title: "Card 1" },
  { id: 2, title: "Card 2" },
  { id: 3, title: "Card 3" },
];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

export const SwipeableCards = () => {
  const [cards, setCards] = React.useState([]);
  
  useEffect(() => {
    bsky.feed
      .getTimeline({
        limit: 30,
      })
      .then((resp) => setCards(resp.data.feed.map(p => ({ id: p.post.cid, text: p.post.record['text'] }))));
  }, [setCards]);

  const handleSwipe = (id, _, info) => {
    const swipeX = swipePower(info.offset.x, info.velocity.x);
    const swipeY = swipePower(info.offset.y, info.velocity.y);

    if (
      Math.abs(swipeX) > swipeConfidenceThreshold ||
      Math.abs(swipeY) > swipeConfidenceThreshold
    ) {
      setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    }
  };

  const [swipeDirection, setSwipeDirection] = React.useState({ x: 0, y: 0 });

  return (
    <div
        className="bg-forest"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <AnimatePresence>
        {cards.map((card, index) => (
          <motion.div
            className="p-8"
            key={card.id}
            initial={{ opacity: 0, x: "-100%", y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            custom={card}
            exit={{
              opacity: 0,
              x: swipeDirection.x * 100,
              y: swipeDirection.y * 100,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag
            dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
            onDragEnd={(e, info) => {
              setSwipeDirection(info.velocity);
              handleSwipe(card.id, e, info);
            }}
            style={{
              overflowY: 'scroll',
              height: '400px',
              width: '300px',
              borderRadius: "10px",
              backgroundColor: "#ffffff",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              zIndex: cards.length - index,
              fontSize: "24px",
            }}
          >
            {card.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default SwipeableCards;
