import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { useCallback } from 'react';
import { db } from '../firebase';
import queryKeys from '../utils/query-keys';
import { getPoints, pickTop3 } from '../utils/tournamentUtils';
import { type CandidateType, type ResultsFromDBType } from '../utils/types';
import useCadidates from './useCadidates';

const getTournamentResult = async (): Promise<ResultsFromDBType[]> => {
  const snapshot = await getDocs(collection(db, 'results'));
  return snapshot.docs.map(doc => doc.data()) as unknown as ResultsFromDBType[];
};

const useTournamentResult = ({ onlyParticipants }: { onlyParticipants?: boolean } = {}) => {
  const { data: candidates } = useCadidates();

  const getRankingByPoint = useCallback(
    (results: ResultsFromDBType[]): Array<CandidateType & { points: number }> => {
      if (!candidates) return [];
      const ranking = getPoints(results);
      const rankingByPoint = Object.entries(candidates).map(([id, candidate]) => {
        return {
          ...candidate,
          points: ranking[id] ?? 0,
        };
      });
      return rankingByPoint.sort((a, b) => b.points - a.points);
    },
    [candidates],
  );

  const getUserPickList = useCallback(
    (results: ResultsFromDBType[]): Array<ResultsFromDBType & { winners: string }> => {
      const sortedResults = results.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
      const resultsWithWinners = sortedResults.map(result => {
        const { first, second, third } = pickTop3(result.records);
        return {
          ...result,
          winners: [first, second, ...third].map(id => candidates?.[id]?.name).join(', '),
        };
      });
      return resultsWithWinners;
    },
    [candidates],
  );

  return (
    useQuery<
      ResultsFromDBType[],
      unknown,
      {
        rankingByPoint: Array<CandidateType & { points: number }>;
        userPickList: Array<ResultsFromDBType & { winners: string }>;
      }
    >(queryKeys.TOURNAMENT_RESULT(), getTournamentResult, {
      select(data) {
        const filteredData = data.filter(c => !onlyParticipants || c.isParticipant);
        const rankingByPoint = getRankingByPoint(filteredData);
        const userPickList = getUserPickList(filteredData);
        console.log({ rankingByPoint, userPickList });
        return { rankingByPoint, userPickList };
      },
      keepPreviousData: true,
    }).data ?? { rankingByPoint: [], userPickList: [] }
  );
};

export default useTournamentResult;
