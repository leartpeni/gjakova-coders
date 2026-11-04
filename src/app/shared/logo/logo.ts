import { ChangeDetectionStrategy, Component, input } from '@angular/core';

let nextId = 0;

@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      class="icon"
      viewBox="0 0 200 200"
      [attr.width]="size()"
      [attr.height]="size()"
      role="img"
      aria-label="Gjakova Coders"
      [attr.aria-hidden]="showText() ? 'true' : null"
    >
      <defs>
        <linearGradient [attr.id]="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#1B1F5E" />
          <stop offset="1" stop-color="#6D2FE0" />
        </linearGradient>
        <linearGradient [attr.id]="chev" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#FFC93C" />
          <stop offset="1" stop-color="#FF7A1A" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="46" [attr.fill]="'url(#' + bg + ')'" />
      <g fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">
        <path
          d="M62 50C44 50 46 68 46 84C46 96 40 100 30 100C40 100 46 104 46 116C46 132 44 150 62 150"
        />
        <path
          d="M138 50C156 50 154 68 154 84C154 96 160 100 170 100C160 100 154 104 154 116C154 132 156 150 138 150"
        />
      </g>
      <path
        d="M78 80L100 100L78 120"
        fill="none"
        [attr.stroke]="'url(#' + chev + ')'"
        stroke-width="11"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path d="M108 122L130 122" stroke="#FF9A1F" stroke-width="11" stroke-linecap="round" />
      <rect x="132" y="24" width="10" height="10" rx="2.5" fill="#FFC93C" />
      <rect x="148" y="24" width="10" height="10" rx="2.5" fill="#2EE6C5" />
      <rect x="164" y="24" width="10" height="10" rx="2.5" fill="#FF5A8A" />
    </svg>
    @if (showText()) {
      <span class="text">Gjakova Coders</span>
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }
    .icon {
      flex: none;
    }
    .text {
      font-weight: 700;
      font-size: 18px;
      white-space: nowrap;
    }
    @media (max-width: 420px) {
      :host(.compact) .text {
        display: none;
      }
    }
  `,
})
export class Logo {
  readonly size = input(40);
  readonly showText = input(true);

  private readonly uid = nextId++;
  protected readonly bg = `logo-bg-${this.uid}`;
  protected readonly chev = `logo-chev-${this.uid}`;
}
