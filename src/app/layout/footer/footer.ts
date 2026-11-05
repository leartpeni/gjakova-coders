import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TPipe } from '../../core/i18n/t.pipe';
import { Logo } from '../../shared/logo/logo';

@Component({
  selector: 'app-footer',
  imports: [Logo, TPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="container inner">
        <app-logo [size]="44" />
        <p class="tagline">{{ 'footer.tagline' | t }}</p>
        <nav [attr.aria-label]="'footer.navLabel' | t">
          @for (link of links; track link.href) {
            <a [href]="link.href">{{ 'footer.links.' + link.id | t }}</a>
          }
        </nav>
        <p class="copy">{{ 'footer.copy' | t: { year } }}</p>
      </div>
    </footer>
  `,
  styles: `
    .footer {
      background: #0b0e36;
      color: #fff;
      padding: 56px 0 calc(96px + env(safe-area-inset-bottom));
      border-top: 1px solid #2d3390;
    }
    .inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 18px;
      text-align: center;
    }
    .tagline {
      color: #b8bde8;
    }
    nav {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 4px 20px;
    }
    nav a {
      display: inline-flex;
      align-items: center;
      min-height: 44px;
      text-decoration: none;
      font-weight: 500;
      &:hover {
        color: #ffc93c;
      }
    }
    .copy {
      color: #b8bde8;
      font-size: 14px;
    }
    @media (min-width: 768px) {
      .footer {
        padding-bottom: 72px;
      }
    }
  `,
})
export class Footer {
  protected readonly year = new Date().getFullYear();
  protected readonly links = [
    { id: 'programs', href: '#programet' },
    { id: 'prices', href: '#cmimet' },
    { id: 'faq', href: '#faq' },
    { id: 'register', href: '#regjistrimi' },
  ] as const;
}
