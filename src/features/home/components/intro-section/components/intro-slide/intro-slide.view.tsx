'use client';

import Image from 'next/image';
import { Box, Typography, Stack } from '@mui/material';
import { styles } from './intro-slide.styles';
import type { IntroSlideProps } from './intro-slide.types';

export function IntroSlideView({ title, content, image, alt, isActive }: IntroSlideProps) {
  return (
    <Box sx={styles.root(isActive)}>
      <Box sx={styles.content()}>
        <Box sx={styles.imageContainer()}>
          <Box sx={styles.imageWrapper()}>
            <Image
              src={image}
              alt={alt}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority={isActive}
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </Box>
        </Box>

        <Box sx={styles.textContainer()}>
          <Typography sx={styles.title()}>{title}</Typography>
          <Stack spacing={1}>
            {content.map((text, i) => (
              <Typography key={i} sx={styles.contentText()}>
                {text}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
