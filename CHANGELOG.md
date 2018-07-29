# Change log

## Version 0.1.4

- Added an 'Edit' option to each account on the Accounts page to allow renaming them
- Sort accounts alphabetically on the Accounts page, ignoring capital letters
- Added a chart showing wins and losses by hero to the Trends page
- Added a chart to the Trends page showing wins and losses by the general time of day and day of week played
- Added a spider chart to the Trends page showing wins and losses by role played

## Version 0.1.3

- More compact header so the selected account and season are always visible
- Added charts showing wins and losses per map and per group size to the Trends page
- A warning is now shown when trying to log a match in a past competitive season [#17](https://github.com/cheshire137/competiwatch-desktop/issues/17)
- App title now updates to reflect the selected account, season, and page [#19](https://github.com/cheshire137/competiwatch-desktop/issues/19)
- Fixed bug where new competitive seasons couldn't be added from the Manage Seasons page
- Trends page is now accessible via Alt-T or Option-T and is in the 'View' menu
- Group members will be autocompleted based on your previous logged matches [#22](https://github.com/cheshire137/competiwatch-desktop/issues/22)

## Version 0.1.2

- Added a 'Trends' page with charts about your match results [#12](https://github.com/cheshire137/competiwatch-desktop/issues/12)
- Fixed bug causing the latest logged match for each account to not appear on the Accounts page
- Fixed each account showing the same number of matches on the Accounts page [#15](https://github.com/cheshire137/competiwatch-desktop/issues/15)
- Fixed the blank, black tooltip that appeared when hovering over a competitive rank image
- Fixed each database file path being the same on the Settings page [#14](https://github.com/cheshire137/competiwatch-desktop/issues/14)
- Increased default window width to reduce horizontal scrolling on the Matches page [#13](https://github.com/cheshire137/competiwatch-desktop/issues/13)
- Matches page now scrolls to the latest match after you log one [#9](https://github.com/cheshire137/competiwatch-desktop/issues/9)

## Version 0.1.1

- Fixed 'delete match' not working [#11](https://github.com/cheshire137/competiwatch-desktop/issues/11)
- Fixed match edit button not being visible in the dark theme
- Added links to about page to view changes, view source, and report a bug
- Added file paths to the settings page for where Competiwatch stores your data
- Improved appearance of match history

## Version 0.1.0

A pre-release to get feedback and find bugs. Features included:

- Log matches for each competitive season across multiple Battle.net accounts
- Matches can include SR, map, comments, group members, group size, whether you got Play of the Game, heroes you played, competitive season, the time played, the day of the week, whether anyone left the match early, and whether anyone was throwing the game
- Import matches from a CSV file that you created yourself or that you generated from the web app version of Competiwatch
- Edit matches to update details
- Matches can be deleted individually
- Choose from a dark or light theme
