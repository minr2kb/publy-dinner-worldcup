import { Upload } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { addDoc, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { db } from '../firebase';
import { userAtom } from '../utils/store';
import { type RecommendationType } from '../utils/types';

interface Props {
  in: boolean;
  onClose: () => void;
}

const RecommendationModal = (props: Props) => {
  const { in: show, onClose } = props;
  const [recommendationsFromDB, setRecommendationsFromDB] = useState<RecommendationType[]>([]);
  const { name: userName } = useAtomValue(userAtom);
  const [description, setDescription] = useState('');

  const containerRef = useRef<HTMLUListElement>(null);

  const getRecommendations = () => {
    void getDocs(query(collection(db, 'recommendations'), orderBy('createdAt'))).then(
      querySnapshot => {
        setRecommendationsFromDB(querySnapshot.docs.map(doc => doc.data() as RecommendationType));
      },
    );
  };

  const uploadRecommendation = () => {
    const newDoc = {
      recommender: userName,
      description,
      createdAt: new Date(),
    };

    addDoc(collection(db, 'recommendations'), newDoc)
      .then(docRef => {
        setDescription('');
        getRecommendations();
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(e => {
        console.error('Error adding document: ', e);
      });
  };

  const onTypeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      uploadRecommendation();
    }
  };

  useEffect(() => {
    getRecommendations();
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  }, []);

  return (
    <Dialog onClose={onClose} open={show} fullWidth>
      <List
        ref={containerRef}
        sx={{
          width: '100%',
          maxWidth: 650,
          maxHeight: '50vh',
          overflow: 'auto',
          bgcolor: 'background.paper',
        }}
      >
        {recommendationsFromDB.map((recommendation, index) => (
          <ListItem key={`recommendation-${index}`} alignItems={'flex-start'}>
            <ListItemText
              primary={recommendation.recommender}
              secondary={recommendation.description}
            />
            <Typography variant={'body2'} color={'text.secondary'}>
              {recommendation.createdAt.toDate().toLocaleString()}
            </Typography>
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            width: '100%',
          }}
        >
          <TextField
            fullWidth
            placeholder={'추천 장소 / 이유'}
            value={description}
            onChange={e => {
              setDescription(e.target.value);
            }}
            onKeyUp={onTypeEnter}
          />

          <Button
            sx={{
              flexShrink: 0,
            }}
            variant={'contained'}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={uploadRecommendation}
            disabled={description === ''}
          >
            <Upload />
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default RecommendationModal;
