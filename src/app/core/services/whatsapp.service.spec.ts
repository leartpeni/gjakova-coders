import { TestBed } from '@angular/core/testing';
import { SITE_CONFIG, SiteConfig, siteConfig } from '../config/site.config';
import { WhatsappService } from './whatsapp.service';

function setup(overrides: Partial<SiteConfig> = {}): WhatsappService {
  TestBed.configureTestingModule({
    providers: [{ provide: SITE_CONFIG, useValue: { ...siteConfig, ...overrides } }],
  });
  return TestBed.inject(WhatsappService);
}

describe('WhatsappService', () => {
  const data = {
    parent: ' Arta Krasniqi ',
    phone: '+383 49 123 456',
    age: '10–13 vjeç',
    plan: 'Çmimi i rregullt – 40 €/muaj',
    note: '',
  };

  it('is disabled without a phone and uses the generic wa.me link', () => {
    const wa = setup({ phone: '' });
    expect(wa.enabled).toBe(false);
    expect(wa.buildLink('Hej')).toBe('https://wa.me/?text=Hej');
    expect(wa.buildLink()).toBe('https://wa.me/');
  });

  it('builds a link with the configured phone digits and encoded text', () => {
    const wa = setup({ phone: '+383 49 123 456' });
    expect(wa.enabled).toBe(true);
    expect(wa.buildLink('Përshëndetje & mirë')).toBe(
      `https://wa.me/38349123456?text=${encodeURIComponent('Përshëndetje & mirë')}`,
    );
  });

  it('builds the registration message and omits an empty note', () => {
    const wa = setup();
    expect(wa.buildMessage(data)).toBe(
      [
        'Përshëndetje! Dua të regjistroj fëmijën në Gjakova Coders.',
        'Prindi: Arta Krasniqi',
        'Telefoni: +383 49 123 456',
        'Mosha: 10–13 vjeç',
        'Paketa: Çmimi i rregullt – 40 €/muaj',
      ].join('\n'),
    );
  });

  it('appends the note line when provided', () => {
    const wa = setup();
    const lines = wa.buildMessage({ ...data, note: ' Një pyetje ' }).split('\n');
    expect(lines.at(-1)).toBe('Mesazh: Një pyetje');
    expect(lines).toHaveLength(6);
  });

  it('builds a full registration link', () => {
    const wa = setup({ phone: '38349123456' });
    const url = wa.buildRegistrationLink(data);
    expect(url.startsWith('https://wa.me/38349123456?text=')).toBe(true);
    expect(decodeURIComponent(url.split('?text=')[1])).toBe(wa.buildMessage(data));
  });
});
