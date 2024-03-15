import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 15,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant={'body2'} color={'text.secondary'} align={'center'}>
        {'Developed by. kyungbae@publy.co'}
      </Typography>
    </Box>
  );
}
