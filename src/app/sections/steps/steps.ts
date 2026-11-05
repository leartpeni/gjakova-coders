import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { TPipe } from '../../core/i18n/t.pipe';
import { Reveal } from '../../shared/reveal/reveal';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-steps',
  imports: [SectionHeading, Reveal, TPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="hapat" class="section" aria-labelledby="hapat-title">
      <div class="container">
        <app-section-heading
          headingId="hapat-title"
          [eyebrow]="'steps.eyebrow' | t"
          [title]="'steps.title' | t"
          [subtitle]="'steps.subtitle' | t"
        />
        <ol class="grid grid--auto">
          @for (n of i18n.indices('steps.items'); track n; let i = $index) {
            <li class="card card--lift" [appReveal]="i * 100">
              <span class="badge" aria-hidden="true">{{ i + 1 }}</span>
              <h3>{{ 'steps.items.' + n + '.title' | t }}</h3>
              <p>{{ 'steps.items.' + n + '.text' | t }}</p>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    ol {
      margin: 0;
      padding: 0;
      list-style: none;
      row-gap: 40px;
    }
    li {
      position: relative;
      padding-top: 44px;
    }
    .badge {
      position: absolute;
      top: -22px;
      left: 24px;
      display: grid;
      place-items: center;
      width: 52px;
      height: 52px;
      border-radius: 16px;
      background: var(--accent-gradient);
      color: #0b0e36;
      font-size: 24px;
      font-weight: 800;
      box-shadow: 0 10px 22px rgba(255, 122, 26, 0.4);
    }
    h3 {
      margin-bottom: 8px;
      font-size: 22px;
    }
    p {
      color: var(--muted);
    }
  `,
})
export class Steps {
  protected readonly i18n = inject(I18nService);
}
