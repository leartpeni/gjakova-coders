import { Injectable, inject } from '@angular/core';
import { SITE_CONFIG } from '../config/site.config';

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
    const lines = [
      'Përshëndetje! Dua të regjistroj fëmijën në Gjakova Coders.',
      `Prindi: ${data.parent.trim()}`,
      `Telefoni: ${data.phone.trim()}`,
      `Mosha: ${data.age}`,
      `Paketa: ${data.plan}`,
    ];
    const note = data.note?.trim();
    if (note) {
      lines.push(`Mesazh: ${note}`);
    }
    return lines.join('\n');
  }

  buildRegistrationLink(data: RegistrationMessage): string {
    return this.buildLink(this.buildMessage(data));
  }
}
