import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Registration } from './registration';
import { I18nService } from '../../core/i18n/i18n.service';

describe('Registration form', () => {
  let fixture: ComponentFixture<Registration>;
  let cmp: Registration;
  let el: HTMLElement;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({ imports: [Registration] }).compileComponents();
    fixture = TestBed.createComponent(Registration);
    cmp = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('defaults to the opening offer and first age group', () => {
    expect(cmp.form.controls.plan.value).toBe('opening');
    expect(cmp.form.controls.age.value).toBe('0');
    const options = [...el.querySelectorAll<HTMLOptionElement>('#reg-plan option')];
    expect(options[0].textContent).toContain('Ofertë hapjeje – 30\u00A0€/muaj (pagesa për 3 muaj)');
    expect(options).toHaveLength(3);
    expect(el.querySelector('#reg-age option')?.textContent).toBe('7–9 vjeç');
  });

  it('is invalid when empty and requires the parent name and phone', () => {
    expect(cmp.form.invalid).toBe(true);
    expect(cmp.form.controls.parent.hasError('required')).toBe(true);
    expect(cmp.form.controls.phone.hasError('required')).toBe(true);
  });

  it('validates parent name length', () => {
    cmp.form.controls.parent.setValue('A');
    expect(cmp.form.controls.parent.hasError('minlength')).toBe(true);
    cmp.form.controls.parent.setValue('Ar');
    expect(cmp.form.controls.parent.valid).toBe(true);
  });

  it('validates the phone pattern', () => {
    const phone = cmp.form.controls.phone;
    for (const bad of ['abc', '123', '+', '49-abc-123']) {
      phone.setValue(bad);
      expect(phone.hasError('pattern')).toBe(true);
    }
    for (const good of ['+383 49 123 456', '049123456', '(044) 123-456']) {
      phone.setValue(good);
      expect(phone.valid).toBe(true);
    }
  });

  it('shows Albanian errors only after submit and does not open WhatsApp', () => {
    const open = vi.spyOn(window, 'open').mockReturnValue(null);
    expect(el.querySelector('.error')).toBeNull();

    el.querySelector('form')?.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const messages = [...el.querySelectorAll('.error')].map((e) => e.textContent);
    expect(messages).toEqual(['Kjo fushë është e detyrueshme.', 'Kjo fushë është e detyrueshme.']);
    expect(open).not.toHaveBeenCalled();
    open.mockRestore();
  });

  it('opens WhatsApp in a new tab with noopener when valid', () => {
    const open = vi.spyOn(window, 'open').mockReturnValue(null);
    cmp.form.patchValue({ parent: 'Arta', phone: '+383 49 123 456', note: 'Përshëndetje' });

    el.querySelector('form')?.dispatchEvent(new Event('submit'));

    expect(open).toHaveBeenCalledTimes(1);
    const [url, target, features] = open.mock.calls[0];
    expect(String(url)).toContain('https://wa.me/');
    expect(decodeURIComponent(String(url))).toContain('Prindi: Arta');
    expect(decodeURIComponent(String(url))).toContain('Mesazh: Përshëndetje');
    expect(target).toBe('_blank');
    expect(features).toBe('noopener');
    open.mockRestore();
  });

  it('builds the WhatsApp message in English after switching language', () => {
    TestBed.inject(I18nService).lang.set('en');
    const open = vi.spyOn(window, 'open').mockReturnValue(null);
    cmp.form.patchValue({ parent: 'Arta', phone: '+383 49 123 456', age: '1', plan: 'regular' });
    fixture.detectChanges();
    expect(el.querySelector('label[for="reg-parent"]')?.textContent).toBe('Parent’s name');

    el.querySelector('form')?.dispatchEvent(new Event('submit'));

    const text = decodeURIComponent(String(open.mock.calls[0][0]));
    expect(text).toContain('Age: 10–13 years');
    expect(text).toContain('Package: Regular price – 40\u00A0€/month');
    open.mockRestore();
  });

  it('shows English validation messages', () => {
    TestBed.inject(I18nService).lang.set('en');
    el.querySelector('form')?.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(el.querySelector('.error')?.textContent).toBe('This field is required.');
  });
});
