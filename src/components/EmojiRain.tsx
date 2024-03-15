import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';

const emojis = [
  '🍗', // 닭 다리
  '🍖', // 고기
  '🥩', // 스테이크
  '🍤', // 새우
  '🍳', // 프라이팬에 익힌 달걀
  '🍕', // 피자
  '🍔', // 햄버거
  '🌭', // 핫도그
  '🥪', // 샌드위치
  '🌮', // 타코
  '🌯', // 부리토
  '🥙', // 피타 샌드위치
  '🧆', // 팔라펠
  '🍜', // 스팀 보울
  '🍝', // 스파게티
  '🍛', // 커리 라이스
  '🍣', // 스시
  '🍱', // 도시락
  '🥟', // 만두
  '🎂', // 생일 케이크
  '🍰', // 케이크
  '🧁', // 컵케이크
  '🥧', // 파이
  '🍮', // 크레마 카라멜
];

interface EmojiProps {
  emoji: string;
  left: number;
  size: number; // 원근 효과를 위한 크기
  opacity: number; // 원근 효과를 위한 투명도
  blur: number; // 원근 효과를 위한 블러 값
}

const Emoji: React.FC<EmojiProps> = ({ emoji, left, size, opacity, blur }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: `${left}%`,
        animation: `fall ${Math.random() * 10 + 5}s linear infinite`, // 애니메이션 시간 랜덤 조정
        fontSize: `${size}px`, // 원근 효과에 따른 크기 조정
        opacity, // 원근 효과에 따른 투명도 조정
        filter: `blur(${blur}px)`, // 원근 효과를 위한 블러 적용
        '@keyframes fall': {
          from: {
            transform: 'translateY(-100%)',
          },
          to: {
            transform: 'translateY(100vh)',
          },
        },
      }}
    >
      {emoji}
    </Box>
  );
};

export const EmojiRain: React.FC = () => {
  const [emojisState, setEmojisState] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // 원근 효과를 위한 랜덤 크기, 투명도, 블러 값
      const size = Math.random() * 40 + 30; // 30px에서 70px 사이의 크기로 조정
      const opacity = Math.random() * 0.5 + 0.5; // 0.5에서 1 사이의 투명도
      const blur = Math.random() * 3; // 0px에서 3px 사이의 블러 값

      const newEmoji = (
        <Emoji
          emoji={emojis[Math.floor(Math.random() * emojis.length)]}
          left={Math.random() * 100}
          key={Math.random()}
          size={size}
          opacity={opacity}
          blur={blur}
        />
      );
      setEmojisState(prevEmojis => [...prevEmojis, newEmoji]);
    }, 1000); // 생성 간격을 늘려 이모지 수를 조절

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        position: 'absolute',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {emojisState}
    </Box>
  );
};

export default EmojiRain;
