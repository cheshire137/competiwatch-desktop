import React, { Component } from 'react'
import Match from '../models/Match'
import Hero from '../models/Hero'
import Account from '../models/Account'
import DayTimeApproximator from '../models/DayTimeApproximator'
import MapSelect from './MapSelect'
import HeroSelect from './HeroSelect'
import RoleSelect from './RoleSelect'
import TimeOfDayEmoji from './TimeOfDayEmoji'
import DayOfWeekEmoji from './DayOfWeekEmoji'
import GroupMembersField from './GroupMembersField'
import './MatchForm.css'

const roleForHero = hero => {
  for (const role in Hero.byRole) {
    if (Hero.byRole[role].indexOf(hero) > -1) {
      return role
    }
  }
  return null
}

const dateTimeStrFrom = date => {
  const year = date.getFullYear()

  let month = date.getMonth() + 1
  if (month <= 9) {
    month = `0${month}`
  }

  let day = date.getDate()
  if (day <= 9) {
    day = `0${day}`
  }

  let hour = date.getHours()
  if (hour <= 9) {
    hour = `0${hour}`
  }

  let minute = date.getMinutes()
  if (minute <= 9) {
    minute = `0${minute}`
  }

  return `${year}-${month}-${day}T${hour}:${minute}`
}

const minRank = 0
const maxRank = 5000
const maxGroupSize = 6
const roleQueueSeasonStart = 18

const isMatchValid = data => {
  if (typeof data.rank !== 'number' ||
      data.rank < minRank ||
      data.rank > maxRank) {
    if (data.isPlacement && !data.result) {
      return false
    }

    if (!data.isPlacement) {
      return false
    }
  }

  if (data.season >= roleQueueSeasonStart && (typeof data.role !== 'string' || data.role.length < 1)) {
    return false;
  }

  if (data.groupSize && data.groupSize > maxGroupSize) {
    return false
  }

  if (data.group && data.group.split(',').length > maxGroupSize) {
    return false
  }

  return true
}

const explodeHeroesString = (heroesStr) => {
  return heroesStr.split(',')
    .map(str => str.trim())
    .filter(str => str && str.length > 0)
}

class MatchForm extends Component {
  constructor(props) {
    super(props)

    let playedAt = props.playedAt
    let dayOfWeek = props.dayOfWeek
    let timeOfDay = props.timeOfDay
    if (!props.id && !playedAt) {
      playedAt = new Date()
      dayOfWeek = DayTimeApproximator.dayOfWeek(playedAt)
      timeOfDay = DayTimeApproximator.timeOfDay(playedAt)
    }

    let isPlacement = props.isPlacement
    let isLastPlacement = props.isLastPlacement
    if (typeof isPlacement !== 'boolean') {
      const priorPlacements = props.priorMatches.filter(m => m.isPlacement)
      if (props.season < roleQueueSeasonStart) { // no role queue
        isPlacement = priorPlacements.length < 10
        isLastPlacement = priorPlacements.length === 9
      } else { // role queue
        const placementCountsByRole = {}
        for (const placement of priorPlacements) {
          if (placement.role in placementCountsByRole) {
            placementCountsByRole[placement.role]++
          } else {
            placementCountsByRole[placement.role] = 1
          }
        }
        // definitely logging a placement match because haven't finished placements for any role
        isPlacement = Object.values(placementCountsByRole).every(count => count < 5)
      }
    }

    this.state = {
      latestRank: props.rank || '',
      rank: props.rank || '',
      result: props.result || '',
      comment: props.comment || '',
      map: props.map || '',
      group: props.group || '',
      groupSize: props.groupSize || 1,
      groupMembers: [],
      heroes: props.heroes || '',
      role: props.role || '',
      playedAt,
      dayOfWeek,
      timeOfDay,
      isPlacement,
      isLastPlacement,
      joinedVoice: typeof props.joinedVoice === 'boolean' ? props.joinedVoice : false,
      playOfTheGame: typeof props.playOfTheGame === 'boolean' ? props.playOfTheGame : false,
      allyThrower: typeof props.allyThrower === 'boolean' ? props.allyThrower : false,
      allyLeaver: typeof props.allyLeaver === 'boolean' ? props.allyLeaver : false,
      enemyThrower: typeof props.enemyThrower === 'boolean' ? props.enemyThrower : false,
      enemyLeaver: typeof props.enemyLeaver === 'boolean' ? props.enemyLeaver : false,
      isValid: isMatchValid(props)
    }
  }

