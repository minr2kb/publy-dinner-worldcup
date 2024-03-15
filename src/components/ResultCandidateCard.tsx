import { Launch } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FontWeightValues } from '../utils/fontTypes';
import { type CandidateType } from '../utils/types';

export default function ResultCandidateCard({
  candidate,
  width,
  rank,
}: {
  candidate: CandidateType;
  width: number;
  rank: string;
}) {
  const { name, imgSrc, mapUrl, description } = candidate;

  return (
    <Box
      sx={{
        width,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          borderRadius: '8px',
        }}
      >
        <img
          src={imgSrc}
          alt={name}
          style={{
            width: '100%',
            aspectRatio: '1 / 1',
            borderRadius: '8px',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <Typography
            variant={'h3'}
            fontWeight={FontWeightValues.BLACK}
            color={'white'}
            fontFamily={'Cafe24Moyamoya-Regular'}
          >
            {rank}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Link
          to={mapUrl}
          target={'_blank'}
          style={{
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography variant={'h6'}>{name}</Typography>
          <Launch fontSize={'small'} />
        </Link>
        <Typography variant={'body2'} color={'text.secondary'}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
}
