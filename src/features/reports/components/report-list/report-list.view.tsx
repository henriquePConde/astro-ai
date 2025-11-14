'use client';

import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  Alert,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import { styles } from './report-list.styles';
import type { ReportListViewProps } from './report-list.types';

export function ReportListView({ data, loading, error, config }: ReportListViewProps) {
  const theme = useTheme();

  return (
    <Box sx={styles.root()(theme)}>
      <Box sx={styles.titleContainer()(theme)}>
        <Typography
          component={config.ui.title.component}
          sx={styles.title(config.ui.title.fontSize, config.ui.title.fontWeight)(theme)}
        >
          {config.copy.title}
        </Typography>
      </Box>
      {loading && (
        <Box sx={styles.loadingContainer()(theme)}>
          <CircularProgress size={config.ui.loading.spinnerSize} />
          <Typography>{config.copy.loading}</Typography>
        </Box>
      )}
      {error && (
        <Alert severity={config.ui.alert.severity}>{error.message || config.copy.error}</Alert>
      )}
      {!loading && !error && (
        <List sx={styles.list()(theme)}>
          {data.length === 0 && (
            <ListItem>
              <ListItemText primary={config.copy.empty} />
            </ListItem>
          )}
          {data.map((r) => (
            <ListItem
              key={r.id}
              component={Link}
              href={config.routes.report(r.id)}
              sx={styles.listItem()(theme)}
            >
              <ListItemText
                primary={r.title ?? `${config.copy.report.fallbackPrefix} ${r.id}`}
                secondary={r.createdAt}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
