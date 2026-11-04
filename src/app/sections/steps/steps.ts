import { ChangeDetectionStrategy, Component } from '@angular/core';
import { STEPS } from '../../core/data/steps';
import { Reveal } from '../../shared/reveal/reveal';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-steps',
  imports: [SectionHeading, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="hapat" class="section section--tint" aria-labelledby="hapat-title">
      <div class="container">
        <app-section-heading
          headingId="hapat-title"
          eyebrow="SI FILLOJMË"
          title="Tre hapa të thjeshtë"
          subtitle="Nga regjistrimi deri te mësimi i parë."
        />
        <ol class="grid grid--auto">
          @for (s of steps; track s.title; let i = $index) {
            <li class="card card--lift" [appReveal]="i * 100">
              <span class="badge" aria-hidden="true">{{ i + 1 }}</span>
              <h3>{{ s.title }}</h3>
              <p>{{ s.text }}</p>
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
  protected readonly steps = STEPS;
}
