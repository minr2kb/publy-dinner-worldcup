import { type ResultsFromDBType, type WinnerRecordsType } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const shuffle = <T>(array: T[]) => {
  return array.sort(() => Math.random() - 0.5);
};

export const createTournamentBracket = (arr: string[]) => {
  const bracket = [];
  for (let i = 0; i < arr.length; i += 2) {
    bracket.push([arr[i], arr[i + 1]]);
  }

  return bracket as Array<[string, string]>;
};

export const pickTop3 = (
  records: WinnerRecordsType,
): { first: string; second: string; third: string[] } => {
  const first = records[2][0];
  const finalists = records[4];
  const second = finalists.find(id => id !== first) ?? '';
  const semiFinalists = records[8];
  const third = semiFinalists.filter(id => !finalists.includes(id));
  return { first, second, third };
};

export const getPoints = (results: ResultsFromDBType[]): Record<string, number> => {
  const ranking = results.reduce<Record<string, number>>((acc, cur) => {
    const { first, second, third } = pickTop3(cur.records);
    if (acc[first]) acc[first] += 3;
    else acc[first] = 3;

    if (acc[second]) acc[second] += 2;
    else acc[second] = 2;

    third.forEach(id => {
      if (acc[id]) acc[id] += 1;
      else acc[id] = 1;
    });
    return acc;
  }, {});
  return ranking;
};

export const generateRandomAntText = (candidateName?: string) => {
  const antTexts = [
    '둘 중에 더 먹고 시픈걸\n골라봐요',
    '설마 또신각이 나오겠어',
    '결정장애 올거같아요',
    '오...',
    '(두근)',
    '이거 보니깐 배고프다',
    '와 이걸 어떻게 골라',
    '신중하게 골라줘요\n우리의 저녁은 소중하니까..✨',
    '아 집가고싶다',
    '개미는(뚠뚠)🐜🐜오늘도(뚠뚠)🐜🐜\n열심히 일을 하네(뚠뚠)🐜🐜',
    ...(candidateName
      ? [
          `${candidateName}?\n맛잘알;;`,
          `${candidateName}도 좋지,,`,
          `${candidateName},,\n진짜 가슴 웅장해진다,,`,
          `${candidateName}에선\n뭐가 맛있을라나`,
          `${candidateName}?\n 진심이요??`,
          `[2024 일개미 선정 맛집]\n${candidateName}`,
        ]
      : []),
  ];
  return antTexts[Math.floor(Math.random() * antTexts.length)];
};
