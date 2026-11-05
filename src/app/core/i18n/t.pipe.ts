import { Pipe, PipeTransform, inject } from '@angular/core';
import { I18nService, TranslationParams } from './i18n.service';

/** `{{ 'hero.eyebrow' | t }}`; impure so it follows the language signal it reads. */
@Pipe({ name: 't', pure: false })
export class TPipe implements PipeTransform {
  private readonly i18n = inject(I18nService);

  transform(key: string, params?: TranslationParams): string {
    return this.i18n.translate(key, params);
  }
}
