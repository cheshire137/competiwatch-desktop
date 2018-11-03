# Change log

## Version 0.2.0

- Added ability to log whether you joined voice chat in a match [#44](https://github.com/cheshire137/competiwatch-desktop/issues/44)
- Added support for a 'joined voice' field when importing from a CSV file, and exporting matches, to specify whether you joined voice chat in a match
- Added Ashe [#48](https://github.com/cheshire137/competiwatch-desktop/issues/48)
- Added competitive season 13 [#47](https://github.com/cheshire137/competiwatch-desktop/issues/47)

## [Version 0.1.9](https://github.com/cheshire137/competiwatch-desktop/releases/tag/0.1.9)

- Added installer for Windows
- Improved appearance of Import and Accounts pages
- Fixed bug where a renamed account would still show with the old name until the app was restarted [#37](https://github.com/cheshire137/competiwatch-desktop/issues/37)
- Added Busan map [#40](https://github.com/cheshire137/competiwatch-desktop/issues/40)

## [Version 0.1.8](https://github.com/cheshire137/competiwatch-desktop/releases/tag/0.1.8)

- Added competitive season 12 [#36](https://github.com/cheshire137/competiwatch-desktop/issues/36)
- Added an app icon [#21](https://github.com/cheshire137/competiwatch-desktop/issues/21)

## [Version 0.1.7](https://github.com/cheshire137/competiwatch-desktop/releases/tag/0.1.7)

- After editing a match, the view will now scroll to that match on the Matches page
- Added link on the About page to let you check for a newer version of the app [#18](https://github.com/cheshire137/competiwatch-desktop/issues/18)
- Added "Export matches" link to the Matches page to allow downloading your match history for that account and season [#32](https://github.com/cheshire137/competiwatch-desktop/issues/32)
- Added "Export Matches" menu item to the Tools menu when viewing a particular account's match history
- Fixed bug where the the "New SR" field wouldn't have your latest SR when you used the "Log a Match" menu option/hit Option-L [#10](https://github.com/cheshire137/competiwatch-desktop/issues/10)

## [Version 0.1.6](https://github.com/cheshire137/competiwatch-desktop/releases/tag/0.1.6)

- Fixed hero avatars having a light background on the Accounts page when the dark theme was active
- Fixed bug where selecting a group member suggestion didn't update the group size field on the Log a Match page [#30](https://github.com/cheshire137/competiwatch-desktop/issues/30)
- An error message is now shown when you try to add an account that already exists on the Accounts page [#29](https://github.com/cheshire137/competiwatch-desktop/issues/29)
- Fixed display bug where hero avatars would appear on top of the main navigation when scrolling the Accounts page
- Added search option to Help menu in macOS
- Added a Help page [#20](https://github.com/cheshire137/competiwatch-desktop/issues/20)

## [Version 0.1.5](https://github.com/cheshire137/competiwatch-desktop/releases/tag/0.1.5)

- Added an 'Auto' option to the theme choice on the Settings page, to use the dark theme at night and the light theme during the day
- Fixed bug where the 'Date' column in exported CSV files was not readable
- Added ability to import 'Play of the Game', 'Group Size', and 'Date' fields when importing match history
- Added formatting requirements to the Import page, as well as sample CSV files
- Fixed bug where importing matches that didn't have a date would cause an error
- Added confirmation dialog when importing matches
- Split the hero roles on the Log a Match page into main and off-tanks and healers
- Added top three heroes to accounts list for each account

## [Version 0.1.4](https://github.com/cheshire137/competiwatch-desktop/releases/tag/0.1.4)

- Added an 'Edit' option to each account on the Accounts page to allow renaming them
- Sort accounts alphabetically on the Accounts page, ignoring capital letters
- Added a chart showing wins and losses by hero to the Trends page
- Added a chart to the Trends page showing wins and losses by the general time of day and day of week played
- Added a spider chart to the Trends page showing wins and losses by role played
- Fixed a bug where 'Trends' would not show as the active tab when viewing the Trends page for a season with no logged matches
- Added a message to the Trends page about no match history when viewing a season with no logged matches
- Added percentages to the 'Win/Loss %' pie chart on the Trends page
- Play of the Game, Day/Time, Heroes, Group, and Comment columns will no longer show on the Matches page when no data has been logged for those fields in that season
- Improved Accounts page appearance
- Added Wrecking Ball image

## [Version 0.1.3](https://github.com/cheshire137/competiwatch-desktop/releases/tag/0.1.3)

- More compact header so the selected account and season are always visible
- Added charts showing wins and losses per map and per group size to the Trends page
- A warning is now shown when trying to log a match in a past competitive season [#17](https://github.com/cheshire137/competiwatch-desktop/issues/17)
- App title now updates to reflect the selected account, season, and page [#19](https://github.com/cheshire137/competiwatch-desktop/issues/19)
- Fixed bug where new competitive seasons couldn't be added from the Manage Seasons page
- Trends page is now accessible via Alt-T or Option-T and is in the 'View' menu
- Group members will be autocompleted based on your previous logged matches [#22](https://github.com/cheshire137/competiwatch-desktop/issues/22)

## [Version 0.1.2](https://github.com/cheshire137/competiwatch-desktop/releases/tag/0.1.2)

- Added a 'Trends' page with charts about your match results [#12](https://github.com/cheshire137/competiwatch-desktop/issues/12)
- Fixed bug causing the latest logged match for each account to not appear on the Accounts page
- Fixed each account showing the same number of matches on the Accounts page [#15](https://github.com/cheshire137/competiwatch-desktop/issues/15)
- Fixed the blank, black tooltip that appeared when hovering over a competitive rank image
- Fixed each database file path being the same on the Settings page [#14](https://github.com/cheshire137/competiwatch-desktop/issues/14)
- Increased default window width to reduce horizontal scrolling on the Matches page [#13](https://github.com/cheshire137/competiwatch-desktop/issues/13)
- Matches page now scrolls to the latest match after you log one [#9](https://github.com/cheshire137/competiwatch-desktop/issues/9)

## [Version 0.1.1](https://github.com/cheshire137/competiwatch-desktop/releases/tag/0.1.1)

- Fixed 'delete match' not working [#11](https://github.com/cheshire137/competiwatch-desktop/issues/11)
- Fixed match edit button not being visible in the dark theme
- Added links to about page to view changes, view source, and report a bug
- Added file paths to the settings page for where Competiwatch stores your data
- Improved appearance of match history

## [Version 0.1.0](https://github.com/cheshire137/competiwatch-desktop/releases/tag/0.1.0)

A pre-release to get feedback and find bugs. Features included:

- Log matches for each competitive season across multiple Battle.net accounts
- Matches can include SR, map, comments, group members, group size, whether you got Play of the Game, heroes you played, competitive season, the time played, the day of the week, whether anyone left the match early, and whether anyone was throwing the game
- Import matches from a CSV file that you created yourself or that you generated from the web app version of Competiwatch
- Edit matches to update details
- Matches can be deleted individually
- Choose from a dark or light theme
