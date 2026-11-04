import { siteConfig } from '../config/site.config';
import { buildContacts } from './contacts';

describe('buildContacts', () => {
  it('returns nothing when everything is empty', () => {
    expect(buildContacts(siteConfig)).toEqual([]);
  });

  it('builds a card only for configured values', () => {
    const items = buildContacts({ ...siteConfig, phone: '38349123456', address: 'Rr. Test 1' });
    expect(items.map((i) => i.id)).toEqual(['whatsapp', 'address']);
    expect(items[0].href).toBe('https://wa.me/38349123456');
    expect(items[1].href).toBe('https://www.google.com/maps/search/?api=1&query=Rr.%20Test%201');
  });

  it('accepts handles and full URLs for social profiles', () => {
    const items = buildContacts({
      ...siteConfig,
      instagram: '@gjakovacoders',
      facebook: 'https://facebook.com/gjakovacoders',
    });
    expect(items[0].href).toBe('https://instagram.com/gjakovacoders');
    expect(items[1].href).toBe('https://facebook.com/gjakovacoders');
  });
});
