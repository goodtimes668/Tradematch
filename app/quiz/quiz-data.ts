export interface QuizOption {
  label: string;
  scores: Record<string, number>;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "What kind of work sounds most satisfying?",
    options: [
      { label: "Solving problems with wires, panels, and circuits", scores: { electrical: 2 } },
      { label: "Fixing something so water finally flows right", scores: { plumbing: 2 } },
      { label: "Building something with your hands you can see and touch", scores: { carpentry: 2 } },
      { label: "Keeping a building's air comfortable year-round", scores: { hvac: 2 } },
      { label: "Joining metal together with precision", scores: { welding: 2 } },
    ],
  },
  {
    question: "Which environment sounds best?",
    options: [
      { label: "Indoors, working on systems inside walls", scores: { electrical: 1, hvac: 1 } },
      { label: "A mix of indoor and outdoor, different site every week", scores: { carpentry: 1, plumbing: 1 } },
      { label: "A shop or fabrication space with tools and equipment", scores: { welding: 2 } },
      { label: "Crawl spaces, basements, wherever the pipes are", scores: { plumbing: 2 } },
    ],
  },
  {
    question: "What's your comfort level with detailed troubleshooting?",
    options: [
      { label: "Love it — diagnosing the exact issue is the fun part", scores: { electrical: 2, hvac: 1 } },
      { label: "I'd rather build/create than diagnose", scores: { carpentry: 2, welding: 1 } },
      { label: "I like following a system until I find the leak or break", scores: { plumbing: 2 } },
      { label: "I like reading gauges, pressure, and airflow", scores: { hvac: 2 } },
    ],
  },
  {
    question: "Pick a tool you'd want to master:",
    options: [
      { label: "Multimeter", scores: { electrical: 2 } },
      { label: "Pipe wrench", scores: { plumbing: 2 } },
      { label: "Framing hammer / nail gun", scores: { carpentry: 2 } },
      { label: "Welding torch", scores: { welding: 2 } },
      { label: "Refrigerant gauges", scores: { hvac: 2 } },
    ],
  },
  {
    question: "What matters most to you in a career?",
    options: [
      { label: "Steady demand no matter the economy", scores: { plumbing: 1, electrical: 1, hvac: 1 } },
      { label: "Visible, physical results at the end of the day", scores: { carpentry: 2 } },
      { label: "A skill that transfers across construction and manufacturing", scores: { welding: 2 } },
      { label: "Fast-growing field with lots of new job openings", scores: { hvac: 2 } },
    ],
  },
];

export function scoreQuiz(answers: number[]): string {
  const totals: Record<string, number> = {};
  answers.forEach((optionIndex, questionIndex) => {
    const option = QUIZ_QUESTIONS[questionIndex]?.options[optionIndex];
    if (!option) return;
    for (const [trade, points] of Object.entries(option.scores)) {
      totals[trade] = (totals[trade] ?? 0) + points;
    }
  });

  let best = "carpentry";
  let bestScore = -1;
  for (const [trade, score] of Object.entries(totals)) {
    if (score > bestScore) {
      best = trade;
      bestScore = score;
    }
  }
  return best;
}
