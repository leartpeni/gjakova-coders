import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { TPipe } from '../../core/i18n/t.pipe';
import { Logo } from '../../shared/logo/logo';

interface NavLink {
  readonly id: 'programs' | 'prices' | 'faq' | 'register';
  readonly href: string;
}

@Component({
  selector: 'app-header',
  imports: [Logo, TPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'closeOnEscape()',
    '(window:resize)': 'onResize()',
  },
  template: `
    <header class="header">
      <div class="container bar">
        <a class="brand" href="#top" [attr.aria-label]="'header.brandLabel' | t"
          ><app-logo class="compact" [size]="40"
        /></a>

        <nav class="desktop-nav" [attr.aria-label]="'header.mainNav' | t">
          @for (link of links; track link.href) {
            <a [href]="link.href">{{ 'header.links.' + link.id | t }}</a>
          }
        </nav>

        <a class="btn btn--primary btn--sm cta" href="#regjistrimi">{{ 'header.cta' | t }}</a>

        <button
          type="button"
          class="lang"
          [attr.aria-label]="'header.langLabel' | t"
          (click)="i18n.toggle()"
        >
          {{ 'header.langShort' | t }}
        </button>

        <button
          #toggleBtn
          type="button"
          class="burger"
          [attr.aria-expanded]="open()"
          aria-controls="mobile-menu"
          [attr.aria-label]="(open() ? 'header.menuClose' : 'header.menuOpen') | t"
          (click)="toggle()"
        >
          <span aria-hidden="true">{{ open() ? '✕' : '☰' }}</span>
        </button>
      </div>

      <nav
        id="mobile-menu"
        class="mobile-nav"
        [attr.aria-label]="'header.mobileNav' | t"
        [hidden]="!open()"
      >
        <ul class="container">
          @for (link of mobileLinks; track link.href; let first = $first) {
            <li>
              <a [href]="link.href" (click)="close()" [attr.data-first]="first ? '' : null">{{
                'header.links.' + link.id | t
              }}</a>
            </li>
          }
        </ul>
      </nav>
    </header>
  `,
  styles: `
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .header {
      padding-top: env(safe-area-inset-top);
      background: var(--bg);
      border-bottom: 1px solid var(--border);
    }
    .bar {
      display: flex;
      align-items: center;
      gap: 10px;
      min-height: var(--header-h);
    }
    .brand {
      display: inline-flex;
      align-items: center;
      min-height: 44px;
      margin-right: auto;
      text-decoration: none;
    }
    .desktop-nav {
      display: none;
    }
    .burger {
      display: inline-grid;
      place-items: center;
      width: 44px;
      height: 44px;
      border: 1px solid var(--border);
      border-radius: 14px;
      background: var(--surface);
      color: var(--text);
      font-size: 22px;
      cursor: pointer;
    }
    .lang {
      min-width: 44px;
      height: 44px;
      padding: 0 12px;
      border: 1px solid var(--border);
      border-radius: 99px;
      background: var(--surface);
      color: var(--text);
      font: 700 13px/1 var(--font);
      letter-spacing: 0.04em;
      cursor: pointer;
      &:hover {
        border-color: var(--accent);
      }
    }
    .mobile-nav {
      border-top: 1px solid var(--border);
      background: var(--bg);
      box-shadow: var(--shadow);
      ul {
        padding-block: 8px;
      }
      a {
        display: flex;
        align-items: center;
        min-height: 48px;
        font-weight: 600;
        text-decoration: none;
        border-bottom: 1px solid var(--border);
      }
      li:last-child a {
        border-bottom: 0;
      }
    }
    @media (max-width: 400px) {
      .cta {
        padding-inline: 14px;
        font-size: 14px;
      }
    }
    @media (min-width: 801px) {
      .burger,
      .mobile-nav {
        display: none;
      }
      .desktop-nav {
        display: flex;
        align-items: center;
        gap: 28px;
        margin-right: 12px;
        a {
          display: inline-flex;
          align-items: center;
          min-height: 44px;
          font-weight: 500;
          text-decoration: none;
          &:hover {
            color: var(--accent);
          }
        }
      }
    }
  `,
})
export class Header {
  protected readonly i18n = inject(I18nService);
  private readonly injector = inject(Injector);
  private readonly toggleBtn = viewChild.required<ElementRef<HTMLButtonElement>>('toggleBtn');
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly open = signal(false);

  protected readonly links: readonly NavLink[] = [
    { id: 'programs', href: '#programet' },
    { id: 'prices', href: '#cmimet' },
    { id: 'faq', href: '#faq' },
  ];
  protected readonly mobileLinks: readonly NavLink[] = [
    ...this.links,
    { id: 'register', href: '#regjistrimi' },
  ];

  protected toggle(): void {
    if (this.open()) {
      this.close();
      return;
    }
    this.open.set(true);
    afterNextRender(
      () => this.host.nativeElement.querySelector<HTMLElement>('a[data-first]')?.focus(),
      { injector: this.injector },
    );
  }

  protected close(): void {
    this.open.set(false);
  }

  protected closeOnEscape(): void {
    if (this.open()) {
      this.close();
      this.toggleBtn().nativeElement.focus();
    }
  }

  protected onResize(): void {
    if (this.open() && window.innerWidth > 800) {
      this.close();
    }
  }
}
