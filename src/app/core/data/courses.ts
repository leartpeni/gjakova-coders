export type TechName = 'code' | 'scratch' | 'web' | 'wp' | 'py' | 'php' | 'ai';

export interface Course {
  readonly id: string;
  readonly logo: TechName;
  readonly title: string;
  readonly description: string;
  readonly project: string;
  readonly color: string;
}

export const COURSES: readonly Course[] = [
  {
    id: 'code-org',
    logo: 'code',
    title: 'Code.org',
    description: 'Logjika e programimit përmes lojërave dhe puzzle-ve.',
    project: 'Lojëra dhe puzzle',
    color: '#14B8A6',
  },
  {
    id: 'scratch',
    logo: 'scratch',
    title: 'Scratch',
    description: 'Programim me blloqe, animacione dhe histori interaktive.',
    project: 'Loja ime e parë',
    color: '#FF9F1C',
  },
  {
    id: 'web',
    logo: 'web',
    title: 'Web Development',
    description: 'HTML, CSS dhe JavaScript për të ndërtuar faqe interneti.',
    project: 'Faqe personale',
    color: '#7C4DFF',
  },
  {
    id: 'wordpress',
    logo: 'wp',
    title: 'WordPress',
    description: 'Krijimi i faqeve dhe blogjeve pa kod të komplikuar.',
    project: 'Faqe e plotë interneti',
    color: '#21759B',
  },
  {
    id: 'python',
    logo: 'py',
    title: 'Python',
    description: 'Gjuhë e thjeshtë dhe e fuqishme: variabla, cikle, funksione.',
    project: 'Lojë me tekst, bot i vogël',
    color: '#E0A800',
  },
  {
    id: 'php',
    logo: 'php',
    title: 'PHP',
    description: 'Si punon pjesa prapa skenës e faqeve: formularë dhe të dhëna.',
    project: 'Formular kontakti',
    color: '#8892BF',
  },
  {
    id: 'ai',
    logo: 'ai',
    title: 'Inteligjenca Artificiale',
    description: 'Çfarë është AI dhe si përdoret me përgjegjësi.',
    project: 'Projekte të thjeshta me AI',
    color: '#FF5A8A',
  },
];
