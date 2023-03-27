import React, { CSSProperties } from "react";

type UserCardProps = {
  firstNameLastName: string;
  emailAddress: string;
  email: string;
  phone: number | string;
  company: string;
  jobTitle: string;
  style?: CSSProperties;
};

type StyleProps = {
  card: CSSProperties;
  name: CSSProperties;
  details: CSSProperties;
};

const styles: StyleProps = {
  card: {
    padding: "1.25rem",
    borderRadius: "1.25rem",
    backgroundColor: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: "24em",
    marginBottom: "1em",
  },
  name: {
    fontSize: "1.4em",
    fontWeight: "bold",
    marginBottom: "0.5em",
    color: "#242424",
  },
  details: {
    color: "#4a4a4a",
    marginBottom: "0.7em",
  },
};

const UserCard = ({
  firstNameLastName,
  email,
  emailAddress,
  phone,
  company,
  jobTitle,
  style,
}: UserCardProps) => {
  return (
    <div style={{ ...styles.card, ...style }}>
      <b style={styles.name}>{`Name: ${firstNameLastName}`}</b>
      <b style={styles.details}>
        Email:
        <a
          style={{ ...styles.details, color: "teal" }}
          href={`mailto:${email}`}
        >
          {` ${email}`}
        </a>
      </b>
      <b style={styles.details}>{`Email Address: ${emailAddress}`}</b>
      <b style={styles.details}>{`Phone: ${phone}`}</b>
      <b style={styles.details}>{`Company: ${company}`}</b>
      <b style={{ color: "teal" }}>
        <i>{`Job Title: ${jobTitle}`}</i>
      </b>
    </div>
  );
};

export default UserCard;
