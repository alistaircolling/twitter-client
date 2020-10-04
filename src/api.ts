import axios, { AxiosError } from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { TwitterTimeline, Tweet } from "./types";

const parseTweets = (tweets: any | TwitterTimeline[]): TwitterTimeline => {
  const userName: string = tweets[0].user.screen_name;
  const parsedTweets: Tweet[] = tweets.map((tweet: Tweet) => {
    const parsedTweet = {
      text: tweet.text,
      id_str: tweet.id_str,
      created_at: tweet.created_at,
    };
    return parsedTweet;
  });
  const lastTweet: Tweet = parsedTweets[parsedTweets.length - 1];
  const last_tweet_id: string = lastTweet.id_str;
  const timeline: TwitterTimeline = {
    userName,
    tweets: parsedTweets,
    last_tweet_id,
  };
  return timeline;
};

export const callApi = async (
  user: string
): Promise<TwitterTimeline | AxiosError> => {
  try {
    return axios
      .post(
        "https://6g0x1giugh.execute-api.us-east-1.amazonaws.com/dev/api/v1/getUserTimeline",
        {
          screen_name: user,
        }
      )
      .then((response) => {
        const parsed = parseTweets(response.data.tweets);
        return parsed;
      });
  } catch (err) {
    if (err && err.response) {
      const axiosError = err as AxiosError;
      return axiosError.response.data;
    }
    throw err;
  }
};
