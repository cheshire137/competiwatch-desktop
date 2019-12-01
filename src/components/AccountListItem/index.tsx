import React, { useState, useEffect } from "react";
import AccountDeleteForm from "../AccountDeleteForm";
import AccountForm from "../AccountForm";
import CsvExporter from "../../models/CsvExporter";
import Match from "../../models/Match";
import FileUtil from "../../models/FileUtil";
import MatchRankImage from "../MatchRankImage";
import HeroImage from "../HeroImage";
import "./AccountListItem.css";
import Account from "../../models/Account";
import { Hero } from "../../models/Hero";
import { showSaveDialog } from "../../utils/electronUtils";
import LinkButton from "../LinkButton";
import BattletagButton from "./BattletagButton";
import AccountListItemStyle from "./AccountListItemStyle";
import ButtonShownOnHover from "./ButtonShownOnHover";
import RankButton from "./RankButton";

interface Props {
  account: Account;
  onAccountChange: (id: string) => void;
  onAccountUpdate: () => void;
  season: number;
}

const AccountListItem = ({
  account,
  onAccountChange,
  season,
  onAccountUpdate
}: Props) => {
  const [totalMatches, setTotalMatches] = useState(-1);
  const [showEditForm, setShowEditForm] = useState(false);
  const [battletag, setBattletag] = useState(account.battletag);
  const [latestMatch, setLatestMatch] = useState<Match | null>(null);
  const [topHeroes, setTopHeroes] = useState<Hero[]>([]);

  useEffect(() => {
    async function getLatestMatch() {
      const match = await account.latestMatch(season);
      setLatestMatch(match || null);
    }

    async function getTotalMatches() {
      const count = await account.totalMatches(season);
      setTotalMatches(count);
    }

    async function getTopHeroes() {
      const newTopHeroes = await account.topHeroes(season);
      setTopHeroes(newTopHeroes);
    }

    getLatestMatch();
    getTotalMatches();
    getTopHeroes();
  }, [account._id, season]);

  const wipeSeason = async () => {
    if (totalMatches < 0) {
      return;
    }

    const unit = totalMatches === 1 ? "match" : "matches";
    const message = `Are you sure you want to delete all ${totalMatches} ${unit} from season ${season} for ${account.battletag}? This cannot be undone.`;
    if (!window.confirm(message)) {
      return;
    }

    await Match.wipeSeason(account._id, season);

    const match = await account.latestMatch(season);
    setLatestMatch(match || null);

    const count = await account.totalMatches(season)
    setTotalMatches(count);

    const newTopHeroes = await account.topHeroes(season);
    setTopHeroes(newTopHeroes);
  };

  const exportSeasonTo = async (path: string) => {
    if (!account.battletag) {
      return;
    }
    const exporter = new CsvExporter(
      path,
      season,
      account._id,
      account.battletag
    );

    await exporter.export()
    console.log(`exported ${account.battletag}'s season ${season}`, path);
  };

  const exportSeason = async () => {
    if (!account.battletag) {
      return;
    }
    const defaultPath = FileUtil.defaultCsvExportFilename(
      account.battletag,
      season
    );
    const options = { defaultPath };

    const dialogResult = await showSaveDialog(options);
    const canceled = dialogResult.canceled as boolean;
    if (canceled) {
      console.log('export cancelled');
      return;
    }

    const filePath = dialogResult.filePath as string;
    console.log('path for export', filePath, 'season', season, 'account',
      account.battletag);
    exportSeasonTo(filePath);
  };

  const accountUpdated = (newBattletag: string) => {
    onAccountUpdate();
    setBattletag(newBattletag);
    setShowEditForm(false);
  };

  const { _id } = account;
  const haveLatestRank = latestMatch && typeof latestMatch.rank === "number";
  const haveLatestResult = latestMatch && latestMatch.result;

  return (
    <AccountListItemStyle>
      <div className="d-flex flex-justify-between flex-items-center">
        <div className="width-full mb-2 mt-1">
          <div className="d-flex flex-items-center flex-justify-between">
            {showEditForm ? (
              <>
                <AccountForm
                  _id={_id}
                  battletag={battletag}
                  totalAccounts={1}
                  onUpdate={accountUpdated}
                />
                <LinkButton
                  type="button"
                  onClick={() => setShowEditForm(!showEditForm)}
                >
                  Cancel rename
                </LinkButton>
              </>
            ) : (
              <BattletagButton
                type="button"
                onClick={() => onAccountChange(account._id)}
              >
                {battletag}
              </BattletagButton>
            )}
            <AccountDeleteForm
              id={_id}
              onDelete={() => onAccountUpdate()}
              battletag={battletag}
            />
          </div>
          <div className="text-gray f4 account-meta d-flex flex-items-center">
            {haveLatestResult && !haveLatestRank && latestMatch && (
              <span>Last match: {latestMatch.result}</span>
            )}
            {latestMatch && latestMatch.playedAt ? (
              <>
                {haveLatestResult && !haveLatestRank ? (
                  <span className="separator" />
                ) : null}
                Last played {latestMatch.playedAt.toLocaleDateString()}
              </>
            ) : latestMatch && latestMatch.createdAt ? (
              <>
                {haveLatestResult && !haveLatestRank ? (
                  <span className="separator" />
                ) : null}
                Last logged {latestMatch.createdAt.toLocaleDateString()}
              </>
            ) : null}
            {totalMatches > 0 ? (
              <>
                <span className="separator" />
                <span>
                  {totalMatches} match{totalMatches === 1 ? null : "es"}
                </span>
              </>
            ) : (
              <span>No matches in season {season}</span>
            )}
          </div>
          <ButtonShownOnHover
            type="button"
            onClick={() => setShowEditForm(!showEditForm)}
          >
            Rename account
          </ButtonShownOnHover>
          {totalMatches > 0 ? (
            <>
              <ButtonShownOnHover
                ml={3}
                type="button"
                aria-label="Save season as a CSV file"
                onClick={exportSeason}
              >
                Export season {season}
              </ButtonShownOnHover>
              <ButtonShownOnHover
                type="button"
                ml={3}
                onClick={wipeSeason}
              >
                Delete matches
              </ButtonShownOnHover>
            </>
          ) : null}
        </div>
        <div className="d-flex flex-items-center">
          {haveLatestRank && latestMatch && (
            <RankButton
              type="button"
              onClick={() => onAccountChange(account._id)}
            >
              {typeof latestMatch.rank === "number" && (
                <MatchRankImage
                  rank={latestMatch.rank}
                  className="d-inline-block"
                />
              )}
              <h3 className="h4 text-normal lh-condensed text-gray-dark my-0">
                {latestMatch.rank}
              </h3>
            </RankButton>
          )}
          <div className="ml-3 text-right">
            {topHeroes && topHeroes.length > 0 && (
              <div
                className={`AvatarStack account-avatar-stack AvatarStack--right ${
                  topHeroes.length >= 3
                    ? "AvatarStack--three-plus"
                    : "AvatarStack--two"
                }`}
              >
                <div
                  className="AvatarStack-body tooltipped tooltipped-n"
                  aria-label={topHeroes.join(", ")}
                >
                  {topHeroes.map(hero => (
                    <HeroImage
                      key={hero}
                      hero={hero}
                      className="avatar account-hero-avatar"
                      size={40}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AccountListItemStyle>
  );
};

export default AccountListItem;
