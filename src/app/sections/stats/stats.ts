import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../../shared/reveal/reveal';

interface Stat {
  readonly value: string;
  readonly label: string;
}

@Component({
  selector: 'app-stats',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="stats container" aria-label="Në numra">
      <ul class="card" appReveal>
        @for (s of stats; track s.label) {
          <li>
            <strong>{{ s.value }}</strong>
            <span>{{ s.label }}</span>
          </li>
        }
      </ul>
    </section>
  `,
  styles: `
    .stats {
      position: relative;
      z-index: 2;
      margin-top: -50px;
    }
    ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px 12px;
      padding: 28px 16px;
      border-radius: var(--radius-lg);
      text-align: center;
    }
    strong {
      display: block;
      font-size: clamp(30px, 5vw, 44px);
      font-weight: 800;
      line-height: 1.1;
      background: linear-gradient(135deg, #6d2fe0, #ff5a8a);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    span {
      color: var(--muted);
      font-weight: 500;
    }
    @media (prefers-color-scheme: dark) {
      strong {
        background-image: var(--accent-gradient);
      }
    }
    @media (min-width: 768px) {
      ul {
        grid-template-columns: repeat(4, 1fr);
        padding: 36px 24px;
      }
    }
  `,
})
export class Stats {
  protected readonly stats: readonly Stat[] = [
    { value: '7', label: 'kurse' },
    { value: '3', label: 'nivele' },
    { value: '9', label: 'muaj program' },
    { value: '7–18', label: 'vjeç' },
  ];
}
