export interface Step {
  readonly title: string;
  readonly text: string;
}

export const STEPS: readonly Step[] = [
  { title: 'Regjistrohu', text: 'Plotëso formularin ose na shkruaj në WhatsApp.' },
  {
    title: 'Mësim provë',
    text: 'Rezervo vendin, njihu me mësuesin dhe zgjidh grupin e duhur.',
  },
  {
    title: 'Fillo mësimin',
    text: 'Fëmija nis me projektin e parë dhe ecën hap pas hapi.',
  },
];
