import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import queryKeys from '../utils/query-keys';

const usePostRecommendation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    string | undefined,
    undefined,
    {
      recommender: string;
      description: string;
      createdAt: Date;
    }
  >(
    async recommendation => {
      const docRef = await addDoc(collection(db, 'recommendations'), recommendation);
      console.log('Document written with ID: ', docRef.id);
      return docRef?.id;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(queryKeys.RECOMMENDATIONS());
      },
    },
  ).mutate;
};

export default usePostRecommendation;
