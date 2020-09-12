import React, { useState, useEffect } from "react";
import ImportForm from "./ImportForm";
import LoadingPage from "./LoadingPage";
import Account from "../models/Account";
import Season from "../models/Season";
import Match from "../models/Match";
import LayoutChildrenContainer from "./LayoutChildrenContainer";

interface Props {
  account: Account;
  season: Season;
  onImport: (matches: Array<Match>) => void;
}

const ImportPage = ({ account, season, onImport }: Props) => {
  const [totalMatches, setTotalMatches] = useState(-1);
  const [activeSample, setActiveSample] = useState("sample1");

  useEffect(() => {
    async function getTotalMatches() {
      const total = await account.totalMatches(season);
      setTotalMatches(total);
    }

    getTotalMatches();
  }, [account && account._id, season]);

  if (totalMatches < 0) {
    return <LoadingPage />;
  }

  return (
    <LayoutChildrenContainer>
      {totalMatches > 0 && (
        <p className="flash-warn p-3 f3">
          Importing matches will <strong>delete</strong> your
          <strong>
            {" "}
            {totalMatches} match{totalMatches === 1 ? null : "es"}{" "}
          </strong>
          in season {season.number} ({season.description()}).
        </p>
      )}
      <ImportForm season={season} onImport={onImport} account={account} />

      <h4 className="h4 mt-4 mb-2">Requirements:</h4>
      <div className="clearfix">
        <div className="col-6 float-left">
          <ul className="ml-4 mr-4 mb-4 mt-0">
            <li>
              <span className="text-bold">Valid columns:</span> rank, heroes,
              map, comment, time, day, date, ally thrower, ally leaver, enemy
              thrower, enemy leaver, group, group size, result, placement, play
              of the game, joined voice, open queue
            </li>
            <li>Rank is required for non-placement matches</li>
            <li>Valid values for <strong>day</strong> column: weekday, weekend</li>
            <li>
              Valid values for <strong>time</strong> column: morning, afternoon, evening, night
            </li>
            <li>
              Valid values for <strong>thrower, leaver, play of the game, joined voice, </strong>
              <strong>open queue,</strong> and <strong>placement</strong> columns: Y, N
            </li>
            <li>Valid values for <strong>result</strong> column: win, loss, draw</li>
            <li>
              <strong>Group</strong> should be a comma-separated list of the people who grouped
              with you
            </li>
            <li>
              <strong>Group Size</strong> should be an integer between 1-6 indicating how many
              people, including yourself, were in your group
            </li>
          </ul>
        </div>
        <div className="col-6 float-left">
          <ul className="ml-4 mb-4 mr-4 mt-0">
            <li>
              <ul className="list-style-none">
                <li><strong>Date</strong> represents when you played the match</li>
                <li>Should be a date that can optionally include the time</li>
                <li>Should be in the format <code>YYYY-MM-DD</code> or ISO 8601</li>
                <li>
                  Sample values: <code>2017-02-27</code> and{" "}
                  <code>2018-07-29T21:36:43.977Z</code>
                </li>
              </ul>
            </li>
            <li>Column order does not matter</li>
            <li>
              <ul className="list-style-none">
                <li>A header row is required</li>
                <li>Should be a comma-separated list of valid columns</li>
                <li>Columns can be capitalized or not (case doesn't matter)</li>
              </ul>
            </li>
            <li>Hero names must be comma-separated; case doesn't matter</li>
          </ul>
        </div>
      </div>

      <h4 className="h4 mb-2">Sample formatting</h4>
      <div className="tabnav mb-0">
        <nav className="tabnav-tabs">
          <button
            onClick={() => setActiveSample("sample1")}
            type="button"
            className={`tabnav-tab btn-link ${
              activeSample === "sample1" ? "selected" : null
            }`}
          >
            Sample file #1
          </button>
          <button
            onClick={() => setActiveSample("sample2")}
            type="button"
            className={`tabnav-tab btn-link ${
              activeSample === "sample2" ? "selected" : null
            }`}
          >
            Sample file #2
          </button>
          <button
            onClick={() => setActiveSample("sample3")}
            type="button"
            className={`tabnav-tab btn-link ${
              activeSample === "sample3" ? "selected" : null
            }`}
          >
            Sample file #3
          </button>
        </nav>
      </div>

      <div
        className={`border p-3 border-top-0 mb-4 ${
          activeSample === "sample1" ? null : "d-none"
        }`}
      >
        <p>In this example, 3929 is where you placed:</p>
        <pre className="mb-2">{`day,Rank,Map,Comment,Group,group size
,3929,,,
weekday,3954,Hanamura,favored,"Rob, Siege",4
weekend,3978,Nepal,,Rob,2
weekday,3953,Temple of Anubis,leaver on my team,,1
,3924,King's Row,two overextending teammates,,3
,3949,Hollywood,even team SRs,"Siege, Zion",2
weekend,3925,Junkertown,"slightly favored, PotG",,1`}</pre>

        <div className="col-md-6">
          Includes whether you played on a weekday or the weekend, your SR,
          which map you played on, a comment about the game, which players you
          grouped with whose names you know, and how many people were in your
          group.
        </div>
      </div>

      <div
        className={`border p-3 border-top-0 mb-4 ${
          activeSample === "sample2" ? null : "d-none"
        }`}
      >
        <p>In this example, 3249 is where you placed:</p>
        <pre className="mb-2">{`rank,Time,map,heroes
3249,,,
3333,morning,,Lúcio
3322,afternoon,Ilios,lucio
3364,,King's Row,"Torbjorn, reinhardt, D.va"
3399,night,Numbani,"mercy,moira"
3437,Night,Route 66,widowmaker
3474,evening,Hollywood,`}</pre>

        <div className="col-md-6">
          Includes your SR, what general time you played, which map you played
          on, and which heroes you played.
        </div>
      </div>

      <div
        className={`border p-3 border-top-0 mb-4 ${
          activeSample === "sample3" ? null : "d-none"
        }`}
      >
        <p>This file includes 10 placement matches and a regular match:</p>
        <pre className="mb-2">{`placement,result,rank,map,comment
Y,win,,Hanamura,""
Y,win,,Nepal,"trickled"
Y,loss,,Ilios,""
Y,draw,,Junkertown,"Close game"
Y,loss,,"King's Row","what was Winston doing"
Y,win,,"Blizzard World",""
Y,win,,Oasis,"ez"
Y,loss,,"Watchpoint: Gibraltar",""
Y,win,,Eichenwalde,""
Y,loss,3115,Ilios,"couldn't stop Junkrat"
N,,3135,Numbani,"good teamwork"`}</pre>

        <div className="col-md-6">
          Includes whether the match was a placement match or not, what the
          outcome of the placement match was, your SR, which map you played on,
          and a comment about the match.
        </div>
      </div>
    </LayoutChildrenContainer>
  );
};

export default ImportPage;
