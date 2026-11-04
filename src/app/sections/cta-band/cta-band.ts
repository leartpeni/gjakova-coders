import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SITE_CONFIG } from '../../core/config/site.config';
import { eur } from '../../core/utils/money';
import { Reveal } from '../../shared/reveal/reveal';

@Component({
  selector: 'app-cta-band',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section" aria-labelledby="cta-title">
      <div class="container">
        <div class="band" appReveal>
          <div>
            <h2 id="cta-title">Gati për hapin e parë?</h2>
            <p>Oferta {{ offer }} në muaj vlen vetëm për regjistrimet e para.</p>
          </div>
          <a class="btn btn--primary" href="#regjistrimi">Regjistrohu tani</a>
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
export class CtaBand {
  protected readonly offer = eur(inject(SITE_CONFIG).openingPrice);
}
