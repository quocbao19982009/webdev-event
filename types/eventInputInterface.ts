export interface EventInputInterface {
  address: string;
  date: string;
  description: string;
  name: string;
  organizer: string;
  time: string;
  venue: string;
  image?: {
    id: number | string;
  } | null;
}
