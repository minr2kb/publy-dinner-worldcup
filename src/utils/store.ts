import { atomWithStorage } from 'jotai/utils';
import { type WinnerRecordsType } from './types';

export const userAtom = atomWithStorage<{ name: string; isParticipant: boolean }>(
  'user',
  { name: '', isParticipant: false },
  undefined,
  {
    unstable_getOnInit: true,
  },
);

export const tournamentBracketAtom = atomWithStorage<Array<[string, string]>>(
  'tournament-bracket',
  [],
  undefined,
  { unstable_getOnInit: true },
);

export const winnerRecordsAtom = atomWithStorage<WinnerRecordsType>(
  'winner-records',
  {
    16: [],
    8: [],
    4: [],
    2: [],
  },
  undefined,
  { unstable_getOnInit: true },
);
