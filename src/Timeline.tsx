import "bootstrap/dist/css/bootstrap.min.css";
import React, { FunctionComponent, useState } from "react";
import { Container } from "react-bootstrap";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { callApi } from "./api";
import { Timelines } from "./Timelines";
import { TwitterTimeline } from "./types";
import { UserInput } from "./UserInput";

const Timeline: FunctionComponent = () => {
  const [timelines, setTimelines] = useState<Array<TwitterTimeline>>([]);
  const [userName, setUserName] = useState("");
  const [allUserNames, addToAllUserNames] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);
  const [inputFocussed, setInputFocussed] = useState(false);

  const submitUserName = (user: string): void => {
    setInputFocussed(false);
    if (user.length === 0) return;
    getTweets(user);
    if (!allUserNames.includes(user))
      addToAllUserNames([...allUserNames, user]);
  };

  const getTweets = async (user: string): Promise<any> => {
    const userExists = timelines.some(
      (timeline) =>
        timeline.userName.toLocaleLowerCase() === user.toLocaleLowerCase()
    );
    if (userExists) return;
    setLoading(true);
    setUserName("");
    try {
      const newTimeline = (await callApi(user)) as TwitterTimeline;
      const newTimelines = [
        ...timelines.filter((timeline) => timeline.userName !== user),
        newTimeline,
      ];
      setTimelines(newTimelines);
      setLoading(false);
    } catch (error) {
      console.log("Error while making API request");
    }
  };

  const closeTab = (userName: string): void => {
    const newTimelines: TwitterTimeline[] = timelines.filter(
      (timeline) => timeline.userName !== userName
    );
    setTimelines(newTimelines);
  };

  return (
    <Container>
      <h1 className="p-5">
        Twitter Checker{" "}
        <span role="img" aria-label="pigeon">
          🐦
        </span>
      </h1>
      <UserInput
        setUserName={setUserName}
        setInputFocussed={setInputFocussed}
        submitUserName={submitUserName}
        userName={userName}
        loading={loading}
        inputFocussed={inputFocussed}
        allUserNames={allUserNames}
      />

      {timelines.length > 0 && (
        <Timelines
          timelines={timelines}
          closeTab={closeTab}
          getTweets={getTweets}
        />
      )}
    </Container>
  );
};

export default Timeline;
