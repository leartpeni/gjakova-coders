import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SITE_CONFIG } from '../../core/config/site.config';
import { eur } from '../../core/utils/money';
import { Logo } from '../../shared/logo/logo';

@Component({
  selector: 'app-hero',
  imports: [Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="top" class="hero" aria-labelledby="hero-title">
      <div class="container grid-2">
        <div class="copy">
          <span class="eyebrow">KURS I RI NË GJAKOVË</span>
          <h1 id="hero-title"><span class="gradient-text">Programim</span><br />për fëmijë</h1>
          <p class="lead">
            Fëmijët dhe të rinjtë 7–18 vjeç mësojnë të krijojnë lojëra, faqe interneti dhe
            aplikacione. Mëso. Ndërto. Krijo.
          </p>
          <div class="actions">
            <a class="btn btn--primary" href="#regjistrimi">Regjistrohu tani</a>
            <a class="btn btn--outline" href="#programet">Shiko programet</a>
          </div>
          <ul class="chips">
            <li class="chip chip--offer">Ofertë: {{ offer }}/muaj për regjistrimet e para</li>
            <li class="chip">Mosha 7–18 vjeç</li>
            <li class="chip">7 kurse</li>
            <li class="chip">{{ config.lessonsPerWeek }} herë në javë</li>
            <li class="chip">Gjakovë</li>
          </ul>
        </div>

        <div class="visual" aria-hidden="true">
          <div class="window">
            <div class="dots"><i></i><i></i><i></i></div>
            <pre><code><span class="k">for</span> mosha <span class="k">in</span> <span class="f">range</span>(<span class="n">7</span>, <span class="n">19</span>):
    <span class="f">print</span>(<span class="s">"Mëso. Ndërto. Krijo."</span>)

kursi = [<span class="s">"Scratch"</span>, <span class="s">"Python"</span>, <span class="s">"AI"</span>]</code></pre>
          </div>
          <app-logo class="float" [size]="76" [showText]="false" />
        </div>
      </div>
    </section>
  `,
  styles: `
    .hero {
      position: relative;
      overflow: hidden;
      color: #fff;
      padding: clamp(44px, 8vw, 88px) 0 clamp(96px, 12vw, 130px);
      background:
        radial-gradient(600px 400px at 85% 10%, rgba(46, 230, 197, 0.22), transparent 70%),
        radial-gradient(520px 380px at 5% 90%, rgba(255, 90, 138, 0.2), transparent 70%),
        var(--hero-gradient);
    }
    .hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px);
      background-size: 44px 44px;
      mask-image: linear-gradient(to bottom, #000 20%, transparent 85%);
      pointer-events: none;
    }
    .grid-2 {
      position: relative;
      display: grid;
      gap: 48px;
      align-items: center;
    }
    .eyebrow {
      color: var(--teal);
    }
    h1 {
      margin-bottom: 20px;
    }
    .lead {
      max-width: 540px;
      font-size: clamp(16px, 2.2vw, 19px);
      color: #e3e1f7;
    }
    .actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin: 28px 0;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .chip {
      padding: 6px 16px;
      border: 1px solid rgba(255, 255, 255, 0.35);
      border-radius: 99px;
      font-size: 14px;
      font-weight: 500;
    }
    .chip--offer {
      background: var(--orange);
      border-color: var(--orange);
      color: #0b0e36;
      font-weight: 600;
    }
    .visual {
      position: relative;
      padding-bottom: 30px;
    }
    .window {
      background: #0b0e36;
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 22px;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
      overflow: hidden;
    }
    .dots {
      display: flex;
      gap: 8px;
      padding: 14px 18px;
      background: rgba(255, 255, 255, 0.06);
      i {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--pink);
        &:nth-child(2) {
          background: var(--yellow);
        }
        &:nth-child(3) {
          background: var(--teal);
        }
      }
    }
    pre {
      margin: 0;
      padding: 20px 18px 28px;
      overflow-x: auto;
      font:
        13px/1.8 ui-monospace,
        'SFMono-Regular',
        Consolas,
        'Liberation Mono',
        monospace;
      color: #e3e1f7;
    }
    .k {
      color: var(--pink);
    }
    .f {
      color: var(--yellow);
    }
    .n {
      color: #ff9a4d;
    }
    .s {
      color: var(--teal);
    }
    .float {
      position: absolute;
      right: 10px;
      bottom: 0;
      filter: drop-shadow(0 14px 20px rgba(0, 0, 0, 0.4));
      animation: bob 4s ease-in-out infinite;
    }
    @keyframes bob {
      50% {
        transform: translateY(-10px);
      }
    }
    @media (min-width: 480px) {
      .actions {
        flex-direction: row;
        flex-wrap: wrap;
      }
      pre {
        font-size: 14px;
      }
    }
    @media (min-width: 1024px) {
      .grid-2 {
        grid-template-columns: 1.1fr 0.9fr;
      }
      .float {
        right: -26px;
      }
    }
  `,
})
export class Hero {
  protected readonly config = inject(SITE_CONFIG);
  protected readonly offer = eur(this.config.openingPrice);
}
