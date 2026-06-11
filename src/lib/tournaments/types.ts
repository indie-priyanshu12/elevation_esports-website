export type TournamentRecord = {
  id: string;
  slug: string;
  name: string;
  game: string;
  summary: string | null;
  formLink: string;
  prizePool: string | null;
  entryFee: string | null;
  dateUploaded: string;
  eventDate: string;
  registrationClosesAt: string | null;
  format: string;
  status: string;
  slots: string;
  location: string | null;
  archived: boolean;
};

export type TournamentMutationInput = {
  slug?: string;
  name: string;
  game: string;
  summary?: string | null;
  formLink: string;
  prizePool?: string | null;
  entryFee?: string | null;
  dateUploaded: string;
  eventDate: string;
  registrationClosesAt?: string | null;
  format: string;
  status: string;
  slots: string;
  location?: string | null;
  archived?: boolean;
};

export type TournamentHubData = {
  source: "database" | "seed";
  upcoming: TournamentRecord[];
  completed: TournamentRecord[];
};
