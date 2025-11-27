/**
 * Utility functions for consistent chart rendering in PDF generation
 */

/**
 * Ensures SVG element has proper attributes for consistent rendering
 */
export function normalizeSvgForPdf(svgElement: SVGSVGElement, width: number, height: number): void {
  // Set explicit dimensions
  svgElement.setAttribute('width', width.toString());
  svgElement.setAttribute('height', height.toString());

  // Ensure viewBox is set
  if (!svgElement.getAttribute('viewBox')) {
    const bbox = svgElement.getBBox();
    if (bbox.width > 0 && bbox.height > 0) {
      svgElement.setAttribute('viewBox', `0 0 ${bbox.width} ${bbox.height}`);
    } else {
      svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
    }
  }

  // Set preserveAspectRatio for consistent scaling
  svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');

  // Ensure proper XML namespace
  if (!svgElement.getAttribute('xmlns')) {
    svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  }
}

/**
 * Validates that an SVG has meaningful content for PDF generation
 */
export function validateSvgContent(svgElement: SVGSVGElement): boolean {
  try {
    const bbox = svgElement.getBBox();
    const hasValidDimensions = bbox.width > 0 && bbox.height > 0;
    const hasChildren = svgElement.children.length > 0;

    // Check for actual drawing elements (not just containers)
    const drawingElements = svgElement.querySelectorAll(
      'circle, path, line, rect, text, g[transform]',
    );
    const hasDrawingContent = drawingElements.length > 0;

    return hasValidDimensions && hasChildren && hasDrawingContent;
  } catch (error) {
    console.warn('Error validating SVG content:', error);
    return false;
  }
}

/**
 * Waits for all fonts to be loaded and ready
 */
export async function waitForFontsReady(timeout: number = 5000): Promise<void> {
  const startTime = Date.now();

  try {
    if (typeof document !== 'undefined' && 'fonts' in document) {
      // Wait for document.fonts.ready
      await Promise.race([
        (document as any).fonts.ready,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Font loading timeout')), timeout),
        ),
      ]);

      // Additional check for specific font families used in charts
      const fontFamilies = [
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI Symbol',
        'Segoe UI Emoji',
      ];

      // Give fonts extra time to render
      await new Promise((resolve) => setTimeout(resolve, 500));

      console.log('Fonts ready for chart rendering');
    }
  } catch (error) {
    console.warn('Font readiness check failed, proceeding anyway:', error);
    // Fallback delay
    await new Promise((resolve) => setTimeout(resolve, Math.min(timeout, 2000)));
  }
}

/**
 * Creates a high-quality canvas from SVG with proper error handling
 */
export async function createCanvasFromSvg(
  svgElement: SVGSVGElement,
  width: number,
  height: number,
  backgroundColor: string = '#000000',
): Promise<string | null> {
  try {
    // Normalize SVG first
    normalizeSvgForPdf(svgElement, width, height);

    // Validate content
    if (!validateSvgContent(svgElement)) {
      console.warn('SVG validation failed - may produce empty chart');
    }

    // Serialize SVG
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgElement);

    // Ensure proper XML declaration
    if (!svgString.startsWith('<?xml')) {
      svgString = '<?xml version="1.0" encoding="UTF-8"?>' + svgString;
    }

    // Create blob and object URL
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const objectUrl = URL.createObjectURL(blob);

    try {
      // Load image with timeout
      const img = await loadImageWithTimeout(objectUrl, 10000);

      // Create canvas
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Could not get 2D context');
      }

      // Configure high-quality rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Fill background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // Draw image
      ctx.drawImage(img, 0, 0, width, height);

      // Return high-quality PNG
      return canvas.toDataURL('image/png', 1.0);
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  } catch (error) {
    console.error('Error creating canvas from SVG:', error);
    return null;
  }
}

/**
 * Loads an image with timeout and proper error handling
 */
function loadImageWithTimeout(src: string, timeout: number): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    const timeoutId = setTimeout(() => {
      reject(new Error(`Image load timeout after ${timeout}ms`));
    }, timeout);

    img.onload = () => {
      clearTimeout(timeoutId);
      resolve(img);
    };

    img.onerror = (error) => {
      clearTimeout(timeoutId);
      reject(new Error(`Image load error: ${error}`));
    };

    img.src = src;
  });
}
