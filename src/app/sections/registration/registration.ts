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
import { SITE_CONFIG } from '../../core/config/site.config';
import { WhatsappService } from '../../core/services/whatsapp.service';
import { eur } from '../../core/utils/money';
import { Reveal } from '../../shared/reveal/reveal';
import { SectionHeading } from '../../shared/section-heading/section-heading';

export const PHONE_PATTERN = /^[+(]?\d[\d\s\-()]{6,18}$/;

export type RegistrationField = 'parent' | 'phone' | 'age' | 'plan' | 'note';

interface PlanOption {
  readonly value: string;
  readonly label: string;
}

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, SectionHeading, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="regjistrimi" class="section" aria-labelledby="regjistrimi-title">
      <div class="container narrow">
        <app-section-heading
          class="center"
          headingId="regjistrimi-title"
          eyebrow="REGJISTRIMI"
          title="Regjistrohu tani"
          subtitle="Plotëso të dhënat dhe mesazhi hapet në WhatsApp, gati për ta dërguar."
        />
        <form class="card form" [formGroup]="form" (ngSubmit)="submit()" novalidate appReveal>
          <div class="row">
            <div class="field">
              <label for="reg-parent">Emri i prindit</label>
              <input
                id="reg-parent"
                type="text"
                formControlName="parent"
                autocomplete="name"
                [attr.aria-invalid]="error('parent') ? 'true' : null"
                [attr.aria-describedby]="error('parent') ? 'reg-parent-err' : null"
              />
              @if (error('parent'); as msg) {
                <p class="error" id="reg-parent-err">{{ msg }}</p>
              }
            </div>
            <div class="field">
              <label for="reg-phone">Numri i telefonit</label>
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
                <p class="error" id="reg-phone-err">{{ msg }}</p>
              }
            </div>
          </div>
          <div class="row row--wide">
            <div class="field">
              <label for="reg-age">Mosha e fëmijës</label>
              <select id="reg-age" formControlName="age">
                @for (a of ages; track a) {
                  <option [value]="a">{{ a }}</option>
                }
              </select>
            </div>
            <div class="field">
              <label for="reg-plan">Paketa</label>
              <select id="reg-plan" formControlName="plan">
                @for (p of plans; track p.value) {
                  <option [value]="p.value">{{ p.label }}</option>
                }
              </select>
            </div>
          </div>
          <div class="field">
            <label for="reg-note">Mesazh (opsionale)</label>
            <textarea id="reg-note" rows="4" formControlName="note"></textarea>
          </div>
          <button type="submit" class="btn btn--primary btn--block">Dërgo në WhatsApp</button>
        </form>
        <p class="place">Gjakovë, Kosovë</p>
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
  private readonly config = inject(SITE_CONFIG);
  private readonly wa = inject(WhatsappService);
  private readonly win = inject(DOCUMENT).defaultView;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);

  protected readonly ages = ['7–9 vjeç', '10–13 vjeç', '14–18 vjeç'] as const;
  protected readonly plans: readonly PlanOption[] = [
    {
      value: 'opening',
      label: `Ofertë hapjeje – ${eur(this.config.openingPrice)}/muaj (pagesa për ${this.config.openingMonths} muaj)`,
    },
    { value: 'regular', label: `Çmimi i rregullt – ${eur(this.config.regularPrice)}/muaj` },
    { value: 'unsure', label: 'Nuk jam i sigurt' },
  ];

  readonly form = inject(NonNullableFormBuilder).group({
    parent: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]],
    age: [this.ages[0] as string, Validators.required],
    plan: [this.plans[0].value, Validators.required],
    note: [''],
  });

  private readonly submitted = signal(false);

  protected error(field: RegistrationField): string | null {
    const control = this.form.controls[field];
    if (!control.errors || !(control.touched || this.submitted())) {
      return null;
    }
    if (control.hasError('required')) {
      return 'Kjo fushë është e detyrueshme.';
    }
    if (control.hasError('minlength')) {
      return 'Emri duhet të ketë të paktën 2 shkronja.';
    }
    if (control.hasError('pattern')) {
      return 'Shkruaj një numër telefoni të vlefshëm, p.sh. +383 49 123 456.';
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
    const plan = this.plans.find((p) => p.value === v.plan)?.label ?? v.plan;
    const url = this.wa.buildRegistrationLink({
      parent: v.parent,
      phone: v.phone,
      age: v.age,
      plan,
      note: v.note,
    });
    this.win?.open(url, '_blank', 'noopener');
  }
}
