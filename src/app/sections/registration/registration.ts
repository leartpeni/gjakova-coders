import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { I18nService } from '../../core/i18n/i18n.service';
import { TPipe } from '../../core/i18n/t.pipe';
import { WhatsappService } from '../../core/services/whatsapp.service';
import { Reveal } from '../../shared/reveal/reveal';
import { SectionHeading } from '../../shared/section-heading/section-heading';

export const PHONE_PATTERN = /^[+(]?\d[\d\s\-()]{6,18}$/;

export type RegistrationField = 'parent' | 'phone' | 'age' | 'plan' | 'note';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, SectionHeading, Reveal, TPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="regjistrimi" class="section" aria-labelledby="regjistrimi-title">
      <div class="container narrow">
        <app-section-heading
          class="center"
          headingId="regjistrimi-title"
          [eyebrow]="'registration.eyebrow' | t"
          [title]="'registration.title' | t"
          [subtitle]="'registration.subtitle' | t"
        />
        <form class="card form" [formGroup]="form" (ngSubmit)="submit()" novalidate appReveal>
          <div class="row">
            <div class="field">
              <label for="reg-parent">{{ 'registration.labels.parent' | t }}</label>
              <input
                id="reg-parent"
                type="text"
                formControlName="parent"
                autocomplete="name"
                [attr.aria-invalid]="error('parent') ? 'true' : null"
                [attr.aria-describedby]="error('parent') ? 'reg-parent-err' : null"
              />
              @if (error('parent'); as msg) {
                <p class="error" id="reg-parent-err">{{ msg | t }}</p>
              }
            </div>
            <div class="field">
              <label for="reg-phone">{{ 'registration.labels.phone' | t }}</label>
              <input
                id="reg-phone"
                type="tel"
                inputmode="tel"
                formControlName="phone"
                autocomplete="tel"
                [attr.aria-invalid]="error('phone') ? 'true' : null"
                [attr.aria-describedby]="error('phone') ? 'reg-phone-err' : null"
              />
              @if (error('phone'); as msg) {
                <p class="error" id="reg-phone-err">{{ msg | t }}</p>
              }
            </div>
          </div>
          <div class="row row--wide">
            <div class="field">
              <label for="reg-age">{{ 'registration.labels.age' | t }}</label>
              <select id="reg-age" formControlName="age">
                @for (a of ages; track a) {
                  <option [value]="a">{{ 'registration.ages.' + a | t }}</option>
                }
              </select>
            </div>
            <div class="field">
              <label for="reg-plan">{{ 'registration.labels.plan' | t }}</label>
              <select id="reg-plan" formControlName="plan">
                @for (p of plans; track p) {
                  <option [value]="p">{{ 'registration.plans.' + p | t }}</option>
                }
              </select>
            </div>
          </div>
          <div class="field">
            <label for="reg-note">{{ 'registration.labels.note' | t }}</label>
            <textarea id="reg-note" rows="4" formControlName="note"></textarea>
          </div>
          <button type="submit" class="btn btn--primary btn--block">
            {{ 'registration.submit' | t }}
          </button>
        </form>
        <p class="place">{{ 'registration.place' | t }}</p>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .narrow {
      max-width: 760px;
    }
    .form {
      display: grid;
      gap: 20px;
      padding: clamp(20px, 4vw, 36px);
      border-radius: var(--radius-lg);
    }
    .row {
      display: grid;
      gap: 20px;
    }
    .field {
      display: grid;
      gap: 6px;
      align-content: start;
    }
    label {
      font-weight: 600;
      font-size: 15px;
    }
    input,
    select,
    textarea {
      width: 100%;
      min-height: 48px;
      padding: 12px 14px;
      border: 1.5px solid var(--border);
      border-radius: 14px;
      background: var(--bg);
      color: var(--text);
      font: 400 16px/1.4 var(--font);
    }
    textarea {
      resize: vertical;
    }
    input[aria-invalid='true'] {
      border-color: #e5484d;
    }
    .error {
      color: #d6303a;
      font-size: 14px;
      font-weight: 500;
    }
    @media (prefers-color-scheme: dark) {
      .error {
        color: #ff9aa0;
      }
    }
    .place {
      margin-top: 20px;
      text-align: center;
      color: var(--muted);
      font-weight: 500;
    }
    @media (min-width: 768px) {
      .row {
        grid-template-columns: 1fr 1fr;
      }
      .row--wide {
        grid-template-columns: 1fr 1.7fr;
      }
      .btn {
        justify-self: start;
        width: auto;
      }
    }
  `,
})
export class Registration {
  private readonly i18n = inject(I18nService);
  private readonly wa = inject(WhatsappService);
  private readonly win = inject(DOCUMENT).defaultView;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);

  protected readonly ages = ['0', '1', '2'] as const;
  protected readonly plans = ['opening', 'regular', 'unsure'] as const;

  readonly form = inject(NonNullableFormBuilder).group({
    parent: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]],
    age: [this.ages[0] as string, Validators.required],
    plan: [this.plans[0] as string, Validators.required],
    note: [''],
  });

  private readonly submitted = signal(false);

  protected error(field: RegistrationField): string | null {
    const control = this.form.controls[field];
    if (!control.errors || !(control.touched || this.submitted())) {
      return null;
    }
    if (control.hasError('required')) {
      return 'registration.errors.required';
    }
    if (control.hasError('minlength')) {
      return 'registration.errors.minlength';
    }
    if (control.hasError('pattern')) {
      return 'registration.errors.pattern';
    }
    return null;
  }

  protected submit(): void {
    this.submitted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      afterNextRender(
        () => this.host.nativeElement.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
        { injector: this.injector },
      );
      return;
    }
    const v = this.form.getRawValue();
    const plan = this.i18n.translate(`registration.plans.${v.plan}`);
    const url = this.wa.buildRegistrationLink({
      parent: v.parent,
      phone: v.phone,
      age: this.i18n.translate(`registration.ages.${v.age}`),
      plan,
      note: v.note,
    });
    this.win?.open(url, '_blank', 'noopener');
  }
}
