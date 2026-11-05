import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BENEFIT_COLORS } from '../../core/data/benefits';
import { I18nService } from '../../core/i18n/i18n.service';
import { TPipe } from '../../core/i18n/t.pipe';
import { Reveal } from '../../shared/reveal/reveal';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-benefits',
  imports: [SectionHeading, Reveal, TPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="perfitimet" class="section section--tint" aria-labelledby="perfitimet-title">
      <div class="container">
        <app-section-heading
          headingId="perfitimet-title"
          [eyebrow]="'benefits.eyebrow' | t"
          [title]="'benefits.title' | t"
          [subtitle]="'benefits.subtitle' | t"
        />
        <ul class="grid grid--auto">
          @for (n of i18n.indices('benefits.items'); track n; let i = $index) {
            <li class="card card--lift" [appReveal]="i * 80">
              <span class="check" [style.background]="colors[n]" aria-hidden="true">✓</span>
              <h3>{{ 'benefits.items.' + n + '.title' | t }}</h3>
              <p>{{ 'benefits.items.' + n + '.text' | t }}</p>
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
    .check {
      display: grid;
      place-items: center;
      width: 44px;
      height: 44px;
      margin-bottom: 16px;
      border-radius: 14px;
      color: #0b0e36;
      font-size: 22px;
      font-weight: 800;
    }
    h3 {
      margin-bottom: 8px;
      font-size: 20px;
    }
    p {
      color: var(--muted);
    }
  `,
})
export class Benefits {
  protected readonly i18n = inject(I18nService);
  protected readonly colors = BENEFIT_COLORS;
}
