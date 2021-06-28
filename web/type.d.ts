type Stats = {
  stats: Stat[];
  sheetName: string;
};

type Stat = {
  id: string;
  totalTimeSpent: number;
};

type DiscordUser = {
  id: string;
  username: string;
  discriminator: string;
  avatar?: string;
};
