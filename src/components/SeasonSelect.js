import React, { Component } from 'react'
import enhanceWithClickOutside from 'react-click-outside'

const getSeasonsList = (latestSeason) => {
  const seasons = []
  for (let season = latestSeason; season >= 1; season--) {
    seasons.push(season)
  }
  return seasons
}

class SeasonSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      seasons: getSeasonsList(props.latestSeason)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.latestSeason !== this.props.latestSeason) {
      this.setState(prevState => ({ seasons: getSeasonsList(this.props.latestSeason) }))
    }
  }

  containerClass = () => {
    const classes = ['select-menu', 'd-inline-block']
    if (this.state.isOpen) {
      classes.push('active')
    }
    return classes.join(' ')
  }

  toggleButtonClass = () => {
    const classes = ['btn', 'select-menu-button']
    if (this.state.isOpen) {
      classes.push('selected')
    }
    return classes.join(' ')
  }

  toggleOpen = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }))
  }

  onToggleButtonClick = event => {
    event.target.blur()
    this.toggleOpen()
  }

  handleClickOutside() {
    if (this.state.isOpen) {
      this.toggleOpen()
    }
  }

  seasonButtonClass = season => {
    const classes = ['select-menu-item', 'text-left', 'width-full', 'btn-link']
    if (this.props.activeSeason === season) {
      classes.push('selected')
    }
    return classes.join(' ')
  }

  onChange = event => {
    const button = event.currentTarget
    const season = parseInt(button.value, 10)

    button.blur()
    this.props.onChange(season)
    this.setState(prevState => ({ isOpen: false }))
  }

  manageSeasons = event => {
    this.setState(prevState => ({ isOpen: false }))
    this.props.onPageChange(event)
  }

  render() {
    const { activeSeason } = this.props
    const { seasons } = this.state

    return (
      <div className="mr-2">
        <div className={this.containerClass()}>
          <button
            className={this.toggleButtonClass()}
            type="button"
            onClick={this.onToggleButtonClick}
            aria-haspopup="true"
            aria-expanded="false"
          >Season {activeSeason}</button>
          <div className="select-menu-modal-holder">
            <div className="select-menu-modal">
              <div className="select-menu-list">
                {seasons.map(season => (
                  <button
                    className={this.seasonButtonClass(season)}
                    key={season}
                    type="button"
                    value={season}
                    onClick={this.onChange}
                  >
                    <span className="ion ion-ios-checkmark select-menu-item-icon" />
                    <span className="select-menu-item-text">Season {season}</span>
                  </button>
                ))}
                <button
                  className="select-menu-item text-bold text-left width-full btn-link"
                  type="button"
                  name="manage-seasons"
                  onClick={this.manageSeasons}
                >
                  <span className="ion ion-ios-checkmark select-menu-item-icon" />
                  <span className="select-menu-item-text">Manage seasons</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default enhanceWithClickOutside(SeasonSelect)
