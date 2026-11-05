export type TechName =
  | 'code'
  | 'scratch'
  | 'web'
  | 'wp'
  | 'py'
  | 'php'
  | 'ai'
  | 'aipy'
  | 'info1'
  | 'info2'
  | 'dev1'
  | 'dev2';

export interface CourseText {
  readonly title: string;
  readonly description: string;
  readonly project: string;
  readonly badge?: string;
}

export interface Course extends CourseText {
  readonly id: string;
  readonly logo: TechName;
  readonly color: string;
  readonly en: CourseText;
}

export interface AgeGroup {
  readonly age: string;
  readonly subtitle: string;
  readonly color: string;
  readonly courses: readonly Course[];
  readonly en: { readonly age: string; readonly subtitle: string };
}

export const ageGroups: readonly AgeGroup[] = [
  {
    age: '7–12 vjeç',
    subtitle: 'Hapat e parë',
    color: '#14B8A6',
    en: { age: '7–12 years', subtitle: 'First steps' },
    courses: [
      {
        id: 'info-basic',
        logo: 'info1',
        title: 'Informatikë bazike',
        badge: '3 muaj',
        description:
          'Njohja me kompjuterin, tastierën, Word, PowerPoint, Excel dhe internetin e sigurt.',
        project: 'Prezantimi im i parë',
        color: '#14B8A6',
        en: {
          title: 'Basic Computer Skills',
          badge: '3 months',
          description:
            'Getting to know the computer, the keyboard, Word, PowerPoint, Excel and the safe use of the internet.',
          project: 'My first presentation',
        },
      },
      {
        id: 'info-advanced',
        logo: 'info2',
        title: 'Informatikë e avancuar',
        badge: '3 muaj',
        description: 'Excel me formula, prezantime profesionale, Scratch dhe hyrje në Python.',
        project: 'Raport me grafikë',
        color: '#FF9F1C',
        en: {
          title: 'Advanced Computer Skills',
          badge: '3 months',
          description:
            'Excel with formulas, professional presentations, Scratch and an intro to Python.',
          project: 'A report with charts',
        },
      },
      {
        id: 'code-org',
        logo: 'code',
        title: 'Code.org',
        description: 'Logjika e programimit përmes lojërave dhe puzzle-ve.',
        project: 'Lojëra dhe puzzle',
        color: '#14B8A6',
        en: {
          title: 'Code.org',
          description: 'Programming logic through games and puzzles.',
          project: 'Games and puzzles',
        },
      },
      {
        id: 'scratch',
        logo: 'scratch',
        title: 'Scratch',
        description: 'Programim me blloqe, animacione dhe histori interaktive.',
        project: 'Loja ime e parë',
        color: '#FF9F1C',
        en: {
          title: 'Scratch',
          description: 'Block-based programming, animations and interactive stories.',
          project: 'My first game',
        },
      },
    ],
  },
  {
    age: '12–15 vjeç',
    subtitle: 'Bazat e zhvillimit',
    color: '#7C4DFF',
    en: { age: '12–15 years', subtitle: 'Development basics' },
    courses: [
      {
        id: 'dev-basics',
        logo: 'dev1',
        title: 'Web Development Basics',
        description: 'HTML, CSS dhe JavaScript bazë për fillestarët në zhvillimin e web-it.',
        project: 'Faqja ime e parë',
        color: '#7C4DFF',
        en: {
          title: 'Web Development Basics',
          description: 'HTML, CSS and JavaScript basics for beginners in web development.',
          project: 'My first web page',
        },
      },
      {
        id: 'python',
        logo: 'py',
        title: 'Python',
        description: 'Gjuhë e thjeshtë dhe e fuqishme: variabla, cikle, funksione.',
        project: 'Lojë me tekst, bot i vogël',
        color: '#E0A800',
        en: {
          title: 'Python',
          description: 'A simple yet powerful language: variables, loops, functions.',
          project: 'Text game, a small bot',
        },
      },
      {
        id: 'wordpress',
        logo: 'wp',
        title: 'WordPress',
        description: 'Krijimi i faqeve dhe blogjeve pa kod të komplikuar.',
        project: 'Faqe e plotë interneti',
        color: '#21759B',
        en: {
          title: 'WordPress',
          description: 'Building websites and blogs without complicated code.',
          project: 'A complete website',
        },
      },
      {
        id: 'ai-python',
        logo: 'aipy',
        title: 'Inteligjenca Artificiale me programim',
        description: 'Si funksionon AI dhe si përdoret në projekte të thjeshta me Python.',
        project: 'Chatbot i vogël',
        color: '#C026D3',
        en: {
          title: 'Artificial Intelligence with Programming',
          description: 'How AI works and how it is used in simple projects with Python.',
          project: 'A small chatbot',
        },
      },
    ],
  },
  {
    age: '15+ vjeç',
    subtitle: 'Zhvillim profesional',
    color: '#FF5A8A',
    en: { age: '15+ years', subtitle: 'Professional development' },
    courses: [
      {
        id: 'web-advanced',
        logo: 'dev2',
        title: 'Web Development Advanced',
        description: 'Bootstrap, JavaScript, PHP, WordPress dhe AI për faqe profesionale.',
        project: 'Faqe e plotë interneti',
        color: '#FF5A8A',
        en: {
          title: 'Web Development Advanced',
          description: 'Bootstrap, JavaScript, PHP, WordPress and AI for professional websites.',
          project: 'A complete website',
        },
      },
      {
        id: 'php',
        logo: 'php',
        title: 'PHP',
        description: 'Si punon pjesa prapa skenës e faqeve: formularë dhe të dhëna.',
        project: 'Formular kontakti',
        color: '#8892BF',
        en: {
          title: 'PHP',
          description: 'How the behind-the-scenes part of websites works: forms and data.',
          project: 'Contact form',
        },
      },
      {
        id: 'ai',
        logo: 'ai',
        title: 'Inteligjenca Artificiale',
        description: 'Çfarë është AI dhe si përdoret me përgjegjësi.',
        project: 'Projekte të thjeshta me AI',
        color: '#FF5A8A',
        en: {
          title: 'Artificial Intelligence',
          description: 'What AI is and how to use it responsibly.',
          project: 'Simple AI projects',
        },
      },
      {
        id: 'python-advanced',
        logo: 'py',
        title: 'Python Advanced',
        description:
          'Programim i avancuar me Python: klasa, skedarë, biblioteka dhe projekte më të mëdha.',
        project: 'Aplikacion i vogël me Python',
        color: '#E0A800',
        en: {
          title: 'Python Advanced',
          description:
            'Advanced programming with Python: classes, files, libraries and larger projects.',
          project: 'A small Python app',
        },
      },
    ],
  },
];
