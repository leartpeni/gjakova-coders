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
import { Logo } from '../../shared/logo/logo';

interface NavLink {
  readonly label: string;
  readonly href: string;
}

@Component({
  selector: 'app-header',
  imports: [Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'closeOnEscape()',
    '(window:resize)': 'onResize()',
  },
  template: `
    <header class="header">
      <div class="container bar">
        <a class="brand" href="#top" aria-label="Gjakova Coders – kreu"
          ><app-logo class="compact" [size]="40"
        /></a>

        <nav class="desktop-nav" aria-label="Menyja kryesore">
          @for (link of links; track link.href) {
            <a [href]="link.href">{{ link.label }}</a>
          }
        </nav>

        <a class="btn btn--primary btn--sm cta" href="#regjistrimi">Regjistrohu</a>

        <button
          #toggleBtn
          type="button"
          class="burger"
          [attr.aria-expanded]="open()"
          aria-controls="mobile-menu"
          [attr.aria-label]="open() ? 'Mbyll menynë' : 'Hap menynë'"
          (click)="toggle()"
        >
          <span aria-hidden="true">{{ open() ? '✕' : '☰' }}</span>
        </button>
      </div>

      <nav id="mobile-menu" class="mobile-nav" aria-label="Menyja mobile" [hidden]="!open()">
        <ul class="container">
          @for (link of mobileLinks; track link.href; let first = $first) {
            <li>
              <a [href]="link.href" (click)="close()" [attr.data-first]="first ? '' : null">{{
                link.label
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
  private readonly injector = inject(Injector);
  private readonly toggleBtn = viewChild.required<ElementRef<HTMLButtonElement>>('toggleBtn');
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly open = signal(false);

  protected readonly links: readonly NavLink[] = [
    { label: 'Programet', href: '#programet' },
    { label: 'Plani mësimor', href: '#plani' },
    { label: 'Çmimet', href: '#cmimet' },
    { label: 'Pyetje', href: '#faq' },
  ];
  protected readonly mobileLinks: readonly NavLink[] = [
    ...this.links,
    { label: 'Regjistrimi', href: '#regjistrimi' },
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
