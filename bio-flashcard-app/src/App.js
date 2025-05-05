import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const flashcards = [
  {
    question: "What is the primary function of the mitochondria in eukaryotic cells?",
    answer: "Energy production"
  },
  {
    question: "Which phase of mitosis involves the alignment of chromosomes along the center of the cell?",
    answer: "Metaphase"
  },
  {
    question: "Which molecule carries amino acids to the ribosome during translation?",
    answer: "tRNA"
  },
  {
    question: "Which organelle contains hydrolytic enzymes for intracellular digestion?",
    answer: "Lysosome"
  },
  {
    question: "Which process converts glucose into pyruvate?",
    answer: "Glycolysis"
  }
];

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export default function FlashcardApp() {
  const [deck, setDeck] = useState(shuffleArray(flashcards));
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [known, setKnown] = useState([]);
  const [needsReview, setNeedsReview] = useState([]);

  const nextCard = () => {
    setShowAnswer(false);
    setIndex((prev) => (prev + 1) % deck.length);
  };

  const markKnown = () => {
    setKnown([...known, deck[index]]);
    nextCard();
  };

  const markNeedsReview = () => {
    setNeedsReview([...needsReview, deck[index]]);
    nextCard();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', padding: '1.5rem' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index + (showAnswer ? "-a" : "-q")}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div
            style={{
              width: '320px',
              maxWidth: '90vw',
              padding: '1.5rem',
              borderRadius: '1rem',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              backgroundColor: 'white',
              textAlign: 'center',
              fontSize: '1.25rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
            onClick={() => setShowAnswer(!showAnswer)}
          >
            {showAnswer ? deck[index].answer : deck[index].question}
          </div>
        </motion.div>
      </AnimatePresence>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={markKnown}>Known</button>
        <button onClick={markNeedsReview}>Needs Review</button>
        <button onClick={nextCard}>Skip</button>
      </div>
    </div>
  );
}