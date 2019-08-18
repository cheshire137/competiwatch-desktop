class DateUtil {
  static dateStrFrom(date: Date): string {
    const year = date.getFullYear()
    const monthNum = date.getMonth() + 1
    let month = monthNum.toString()
    if (monthNum <= 9) {
      month = `0${month}`
    }
    const dayNum = date.getDate()
    let day = dayNum.toString()
    if (dayNum <= 9) {
      day = `0${day}`
    }
    return `${year}-${month}-${day}`
  }
}

export default DateUtil
