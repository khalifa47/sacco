"use client";

import { useState } from "react";
import ActionCard from "./ActionCard";
import type { LoanWithGuarantor, Settings } from "@/types/othTypes";

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
  phone,
  loans,
  settings,
}: {
  content: Content;
  phone: string;
  loans: LoanWithGuarantor[];
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
          phone={phone}
          settings={settings}
          loans={loans}
          selectedAction={selectedAction}
          handleDialogOpen={handleDialogOpen}
          handleDialogClose={handleDialogClose}
        />
        <ActionCard
          action="withdraw"
          phone={phone}
          loans={loans}
          settings={settings}
          selectedAction={selectedAction}
          handleDialogOpen={handleDialogOpen}
          handleDialogClose={handleDialogClose}
        />
        <ActionCard
          action="transfer"
          settings={settings}
          loans={loans}
          selectedAction={selectedAction}
          handleDialogOpen={handleDialogOpen}
          handleDialogClose={handleDialogClose}
        />
        <ActionCard
          action="share settings"
          settings={settings}
          loans={loans}
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
          loans={loans}
          selectedAction={selectedAction}
          handleDialogOpen={handleDialogOpen}
          handleDialogClose={handleDialogClose}
        />
        <ActionCard
          action="request"
          phone={phone}
          settings={settings}
          loans={loans}
          selectedAction={selectedAction}
          handleDialogOpen={handleDialogOpen}
          handleDialogClose={handleDialogClose}
        />
        <ActionCard
          action="payment"
          phone={phone}
          settings={settings}
          loans={loans}
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
        phone={phone}
        settings={settings}
        loans={loans}
        selectedAction={selectedAction}
        handleDialogOpen={handleDialogOpen}
        handleDialogClose={handleDialogClose}
      />
      <ActionCard
        action="welfare settings"
        settings={settings}
        loans={loans}
        selectedAction={selectedAction}
        handleDialogOpen={handleDialogOpen}
        handleDialogClose={handleDialogClose}
      />
    </Wrapper>
  );
};

export default Actions;
