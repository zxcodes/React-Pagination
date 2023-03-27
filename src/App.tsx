import { CSSProperties, Fragment, useEffect, useState } from "react";
import "./App.css";
import { Button, UserCard } from "./components";

type UserType = {
  ID: number;
  FirstNameLastName: string;
  EmailAddress: string;
  Email: string;
  Phone: number | string;
  Company: string;
  JobTitle: string;
};

const buttonStyles: CSSProperties = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  marginBottom: "1em",
};

function RenderUsers({ usersList }: { usersList: UserType[] }): JSX.Element {
  return (
    <Fragment>
      {usersList.map((user) => {
        return (
          <UserCard
            key={user.ID}
            firstNameLastName={user.FirstNameLastName}
            email={user.Email}
            emailAddress={user.EmailAddress}
            jobTitle={user.JobTitle}
            company={user.Company}
            phone={user.Phone}
          />
        );
      })}
    </Fragment>
  );
}

function App() {
  const [page, setPage] = useState<number>(0);
  const [users, setUsers] = useState<UserType[]>([]);
  const [statusText, setStatusText] = useState<string>("");

  async function getUsers(pageNumber: number, signal: AbortSignal) {
    setStatusText("Getting users...");
    try {
      const endpoint = `https://give-me-users-forever.vercel.app/api/users/${pageNumber}/next`;
      const response = await fetch(endpoint, { signal });
      const data = await response.json();
      setUsers(data.users);
      setStatusText("");
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Request aborted.");
      } else {
        setStatusText("Something went wrong! Please try again.");
        console.error(error);
      }
    }
  }

  function RenderNavigationButtons(): JSX.Element {
    return (
      <div style={buttonStyles}>
        <Button
          text="Previous"
          onClick={() => {
            if (page !== 0) {
              setPage((page) => page - 1);
            }
          }}
          disabled={page === 0}
        />
        <Button
          text="Next"
          onClick={() => {
            setPage((page) => page + 1);
          }}
          style={{ marginLeft: "1em" }}
        />
      </div>
    );
  }

  const renderStatusText = statusText ? (
    <h1 style={{ color: "#fff" }}>{statusText}</h1>
  ) : null;

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    getUsers(page, signal);
    return () => abortController.abort();
  }, [page]);

  return (
    <div className="App">
      {renderStatusText}
      <RenderNavigationButtons />
      <RenderUsers usersList={users} />
    </div>
  );
}

export default App;
