import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="eyebrow">{{ eyebrow() }}</span>
    <h2 [attr.id]="headingId()">{{ title() }}</h2>
    @if (subtitle()) {
      <p class="sub">{{ subtitle() }}</p>
    }
  `,
  styles: `
    :host {
      display: block;
      max-width: 680px;
      margin-bottom: clamp(32px, 5vw, 48px);
    }
    :host(.center) {
      margin-inline: auto;
      text-align: center;
    }
    .sub {
      margin-top: 14px;
      color: var(--muted);
      font-size: clamp(16px, 2vw, 18px);
    }
  `,
})
export class SectionHeading {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly subtitle = input('');
  readonly headingId = input.required<string>();
}
