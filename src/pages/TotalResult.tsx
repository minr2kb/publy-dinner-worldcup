import { ArrowBackIos, ThumbUpAltOutlined } from '@mui/icons-material';
import { Box, Button, Fab, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import { useNavigate } from 'react-router-dom';
import RecommendationModal from '../components/RecommendationModal';
import ResultCandidateCard from '../components/ResultCandidateCard';
import ResultTable from '../components/ResultTable';
import useCadidates from '../hooks/useCadidates';
import useTournamentResult from '../hooks/useTournamentResult';
import { FontWeightValues } from '../utils/fontTypes';

const TotalResult = () => {
  const navigate = useNavigate();
  const { data: candidates } = useCadidates();

  const [enableConfetti, setEnableConfetti] = useState(true);
  const [openRecommendationModal, setOpenRecommendationModal] = useState(false);

  const { rankingByPoint } = useTournamentResult();

  const [first, second, third, fourth] = rankingByPoint;

  useEffect(() => {
    setTimeout(() => {
      setEnableConfetti(false);
    }, 3000);
  }, []);

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: '30vh',
          left: -40,
          zIndex: 100,
          height: '150px',
        }}
      >
        <img src={'/images/ant-confetti.png'} alt={'개미 축하'} height={'150px'} />
      </Box>

      <Button
        sx={{ position: 'absolute', top: 20, left: 20 }}
        onClick={() => {
          navigate('/');
        }}
      >
        <ArrowBackIos fontSize={'small'} />
        <Typography variant={'body1'}>{'처음으로'}</Typography>
      </Button>

      <Box
        sx={{
          display: 'flex',
          width: '100vw',
          height: '15vh',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <Typography
          variant={'h3'}
          fontWeight={FontWeightValues.BOLD}
          fontFamily={'Cafe24Moyamoya-Regular'}
        >
          {'👑 전체 결과 👑'}
        </Typography>
      </Box>

      <Grid
        container
        sx={{
          width: '100vw',
          height: '85vh',
        }}
      >
        {rankingByPoint.length > 0 && (
          <Grid
            item
            xs={6}
            sx={{
              pt: 10,
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {candidates && (
              <>
                {enableConfetti && <ConfettiExplosion duration={3000} />}
                <ResultCandidateCard candidate={first} width={250} rank={'1st'} />
                <Box
                  sx={{
                    display: 'flex',
                    gap: 3,
                    mt: 5,
                  }}
                >
                  <ResultCandidateCard candidate={second} width={150} rank={'2nd'} />
                  <ResultCandidateCard candidate={third} width={150} rank={'3rd'} />
                  <ResultCandidateCard candidate={fourth} width={150} rank={'3rd'} />
                </Box>
              </>
            )}
          </Grid>
        )}
        <Grid
          item
          xs={6}
          sx={{
            maxWidth: '740px',
            height: '100%',
            p: 10,
            pt: 0,
          }}
        >
          <ResultTable />
        </Grid>
      </Grid>
      <RecommendationModal
        in={openRecommendationModal}
        onClose={() => {
          setOpenRecommendationModal(false);
        }}
      />
      <Fab
        variant={'extended'}
        color={'primary'}
        sx={{ position: 'absolute', bottom: 30, right: 30, gap: 1 }}
        onClick={() => {
          setOpenRecommendationModal(true);
        }}
      >
        <ThumbUpAltOutlined fontSize={'small'} />
        {'메뉴 추천해주기'}
      </Fab>
    </>
  );
};

export default TotalResult;
