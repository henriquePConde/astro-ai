export const PDF_PREVIEW_CONFIG = {
  copy: {
    emptyState: {
      title: 'No Report Data Available',
      message: 'Please generate a report first.',
    },
    chart: {
      title: 'Your Birth Chart',
      subtitle: 'Your unique celestial blueprint at the moment of birth',
      altText: 'Astro Chart',
      generatingText: 'Generating chart image…',
    },
    footer: {
      prefix: 'Generated on',
      fallbackDate: 'Today',
      suffix: '• Birth Chart Report',
    },
    introduction: {
      defaultLabel: 'Introduction',
    },
  },
  icons: {
    sections: ['☆', '☽', '☾', '☿', '♀', '♂', '♃', '♇'],
    default: '✧',
    introduction: '☆',
  },
  dimensions: {
    a4: {
      width: 794,
      height: 1140,
      padding: 56,
      contentWidth: 682,
    },
    chart: {
      container: {
        width: 800,
        height: 800,
      },
      display: {
        width: 700,
        height: 700,
        image: {
          width: 660,
          height: 660,
        },
      },
      offscreen: {
        width: 800,
        height: 800,
      },
    },
  },
  styles: {
    colors: {
      background: {
        dark: 'rgb(13,12,34)',
        white: '#fff',
        gray: {
          100: 'bg-gray-100',
          400: 'text-gray-400',
          500: 'text-gray-500',
          600: 'text-gray-600',
          800: 'text-gray-800',
        },
      },
      purple: {
        border: 'border-purple-200/30',
        text: 'text-purple-800',
        icon: 'text-purple-400/60',
      },
      gradient: {
        chartTitle: 'linear-gradient(135deg, #7c3aed 0%, #f59e0b 100%)',
      },
    },
    fonts: {
      playfair: "'Playfair Display', serif",
    },
    svg: {
      backgroundColor: 'rgb(13,12,34)',
      blobType: 'image/svg+xml;charset=utf-8',
      imageType: 'image/png',
    },
  },
  timing: {
    chartConversionDelay: 5000,
    svgRetryDelay: 200,
    maxRetries: 10,
  },
  page: {
    size: 'A4',
    margin: '5mm',
  },
} as const;
