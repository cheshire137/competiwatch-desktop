import React, { Component } from 'react'
import Match from '../models/Match'
import DayTimeApproximator from '../models/DayTimeApproximator'
import MapSelect from './MapSelect'
import HeroSelect from './HeroSelect'
import TimeOfDayEmoji from './TimeOfDayEmoji'
import DayOfWeekEmoji from './DayOfWeekEmoji'
import './MatchForm.css'

const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.substr(1)
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

const isMatchValid = data => {
  if (typeof data.rank !== 'number' ||
      data.rank < minRank ||
      data.rank > maxRank) {
    return false
  }

  if (data.isPlacement && !data.result) {
    return false
  }

  if (data.groupSize && data.groupSize > maxGroupSize) {
    return false
  }

  if (data.group && data.group.split(',').length > maxGroupSize) {
    return false
  }

  return true
}

class MatchForm extends Component {
  constructor(props) {
    super(props)

    let playedAt = props.playedAt
    if (!props.id && !playedAt) {
      playedAt = new Date()
    }

    this.state = {
      rank: props.rank || '',
      result: props.result || '',
      comment: props.comment || '',
      map: props.map || '',
      group: props.group || '',
      groupSize: props.groupSize || 1,
      heroes: props.heroes || '',
      playedAt,
      playOfTheGame: typeof props.playOfTheGame === 'boolean' ? props.playOfTheGame : false,
      allyThrower: typeof props.allyThrower === 'boolean' ? props.allyThrower : false,
      allyLeaver: typeof props.allyLeaver === 'boolean' ? props.allyLeaver : false,
      enemyThrower: typeof props.enemyThrower === 'boolean' ? props.enemyThrower : false,
      enemyLeaver: typeof props.enemyLeaver === 'boolean' ? props.enemyLeaver : false,
      isValid: isMatchValid(props)
    }
  }

