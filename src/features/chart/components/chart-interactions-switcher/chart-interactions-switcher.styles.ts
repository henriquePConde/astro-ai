import { Theme } from '@mui/material';

export const styles = {
  debugBox: () => (theme: Theme) => ({
    bgcolor: 'orange',
    color: 'black',
    p: 0.5,
    fontSize: '10px',
    borderRadius: 1,
  }),

  container: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
  }),

  switch: () => (theme: Theme) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: '#7a3cff',
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#7a3cff',
    },
  }),

  label: () => (theme: Theme) => ({
    m: 0,
    '& .MuiFormControlLabel-label': {
      fontSize: 10,
      color: 'rgba(255,255,255,0.75)',
    },
  }),
};
