import { InjectionToken } from '@angular/core';

export interface SiteConfig {
  /** Digits only, with country code, e.g. 38349123456. Empty hides WhatsApp. */
  readonly phone: string;
  /** Profile URL or handle, e.g. gjakovacoders. Empty hides the card. */
  readonly instagram: string;
  /** Page URL or page name. Empty hides the card. */
  readonly facebook: string;
  /** Street address (used for a Google Maps search link). Empty hides the card. */
  readonly address: string;
  readonly regularPrice: number;
  readonly openingPrice: number;
  readonly openingMonths: number;
  readonly lessonsPerWeek: number;
  readonly lessonDuration: string;
  readonly lessonDurationEn: string;
}

export const siteConfig: SiteConfig = {
  phone: '',
  instagram: '',
  facebook: '',
  address: '',
  regularPrice: 40,
  openingPrice: 30,
  openingMonths: 3,
  lessonsPerWeek: 2,
  lessonDuration: '1 orë e 15 min',
  lessonDurationEn: '1 hour 15 min',
};

export const SITE_CONFIG = new InjectionToken<SiteConfig>('SITE_CONFIG', {
  providedIn: 'root',
  factory: () => siteConfig,
});
