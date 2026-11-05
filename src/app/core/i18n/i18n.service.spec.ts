import { TestBed } from '@angular/core/testing';
import enJson from './en.json';
import { LANG_STORAGE_KEY, I18nService } from './i18n.service';
import sqJson from './sq.json';

function leaves(node: unknown, path = ''): Record<string, string> {
  if (typeof node === 'string') {
    return { [path]: node };
  }
  return Object.entries(node as object).reduce(
    (acc, [k, v]) => ({ ...acc, ...leaves(v, path ? `${path}.${k}` : k) }),
    {},
  );
}

const placeholders = (s: string): string[] => (s.match(/\{\w+\}/g) ?? []).sort();

describe('I18nService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = 'sq';
  });

  it('defaults to Albanian', () => {
    const i18n = TestBed.inject(I18nService);
    expect(i18n.lang()).toBe('sq');
    expect(i18n.translate('hero.titleHighlight')).toBe('Programim');
  });

  it('restores a stored language', () => {
    localStorage.setItem(LANG_STORAGE_KEY, 'en');
    expect(TestBed.inject(I18nService).lang()).toBe('en');
  });

  it('ignores invalid stored values and a throwing localStorage', () => {
    localStorage.setItem(LANG_STORAGE_KEY, 'de');
    expect(TestBed.inject(I18nService).lang()).toBe('sq');
    TestBed.resetTestingModule();
    const get = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(TestBed.inject(I18nService).lang()).toBe('sq');
    get.mockRestore();
  });

  it('persists, sets <html lang> and the document title on change', () => {
    const i18n = TestBed.inject(I18nService);
    TestBed.tick();
    expect(document.documentElement.lang).toBe('sq');
    expect(document.title).toContain('Kurs programimi');

    i18n.toggle();
    TestBed.tick();
    expect(i18n.lang()).toBe('en');
    expect(document.documentElement.lang).toBe('en');
    expect(document.title).toBe('Gjakova Coders – Coding courses for kids in Gjakova');
    expect(localStorage.getItem(LANG_STORAGE_KEY)).toBe('en');
  });

  it('does not throw when saving fails', () => {
    const set = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota');
    });
    const i18n = TestBed.inject(I18nService);
    i18n.lang.set('en');
    expect(() => TestBed.tick()).not.toThrow();
    set.mockRestore();
  });

  it('fills placeholders from the site config in each language', () => {
    const i18n = TestBed.inject(I18nService);
    expect(i18n.translate('sticky.text')).toBe('Vetëm 30\u00A0€/muaj për regjistrimet e para');
    expect(i18n.translate('pricing.opening.checks.0')).toBe(
      'Pagesa për 3 muaj: 90\u00A0€ gjithsej',
    );
    i18n.lang.set('en');
    expect(i18n.translate('sticky.text')).toBe('Only 30\u00A0€/month for the first registrations');
    expect(i18n.translate('programs.note')).toBe(
      'Schedule: 2 lessons a week, 1 hour 15 min each, groups by age.',
    );
    expect(i18n.translate('footer.copy', { year: 2030 })).toContain('2030');
  });

  it('returns the key for unknown keys and lists array indices', () => {
    const i18n = TestBed.inject(I18nService);
    expect(i18n.translate('nope.nothing')).toBe('nope.nothing');
    expect(i18n.indices('faq.items')).toHaveLength(6);
    expect(i18n.indices('nope')).toEqual([]);
  });

  it('keeps en.json and sq.json in sync (keys and placeholders)', () => {
    const sq = leaves(sqJson);
    const en = leaves(enJson);
    expect(Object.keys(en)).toEqual(Object.keys(sq));
    for (const key of Object.keys(sq)) {
      expect(placeholders(en[key]), key).toEqual(placeholders(sq[key]));
    }
  });

  it('uses typographic apostrophes in English', () => {
    expect(JSON.stringify(enJson)).not.toContain("'");
  });
});
