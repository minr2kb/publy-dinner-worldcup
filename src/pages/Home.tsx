import { EmojiEventsOutlined, InfoOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CandidateListModal from '../components/CandidateListModal';
import EmojiRain from '../components/EmojiRain';
import TalkingAnt from '../components/TalkingAnt';
import useCadidates from '../hooks/useCadidates';
import { FontWeightValues } from '../utils/fontTypes';
import { tournamentBracketAtom, userAtom, winnerRecordsAtom } from '../utils/store';
import { createTournamentBracket, shuffle } from '../utils/tournamentUtils';

const Home = () => {
  const navigate = useNavigate();
  const { data: candidates } = useCadidates();

  const setUser = useSetAtom(userAtom);
  const setTournamentBracket = useSetAtom(tournamentBracketAtom);
  const resetWinnerRecords = useResetAtom(winnerRecordsAtom);

  const [name, setName] = useState('');
  const [showList, setShowList] = useState(false);
  const [isParticipant, setIsParticipant] = useState<boolean>(false);

  const onClickStart = useCallback(() => {
    const ids = Object.keys(candidates ?? {});
    if (ids.length < 4) {
      alert('후보가 4개 이상이어야 합니다.');
      return;
    }
    setUser({ name, isParticipant });
    // create tournament bracket
    const shuffled = shuffle<string>(ids);
    const tournamentBracket = createTournamentBracket(shuffled);
    setTournamentBracket(tournamentBracket);
    resetWinnerRecords();
    navigate('/tournament');
  }, [
    candidates,
    isParticipant,
    name,
    navigate,
    resetWinnerRecords,
    setTournamentBracket,
    setUser,
  ]);

  const onTypeEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onClickStart();
      }
    },
    [onClickStart],
  );

  return (
    <>
      <TalkingAnt text={'맛있는 음식이 먹고싶어오'} />
      <EmojiRain />
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
          variant={'h2'}
          fontWeight={FontWeightValues.BOLD}
          fontFamily={'Cafe24Moyamoya-Regular'}
        >
          {'퍼블리 회식 장소 월드컵'}
        </Typography>

        <Typography
          variant={'body1'}
          color={'text.secondary'}
          sx={{ whiteSpace: 'pre-wrap', mt: 3, textAlign: 'center' }}
        >
          {
            '퍼블리 회식 장소 결정을 위한 월드컵입니다\n화면에 표시되는 두 가지 장소중, 더 마음에 드는 곳을 선정해주세요!'
          }
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            mt: 5,
          }}
        >
          <Box>
            <TextField
              label={'닉네임/이름'}
              value={name}
              onChange={e => {
                setName(e.target.value);
              }}
              onKeyUp={onTypeEnter}
            />
            <br />
            <Tooltip title={'체크할 시 실제 회식장소 투표 결과로 집계 됩니다'}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isParticipant}
                    onChange={e => {
                      setIsParticipant(e.target.checked);
                    }}
                  />
                }
                label={'회식 참가자'}
              />
            </Tooltip>
          </Box>
          <Button variant={'contained'} onClick={onClickStart} disabled={!name}>
            {'시작하기'}
          </Button>
        </Box>

        <Box sx={{ display: 'flex' }}>
          <Button
            variant={'text'}
            color={'primary'}
            onClick={() => {
              setShowList(true);
            }}
            sx={{ mt: 5 }}
          >
            <InfoOutlined fontSize={'small'} sx={{ mr: 1 }} />
            {'후보 리스트 보기'}
          </Button>
          <Button
            variant={'text'}
            color={'primary'}
            onClick={() => {
              navigate('/total-result');
            }}
            sx={{ mt: 5 }}
          >
            <EmojiEventsOutlined fontSize={'small'} sx={{ mr: 1 }} />
            {'결과 보기'}
          </Button>
        </Box>
      </Box>
      <CandidateListModal
        onClose={() => {
          setShowList(false);
        }}
        open={showList}
      />
    </>
  );
};

export default Home;
