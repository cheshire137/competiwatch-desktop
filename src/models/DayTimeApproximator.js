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

    if (hours >= 10 && hours < 17) { // 5a - 11:59a Central
      return 'morning'
    }

    if (hours >= 17 && hours < 22) { // 12p - 4:59p Central
      return 'afternoon'
    }

    if (hours >= 22 || hours < 2) { // 5p - 8:59p Central
      return 'evening'
    }

    return 'night'
  }
}

export default DayTimeApproximator
