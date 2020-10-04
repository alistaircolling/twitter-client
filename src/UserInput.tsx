import "bootstrap/dist/css/bootstrap.min.css";
import React, { FunctionComponent } from "react";
import { Button, InputGroup } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

type UserInputProps = {
  setInputFocussed: Function;
  setUserName: Function;
  submitUserName: Function;
  userName: string;
  loading: boolean;
  inputFocussed: boolean;
  allUserNames: string[];
};

export const UserInput: FunctionComponent<UserInputProps> = ({
  setInputFocussed,
  setUserName,
  submitUserName,
  userName,
  loading,
  inputFocussed,
  allUserNames,
}) => {
  return (
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
      </InputGroup.Prepend>
      <Typeahead
        id="basic-typeahead-single"
        onInputChange={(input: string) => {
          setInputFocussed(true);
          setUserName(input);
        }}
        onFocus={() => {
          setInputFocussed(true);
        }}
        onBlur={() => {
          setInputFocussed(false);
        }}
        onKeyDown={(event: KeyboardEvent) => {
          if (event.key === "Enter") {
            submitUserName(userName);
          }
          if (event.key === "Escape") setInputFocussed(false);
        }}
        options={allUserNames}
        placeholder="Enter a username"
        paginate={false}
        open={inputFocussed}
      />

      <InputGroup.Append>
        <Button
          disabled={loading}
          onClick={() => {
            if (userName.length > 0) submitUserName(userName);
          }}
        >
          Get tweets!
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};
