import { en, TranslationSchema } from './en';
import { te } from './te';
import { hi } from './hi';
import { ta } from './ta';
import { kn } from './kn';
import { ml } from './ml';
import { mr } from './mr';
import { bn } from './bn';
import { LanguageCode } from '../config/languages';

export const LOCALES: Record<LanguageCode, TranslationSchema> = {
  en,
  te,
  hi,
  ta,
  kn,
  ml,
  mr,
  bn,
};

export { en, te, hi, ta, kn, ml, mr, bn };
export type { TranslationSchema };
