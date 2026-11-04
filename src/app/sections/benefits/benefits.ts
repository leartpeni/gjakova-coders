import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BENEFITS } from '../../core/data/benefits';
import { Reveal } from '../../shared/reveal/reveal';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-benefits',
  imports: [SectionHeading, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="perfitimet" class="section" aria-labelledby="perfitimet-title">
      <div class="container">
        <app-section-heading
          headingId="perfitimet-title"
          eyebrow="PËRFITIMET"
          title="Pse programim për fëmijët?"
          subtitle="Programimi është mënyrë e re për të menduar dhe krijuar, jo vetëm për kompjuterë."
        />
        <ul class="grid grid--auto">
          @for (b of benefits; track b.title; let i = $index) {
            <li class="card card--lift" [appReveal]="i * 80">
              <span class="check" [style.background]="b.color" aria-hidden="true">✓</span>
              <h3>{{ b.title }}</h3>
              <p>{{ b.text }}</p>
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
  protected readonly benefits = BENEFITS;
}
