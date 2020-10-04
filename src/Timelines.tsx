import "bootstrap/dist/css/bootstrap.min.css";
import {
  default as React,
  Fragment,
  FunctionComponent,
  ReactElement,
} from "react";
import { Button, Card, Tab, Tabs } from "react-bootstrap";
import "react-bootstrap-typeahead/css/Typeahead.css";
import Linkify from "react-linkify";
import { TwitterTimeline } from "./types";

type TimelinesProps = {
  timelines: TwitterTimeline[];
  closeTab: Function;
  getTweets: Function;
};

const formatTweetDate = (created_at: string): ReactElement => {
  const items: string[] = created_at.split(" ");
  return (
    <Fragment>
      <p>{`${items[0]} ${items[1]} ${items[2]} ${items[5]}`}</p>
      <p>{items[3].split(":").slice(0, 2).join(":")}</p>
    </Fragment>
  );
};

const getCards = (timeline: TwitterTimeline): JSX.Element[] => {
  return timeline.tweets.map((tweet) => {
    const { text, created_at, id_str } = tweet;
    const tweetLink: string = `https://twitter.com/${timeline.userName}/status/${tweet.id_str}`;
    const formattedDate: ReactElement = formatTweetDate(created_at);

    return (
      <Card key={id_str} style={{ textAlign: "left" }}>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            {formattedDate}
          </Card.Subtitle>
          <Card.Text>
            <Linkify>{text}</Linkify>
          </Card.Text>
          <Card.Link href={tweetLink}>Original tweet</Card.Link>
        </Card.Body>
      </Card>
    );
  });
};

const getTimelineTab = ({ timeline, getTweets, closeTab }) => {
  const { userName } = timeline;
  return (
    <Tab
      key={userName}
      eventKey={userName}
      title={
        <>
          {userName}
          <Button
            size="sm"
            variant="light"
            className="m-2"
            onClick={() => getTweets(userName)}
          >
            Refresh
          </Button>
          <Button
            className="m-2"
            variant="light"
            size="sm"
            onClick={() => closeTab(userName)}
          >
            x
          </Button>
        </>
      }
    >
      {getCards(timeline)}
    </Tab>
  );
};

export const Timelines: FunctionComponent<TimelinesProps> = ({
  timelines,
  closeTab,
  getTweets,
}) => {
  return (
    <Tabs className="mt-3">
      {timelines.map((timeline) => {
        return getTimelineTab({ timeline, getTweets, closeTab });
      })}
    </Tabs>
  );
};
