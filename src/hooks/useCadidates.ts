import { type QueryKey, type UseQueryOptions, useQuery } from '@tanstack/react-query';
import { candidatesData } from '../data/candidates';
import queryKeys from '../utils/query-keys';
import { type CandidateType } from '../utils/types';

const fetchCandidates = async (): Promise<Record<string, CandidateType>> => {
  const res: CandidateType[] = candidatesData;

  return res.reduce((acc, candidate) => ({ ...acc, [candidate.id]: candidate }), {});
};

const useCadidates = <T = Record<string, CandidateType>>({
  options,
}: {
  options?: Omit<
    UseQueryOptions<Record<string, CandidateType>, unknown, T, QueryKey>,
    'queryFn' | 'queryKey'
  >;
} = {}) => {
  return useQuery<Record<string, CandidateType>, unknown, T>(
    queryKeys.CANDIDATES(),
    fetchCandidates,
    {
      keepPreviousData: true,
      ...options,
    },
  );
};

export default useCadidates;
