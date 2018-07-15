const net = require('net')
const port = process.env.PORT ? (process.env.PORT - 100) : 3000

process.env.ELECTRON_START_URL = `http://localhost:${port}`

const client = new net.Socket()

let startedElectron = false
const tryConnection = () => client.connect({ port }, () => {
  client.end()

  if (!startedElectron) {
    console.log('Starting Electron...')
    startedElectron = true
    const { exec } = require('child_process')

    exec('npm run electron', (err, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        return
      }
      console.log(`stdout: ${stdout}`)
      console.log(`stderr: ${stderr}`)
    })
  }
})

tryConnection()

client.on('error', (error) => {
  setTimeout(tryConnection, 1000)
})
