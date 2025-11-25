'use client';

import { Box, Typography, Button, IconButton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createPortal } from 'react-dom';
import { styles } from './chart-element-modal.styles';
import type { ChartElementModalViewProps } from './chart-element-modal.types';

export function ChartElementModalView({
  isOpen,
  elementData,
  onClose,
  onAskAI,
  config,
}: ChartElementModalViewProps) {
  const theme = useTheme();

  if (!isOpen || !elementData || typeof window === 'undefined') {
    return null;
  }

  const getTitle = () => {
    return config.copy.title[elementData.type] || config.copy.fallbacks.unknownElement;
  };

  const renderPlanetInfo = () => {
    if (elementData.type !== 'planet') return null;

    return (
      <>
        <Box sx={styles.infoItem(config.ui.spacing.items)(theme)}>
          <Typography sx={styles.infoLabel()(theme)}>{config.copy.labels.planet}</Typography>
          <Typography sx={styles.infoValue()(theme)}>
            {elementData.planetColor && (
              <Box
                component="span"
                sx={{
                  ...styles.planetColor()(theme),
                  backgroundColor: elementData.planetColor,
                }}
              />
            )}
            {elementData.planetName || config.copy.fallbacks.noData}
            {elementData.planetSymbol && ` (${elementData.planetSymbol})`}
          </Typography>
        </Box>

        {elementData.planetSign && (
          <Box sx={styles.infoItem(config.ui.spacing.items)(theme)}>
            <Typography sx={styles.infoLabel()(theme)}>{config.copy.labels.sign}</Typography>
            <Typography sx={styles.infoValue()(theme)}>{elementData.planetSign}</Typography>
          </Box>
        )}

        {elementData.planetHouse && (
          <Box sx={styles.infoItem(config.ui.spacing.items)(theme)}>
            <Typography sx={styles.infoLabel()(theme)}>{config.copy.labels.house}</Typography>
            <Typography sx={styles.infoValue()(theme)}>{elementData.planetHouse}</Typography>
          </Box>
        )}

        {elementData.planetDegree !== undefined && (
          <Box sx={styles.infoItem(config.ui.spacing.items)(theme)}>
            <Typography sx={styles.infoLabel()(theme)}>{config.copy.labels.degree}</Typography>
            <Typography sx={styles.infoValue()(theme)}>
              {elementData.planetDegree.toFixed(1)}°
            </Typography>
          </Box>
        )}
      </>
    );
  };

  const renderHouseInfo = () => {
    if (elementData.type !== 'house') return null;

    return (
      <>
        <Box sx={styles.infoItem(config.ui.spacing.items)(theme)}>
          <Typography sx={styles.infoLabel()(theme)}>{config.copy.labels.house}</Typography>
          <Typography sx={styles.infoValue()(theme)}>
            {elementData.houseNumber || config.copy.fallbacks.noData}
          </Typography>
        </Box>

        {elementData.houseDegree !== undefined && (
          <Box sx={styles.infoItem(config.ui.spacing.items)(theme)}>
            <Typography sx={styles.infoLabel()(theme)}>{config.copy.labels.degree}</Typography>
            <Typography sx={styles.infoValue()(theme)}>
              {elementData.houseDegree.toFixed(1)}°
            </Typography>
          </Box>
        )}
      </>
    );
  };

  const renderSignInfo = () => {
    if (elementData.type !== 'sign') return null;

    return (
      <>
        <Box sx={styles.infoItem(config.ui.spacing.items)(theme)}>
          <Typography sx={styles.infoLabel()(theme)}>{config.copy.labels.sign}</Typography>
          <Typography sx={styles.infoValue()(theme)}>
            {elementData.signName || config.copy.fallbacks.noData}
          </Typography>
        </Box>

        {elementData.signHouseSummary && (
          <Box sx={styles.infoItem(config.ui.spacing.items)(theme)}>
            <Typography sx={styles.infoLabel()(theme)}>{config.copy.labels.houseInfo}</Typography>
            <Typography sx={styles.infoValue()(theme)}>{elementData.signHouseSummary}</Typography>
          </Box>
        )}

        {elementData.signRulerSummary && (
          <Box sx={styles.infoItem(config.ui.spacing.items)(theme)}>
            <Typography sx={styles.infoLabel()(theme)}>{config.copy.labels.rulerInfo}</Typography>
            <Typography sx={styles.infoValue()(theme)}>{elementData.signRulerSummary}</Typography>
          </Box>
        )}
      </>
    );
  };

  const renderAspectInfo = () => {
    if (elementData.type !== 'aspect') return null;

    return (
      <>
        <Box sx={styles.infoItem(config.ui.spacing.items)(theme)}>
          <Typography sx={styles.infoLabel()(theme)}>{config.copy.labels.aspect}</Typography>
          <Typography sx={styles.infoValue()(theme)}>
            {elementData.aspectType || config.copy.fallbacks.noData}
            {elementData.aspectPlanet1 && elementData.aspectPlanet2 && (
              <>
                {' '}
                {config.copy.labels.between} {elementData.aspectPlanet1} and{' '}
                {elementData.aspectPlanet2}
              </>
            )}
          </Typography>
        </Box>

        {elementData.aspectAngle !== undefined && (
          <Box sx={styles.infoItem(config.ui.spacing.items)(theme)}>
            <Typography sx={styles.infoLabel()(theme)}>{config.copy.labels.angle}</Typography>
            <Typography sx={styles.infoValue()(theme)}>
              {elementData.aspectAngle.toFixed(1)}°
            </Typography>
          </Box>
        )}
      </>
    );
  };

  const modalContent = (
    <Box sx={styles.backdrop(config.ui.backdropOpacity)(theme)} onClick={onClose}>
      <Box
        sx={styles.modal(config.ui.maxWidth, config.ui.borderRadius)(theme)}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <Box sx={styles.header(config.ui.spacing.content)(theme)}>
          <Typography sx={styles.title()(theme)}>{getTitle()}</Typography>
          <IconButton
            onClick={onClose}
            sx={styles.closeButton()(theme)}
            aria-label={config.copy.buttons.close}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={styles.content(config.ui.spacing.content)(theme)}>
          {renderPlanetInfo()}
          {renderHouseInfo()}
          {renderSignInfo()}
          {renderAspectInfo()}
        </Box>

        {/* Buttons */}
        <Box sx={styles.buttons(config.ui.spacing.buttons)(theme)}>
          <Button variant="outlined" onClick={onClose} sx={styles.closeButtonSecondary()(theme)}>
            {config.copy.buttons.close}
          </Button>
          <Button variant="contained" onClick={onAskAI} sx={styles.askAIButton()(theme)}>
            {config.copy.buttons.askAI}
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return createPortal(modalContent, document.body);
}
