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

    if (hours >= 6 && hours < 12) { // 5a - 11:59a Central
      return 'morning'
    }

    else if (hours >= 12 && hours < 18) { // 12p - 4:59p Central
      return 'afternoon'
    }

    else if (hours >= 18 && hours < 22) { // 5p - 8:59p Central
      return 'evening'
    }
    else{
      return 'night'
    }
  }
}

export default DayTimeApproximator
