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
  { question: "What is the function of DNA polymerase?", answer: "Synthesizing new DNA strands from a template strand" },
  { question: "Which macromolecule contains C, H, O, N, and sometimes S?", answer: "Proteins" },
  { question: "What is the role of water in photosynthesis?", answer: "Water donates electrons to the light reactions" },
  { question: "Which structure regulates what enters and exits the nucleus?", answer: "Nuclear pore" },
  { question: "The sodium-potassium pump is an example of:", answer: "Active transport" },
  { question: "Which organelle contains hydrolytic enzymes for intracellular digestion?", answer: "Lysosome" },
  { question: "What type of bond links amino acids together in a protein?", answer: "Peptide bond" },
  { question: "Which stage of cellular respiration produces the most ATP?", answer: "Electron transport chain" },
  { question: "During transcription, what is produced?", answer: "mRNA" },
  { question: "Which of the following increases genetic variation during meiosis?", answer: "Crossing over" },
  { question: "What is the role of the spindle fibers during mitosis?", answer: "Separate sister chromatids" },
  { question: "Which molecule is used for energy transfer in cells?", answer: "ATP" },
  { question: "What describes the movement of water across a semipermeable membrane?", answer: "Osmosis" },
  { question: "What is the function of the Golgi apparatus?", answer: "Modifies, sorts, and packages proteins" },
  { question: "Which structure in plant cells captures light energy?", answer: "Chloroplast" },
  { question: "What is the process of programmed cell death called?", answer: "Apoptosis" },
  { question: "Which macromolecule serves as genetic material?", answer: "Nucleic acids (DNA/RNA)" },
  { question: "What is the main purpose of cellular respiration?", answer: "To produce ATP" },
  { question: "Which kingdom includes multicellular, photosynthetic organisms?", answer: "Plantae" },
  { question: "What is the smallest unit of life?", answer: "Cell" },
  { question: "What term describes an organism’s ability to maintain stable internal conditions?", answer: "Homeostasis" },
  { question: "Which phase of meiosis results in haploid cells?", answer: "Meiosis II" },
  { question: "What is the function of mRNA?", answer: "To carry genetic code from DNA to ribosomes" },
  { question: "What do enzymes do?", answer: "Speed up chemical reactions" },
  { question: "What structure forms the outer boundary of animal cells?", answer: "Cell membrane" },
  { question: "Which organelle is responsible for producing ATP?", answer: "Mitochondrion" },
  { question: "What organelle is found only in plant cells and provides structure?", answer: "Cell wall" },
  { question: "What is the name for the jellylike fluid inside the cell?", answer: "Cytoplasm" },
  { question: "What is the basic building block of proteins?", answer: "Amino acids" },
  { question: "What happens in the G1 phase of the cell cycle?", answer: "Cell growth" },
  { question: "What is the purpose of the S phase in interphase?", answer: "DNA replication" },
  { question: "What part of the brain controls involuntary actions?", answer: "Medulla oblongata" },
  { question: "What part of the nervous system controls voluntary movement?", answer: "Somatic nervous system" },
  { question: "What type of feedback loop increases the original stimulus?", answer: "Positive feedback" },
  { question: "Which system is responsible for transporting nutrients and waste?", answer: "Circulatory system" },
  { question: "What structure allows gas exchange in leaves?", answer: "Stomata" },
  { question: "What is the term for a trait that masks another trait?", answer: "Dominant" },
  { question: "What is the function of chlorophyll?", answer: "Absorbs light energy for photosynthesis" }
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
        <button onClick={nextCard}>Next</button>
        <button onClick={toggleReviewMode}>
          {reviewMode ? "Exit Review Mode" : "Review Needs Review"}
        </button>
      </div>
    </div>
  );
}
