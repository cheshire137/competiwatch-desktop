class DateUtil {
  static dateStrFrom(date) {
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    if (month <= 9) {
      month = `0${month}`
    }
    let day = date.getDate()
    if (day <= 9) {
      day = `0${day}`
    }
    return `${year}-${month}-${day}`
  }
}

export default DateUtil
