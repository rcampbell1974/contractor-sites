import p from '../data/partner.json';
import locations from '../data/locations.json';
export const key = process.env.MARKET || 'hub';
export const M = p.markets[key];
export const P = p;
export const locs = locations.filter(l => M.locs.includes(l.slug) && l.verified);
