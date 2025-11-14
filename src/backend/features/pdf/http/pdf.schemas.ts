import { z } from 'zod';

export const generatePdfBody = z.object({
  reportId: z.string().uuid(),
  filename: z.string().optional(),
  options: z
    .object({
      format: z.enum(['A4', 'Letter']).optional(),
      printBackground: z.boolean().optional(),
      margin: z
        .object({
          top: z.string().optional(),
          bottom: z.string().optional(),
          left: z.string().optional(),
          right: z.string().optional(),
        })
        .optional(),
      scale: z.number().optional(),
      width: z.string().optional(),
      height: z.string().optional(),
      landscape: z.boolean().optional(),
    })
    .optional(),
});

export const validateTokenQuery = z.object({
  reportId: z.string().uuid(),
  pdfToken: z.string(),
});

export type GeneratePdfBody = z.infer<typeof generatePdfBody>;
export type ValidateTokenQuery = z.infer<typeof validateTokenQuery>;
