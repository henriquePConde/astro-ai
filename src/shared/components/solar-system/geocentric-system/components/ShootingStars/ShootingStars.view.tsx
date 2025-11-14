import { ShootingStar } from './ShootingStar';
import type { ShootingStarsViewProps } from './ShootingStars.types';

export function ShootingStarsView({ stars }: ShootingStarsViewProps) {
  return (
    <>
      {stars.map(({ start, dir, speed, key }) => (
        <ShootingStar key={key} startPosition={start} direction={dir} speed={speed} />
      ))}
    </>
  );
}
