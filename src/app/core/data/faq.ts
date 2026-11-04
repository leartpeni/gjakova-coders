import { SiteConfig } from '../config/site.config';
import { eur } from '../utils/money';

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

/** FAQ entries; the price answer is derived from the site config. */
export function buildFaq(config: SiteConfig): readonly FaqItem[] {
  const total = config.openingPrice * config.openingMonths;
  return [
    {
      question: 'Për çfarë moshash është kursi?',
      answer: 'Për fëmijë dhe të rinj 7–18 vjeç. Grupet ndahen sipas moshës.',
    },
    {
      question: 'A duhet të dijë fëmija diçka më parë?',
      answer: 'Jo. Fillojmë nga baza me Code.org dhe Scratch, dhe vazhdojmë hap pas hapi.',
    },
    {
      question: 'Si ndahen grupet?',
      answer: 'Sipas moshës dhe nivelit të fëmijës, që secili të mësojë me ritmin e vet.',
    },
    {
      question: 'A mund të provojmë një mësim para regjistrimit?',
      answer: 'Po. Shkruaj në formularin më poshtë dhe rezervo vendin për mësim provë.',
    },
    {
      question: 'Sa kushton kursi?',
      answer:
        `${eur(config.regularPrice)} në muaj për ${config.lessonsPerWeek} mësime në javë, nga ${config.lessonDuration}, ` +
        `për të gjitha grupmoshat. Për regjistrimet e para: ${eur(config.openingPrice)} në muaj kur paguhen ` +
        `${config.openingMonths} muaj së bashku (${eur(total)} gjithsej).`,
    },
    {
      question: 'Si regjistrohem?',
      answer:
        'Plotëso formularin më poshtë ose na kontakto me mesazh. Të përgjigjemi me orarin dhe vendet e lira.',
    },
  ];
}
