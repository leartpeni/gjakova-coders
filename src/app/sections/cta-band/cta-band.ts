import { ChangeDetectionStrategy, Component } from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { TPipe } from '../../core/i18n/t.pipe';
import { Reveal } from '../../shared/reveal/reveal';

@Component({
  selector: 'app-cta-band',
  imports: [Reveal, TPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section section--tint" aria-labelledby="cta-title">
      <div class="container">
        <div class="band" appReveal>
          <div>
            <h2 id="cta-title">{{ 'cta.title' | t }}</h2>
            <p>{{ 'cta.text' | t }}</p>
          </div>
          <a class="btn btn--primary" href="#regjistrimi">{{ 'cta.button' | t }}</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .band {
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding: clamp(28px, 5vw, 48px);
      border-radius: var(--radius-lg);
      background: linear-gradient(135deg, #1b1f5e, #6d2fe0);
      color: #fff;
      box-shadow: 0 20px 50px rgba(109, 47, 224, 0.35);
    }
    p {
      margin-top: 8px;
      color: #e3e1f7;
    }
    .btn {
      width: 100%;
    }
    @media (min-width: 768px) {
      .band {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
      .btn {
        width: auto;
        flex: none;
      }
    }
  `,
})
export class CtaBand {}
