import { type Timestamp } from '@firebase/firestore';

export interface CandidateType {
  id: string;
  name: string;
  imgSrc: string;
  mapUrl: string;
  description: string;
  recommender: string;
}

export interface WinnerRecordsType {
  16: string[];
  8: string[];
  4: string[];
  2: string[];
}

export interface ResultsFromDBType {
  name: string;
  isParticipant: boolean;
  createdAt: Timestamp;
  records: WinnerRecordsType;
}

export interface RecommendationType {
  description: string;
  recommender: string;
  createdAt: Timestamp;
}