  refreshGroupMembers = () => {
    const { accountID, season } = this.props
    const account = new Account({ _id: accountID })

    account.findAllGroupMembers(season).then(groupMembers => {
      this.setState(prevState => ({ groupMembers }))
    })
  }

  componentDidMount() {
    this.refreshGroupMembers()
  }

  componentDidUpdate(prevProps) {
    const isValid = isMatchValid(this.props)

    if (prevProps.accountID !== this.props.accountID) {
      this.refreshGroupMembers()
    }
    if (prevProps.rank !== this.props.rank) {
      this.setState(prevState => ({ rank: this.props.rank, isValid }))
    }
    if (prevProps.latestRank !== this.props.latestRank) {
      this.setState(prevState => ({latestRank: this.props.latestRank, isValid}))
    }
    if (prevProps.isPlacement !== this.props.isPlacement) {
      this.setState(prevState => ({isPlacement: this.props.isPlacement, isValid}))
    }
    if (prevProps.isLastPlacement !== this.props.isLastPlacement) {
      this.setState(prevState => ({isLastPlacement: this.props.isLastPlacement, isValid}))
    }
    if (prevProps.result !== this.props.result) {
      this.setState(prevState => ({ result: this.props.result, isValid }))
    }
    if (prevProps.role !== this.props.role) {
      this.setState(prevState => ({role: this.props.role, isValid}))
    }
    if (prevProps.comment !== this.props.comment) {
      this.setState(prevState => ({ comment: this.props.comment, isValid }))
    }
    if (prevProps.map !== this.props.map) {
      this.setState(prevState => ({ map: this.props.map, isValid }))
    }
    if (prevProps.group !== this.props.group) {
      this.setState(prevState => ({ group: this.props.group, isValid }))
    }
    if (prevProps.heroes !== this.props.heroes) {
      this.setState(prevState => ({ heroes: this.props.heroes, isValid }))
    }
    if (prevProps.playedAt !== this.props.playedAt) {
      this.setState(prevState => ({ playedAt: this.props.playedAt, isValid }))
    }
    if (prevProps.playOfTheGame !== this.props.playOfTheGame) {
      this.setState(prevState => ({ playOfTheGame: this.props.playOfTheGame, isValid }))
    }
    if (prevProps.joinedVoice !== this.props.joinedVoice) {
      this.setState(prevState => ({ joinedVoice: this.props.joinedVoice, isValid }))
    }
    if (prevProps.allyThrower !== this.props.allyThrower) {
      this.setState(prevState => ({ allyThrower: this.props.allyThrower, isValid }))
    }
    if (prevProps.allyLeaver !== this.props.allyLeaver) {
      this.setState(prevState => ({ allyLeaver: this.props.allyLeaver, isValid }))
    }
    if (prevProps.enemyThrower !== this.props.enemyThrower) {
      this.setState(prevState => ({ enemyThrower: this.props.enemyThrower, isValid }))
    }
    if (prevProps.enemyLeaver !== this.props.enemyLeaver) {
      this.setState(prevState => ({ enemyLeaver: this.props.enemyLeaver, isValid }))
    }
  }

