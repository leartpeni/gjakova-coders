export interface Benefit {
  readonly title: string;
  readonly text: string;
  readonly color: string;
}

export const BENEFITS: readonly Benefit[] = [
  {
    title: 'Të menduarit logjik',
    text: 'Fëmijët mësojnë të ndajnë problemet në hapa të vegjël.',
    color: '#2EE6C5',
  },
  {
    title: 'Kreativiteti',
    text: 'Krijojnë lojëra, animacione dhe faqe të tyre.',
    color: '#FF7A1A',
  },
  {
    title: 'Zgjidhja e problemeve',
    text: 'Gabimet bëhen mësim: testojnë, ndryshojnë, provojnë sërish.',
    color: '#FF5A8A',
  },
  {
    title: 'Aftësi për të ardhmen',
    text: 'Teknologjia është pjesë e çdo profesioni të sotëm.',
    color: '#FFC93C',
  },
];
