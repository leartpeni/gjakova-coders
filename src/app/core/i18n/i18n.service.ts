import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { SITE_CONFIG } from '../config/site.config';
import { eur } from '../utils/money';
import enJson from './en.json';
import sqJson from './sq.json';

export type Lang = 'sq' | 'en';

/** Shape of both dictionaries; sq.json is the source of truth, en.json must match it. */
export type Dictionary = typeof sqJson;

type Leaf<T> = T extends string
  ? ''
  : T extends readonly (infer U)[]
    ? `.${number}${Leaf<U>}`
    : { [K in keyof T & string]: `.${K}${Leaf<T[K]>}` }[keyof T & string];
type Strip<S> = S extends `.${infer R}` ? R : never;

/** Dot-separated path to any string in the dictionary, e.g. `faq.items.0.question`. */
export type TranslationKey = Strip<Leaf<Dictionary>>;

export type TranslationParams = Readonly<Record<string, string | number>>;

export const LANG_STORAGE_KEY = 'gc-lang';

const en: Dictionary = enJson;
const DICTIONARIES: Record<Lang, Dictionary> = { sq: sqJson, en };

function readStoredLang(): Lang {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    return stored === 'en' || stored === 'sq' ? stored : 'sq';
  } catch {
    return 'sq';
  }
}

function lookup(dict: Dictionary, key: string): unknown {
  let node: unknown = dict;
  for (const part of key.split('.')) {
    if (node === null || typeof node !== 'object') {
      return undefined;
    }
    node = (node as Record<string, unknown>)[part];
  }
  return node;
}

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly doc = inject(DOCUMENT);
  private readonly config = inject(SITE_CONFIG);

  readonly lang = signal<Lang>(readStoredLang());

  /** Placeholders available in every string, derived from the site config. */
  private readonly vars = computed<TranslationParams>(() => ({
    regular: eur(this.config.regularPrice),
    opening: eur(this.config.openingPrice),
    total: eur(this.config.openingPrice * this.config.openingMonths),
    months: this.config.openingMonths,
    perWeek: this.config.lessonsPerWeek,
    duration: this.lang() === 'en' ? this.config.lessonDurationEn : this.config.lessonDuration,
  }));

  constructor() {
    effect(() => {
      const lang = this.lang();
      this.doc.documentElement.lang = lang;
      this.doc.title = this.translate('meta.title');
      try {
        localStorage.setItem(LANG_STORAGE_KEY, lang);
      } catch {
        // Storage may be unavailable (private mode); the choice just won't persist.
      }
    });
  }

  toggle(): void {
    this.lang.update((l) => (l === 'sq' ? 'en' : 'sq'));
  }

  /** Resolves a key in the current language and fills `{placeholders}`. Missing keys return the key. */
  translate(key: string, params?: TranslationParams): string {
    const value = lookup(DICTIONARIES[this.lang()], key);
    if (typeof value !== 'string') {
      return key;
    }
    const all = { ...this.vars(), ...params };
    return value.replace(/\{(\w+)\}/g, (match, name: string) =>
      name in all ? String(all[name]) : match,
    );
  }

  /** Indices of an array in the dictionary, for use in `@for`. */
  indices(key: string): readonly number[] {
    const value = lookup(DICTIONARIES[this.lang()], key);
    return Array.isArray(value) ? value.map((_, i) => i) : [];
  }
}