  onSubmit = event => {
    event.preventDefault()

    const { rank, comment, map, group, heroes, playedAt, joinedVoice,
            allyThrower, allyLeaver, enemyThrower, enemyLeaver,
            playOfTheGame, result, isValid, groupSize, role, isPlacement } = this.state
    if (!isValid) {
      return
    }

    const { accountID, season, id } = this.props
    const data = {
      comment,
      map,
      group,
      groupSize,
      accountID,
      heroes,
      playedAt,
      allyThrower,
      allyLeaver,
      enemyThrower,
      enemyLeaver,
      playOfTheGame,
      joinedVoice,
      season,
      role,
      isPlacement,
      _id: id,
      result: result === '' ? null : result
    }

    if (typeof rank === 'string' && rank.length > 0) {
      data.rank = parseFloat(rank)
    } else if (typeof rank === 'number') {
      data.rank = rank
    }

    const match = new Match(data)
    match.save().then(() => {
      if (id) {
        this.props.onUpdate()
      } else {
        this.props.onCreate()
      }
    })
  }

  onFormFieldUpdate = () => {
    const data = Object.assign({}, this.props, this.state)
    const isValid = isMatchValid(data)

    if (isValid !== this.state.isValid) {
      this.setState(prevState => ({ isValid }))
    }
  }

  onCommentChange = event => {
    const comment = event.target.value
    this.setState(prevState => ({ comment }), this.onFormFieldUpdate)
  }

  onMapChange = map => {
    this.setState(prevState => ({ map }), this.onFormFieldUpdate)
  }

  onRankChange = event => {
    let rank = event.target.value
    if (rank.length > 0) {
      rank = parseInt(rank, 10)
    }
    this.setState(prevState => ({ rank }), this.onFormFieldUpdate)
  }

  onResultChange = event => {
    const result = event.target.value
    this.setState(prevState => ({ result }), this.onFormFieldUpdate)
  }

  onGroupChange = (group, groupSize) => {
    this.setState(prevState => ({ group, groupSize }), this.onFormFieldUpdate)
  }

  onGroupSizeChange = event => {
    let groupSize = event.target.value
    if (groupSize && groupSize.length > 0) {
      groupSize = parseInt(groupSize, 10)
    }
    this.setState(prevState => ({ groupSize }), this.onFormFieldUpdate)
  }

  onPlayedAtChange = event => {
    let playedAt = event.target.value
    if (playedAt && playedAt.length > 0) {
      playedAt = new Date(playedAt)
    }
    const dayOfWeek = DayTimeApproximator.dayOfWeek(playedAt)
    const timeOfDay = DayTimeApproximator.timeOfDay(playedAt)

    this.setState(prevState => ({ playedAt, dayOfWeek, timeOfDay }),
                  this.onFormFieldUpdate)
  }

  onDayOfWeekTimeOfDayChange = event => {
    const dayOfWeekTimeOfDay = event.target.value
    if (dayOfWeekTimeOfDay.indexOf('-') < 0) {
      this.setState(prevState => ({ dayOfWeek: null, timeOfDay: null }),
                    this.onFormFieldUpdate)
      return
    }

    const parts = dayOfWeekTimeOfDay.split('-')
    const dayOfWeek = parts[0]
    const timeOfDay = parts[1]

    this.setState(prevState => {
      const newState = { dayOfWeek, timeOfDay }
      if (prevState.dayOfWeek !== dayOfWeek ||
          prevState.timeOfDay !== timeOfDay) {
        newState.playedAt = null
      }
      return newState
    }, this.onFormFieldUpdate)
  }

  changeHeroesString = (heroesStr, hero, isSelected) => {
    const heroes = explodeHeroesString(heroesStr)
    const heroIndex = heroes.indexOf(hero)
    if (isSelected && heroIndex < 0) {
      heroes.push(hero)
    }
    if (!isSelected && heroIndex > -1) {
      delete heroes[heroIndex]
    }
    return heroes.join(', ')
  }

  getPriorPlacementsInRole = role => {
    return this.props.priorMatches.filter(m => m.role === role && m.isPlacement)
  }

  getLatestRankInRole = role => {
    const priorMatchesInRole = this.props.priorMatches
      .filter(m => m.role === role && typeof m.rank === 'number')
    const latestMatchInRole = priorMatchesInRole[priorMatchesInRole.length - 1]

    if (latestMatchInRole) {
      return latestMatchInRole.rank
    }

    return ''
  }

