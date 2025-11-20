'use client';

import { BirthInfoBadgeView } from './birth-info-badge.view';
import { BIRTH_INFO_BADGE_CONFIG } from './birth-info-badge.config';
import type { BirthInfoBadgeContainerProps } from './birth-info-badge.types';

export function BirthInfoBadgeContainer({ birthData }: BirthInfoBadgeContainerProps) {
  return <BirthInfoBadgeView birthData={birthData} config={BIRTH_INFO_BADGE_CONFIG} />;
}
