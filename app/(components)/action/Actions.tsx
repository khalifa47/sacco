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

  const handleDialogOpen = (action: Action) => {
    setSelectedAction(action);
  };

  const handleDialogClose = () => {
    setSelectedAction(null);
  };

  if (content === "shares") {
    return (
      <Wrapper>
        <ActionCard
          action="deposit"
          selectedAction={selectedAction}
          handleDialogOpen={handleDialogOpen}
          handleDialogClose={handleDialogClose}
        />
        <ActionCard
          action="withdraw"
          selectedAction={selectedAction}
          handleDialogOpen={handleDialogOpen}
          handleDialogClose={handleDialogClose}
        />
        <ActionCard
          action="transfer"
          selectedAction={selectedAction}
          handleDialogOpen={handleDialogOpen}
          handleDialogClose={handleDialogClose}
        />
        <ActionCard
          action="settings"
          selectedAction={selectedAction}
          handleDialogOpen={handleDialogOpen}
          handleDialogClose={handleDialogClose}
        />
      </Wrapper>
    );
  } else if (content === "loans") {
    return (
      <Wrapper>
        <ActionCard
          action="loan history"
          selectedAction={selectedAction}
          handleDialogOpen={handleDialogOpen}
          handleDialogClose={handleDialogClose}
        />
        <ActionCard
          action="request"
          selectedAction={selectedAction}
          handleDialogOpen={handleDialogOpen}
          handleDialogClose={handleDialogClose}
        />
        <ActionCard
          action="payment"
          selectedAction={selectedAction}
          handleDialogOpen={handleDialogOpen}
          handleDialogClose={handleDialogClose}
        />
        <ActionCard
          action="settings"
          selectedAction={selectedAction}
          handleDialogOpen={handleDialogOpen}
          handleDialogClose={handleDialogClose}
        />
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
      <ActionCard
        action="deposit"
        selectedAction={selectedAction}
        handleDialogOpen={handleDialogOpen}
        handleDialogClose={handleDialogClose}
      />
      <ActionCard
        action="settings"
        selectedAction={selectedAction}
        handleDialogOpen={handleDialogOpen}
        handleDialogClose={handleDialogClose}
      />
    </div>
  );
};

export default Actions;
