import React from "react";
import Account from "../models/Account";
import Season from "../models/Season";
import SeasonForm from "./SeasonForm";
import AddAccountForm from "./AddAccountForm";
import AccountsList from "./AccountsList";
import LayoutChildrenContainer from "./LayoutChildrenContainer";
import { Box, Heading, CounterLabel } from "@primer/react";

interface Props {
  onAccountChange: (id: string) => void;
  onAccountUpdate: () => void;
  onCreate?: () => void;
  onSeasonCreate: (newSeason: Season, allSeasons: Season[]) => void;
  accounts: Account[];
  season: Season;
  latestSeason: Season;
  onSeasonDelete: (season: Season, allSeasons: Season[]) => void;
  latestSeasonCanBeDeleted: boolean;
  onPageChange: (activePage: string, val1?: any, val2?: any) => void;
}

const AccountsPage = ({
  onAccountChange,
  onAccountUpdate,
  season,
  accounts,
  onCreate,
  onSeasonCreate,
  latestSeason,
  onSeasonDelete,
  latestSeasonCanBeDeleted,
  onPageChange
}: Props) => (
  <LayoutChildrenContainer>
    {accounts.length < 1 && (
      <Box mb={4} p={3} className="col-lg-6">
        <h2 className="Subhead-heading mb-2">
          <span role="img" className="mr-2 d-inline-block" aria-label="Tada">
            🎉
          </span>
          Welcome to Competiwatch!
        </h2>
        <div className="f4">
          Thanks for using the app! To get started, add a Battle.net account
          below and log some games.
        </div>
      </Box>
    )}
    <div className="clearfix">
      {accounts.length > 0 && (
        <Box sx={{ float: 'left' }} mb={4} className="col-lg-7 col-md-12 col-sm-12">
          <Box mr={4} pr={4}>
            <Box display="flex" mb={2} alignItems="center">
              <Heading sx={{ fontSize: 4, fontWeight: 'normal' }}>
                Battle.net accounts
              </Heading>
              <CounterLabel sx={{ ml: 2, px: 2 }}>
                {accounts.length}
              </CounterLabel>
            </Box>
            <p>Choose an account to view and log competitive matches.</p>
            <AccountsList
              season={season}
              accounts={accounts}
              onPageChange={onPageChange}
              onAccountChange={onAccountChange}
              onAccountUpdate={onAccountUpdate}
            />
          </Box>
        </Box>
      )}
      <Box sx={{ float: 'left' }} mb={4} className="col-lg-5 col-md-12 col-sm-12">
        <AddAccountForm
          accounts={accounts}
          onAccountUpdate={onAccountUpdate}
          onCreate={onCreate}
        />

        <SeasonForm
          latestSeason={latestSeason}
          onCreate={onSeasonCreate}
          onDelete={onSeasonDelete}
          latestSeasonCanBeDeleted={latestSeasonCanBeDeleted}
        />
      </Box>
    </div>
  </LayoutChildrenContainer>
);

export default AccountsPage;
