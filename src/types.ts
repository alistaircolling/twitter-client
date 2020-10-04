export interface Tweet {
  text: string;
  id_str: string;
  created_at: string;
  link: string;
}

export interface TwitterTimeline {
  userName: string;
  tweets: Array<Tweet>;
  last_tweet_id: string;
  loading?: boolean;
}
