class DayTimeApproximator {
  static dayOfWeek(date) {
    if (typeof date === 'string') {
      date = new Date(date)
    }
    const day = date.getDay()

    if (day === 0 || day === 6) { // Sunday and Saturday
      return 'weekend'
    }

    return 'weekday'
  }

  static timeOfDay(date) {
    if (typeof date === 'string') {
      date = new Date(date)
    }
    const hours = date.getHours()

    if (hours >= 5 && hours < 12) {
      return 'morning'
    }

    if (hours >= 12 && hours < 17) {
      return 'afternoon'
    }

    if (hours >= 17 && hours < 21) {
      return 'evening'
    }

    return 'night'
  }
}

export default DayTimeApproximator