  componentDidUpdate(prevProps) {
    const isValid = isMatchValid(this.props)
    if (prevProps.rank !== this.props.rank) {
      this.setState(prevState => ({ rank: this.props.rank, isValid }))
    }
    if (prevProps.result !== this.props.result) {
      this.setState(prevState => ({ result: this.props.result, isValid }))
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
    const { rank, comment, map, group, heroes, playedAt,
            allyThrower, allyLeaver, enemyThrower, enemyLeaver,
            playOfTheGame, result, isValid, groupSize } = this.state
    if (!isValid) {
      return
    }

    const { accountID, db, season, isPlacement, id } = this.props
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
      season,
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
    match.save(db).then(() => {
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

  onGroupChange = event => {
    const group = event.target.value
    let groupSize = 1
    if (group) {
      const validGroupMembers = group.split(',').filter(member => member.trim().length > 0)
      groupSize = validGroupMembers.length + 1
    }
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
    const playedAt = event.target.value
    this.setState(prevState => ({ playedAt }), this.onFormFieldUpdate)
  }

  onHeroChange = (hero, isSelected) => {
    this.setState(prevState => {
      const heroes = prevState.heroes.split(',')
        .map(str => str.trim())
        .filter(str => str && str.length > 0)
      const heroIndex = heroes.indexOf(hero)
      if (isSelected && heroIndex < 0) {
        heroes.push(hero)
      }
      if (!isSelected && heroIndex > -1) {
        delete heroes[heroIndex]
      }
      return { heroes: heroes.join(', ') }
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

  render() {
    const { rank, comment, map, group, heroes, playedAt, groupSize,
            allyThrower, allyLeaver, enemyThrower, enemyLeaver,
            playOfTheGame, result, isValid } = this.state
    const { season, latestRank, isPlacement, isLastPlacement } = this.props
    let dayOfWeek = null
    let timeOfDay = null
    if (playedAt) {
      dayOfWeek = DayTimeApproximator.dayOfWeek(playedAt)
      timeOfDay = DayTimeApproximator.timeOfDay(playedAt)
    }
    let playedAtStr = playedAt
    if (typeof playedAt === 'object') {
      playedAtStr = dateTimeStrFrom(playedAt)
    }

    return (
      <form
        onSubmit={this.onSubmit}
        className="mb-4"
      >
        <div className="clearfix">
          <div className="col-md-12 col-lg-5 float-left pr-3-md">
            <div className="d-flex-md mb-2 flex-items-center-md flex-justify-between-md">
              <div className="form-group my-0 d-flex flex-items-center">
                {isPlacement ? (
                  <label
                    htmlFor="match-result"
                    className="label-lg mr-2 no-wrap"
                  >Match result:</label>
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
                  >Map:</label>
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
                  >Where did you place?</label>
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
                >Comment:</label>
              </dt>
              <dd>
                <input
                  id="match-comment"
                  type="text"
                  className="form-control"
                  value={comment}
                  onChange={this.onCommentChange}
                  placeholder="Notes about this game"
                />
              </dd>
            </dl>
            <fieldset className="Box pt-2 pb-3 px-3">
              <legend className="h5">Your group</legend>
              <dl className="form-group mt-0">
                <dt>
                  <label
                    htmlFor="match-group"
                  >Group members:</label>
                </dt>
                <dd>
                  <input
                    id="match-group"
                    type="text"
                    className="form-control"
                    value={group}
                    onChange={this.onGroupChange}
                    placeholder="Separate names with commas"
                  />
                  <p className="note">
                    List friends you grouped with.
                  </p>
                </dd>
              </dl>
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
            <dl className="form-group">
              <dt>
                <label
                  htmlFor="match-played-at"
                >Date played:</label>
              </dt>
              <dd>
                <input
                  id="match-played-at"
                  type="datetime-local"
                  className="form-control"
                  value={playedAtStr}
                  onChange={this.onPlayedAtChange}
                />
              </dd>
              {playedAt ? (
                <p className="note">
                  <DayOfWeekEmoji dayOfWeek={dayOfWeek} />
                  <span> </span>
                  <TimeOfDayEmoji timeOfDay={timeOfDay} />
                  <span> </span>
                  {capitalize(dayOfWeek)}
                  <span> </span>
                  {timeOfDay}
                </p>
              ) : null}
            </dl>
            <div className="form-checkbox mr-4 my-1">
              <label>
                <input
                  type="checkbox"
                  checked={playOfTheGame}
                  onChange={this.onPlayOfTheGameChange}
                />
                Play of the game
              </label>
              <p className="note">Did you get play of the game in this match?</p>
            </div>
          </div>
          <div className="col-md-12 col-lg-6 float-right">
            <dl className="form-group my-0">
              <dt className="text-bold">Heroes played:</dt>
              <dd>
                <HeroSelect
                  heroes={heroes}
                  season={season}
                  onToggle={this.onHeroChange}
                />
              </dd>
            </dl>
          </div>
        </div>
        <div className="mb-3">
          <div className="text-bold mb-2">
            Did anyone try to lose or leave the game early?
          </div>
          <div className="d-flex flex-wrap">
            <div className="rounded-2 border bg-gray-light d-flex mr-4 px-2">
              <div className="form-checkbox mr-4 my-1">
                <label className="text-normal text-ally">
                  <input
                    type="checkbox"
                    checked={allyThrower}
                    onChange={this.onAllyThrowerChange}
                  />
                  Thrower on my team
                </label>
              </div>
              <div className="form-checkbox my-1">
                <label className="text-normal text-enemy">
                  <input
                    type="checkbox"
                    checked={enemyThrower}
                    onChange={this.onEnemyThrowerChange}
                  />
                  Thrower on the enemy team
                </label>
              </div>
            </div>
            <div className="rounded-2 border bg-gray-light d-flex px-2">
              <div className="form-checkbox mr-4 my-1">
                <label className="text-normal text-ally">
                  <input
                    type="checkbox"
                    checked={allyLeaver}
                    onChange={this.onAllyLeaverChange}
                  />
                  Leaver on my team
                </label>
              </div>
              <div className="form-checkbox my-1">
                <label className="text-normal text-enemy">
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
