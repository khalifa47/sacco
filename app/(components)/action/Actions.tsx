"use client";

import { useState } from "react";
import ActionCard from "./ActionCard";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        columnGap: 0,
        rowGap: "10px",
      }}
    >
      {children}
    </div>
  );
};

const Actions = ({ content }: { content: Content }) => {
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);

  if (content === "shares") {
    return (
      <Wrapper>
        <ActionCard action="deposit" />
        <ActionCard action="withdraw" />
        <ActionCard action="transfer" />
        <ActionCard action="settings" />
      </Wrapper>
    );
  } else if (content === "loans") {
    return (
      <Wrapper>
        <ActionCard action="loan history" />
        <ActionCard action="request" />
        <ActionCard action="payment" />
        <ActionCard action="settings" />
      </Wrapper>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 10,
      }}
    >
      <ActionCard action="deposit" />
      <ActionCard action="settings" />
    </div>
  );
};

export default Actions;
