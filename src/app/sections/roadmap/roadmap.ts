import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SITE_CONFIG } from '../../core/config/site.config';
import { ROADMAP } from '../../core/data/roadmap';
import { Reveal } from '../../shared/reveal/reveal';
import { SectionHeading } from '../../shared/section-heading/section-heading';

@Component({
  selector: 'app-roadmap',
  imports: [SectionHeading, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="plani" class="section section--tint" aria-labelledby="plani-title">
      <div class="container">
        <app-section-heading
          headingId="plani-title"
          eyebrow="PLANI MËSIMOR"
          title="Plani mësimor në 3 nivele"
          subtitle="Një rrugë e qartë, e ndarë sipas moshës. Në fund të çdo niveli fëmijët marrin certifikatë dhe paraqesin projektet para prindërve."
        />
        <ul class="grid levels">
          @for (l of levels; track l.level; let i = $index) {
            <li class="card card--lift level" [appReveal]="i * 100">
              <span class="pill">{{ l.level }}</span>
              <p class="age">{{ l.age }}</p>
              <p class="tech">{{ l.tech }}</p>
              <ol>
                @for (s of l.steps; track s; let n = $index) {
                  <li>
                    <span class="num" aria-hidden="true">{{ n + 1 }}</span>
                    <span>{{ s }}</span>
                  </li>
                }
              </ol>
            </li>
          }
        </ul>
        <p class="note">
          Organizimi: {{ config.lessonsPerWeek }} mësime në javë, nga {{ config.lessonDuration }},
          grupe sipas moshës.
        </p>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .levels {
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
    }
    .level {
      display: flex;
      flex-direction: column;
    }
    .pill {
      align-self: flex-start;
      padding: 4px 14px;
      border-radius: 99px;
      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--muted);
      font-size: 13px;
      font-weight: 600;
    }
    .age {
      margin-top: 16px;
      font-size: clamp(34px, 4vw, 44px);
      font-weight: 800;
      line-height: 1.1;
      color: var(--accent);
    }
    .tech {
      margin: 6px 0 20px;
      font-weight: 600;
      color: var(--muted);
    }
    ol {
      display: grid;
      gap: 14px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    ol li {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .num {
      flex: none;
      display: grid;
      place-items: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--accent-gradient);
      color: #0b0e36;
      font-weight: 700;
      font-size: 14px;
    }
    .note {
      margin-top: 32px;
      text-align: center;
      font-weight: 500;
      color: var(--muted);
    }
  `,
})
export class Roadmap {
  protected readonly config = inject(SITE_CONFIG);
  protected readonly levels = ROADMAP;
}
