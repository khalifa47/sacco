"use client";

import { useState } from "react";
import ActionCard from "./ActionCard";
import type { Settings } from "@/types/othTypes";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 10,
      }}
    >
      {children}
    </div>
  );
};

const Actions = ({
  content,
  settings,
}: {
  content: Content;
  settings: Settings;
}) => {
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
          action="deposit shares"
          settings={settings}
          selectedAction={selectedAction}
          handleDialogOpen={handleDialogOpen}
          handleDialogClose={handleDialogClose}
        />
        <ActionCard
          action="withdraw"
          settings={settings}
          selectedAction={selectedAction}
          handleDialogOpen={handleDialogOpen}
          handleDialogClose={handleDialogClose}
        />
        <ActionCard
          action="transfer"
          settings={settings}
          selectedAction={selectedAction}
          handleDialogOpen={handleDialogOpen}
          handleDialogClose={handleDialogClose}
        />
        <ActionCard
          action="share settings"
          settings={settings}
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
          settings={settings}
          selectedAction={selectedAction}
          handleDialogOpen={handleDialogOpen}
          handleDialogClose={handleDialogClose}
        />
        <ActionCard
          action="request"
          settings={settings}
          selectedAction={selectedAction}
          handleDialogOpen={handleDialogOpen}
          handleDialogClose={handleDialogClose}
        />
        <ActionCard
          action="payment"
          settings={settings}
          selectedAction={selectedAction}
          handleDialogOpen={handleDialogOpen}
          handleDialogClose={handleDialogClose}
        />
        {/* <ActionCard
          action="loan settings"
          settings={settings}
          selectedAction={selectedAction}
          handleDialogOpen={handleDialogOpen}
          handleDialogClose={handleDialogClose}
        /> */}
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <ActionCard
        action="deposit welfare"
        settings={settings}
        selectedAction={selectedAction}
        handleDialogOpen={handleDialogOpen}
        handleDialogClose={handleDialogClose}
      />
      <ActionCard
        action="welfare settings"
        settings={settings}
        selectedAction={selectedAction}
        handleDialogOpen={handleDialogOpen}
        handleDialogClose={handleDialogClose}
      />
    </Wrapper>
  );
};

export default Actions;
