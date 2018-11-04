---
layout: default
---

<p class="mb-4">
  <a href="{{ "/" | relative_url }}">&larr; Back to home page</a>
</p>

<div class="clearfix">
  <div class="col-md-5 float-left">
    <h2 class="h3 mb-2 text-normal">Tutorial video for the web app</h2>
    <iframe class="d-block mb-2" width="340" height="191" src="https://www.youtube.com/embed/_y-MtPEsxDg?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    <p class="note">
      Thanks to my buddy Rob for making this video showing how to use
      Competiwatch. &hearts;
    </p>
  </div>
  <div class="col-md-7 float-left">
    <h2 class="h3 mb-2 text-normal">Something not working?</h2>
    <p>
      If something isn't working, please
      <a target="_blank" rel="noopener noreferrer" href="{{ site.app_repo_url }}/issues">open an issue</a> and specify what version of the
      app you're using and in what operating system.
    </p>

    <hr>

    <h2 class="h3 mb-2 text-normal">F.A.Q.</h2>
    <dl class="mr-4-md">
      <dt class="mb-1">Will I get banned for using Competiwatch?</dt>
      <dd class="mb-4">
        I really don't think so. Competiwatch does not hook into Overwatch when it runs.
        Running the Competiwatch desktop app while you play is akin to running a browser,
        or Notepad. It's just another program, and it doesn't do anything with Overwatch
        for you. It's all manual data entry done by you.
      </dd>
      <dt class="mb-1">Does Competiwatch log my matches for me?</dt>
      <dd class="mb-4">
        No. You have to manually enter data after your games in order to see
        trends and other data about your competitive season. You might be interested
        in <a target="_blank" rel="noopener noreferrer" href="https://overtrack.gg/">OverTrack</a> if you want automated tracking.
      </dd>
      <dt class="mb-1">How much data do I have to enter when logging matches?</dt>
      <dd class="mb-4">
        <p>If you choose to log your placement matches individually, the result of the match
        (win/loss/draw) is required. If you want to skip logging placements and only log
        your starting SR, that SR is required. For regular matches, only your new SR is
        required.</p>
        All other fields, like the map, heroes you played, and friends you grouped
        with, are optional. However, if you don't fill in a field, you won't see trends
        about it. For example, if you never log the map you played on, you won't see a
        chart of win percentage by map.
      </dd>
      <dt class="mb-1">Where do I get CSV files to import match data?</dt>
      <dd class="mb-4">
        If you've been logging your competitive matches in a spreadsheet with a tool
        like Excel or Google Sheets, you can produce a CSV (comma-separated value) file
        of the data you've already logged. Then you can import this CSV file into
        Competiwatch so you don't have to manually re-enter all those matches.
      </dd>
      <dt class="mb-1">How much does it cost to use Competiwatch?</dt>
      <dd class="mb-4">
        It's free! 🎉 See <a href="{{ "/about" | relative_url }}">the about page</a> for
        more information, but Competiwatch is my hobby project.
      </dd>
    </dl>
  </div>
</div>
