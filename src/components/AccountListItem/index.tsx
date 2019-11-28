import React, { useState } from "react";
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

  account.latestMatch(season).then(match => setLatestMatch(match || null));
  account.totalMatches(season).then(count => setTotalMatches(count));
  account.topHeroes(season).then(newTopHeroes => setTopHeroes(newTopHeroes));

  const wipeSeason = () => {
    if (totalMatches < 0) {
      return;
    }

    const unit = totalMatches === 1 ? "match" : "matches";
    const message = `Are you sure you want to delete all ${totalMatches} ${unit} from season ${season} for ${account.battletag}? This cannot be undone.`;
    if (!window.confirm(message)) {
      return;
    }

    Match.wipeSeason(account._id, season).then(() => {
      account.latestMatch(season).then(match => setLatestMatch(match || null));
      account.totalMatches(season).then(count => setTotalMatches(count));
      account
        .topHeroes(season)
        .then(newTopHeroes => setTopHeroes(newTopHeroes));
    });
  };

  const exportSeasonTo = (path: string) => {
    if (!account.battletag) {
      return;
    }
    const exporter = new CsvExporter(path, season, account._id, account.battletag);

    exporter.export().then(() => {
      console.log(`exported ${account.battletag}'s season ${season}`, path);
    });
  };

  const exportSeason = () => {
    if (!account.battletag) {
      return;
    }
    const defaultPath = FileUtil.defaultCsvExportFilename(
      account.battletag,
      season
    );
    const options = { defaultPath };

    showSaveDialog(options, (path: string) => {
      if (path && path.length > 0) {
        exportSeasonTo(path);
      }
    });
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
    <li className="Box mb-3 p-3 account-list-item">
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
                <button
                  className="btn-link f6"
                  type="button"
                  onClick={() => setShowEditForm(!showEditForm)}
                >
                  Cancel rename
                </button>
              </>
            ) : (
              <button
                type="button"
                className="btn-link h1 text-bold text-left d-block flex-auto"
                onClick={() => onAccountChange(account._id)}
              >
                {battletag}
              </button>
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
          <button
            className="btn-link link-gray-dark f6 show-on-hover"
            type="button"
            onClick={() => setShowEditForm(!showEditForm)}
          >
            Rename account
          </button>
          {totalMatches > 0 ? (
            <>
              <button
                type="button"
                aria-label="Save season as a CSV file"
                className="ml-3 btn-link tooltipped show-on-hover tooltipped-n link-gray-dark f6"
                onClick={exportSeason}
              >
                Export season {season}
              </button>
              <button
                type="button"
                className="btn-link text-red show-on-hover f6 ml-3"
                onClick={wipeSeason}
              >
                Delete matches
              </button>
            </>
          ) : null}
        </div>
        <div className="d-flex flex-items-center">
          {haveLatestRank && latestMatch && (
            <button
              type="button"
              className="text-center btn-link btn-rank"
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
            </button>
          )}
          <div className="ml-3 text-right">
            {topHeroes && topHeroes.length > 0 ? (
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
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
};

export default AccountListItem;
