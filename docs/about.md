---
layout: default
---

<div class="col-md-10 mx-auto mb-4">
  <p class="mb-4">
    <a href="{{ "/" | relative_url }}">&larr; Back to home page</a>
  </p>

  <h2 class="h2 mb-2">About Competiwatch</h2>
  <div class="clearfix">
    <div class="col-md-6 float-left">
      <div class="mr-4-md">
        <p>
          I built Competiwatch because I got tired of tracking my games in Google
          Sheets each competitive season. I wanted to add a new chart to my usual spreadsheet
          template and it was a pain because that's the nature of spreadsheets.
        </p>
        <p>
          Competiwatch started as a
          <a href="https://github.com/cheshire137/competiwatch">web app</a>
          that I hosted at my own expense. I wanted to
          use it myself and share it with friends, but I realized others wanted such a tool.
          Rather than host it forever or start charging users, I opted to rebuild it as a
          <a href="{{ site.app_repo_url }}">desktop app</a>
          you run on your computer.
        </p>
        <p>
          &mdash; <a href="https://github.com/cheshire137">Sarah</a>
        </p>
      </div>
    </div>
    <div class="col-md-6 float-left">
      <div class="ml-4-md">
        <p>
          The desktop app was built using <a href="https://electronjs.org/">Electron</a>,
          <a href="https://reactjs.org/">React</a>,
          <a href="https://primer.github.io/">Primer</a>,
          <a href="http://www.chartjs.org/">Chart.js</a>,
          and <a href="{{ site.app_repo_url }}/blob/master/package.json">many other libraries</a>.
        </p>
        <p>
          <a href="{{ site.app_repo_url }}">View source</a> (MIT license)
          <span class="d-inline-block mx-2">&middot;</span>
          <a href="{{ site.app_repo_url }}/issues">Report a bug</a>
        </p>
      </div>
    </div>
  </div>
</div>

<hr>

<div class="col-md-10 mt-4 pt-3 mx-auto">
  <div class="clearfix">
    <div class="col-md-6 float-left">
      <h2 class="h2 mb-2">Privacy</h2>
      <p>
        Data logged in the desktop app I do not have access to. Your data is stored on your computer.
      </p>
    </div>
    <div class="col-md-6 mb-4 float-left">
      <div class="ml-4-md">
        <h2 class="h2 mb-2">Disclaimer</h2>
        <p>
          The app is a hobby of mine. Stuff may break. It's provided
          "as is", without warranty, because I hope others will
          find it useful, but I make no guarantees. See also the
          <a href="{{ site.app_repo_url }}/blob/master/LICENSE.txt">source code license</a>.
        </p>
      </div>
    </div>
  </div>
</div>
