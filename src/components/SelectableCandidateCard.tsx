import { Launch } from '@mui/icons-material';
import { Box, Typography, Zoom } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontWeightValues } from '../utils/fontTypes';
import { type CandidateType } from '../utils/types';

export default function SelectableCandidateCard({
  candidate,
  selectedId,
  onSelect,
}: {
  candidate: CandidateType;
  selectedId: string | undefined;
  onSelect: (id: string) => void;
}) {
  const [isHovering, setIsHovering] = useState(false);
  const { id, name, imgSrc, mapUrl, description } = candidate;

  return (
    <Zoom in={!selectedId || selectedId === id}>
      <Box
        sx={{
          maxWidth: '300px',
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: '100%',
            aspectRatio: '1 / 1',
            borderRadius: '8px',
            bgcolor: 'white',
            transition: 'all ease-in-out 0.2s',
            cursor: 'pointer',
            position: 'relative',
          }}
          onMouseEnter={() => {
            if (!selectedId) setIsHovering(true);
          }}
          onMouseLeave={() => {
            if (!selectedId) setIsHovering(false);
          }}
          onClick={() => {
            if (!selectedId) onSelect(id);
          }}
        >
          <img
            src={imgSrc}
            alt={name}
            style={{
              width: '100%',
              aspectRatio: '1 / 1',
              borderRadius: '8px',
              ...(isHovering && !selectedId
                ? {
                    opacity: 0.3,
                    filter: 'blur(2px)',
                    transform: 'scale(1.01)',
                  }
                : {}),
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              transition: 'all ease-in-out 0.2s',
              opacity: isHovering && !selectedId ? 1 : 0,
            }}
          >
            <Typography
              variant={'h3'}
              fontWeight={FontWeightValues.BLACK}
              fontFamily={'Cafe24Moyamoya-Regular'}
            >
              {'PICK'}
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
    </Zoom>
  );
}
