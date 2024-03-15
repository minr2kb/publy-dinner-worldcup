import { useMutation } from '@tanstack/react-query';
import { addDoc, collection } from 'firebase/firestore';
import { useAtomValue } from 'jotai';
import { db } from '../firebase';
import { userAtom } from '../utils/store';
import { type WinnerRecordsType } from '../utils/types';

const usePostTournamentResult = () => {
  const { name: userName, isParticipant } = useAtomValue(userAtom);

  return useMutation<string | undefined, undefined, WinnerRecordsType>(
    async (nextWinnerRecords: WinnerRecordsType) => {
      const docRef = await addDoc(collection(db, 'results'), {
        name: userName,
        isParticipant,
        records: nextWinnerRecords,
        createdAt: new Date(),
      });
      return docRef?.id;
    },
  ).mutateAsync;
};

export default usePostTournamentResult;
