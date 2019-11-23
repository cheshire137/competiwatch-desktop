import PackageInfo from '../../package.json';

const baseUrl = 'https://api.github.com';

type VersionInfo = {
  version: string;
  url: string;
};

class GithubApi {
  static async latestVersion(): Promise<VersionInfo> {
    const repoName = new URL(PackageInfo.repository.url).pathname.replace(/^\//, '')
    const releasesUrl = `${baseUrl}/repos/${repoName}/releases/latest`
    const response = await window.fetch(releasesUrl)
    if (!response.ok) {
      throw Error(`failed to get latest release: ${response.status} ${response.statusText}`)
    }
    const json = await response.json()
    const { name, html_url } = json;
    return { version: name, url: html_url };
  }
}

export default GithubApi;
