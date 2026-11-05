import { Injectable, inject } from '@angular/core';
import { SITE_CONFIG } from '../config/site.config';
import { I18nService } from '../i18n/i18n.service';

export interface RegistrationMessage {
  readonly parent: string;
  readonly phone: string;
  readonly age: string;
  readonly plan: string;
  readonly note?: string;
}

@Injectable({ providedIn: 'root' })
export class WhatsappService {
  private readonly config = inject(SITE_CONFIG);
  private readonly i18n = inject(I18nService);

  /** Phone digits from config (non-digits stripped). */
  get phone(): string {
    return this.config.phone.replace(/\D/g, '');
  }

  get enabled(): boolean {
    return this.phone.length > 0;
  }

  /** Builds a wa.me link. Without a configured phone, WhatsApp lets the user pick the contact. */
  buildLink(message?: string): string {
    const base = this.enabled ? `https://wa.me/${this.phone}` : 'https://wa.me/';
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
  }

  buildMessage(data: RegistrationMessage): string {
    const t = (key: string) => this.i18n.translate(key);
    const lines = [
      t('whatsapp.intro'),
      `${t('whatsapp.parent')}: ${data.parent.trim()}`,
      `${t('whatsapp.phone')}: ${data.phone.trim()}`,
      `${t('whatsapp.age')}: ${data.age}`,
      `${t('whatsapp.plan')}: ${data.plan}`,
    ];
    const note = data.note?.trim();
    if (note) {
      lines.push(`${t('whatsapp.note')}: ${note}`);
    }
    return lines.join('\n');
  }

  buildRegistrationLink(data: RegistrationMessage): string {
    return this.buildLink(this.buildMessage(data));
  }
}
