import { ArrowBackIos } from '@mui/icons-material';
import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoundCurtain from '../components/RoundCurtain';
import SelectableCandidateCard from '../components/SelectableCandidateCard';
import TalkingAnt from '../components/TalkingAnt';
import useCadidates from '../hooks/useCadidates';
import usePostTournamentResult from '../hooks/usePostTournamentResult';
import { FontWeightValues } from '../utils/fontTypes';
import { tournamentBracketAtom, userAtom, winnerRecordsAtom } from '../utils/store';
import { createTournamentBracket, generateRandomAntText, shuffle } from '../utils/tournamentUtils';
import { type WinnerRecordsType } from '../utils/types';

const Tournament = () => {
  const navigate = useNavigate();
  const { data: candidates } = useCadidates();
  const uploadResults = usePostTournamentResult();

  const [tournamentBracket, setTournamentBracket] = useAtom(tournamentBracketAtom);
  const [winnerRecords, setWinnerRecords] = useAtom(winnerRecordsAtom);
  const { name: userName } = useAtomValue(userAtom);

  const [roundCount, setRoundCount] = useState<number>(1);
  const [winners, setWinners] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string>();
  const [showCurtain, setShowCurtain] = useState(false);
  const [antText, setAntText] = useState('둘 중에 더 먹고 시픈걸\n골라봐요');

  const [leftId, rightId] = useMemo(
    () => tournamentBracket[roundCount - 1],
    [roundCount, tournamentBracket],
  );

  const createNextTournament = (nextWinners: string[]) => {
    const shuffled = shuffle(nextWinners);
    const nextTournamentBracket = createTournamentBracket(shuffled);
    setTournamentBracket(nextTournamentBracket);
  };

  const onSelect = (id: string): void => {
    const nextWinners = [...winners, id];
    setWinners(nextWinners);
    setSelectedId(id);
    // eslint-disable-next-line no-unused-expressions
    candidates && setAntText(generateRandomAntText(candidates[id].name));

    setTimeout(() => {
      if (roundCount === tournamentBracket.length) {
        // 다음 강으로 넘어가기
        const nextWinnerRecords: WinnerRecordsType = {
          ...winnerRecords,
          [nextWinners.length * 2]: nextWinners,
        } satisfies WinnerRecordsType;
        setWinnerRecords(nextWinnerRecords);
        if (tournamentBracket.length === 1) {
          // 결승 끝
          void uploadResults(nextWinnerRecords).then(() => {
            navigate('/result');
          });
          return;
        }
        setRoundCount(1);
        setSelectedId(undefined);

        createNextTournament(nextWinners);
        setWinners([]);
      } else {
        setSelectedId(undefined);
        setRoundCount(prev => prev + 1);
      }
    }, 500);
  };

  useEffect(() => {
    // 16강, 8강 등의 라운드가 바뀔 때 커튼 2초간
    if (roundCount === 1) {
      setShowCurtain(true);
      setTimeout(() => {
        setShowCurtain(false);
      }, 2000);
    }
  }, [roundCount]);

  return (
    <>
      <Typography
        variant={'body1'}
        color={'text.secondary'}
        sx={{ position: 'absolute', top: 40, right: 40 }}
      >
        {userName}
      </Typography>
      <Button
        sx={{ position: 'absolute', top: 20, left: 20 }}
        onClick={() => {
          navigate('/');
        }}
      >
        <ArrowBackIos fontSize={'small'} />
        <Typography variant={'body1'}>{'처음으로'}</Typography>
      </Button>
      <TalkingAnt text={antText} />
      <RoundCurtain
        in={showCurtain}
        title={tournamentBracket.length <= 1 ? '결승' : `${tournamentBracket.length * 2}강`}
      />
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          overflow: 'hidden',
        }}
      >
        <Typography
          variant={'h3'}
          fontWeight={FontWeightValues.BOLD}
          fontFamily={'Cafe24Moyamoya-Regular'}
        >
          {tournamentBracket.length <= 1 ? '결승' : `${tournamentBracket.length * 2}강`}
        </Typography>
        <Stepper activeStep={roundCount - 1} alternativeLabel sx={{ mt: 2 }}>
          {[...Array(tournamentBracket.length)].map((_label, i) => (
            <Step key={`step-${i}`}>
              <StepLabel />
            </Step>
          ))}
        </Stepper>

        {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */}
        {candidates && (
          <Box sx={{ display: 'flex', mt: 5, mb: 10, maxWidth: '740px', height: 365 }}>
            <SelectableCandidateCard
              key={leftId}
              candidate={candidates[leftId]}
              selectedId={selectedId}
              onSelect={onSelect}
            />

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 200,
              }}
            >
              <Typography
                variant={'h4'}
                fontWeight={FontWeightValues.BLACK}
                sx={{ mb: 7 }}
                fontFamily={'Cafe24Moyamoya-Regular'}
              >
                {'VS'}
              </Typography>
            </Box>
            <SelectableCandidateCard
              key={rightId}
              candidate={candidates[rightId]}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default Tournament;
