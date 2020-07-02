import React from "react";
import SeasonForm from "./SeasonForm";
import SeasonsList from "./SeasonsList";
import LayoutChildrenContainer from "./LayoutChildrenContainer";
import LinkButton from "./LinkButton";

interface Props {
  onCreate: (season: number) => void;
  latestSeason: number;
  onDelete: (season: number) => void;
  firstNonDeletableSeason: number;
  onPageChange: (activePage: string, val1?: any, val2?: any) => void;
  theme: string;
}

const SeasonsPage = ({
  latestSeason,
  onCreate,
  onPageChange,
  theme,
  firstNonDeletableSeason,
  onDelete
}: Props) => (
  <LayoutChildrenContainer>
    <div className="mt-4">
      <LinkButton onClick={() => onPageChange("accounts")}>
        &larr; Back to your accounts
      </LinkButton>
    </div>
    <h1 className="h1 mb-2 mt-4">Manage Seasons</h1>
    <div className="clearfix">
      <div className="col-7 float-left">
        <SeasonsList
          latestSeason={latestSeason}
          firstNonDeletableSeason={firstNonDeletableSeason}
          onDelete={onDelete}
        />
      </div>
      <div className="col-4 float-right">
        <SeasonForm
          theme={theme}
          latestSeason={latestSeason}
          onCreate={onCreate}
        />
      </div>
    </div>
  </LayoutChildrenContainer>
);

export default SeasonsPage;
