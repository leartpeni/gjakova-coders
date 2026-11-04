export interface RoadmapLevel {
  readonly level: string;
  readonly age: string;
  readonly tech: string;
  readonly steps: readonly [string, string, string];
}

export const ROADMAP: readonly RoadmapLevel[] = [
  {
    level: 'Niveli 1 · muaji 1–3',
    age: '7–9 vjeç',
    tech: 'Code.org · Scratch',
    steps: ['Code.org, Scratch bazë', 'Scratch: lojëra të plota', 'Projekt final: loja ime'],
  },
  {
    level: 'Niveli 2 · muaji 4–6',
    age: '10–13 vjeç',
    tech: 'Scratch · HTML · Python',
    steps: [
      'Scratch, HTML bazë',
      'HTML/CSS, Python, WordPress',
      'Faqe personale ose lojë në Python',
    ],
  },
  {
    level: 'Niveli 3 · muaji 7–9',
    age: '14–18 vjeç',
    tech: 'JavaScript · Python · PHP · AI',
    steps: ['HTML/CSS, Python bazë', 'JavaScript, WordPress, Python', 'PHP, AI dhe projekt final'],
  },
];
