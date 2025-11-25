'use client';

import { useCallback } from 'react';
import { ChartElementModalView } from './chart-element-modal.view';
import { CHART_ELEMENT_MODAL_CONFIG } from './chart-element-modal.config';
import type { ChartElementModalContainerProps } from './chart-element-modal.types';

export function ChartElementModalContainer({
  isOpen,
  elementData,
  onClose,
  onNavigateToAI,
}: ChartElementModalContainerProps) {
  const handleAskAI = useCallback(() => {
    if (!elementData) return;

    // Generate message based on element type (same logic as desktop interactions)
    let message = '';

    switch (elementData.type) {
      case 'planet':
        const signText = elementData.planetSign || 'unknown sign';
        const houseText = elementData.planetHouse ? ` in the ${elementData.planetHouse} house` : '';
        message = `Tell me about the meaning of ${elementData.planetName} in ${signText}${houseText} in my chart`;
        break;

      case 'house':
        message = `Tell me about the meaning of the ${elementData.houseNumber} house in my chart`;
        break;

      case 'sign':
        // Use the same enhanced message logic as desktop interactions
        let enhancedMessage = `Tell me about the meaning of ${elementData.signName} in my chart`;
        const additionalInstructions: string[] = [];

        // Add house information if available
        if (elementData.signHouseSummary) {
          additionalInstructions.push(elementData.signHouseSummary);
        }

        // Add ruler information if available
        if (elementData.signRulerSummary) {
          additionalInstructions.push(
            `Also discuss the position of the planet that rules ${elementData.signName}: ${elementData.signRulerSummary}`,
          );
        }

        // Combine all instructions
        if (additionalInstructions.length > 0) {
          enhancedMessage = `${enhancedMessage} ${additionalInstructions.join(' ')}`;
        }

        message = enhancedMessage;
        break;

      case 'aspect':
        const planet1 = elementData.aspectPlanet1 || 'planet 1';
        const planet2 = elementData.aspectPlanet2 || 'planet 2';
        message = `Tell me about the meaning of the ${elementData.aspectType} between ${planet1} and ${planet2} in my chart`;
        break;

      default:
        message = 'Tell me about this element in my chart';
    }

    // Close modal first
    onClose();

    // Navigate to AI with the message
    onNavigateToAI(message);
  }, [elementData, onClose, onNavigateToAI]);

  return (
    <ChartElementModalView
      isOpen={isOpen}
      elementData={elementData}
      onClose={onClose}
      onAskAI={handleAskAI}
      config={CHART_ELEMENT_MODAL_CONFIG}
    />
  );
}
