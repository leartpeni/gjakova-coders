import { SiteConfig } from '../config/site.config';

export interface ContactItem {
  readonly id: 'whatsapp' | 'instagram' | 'facebook' | 'address';
  readonly label: string;
  readonly value: string;
  readonly href: string;
}

const isUrl = (v: string): boolean => /^https?:\/\//i.test(v);

/** Returns a contact card for every configured (non-empty) value. */
export function buildContacts(config: SiteConfig): readonly ContactItem[] {
  const items: ContactItem[] = [];
  const phone = config.phone.replace(/\D/g, '');
  const instagram = config.instagram.trim();
  const facebook = config.facebook.trim();
  const address = config.address.trim();

  if (phone) {
    items.push({
      id: 'whatsapp',
      label: 'WhatsApp',
      value: `+${phone}`,
      href: `https://wa.me/${phone}`,
    });
  }
  if (instagram) {
    const handle = instagram.replace(/^@/, '');
    items.push({
      id: 'instagram',
      label: 'Instagram',
      value: isUrl(instagram) ? 'Instagram' : `@${handle}`,
      href: isUrl(instagram) ? instagram : `https://instagram.com/${handle}`,
    });
  }
  if (facebook) {
    items.push({
      id: 'facebook',
      label: 'Facebook',
      value: isUrl(facebook) ? 'Facebook' : facebook,
      href: isUrl(facebook) ? facebook : `https://facebook.com/${encodeURIComponent(facebook)}`,
    });
  }
  if (address) {
    items.push({
      id: 'address',
      label: 'Adresa',
      value: address,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
    });
  }
  return items;
}
