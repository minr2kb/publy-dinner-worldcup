import { keyframes } from '@emotion/react';
import { Box, Typography } from '@mui/material';
import { FontWeightValues } from '../utils/fontTypes';

export default function RoundCurtain({ in: show, title }: { in: boolean; title?: string }) {
  const dropAndBounceAnimation = keyframes`
    0% { transform: translateY(0); }
    45% { transform: translateY(100vh); }
    55% { transform: translateY(90vh); }
    75% { transform: translateY(100vh); }
    85% { transform: translateY(97vh); }
    100% { transform: translateY(100vh); }
  `;

  const slideUpAnimation = keyframes`
    0% { transform: translateY(100vh); opacity: 0.9; }
    100% { transform: translateY(0vh); opacity: 0; }
  `;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '-100vh',
        transform: show ? 'translateY(100vh)' : 'translateY(0)',
        left: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: 'primary.main',
        animation: `${show ? dropAndBounceAnimation : slideUpAnimation} ${show ? '1.2s' : '0.5s'} ease-in`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        zIndex: 10,
        opacity: show ? 0.9 : 0,
      }}
    >
      <Typography
        variant={'h2'}
        fontWeight={FontWeightValues.BLACK}
        color={'white'}
        fontFamily={'Cafe24Moyamoya-Regular'}
      >
        {'- '}
        {title} {'-'}
      </Typography>
    </Box>
  );
}