  onRoleChange = (role) => {
    const { season } = this.props

    this.setState(prevState => {
      const heroesInRole = Hero.byRole[role]
      const oldSelectedHeroes = explodeHeroesString(prevState.heroes)
      const selectedHeroes = oldSelectedHeroes
        .filter(hero => heroesInRole.indexOf(hero) > -1)
      const priorPlacementMatchesInRole = this.getPriorPlacementsInRole(role)
      const newState = { role, heroes: selectedHeroes.join(', ') }

      if (season >= roleQueueSeasonStart) {
        if (priorPlacementMatchesInRole.length < 5) {
          newState.isPlacement = true
          newState.isLastPlacement = priorPlacementMatchesInRole.length === 4
        } else {
          newState.isPlacement = false
          newState.isLastPlacement = false
        }

        newState.latestRank = this.getLatestRankInRole(role)
      }

      return newState
    }, this.onFormFieldUpdate)
  }

  onHeroChange = (hero, isSelected) => {
    this.setState(prevState => {
      const newState = {
        heroes: this.changeHeroesString(prevState.heroes, hero, isSelected)
      }
      const { season } = this.props

      if (season >= roleQueueSeasonStart) {
        if (isSelected && (prevState.role !== 'string' || prevState.role.length < 1)) {
          newState.role = roleForHero(hero)

          const priorPlacementMatchesInRole = this.getPriorPlacementsInRole(newState.role)
          if (priorPlacementMatchesInRole.length < 5) {
            newState.isPlacement = true
            newState.isLastPlacement = priorPlacementMatchesInRole.length === 4
          } else {
            newState.isPlacement = false
            newState.isLastPlacement = false
          }

          const latestRank = this.getLatestRankInRole(newState.role)
          if (typeof latestRank === 'number') {
            newState.latestRank = latestRank
          }
        } else if (!isSelected && newState.heroes.length < 1) {
          newState.role = null
          newState.isLastPlacement = false
          newState.latestRank = ''
        }
      } else {
        newState.role = null
      }

      return newState
    }, this.onFormFieldUpdate)
  }

  onAllyThrowerChange = event => {
    const allyThrower = event.target.checked
    this.setState(prevState => ({ allyThrower }), this.onFormFieldUpdate)
  }

  onAllyLeaverChange = event => {
    const allyLeaver = event.target.checked
    this.setState(prevState => ({ allyLeaver }), this.onFormFieldUpdate)
  }

  onEnemyThrowerChange = event => {
    const enemyThrower = event.target.checked
    this.setState(prevState => ({ enemyThrower }), this.onFormFieldUpdate)
  }

  onEnemyLeaverChange = event => {
    const enemyLeaver = event.target.checked
    this.setState(prevState => ({ enemyLeaver }), this.onFormFieldUpdate)
  }

  onPlayOfTheGameChange = event => {
    const playOfTheGame = event.target.checked
    this.setState(prevState => ({ playOfTheGame }), this.onFormFieldUpdate)
  }

  onJoinedVoiceChange = event => {
    const joinedVoice = event.target.checked
    this.setState(prevState => ({ joinedVoice }), this.onFormFieldUpdate)
  }

