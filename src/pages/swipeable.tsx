import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const initialCards = [
  { id: 1, title: "Card 1" },
  { id: 2, title: "Card 2" },
  { id: 3, title: "Card 3" },
];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

function SwipeableCards() {
  const [currentCard, setCurrentCard] = React.useState(0);

  const [cards, setCards] = useState(initialCards);
    
  const handleSwipe = (id: number) => {
    setCards(cards.filter(card => card.id !== id))
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <AnimatePresence>
        {cards.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={() => handleSwipe(card.id)}
            style={{
              zIndex: cards.length - i,
              width: "300px",
              height: "400px",
              borderRadius: "10px",
              backgroundColor: "#ffffff",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              fontSize: "24px",
            }}
          >
            {card.title}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default SwipeableCards;
