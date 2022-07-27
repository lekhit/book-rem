import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearDeterminate(props) {
  React.useEffect(() => {
    const timer = setInterval(() => {
      props.setProgress((oldProgress) => {
        if (oldProgress === 100) {
          props.setLoading(false);
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress
        variant="determinate"
        color="warning"
        value={props.progress}
      />
    </Box>
  );
}
