const maxTimeWaited = 2000 // ms
const delay = 500 // ms

class TestHelpers {
  static waitForStateProperty(wrapper, propToBePresent) {
    return new Promise((resolve, reject) => {
      let timeWaited = 0
      let interval = null

      const checkState = () => {
        const state = wrapper.state()
        if (state[propToBePresent]) {
          clearInterval(interval)
          wrapper.update()
          resolve()
        } else {
          timeWaited = timeWaited + delay
          if (timeWaited > maxTimeWaited) {
            console.error('waited too long for', propToBePresent, 'in', state)
            clearInterval(interval)
            reject()
          }
        }
      }

      interval = setInterval(checkState, delay)
    })
  }
}

export default TestHelpers
