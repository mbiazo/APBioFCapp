import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const flashcards = [
  { question: "What is the primary function of the mitochondria in eukaryotic cells?", answer: "Energy production" },
  { question: "Which phase of mitosis involves the alignment of chromosomes along the center of the cell?", answer: "Metaphase" },
  { question: "In a dihybrid cross, which genotype is homozygous recessive for both traits?", answer: "aabb" },
  { question: "In a DNA molecule, which nitrogenous base pairs with adenine?", answer: "Thymine" },
  { question: "What is the primary role of ribosomes in a cell?", answer: "Protein synthesis" },
  { question: "Which of the following processes is part of the light-dependent reactions of photosynthesis?", answer: "ATP synthesis" },
  { question: "What type of selection favors extreme phenotypes?", answer: "Disruptive selection" },
  { question: "Which molecule carries amino acids to the ribosome during translation?", answer: "tRNA" },
  { question: "Which of the following is a characteristic of a prokaryotic cell?", answer: "Circular DNA" },
  { question: "What is the function of DNA polymerase?", answer: "Synthesizing new DNA strands from a template strand" }
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
  const [reviewMode, setReviewMode] = useState(false);

  const currentDeck = reviewMode ? needsReview : deck;

  const nextCard = () => {
    setShowAnswer(false);
    setIndex((prev) => (prev + 1) % currentDeck.length);
  };

  const markKnown = () => {
    setKnown([...known, currentDeck[index]]);
    nextCard();
  };

  const markNeedsReview = () => {
    setNeedsReview([...needsReview, currentDeck[index]]);
    nextCard();
  };

  const toggleReviewMode = () => {
    setShowAnswer(false);
    setIndex(0);
    setReviewMode(!reviewMode);
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
            {showAnswer ? currentDeck[index]?.answer : currentDeck[index]?.question || "No cards"}
          </div>
        </motion.div>
      </AnimatePresence>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={markKnown}>Known</button>
        <button onClick={markNeedsReview}>Needs Review</button>
        <button onClick={nextCard}>Skip</button>
        <button onClick={toggleReviewMode}>
          {reviewMode ? "Exit Review Mode" : "Review Needs Review"}
        </button>
      </div>
    </div>
  );
}