  render() {
    const { rank, comment, map, group, heroes, playedAt, groupSize, joinedVoice,
            allyThrower, allyLeaver, enemyThrower, enemyLeaver, groupMembers,
            playOfTheGame, result, isValid, dayOfWeek, timeOfDay, role,
            isPlacement, isLastPlacement, latestRank } = this.state
    const { season, latestGroup, theme } = this.props
    let playedAtStr = playedAt
    if (playedAt && typeof playedAt === 'object') {
      playedAtStr = dateTimeStrFrom(playedAt)
    } else {
      playedAtStr = ''
    }
    const dayOfWeekTimeOfDay = `${dayOfWeek}-${timeOfDay}`

    return (
      <form
        onSubmit={this.onSubmit}
        className="mb-4"
      >
        <div className="clearfix">
          <div className="col-md-12 col-lg-6 float-left pr-3-lg">
            {season >= roleQueueSeasonStart && (
              <div className="form-group mt-0">
                <span className="text-bold mr-4">Role played:</span>
                <RoleSelect
                  role={role}
                  season={season}
                  theme={theme}
                  onChange={this.onRoleChange}
                />
              </div>
            )}
            <div className="d-flex-md mb-2 flex-items-center-md flex-justify-between-md">
              <div className="form-group my-0 d-flex flex-items-center">
                {isPlacement ? (
                  <label
                    htmlFor="match-result"
                    className="label-lg mr-2 no-wrap"
                  >Placement match result:</label>
                ) : (
                  <label
                    htmlFor="match-rank"
                    className="label-lg mr-2 no-wrap"
                  >New SR:</label>
                )}
                {isPlacement ? (
                  <select
                    className="form-select select-lg"
                    value={result}
                    required
                    id="match-result"
                    autoFocus
                    onChange={this.onResultChange}
                  >
                    <option value=""></option>
                    <option value="win">Win</option>
                    <option value="loss">Loss</option>
                    <option value="draw">Draw</option>
                  </select>
                ) : (
                  <input
                    id="match-rank"
                    type="number"
                    required
                    className="form-control sr-field"
                    value={rank}
                    onChange={this.onRankChange}
                    placeholder={latestRank}
                    autoFocus
                  />
                )}
              </div>
              <dl className="form-group my-0 ml-4">
                <dt>
                  <label
                    htmlFor="match-map"
                  >
                    <span className="ion ion-md-pin mr-1" />
                    Map:
                  </label>
                </dt>
                <dd>
                  <MapSelect map={map} onChange={this.onMapChange} />
                </dd>
              </dl>
            </div>
            {isPlacement && isLastPlacement ? (
              <dl className="form-group mt-0">
                <dt>
                  <label
                    htmlFor="match-rank"
                    className="sr-field-label"
                  >
                    {role && season >= roleQueueSeasonStart ? `Where did you place as a ${role}?` : 'Where did you place?'}
                  </label>
                </dt>
                <dd>
                  <input
                    id="match-rank"
                    type="number"
                    className="form-control sr-field"
                    value={rank}
                    onChange={this.onRankChange}
                    placeholder={latestRank}
                  />
                </dd>
              </dl>
            ) : ''}
            <dl className="form-group mt-0">
              <dt>
                <label
                  htmlFor="match-comment"
                >
                  <span className="ion ion-md-list mr-1" />
                  Comment:
                </label>
              </dt>
              <dd>
                <input
                  id="match-comment"
                  type="text"
                  className="form-control width-full"
                  value={comment}
                  onChange={this.onCommentChange}
                  placeholder="Notes about this game"
                />
              </dd>
            </dl>
            <fieldset className="Box pt-2 pb-3 px-3">
              <legend className="h5">
                <span className="ion ion-md-people mr-1" />
                Your group
              </legend>
              <GroupMembersField
                group={group}
                groupMembers={groupMembers}
                onGroupChange={this.onGroupChange}
                latestGroup={latestGroup}
              />
              <dl className="form-group mb-0">
                <dt>
                  <label
                    htmlFor="match-group-size"
                  >How many people did you queue with?</label>
                </dt>
                <dd>
                  <select
                    id="match-group-size"
                    className="form-select"
                    value={groupSize}
                    onChange={this.onGroupSizeChange}
                  >
                    <option value="1">Nobody (solo queue)</option>
                    <option value="2">1 other person</option>
                    <option value="3">2 other people</option>
                    <option value="4">3 other people</option>
                    <option value="5">4 other people</option>
                    <option value="6">5 other people (6-stack)</option>
                  </select>
                </dd>
              </dl>
            </fieldset>
            <div className="d-flex">
              <div className="form-checkbox mr-4">
                <label>
                  <input
                    type="checkbox"
                    checked={playOfTheGame}
                    onChange={this.onPlayOfTheGameChange}
                  />
                  <span className="ion ion-md-trophy mr-1" />
                  Play of the game
                </label>
                <p className="note">Did you get play of the game?</p>
              </div>
              <div className="form-checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={joinedVoice}
                    onChange={this.onJoinedVoiceChange}
                  />
                  <span className="ion ion-md-mic mr-1" />
                  Joined voice chat
                </label>
                <p className="note">Did you join voice chat?</p>
              </div>
            </div>
            <div className="mb-3">
              <div className="text-bold">
                Did anyone try to lose or leave the game early?
              </div>
              <div className="float-left col-lg-4 col-md-5">
                <div className="form-checkbox mr-4 mb-0 mt-1">
                  <label className="text-normal no-wrap text-ally">
                    <input
                      type="checkbox"
                      checked={allyThrower}
                      onChange={this.onAllyThrowerChange}
                    />
                    Thrower on my team
                  </label>
                </div>
                <div className="form-checkbox mr-4 my-1">
                  <label className="text-normal no-wrap text-ally">
                    <input
                      type="checkbox"
                      checked={allyLeaver}
                      onChange={this.onAllyLeaverChange}
                    />
                    Leaver on my team
                  </label>
                </div>
              </div>
              <div className="float-left col-lg-5 col-md-7">
                <div className="form-checkbox mb-0 mt-1">
                  <label className="text-normal no-wrap text-enemy">
                    <input
                      type="checkbox"
                      checked={enemyThrower}
                      onChange={this.onEnemyThrowerChange}
                    />
                    Thrower on the enemy team
                  </label>
                </div>
                <div className="form-checkbox my-1">
                  <label className="text-normal no-wrap text-enemy">
                    <input
                      type="checkbox"
                      checked={enemyLeaver}
                      onChange={this.onEnemyLeaverChange}
                    />
                    Leaver on the enemy team
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-6 float-right pl-3-lg">
            <dl className="form-group my-0">
              <dt className="text-bold">Heroes played:</dt>
              <dd>
                <HeroSelect
                  role={role}
                  theme={theme}
                  heroes={heroes}
                  season={season}
                  onToggle={this.onHeroChange}
                />
              </dd>
            </dl>
            <dl className="form-group mt-0">
              <dt>
                <label
                  className="f6"
                  htmlFor="match-played-at"
                >
                  <span className="ion ion-md-time mr-1" />
                  When did you play?
                </label>
              </dt>
              <dd>
                <input
                  id="match-played-at"
                  type="datetime-local"
                  className="input-sm form-control datetime-local-control"
                  value={playedAtStr}
                  onChange={this.onPlayedAtChange}
                />
                {dayOfWeek && timeOfDay ? (
                  <span className="d-inline-block ml-2">
                    <DayOfWeekEmoji dayOfWeek={dayOfWeek} /> <TimeOfDayEmoji timeOfDay={timeOfDay} />
                  </span>
                ) : null}
                <select
                  className="input-sm form-select ml-2"
                  value={dayOfWeekTimeOfDay}
                  aria-label="When did you generally play the game?"
                  onChange={this.onDayOfWeekTimeOfDayChange}
                >
                  <option value="">Choose a day and time</option>
                  <option value="weekday-morning">Weekday morning</option>
                  <option value="weekday-afternoon">Weekday afternoon</option>
                  <option value="weekday-evening">Weekday evening</option>
                  <option value="weekday-night">Weekday night</option>
                  <option value="weekend-morning">Weekend morning</option>
                  <option value="weekend-afternoon">Weekend afternoon</option>
                  <option value="weekend-evening">Weekend evening</option>
                  <option value="weekend-night">Weekend night</option>
                </select>
              </dd>
            </dl>
          </div>
        </div>
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary btn-large"
            disabled={!isValid}
          >Save match</button>
        </div>
      </form>
    )
  }
}

export default MatchForm
