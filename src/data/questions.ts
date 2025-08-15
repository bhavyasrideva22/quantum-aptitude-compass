import { Question, AssessmentSection } from '@/types/assessment';

export const assessmentSections: AssessmentSection[] = [
  {
    id: 'psychometric',
    title: 'Personality & Motivation',
    description: 'Discover your psychological fit for quantum computing',
    icon: '🧠',
    estimatedTime: 8,
    questions: [
      {
        id: 'psych_1',
        type: 'likert',
        category: 'psychometric',
        section: 'Interest',
        question: "I'm fascinated by quantum mechanics and computing intersections.",
        scale: 5,
        weight: 1.2
      },
      {
        id: 'psych_2',
        type: 'likert',
        category: 'psychometric',
        section: 'Motivation',
        question: "I would pursue quantum computing even if it's difficult and takes years to master.",
        scale: 5,
        weight: 1.5
      },
      {
        id: 'psych_3',
        type: 'likert',
        category: 'psychometric',
        section: 'Personality',
        question: "I enjoy working with abstract concepts that don't have physical representations.",
        scale: 5,
        weight: 1.0
      },
      {
        id: 'psych_4',
        type: 'likert',
        category: 'psychometric',
        section: 'Cognitive Style',
        question: "I prefer precise, mathematical tasks over open-ended creative projects.",
        scale: 5,
        weight: 1.1
      },
      {
        id: 'psych_5',
        type: 'likert',
        category: 'psychometric',
        section: 'Grit',
        question: "I keep working at problems even when I fail repeatedly for months.",
        scale: 5,
        weight: 1.4
      },
      {
        id: 'psych_6',
        type: 'likert',
        category: 'psychometric',
        section: 'Growth Mindset',
        question: "I believe intelligence and technical skills can be developed through effort.",
        scale: 5,
        weight: 1.0
      },
      {
        id: 'psych_7',
        type: 'likert',
        category: 'psychometric',
        section: 'Research Orientation',
        question: "I enjoy reading research papers and staying current with scientific literature.",
        scale: 5,
        weight: 1.2
      },
      {
        id: 'psych_8',
        type: 'likert',
        category: 'psychometric',
        section: 'Uncertainty Tolerance',
        question: "I'm comfortable working in fields where the technology is still emerging and uncertain.",
        scale: 5,
        weight: 1.3
      }
    ]
  },
  {
    id: 'aptitude',
    title: 'Logic & Reasoning',
    description: 'Test your analytical and problem-solving abilities',
    icon: '🧮',
    estimatedTime: 10,
    questions: [
      {
        id: 'apt_1',
        type: 'multiple-choice',
        category: 'aptitude',
        section: 'Numerical Reasoning',
        question: "If a quantum circuit has 3 qubits, how many possible states can it represent simultaneously?",
        options: ["3", "6", "8", "16"],
        correctAnswer: "8",
        weight: 1.0
      },
      {
        id: 'apt_2',
        type: 'multiple-choice',
        category: 'aptitude',
        section: 'Abstract Logic',
        question: "Which pattern best represents quantum superposition?",
        options: [
          "A coin that shows heads OR tails",
          "A coin that shows heads AND tails simultaneously", 
          "A coin that alternates between heads and tails",
          "A coin that shows neither heads nor tails"
        ],
        correctAnswer: "A coin that shows heads AND tails simultaneously",
        weight: 1.2
      },
      {
        id: 'apt_3',
        type: 'multiple-choice',
        category: 'aptitude',
        section: 'Pattern Recognition',
        question: "In the sequence 2, 4, 16, 256, what is the next number?",
        options: ["512", "1024", "65536", "131072"],
        correctAnswer: "65536",
        weight: 1.0
      },
      {
        id: 'apt_4',
        type: 'multiple-choice',
        category: 'aptitude',
        section: 'Deductive Reasoning',
        question: "If all quantum gates are reversible, and NOT gate is a quantum gate, then:",
        options: [
          "NOT gate is irreversible",
          "NOT gate is reversible",
          "NOT gate may or may not be reversible",
          "The premise is incorrect"
        ],
        correctAnswer: "NOT gate is reversible",
        weight: 1.1
      },
      {
        id: 'apt_5',
        type: 'multiple-choice',
        category: 'aptitude',
        section: 'Mathematical Logic',
        question: "What is the probability of measuring |0⟩ from the state (1/√2)|0⟩ + (1/√2)|1⟩?",
        options: ["0", "1/2", "1/√2", "1"],
        correctAnswer: "1/2",
        weight: 1.3
      }
    ]
  },
  {
    id: 'prerequisites',
    title: 'Foundation Knowledge',
    description: 'Assess your readiness in core prerequisites',
    icon: '📚',
    estimatedTime: 8,
    questions: [
      {
        id: 'prereq_1',
        type: 'multiple-choice',
        category: 'prerequisites',
        section: 'Linear Algebra',
        question: "What is the result of multiplying a 2×3 matrix by a 3×2 matrix?",
        options: ["2×2 matrix", "3×3 matrix", "2×3 matrix", "Cannot multiply"],
        correctAnswer: "2×2 matrix",
        weight: 1.2
      },
      {
        id: 'prereq_2',
        type: 'multiple-choice',
        category: 'prerequisites',
        section: 'Probability',
        question: "If you flip a fair coin 3 times, what's the probability of getting exactly 2 heads?",
        options: ["1/8", "2/8", "3/8", "4/8"],
        correctAnswer: "3/8",
        weight: 1.0
      },
      {
        id: 'prereq_3',
        type: 'multiple-choice',
        category: 'prerequisites',
        section: 'Python Programming',
        question: "Which Python data structure would be most appropriate for representing a quantum state vector?",
        options: ["list", "tuple", "numpy array", "dictionary"],
        correctAnswer: "numpy array",
        weight: 1.1
      },
      {
        id: 'prereq_4',
        type: 'multiple-choice',
        category: 'prerequisites',
        section: 'Complex Numbers',
        question: "What is the magnitude of the complex number 3 + 4i?",
        options: ["3", "4", "5", "7"],
        correctAnswer: "5",
        weight: 1.2
      },
      {
        id: 'prereq_5',
        type: 'multiple-choice',
        category: 'prerequisites',
        section: 'Boolean Logic',
        question: "What is the result of XOR(1, 1)?",
        options: ["0", "1", "True", "False"],
        correctAnswer: "0",
        weight: 1.0
      }
    ]
  },
  {
    id: 'quantum',
    title: 'Quantum Computing',
    description: 'Test your understanding of quantum concepts',
    icon: '⚛️',
    estimatedTime: 12,
    questions: [
      {
        id: 'quantum_1',
        type: 'multiple-choice',
        category: 'domain-specific',
        section: 'Quantum Basics',
        question: "What is the fundamental unit of quantum information?",
        options: ["bit", "byte", "qubit", "quantum"],
        correctAnswer: "qubit",
        weight: 1.0
      },
      {
        id: 'quantum_2',
        type: 'multiple-choice',
        category: 'domain-specific',
        section: 'Quantum Gates',
        question: "Which gate creates an equal superposition of |0⟩ and |1⟩?",
        options: ["Pauli-X", "Pauli-Z", "Hadamard", "CNOT"],
        correctAnswer: "Hadamard",
        weight: 1.2
      },
      {
        id: 'quantum_3',
        type: 'multiple-choice',
        category: 'domain-specific',
        section: 'Quantum Algorithms',
        question: "Shor's algorithm is primarily used for:",
        options: [
          "Database search",
          "Integer factorization", 
          "Sorting numbers",
          "Graph traversal"
        ],
        correctAnswer: "Integer factorization",
        weight: 1.3
      },
      {
        id: 'quantum_4',
        type: 'multiple-choice',
        category: 'domain-specific',
        section: 'Quantum Entanglement',
        question: "When two qubits are entangled, measuring one qubit:",
        options: [
          "Has no effect on the other",
          "Instantly determines the state of the other",
          "Destroys the other qubit",
          "Creates a new qubit"
        ],
        correctAnswer: "Instantly determines the state of the other",
        weight: 1.2
      },
      {
        id: 'quantum_5',
        type: 'multiple-choice',
        category: 'domain-specific',
        section: 'Quantum Advantage',
        question: "Quantum computers are expected to outperform classical computers primarily in:",
        options: [
          "All computational tasks",
          "Specific problems like cryptography and optimization",
          "Basic arithmetic operations",
          "Data storage capacity"
        ],
        correctAnswer: "Specific problems like cryptography and optimization",
        weight: 1.1
      },
      {
        id: 'quantum_6',
        type: 'multiple-choice',
        category: 'domain-specific',
        section: 'Quantum Programming',
        question: "Which is a popular framework for quantum programming?",
        options: ["TensorFlow", "React", "Qiskit", "Django"],
        correctAnswer: "Qiskit",
        weight: 1.0
      }
    ]
  }
];

export const getAllQuestions = (): Question[] => {
  return assessmentSections.flatMap(section => section.questions);
};

export const getQuestionsBySection = (sectionId: string): Question[] => {
  const section = assessmentSections.find(s => s.id === sectionId);
  return section ? section.questions : [];
};