import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { TPipe } from '../../core/i18n/t.pipe';
import { Reveal } from '../../shared/reveal/reveal';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-faq',
  imports: [SectionHeading, Reveal, TPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="faq" class="section" aria-labelledby="faq-title">
      <div class="container narrow">
        <app-section-heading
          headingId="faq-title"
          [eyebrow]="'faq.eyebrow' | t"
          [title]="'faq.title' | t"
          [subtitle]="'faq.subtitle' | t"
        />
        <div class="list">
          @for (n of i18n.indices('faq.items'); track n; let i = $index) {
            <details class="card" [appReveal]="i * 60">
              <summary>
                <span>{{ 'faq.items.' + n + '.question' | t }}</span>
                <span class="icon" aria-hidden="true"></span>
              </summary>
              <p>{{ 'faq.items.' + n + '.answer' | t }}</p>
            </details>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .narrow {
      max-width: 820px;
    }
    .list {
      display: grid;
      gap: 14px;
    }
    details {
      padding: 0;
      border-radius: 20px;
    }
    summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      min-height: 56px;
      padding: 14px 22px;
      font-weight: 600;
      cursor: pointer;
      list-style: none;
    }
    summary::-webkit-details-marker {
      display: none;
    }
    .icon {
      flex: none;
      position: relative;
      width: 18px;
      height: 18px;
    }
    .icon::before,
    .icon::after {
      content: '';
      position: absolute;
      top: 8px;
      left: 0;
      width: 18px;
      height: 2px;
      border-radius: 2px;
      background: var(--accent);
      transition: transform 0.2s ease;
    }
    .icon::after {
      transform: rotate(90deg);
    }
    details[open] .icon::after {
      transform: rotate(0);
    }
    p {
      padding: 0 22px 20px;
      color: var(--muted);
    }
  `,
})
export class Faq {
  protected readonly i18n = inject(I18nService);
}
