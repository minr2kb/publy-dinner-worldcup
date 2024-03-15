import { useQuery, type QueryKey, type UseQueryOptions } from '@tanstack/react-query';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import queryKeys from '../utils/query-keys';
import { type RecommendationType } from '../utils/types';

const getRecommendations = async (): Promise<RecommendationType[]> => {
  const snapshot = await getDocs(query(collection(db, 'recommendations'), orderBy('createdAt')));
  return snapshot.docs.map(doc => doc.data() as RecommendationType);
};

const useRecommendations = <T = RecommendationType[]>({
  options,
}: {
  options?: Omit<
    UseQueryOptions<RecommendationType[], unknown, T, QueryKey>,
    'queryFn' | 'queryKey'
  >;
} = {}) => {
  return useQuery<RecommendationType[], unknown, T>(
    queryKeys.RECOMMENDATIONS(),
    getRecommendations,
    {
      keepPreviousData: true,
      ...options,
    },
  );
};

export default useRecommendations;
