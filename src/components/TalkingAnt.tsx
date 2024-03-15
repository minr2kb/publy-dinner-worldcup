import { Box, Slide, Typography } from '@mui/material';

export default function TalkingAnt({ text, in: show = true }: { text: string; in?: boolean }) {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        right: 10,
        zIndex: 100,
        height: '250px',
      }}
    >
      <Slide direction={'up'} in={show} timeout={1000} easing={'ease'} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <img src={'/images/ant-talking.png'} alt={'말하는 개미'} height={'250px'} />
          <Box
            sx={{
              position: 'absolute',
              top: 20,
              left: 15,
              width: '200px',
              textAlign: 'center',
            }}
          >
            <Typography variant={'body2'} sx={{ whiteSpace: 'pre-wrap', textAlign: 'center' }}>
              {text}
            </Typography>
          </Box>
        </Box>
      </Slide>
    </Box>
  );
}
