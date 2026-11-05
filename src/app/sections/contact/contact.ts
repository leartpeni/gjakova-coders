import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { TPipe } from '../../core/i18n/t.pipe';
import { SITE_CONFIG } from '../../core/config/site.config';
import { buildContacts } from '../../core/utils/contacts';
import { Reveal } from '../../shared/reveal/reveal';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-contact',
  imports: [SectionHeading, Reveal, TPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="kontakti" class="section section--tint" aria-labelledby="kontakti-title">
      <div class="container">
        <app-section-heading
          headingId="kontakti-title"
          [eyebrow]="'contact.eyebrow' | t"
          [title]="'contact.title' | t"
          [subtitle]="'contact.subtitle' | t"
        />
        <ul class="grid grid--auto">
          @for (c of contacts; track c.id; let i = $index) {
            <li [appReveal]="i * 80">
              <a
                class="card card--lift item"
                [href]="c.href"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="badge" [attr.data-id]="c.id" aria-hidden="true">{{
                  c.label.charAt(0)
                }}</span>
                <span class="text">
                  <strong>{{ c.id === 'address' ? ('contact.address' | t) : c.label }}</strong>
                  <span>{{ c.value }}</span>
                </span>
              </a>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .item {
      display: flex;
      align-items: center;
      gap: 16px;
      height: 100%;
      text-decoration: none;
    }
    .badge {
      flex: none;
      display: grid;
      place-items: center;
      width: 48px;
      height: 48px;
      border-radius: 16px;
      background: var(--accent-gradient);
      color: #0b0e36;
      font-weight: 800;
      font-size: 20px;
    }
    .badge[data-id='whatsapp'] {
      background: #25d366;
    }
    .badge[data-id='instagram'] {
      background: linear-gradient(135deg, #ffc93c, #ff5a8a);
    }
    .badge[data-id='facebook'] {
      background: #7aa7ff;
    }
    .text {
      display: grid;
      min-width: 0;
      overflow-wrap: anywhere;
    }
    .text span {
      color: var(--muted);
    }
  `,
})
export class Contact {
  protected readonly contacts = buildContacts(inject(SITE_CONFIG));
}
