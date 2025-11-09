'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ReportAccordionProps } from './report-accordion.types';

const sectionLabels: Record<string, string> = {
  introduction: 'Introduction',
  personalityAndIdentity: 'Personality & Identity',
  emotionalNeedsAndSecurity: 'Emotional Needs & Security',
  communicationAndThinking: 'Communication & Thinking',
  loveAndRelationships: 'Love & Relationships',
  driveAndAmbition: 'Drive & Ambition',
  growthAndChallenges: 'Growth & Challenges',
  transformationAndHealing: 'Transformation & Healing',
  lifeThemesAndGuidance: 'Life Themes & Guidance',
};

function AccordionSection({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen && ref.current) {
      setHeight(ref.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen, children]);

  return (
    <Box
      sx={{
        maxHeight: isOpen ? `${height}px` : '0px',
        overflow: 'hidden',
        transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
      }}
      aria-hidden={!isOpen}
    >
      <Box ref={ref}>{children}</Box>
    </Box>
  );
}

export function ReportAccordion({
  sections,
  isGenerating,
  hasBirthData,
  hasContent,
}: ReportAccordionProps) {
  const sectionKeys = Object.keys(sections || {});
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    if (sectionKeys.length && Object.keys(openSections).length === 0) {
      setOpenSections({ [sectionKeys[0]]: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionKeys.length]);

  if (isGenerating && !hasContent) {
    return (
      <Box
        sx={{
          mt: 2,
          minHeight: 160,
          borderRadius: 2,
          border: '1px solid rgba(255,255,255,0.12)',
          bgcolor: 'rgba(10,10,25,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          color: 'rgba(255,255,255,0.7)',
        }}
      >
        Generating your report...
      </Box>
    );
  }

  if (!hasBirthData && !isGenerating) {
    return (
      <Box
        sx={{
          mt: 2,
          minHeight: 160,
          borderRadius: 2,
          border: '1px solid rgba(255,255,255,0.08)',
          bgcolor: 'rgba(10,10,25,0.9)',
          p: 2,
          fontSize: 12,
          color: 'rgba(255,255,255,0.7)',
        }}
      >
        Provide your birth details above to generate a personalized report.
      </Box>
    );
  }

  if (!hasContent) return null;

  return (
    <Box
      sx={{
        mt: 2,
        borderRadius: 2,
        border: '1px solid rgba(255,255,255,0.12)',
        bgcolor: 'rgba(10,10,25,0.9)',
        p: 2,
      }}
    >
      {sectionKeys.map((key) => (
        <Box
          key={key}
          sx={{
            mb: 1.5,
            pb: 1.5,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <Box
            component="button"
            type="button"
            onClick={() => toggleSection(key)}
            sx={{
              width: '100%',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: 'none',
              background: 'transparent',
              color: 'rgba(255,255,255,0.9)',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              py: 0.75,
            }}
          >
            <span>{sectionLabels[key] || key}</span>
            <span
              style={{
                display: 'inline-block',
                transform: openSections[key] ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
              }}
            >
              ▶
            </span>
          </Box>

          <AccordionSection isOpen={!!openSections[key]}>
            <Typography
              sx={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.78)',
                whiteSpace: 'pre-wrap',
              }}
            >
              {sections[key]}
            </Typography>
          </AccordionSection>
        </Box>
      ))}
    </Box>
  );
}
