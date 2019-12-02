const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')
const PackageInfo = require('../../package.json')

function getInstallerConfig() {
  const rootPath = path.resolve('./')
  const outPath = path.join(rootPath, 'dist')
  const outputDirectory = path.join(outPath, 'installers')
  console.log('creating Windows installer in', outputDirectory)

  return Promise.resolve({
    appDirectory: path.join(outPath, `${PackageInfo.name}-win32-x64/`),
    authors: PackageInfo.author.name,
    noMsi: true,
    outputDirectory: outputDirectory,
    exe: 'Competiwatch.exe',
    setupExe: `Competiwatch-${PackageInfo.version}-Installer.exe`,
    setupIcon: path.join(rootPath, 'icon-files', 'win', 'icon.ico'),
    iconUrl: "https://github.com/cheshire137/competiwatch-desktop/raw/master/icon-files/win/icon.ico"
  })
}

getInstallerConfig().then(createWindowsInstaller).catch((error) => {
  console.error(error.message || error)
  process.exit(1)
})
