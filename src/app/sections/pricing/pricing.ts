import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { TPipe } from '../../core/i18n/t.pipe';
import { Reveal } from '../../shared/reveal/reveal';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-pricing',
  imports: [SectionHeading, Reveal, TPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="cmimet" class="section section--tint" aria-labelledby="cmimet-title">
      <div class="container">
        <app-section-heading
          class="center"
          headingId="cmimet-title"
          [eyebrow]="'pricing.eyebrow' | t"
          [title]="'pricing.title' | t"
          [subtitle]="'pricing.subtitle' | t"
        />
        <div class="plans">
          <article class="card card--lift plan" appReveal>
            <h3>{{ 'pricing.regular.title' | t }}</h3>
            <p class="price">
              <strong>{{ 'pricing.regular.price' | t }}</strong>
              <span>{{ 'pricing.perMonth' | t }}</span>
            </p>
            <ul class="checks">
              @for (n of i18n.indices('pricing.regular.checks'); track n) {
                <li>{{ 'pricing.regular.checks.' + n | t }}</li>
              }
            </ul>
          </article>

          <article class="card card--lift plan plan--featured" [appReveal]="100">
            <span class="badge">{{ 'pricing.opening.badge' | t }}</span>
            <h3>{{ 'pricing.opening.title' | t }}</h3>
            <p class="price">
              <strong>{{ 'pricing.opening.price' | t }}</strong>
              <span>{{ 'pricing.perMonth' | t }}</span>
              <del
                ><span class="sr-only">{{ 'pricing.previousPrice' | t }}</span
                >{{ 'pricing.regular.price' | t }}</del
              >
            </p>
            <ul class="checks">
              @for (n of i18n.indices('pricing.opening.checks'); track n) {
                <li>{{ 'pricing.opening.checks.' + n | t }}</li>
              }
            </ul>
          </article>
        </div>
        <ul class="pills">
          @for (n of i18n.indices('pricing.pills'); track n) {
            <li>{{ 'pricing.pills.' + n | t }}</li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .plans {
      display: grid;
      gap: 24px;
      max-width: 820px;
      margin-inline: auto;
    }
    .plan {
      padding: 32px 28px;
    }
    .plan--featured {
      order: -1;
      border: 0;
      background: var(--accent-gradient);
      color: #0b0e36;
      box-shadow: 0 18px 50px rgba(255, 122, 26, 0.45);
    }
    .badge {
      display: inline-block;
      margin-bottom: 14px;
      padding: 4px 14px;
      border-radius: 99px;
      background: var(--teal);
      color: #0b0e36;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.06em;
    }
    h3 {
      font-size: 22px;
    }
    .price {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: 6px 10px;
      margin: 12px 0 22px;
    }
    .price strong {
      font-size: clamp(40px, 6vw, 52px);
      font-weight: 800;
      line-height: 1;
    }
    .price del {
      font-size: 20px;
      font-weight: 600;
      opacity: 0.75;
    }
    .plan:not(.plan--featured) .price span {
      color: var(--muted);
    }
    .checks {
      display: grid;
      gap: 12px;
    }
    .checks li {
      position: relative;
      padding-left: 30px;
    }
    .checks li::before {
      content: '✓';
      position: absolute;
      left: 0;
      font-weight: 800;
      color: var(--accent);
    }
    .plan--featured .checks li::before {
      color: #0b0e36;
    }
    .pills {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
      margin-top: 32px;
    }
    .pills li {
      padding: 10px 20px;
      border: 1px solid var(--border);
      border-radius: 99px;
      background: var(--surface);
      font-weight: 600;
      font-size: 15px;
      text-align: center;
    }
    @media (min-width: 768px) {
      .plans {
        grid-template-columns: 1fr 1fr;
      }
      .plan--featured {
        order: 0;
      }
    }
  `,
})
export class Pricing {
  protected readonly i18n = inject(I18nService);
}
