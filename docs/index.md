---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
---

<div class="clearfix mb-4 pb-4">
  <div class="col-md-7 f4 float-md-left text-center mb-4-sm">
    <h2 class="h2 mb-2 text-normal">Match tracker for competitive Overwatch</h2>
    <div class="mx-auto col-md-10">
      <p>
        Track your games across competitive seasons and alt accounts.
        <span class="no-wrap">View charts</span> of your performance, import
        past seasons, <span class="no-wrap">and export your data.</span>
      </p>
      Log matches yourself, Competiwatch does not hook into Overwatch.
    </div>
  </div>
  <div class="col-md-5 float-md-left text-center">
    <p>
      <a class="btn-primary btn-large h2 btn" href="{{ site.app_repo_url }}/releases/latest">Download the app</a>
    </p>
    <span class="text-small text-gray">For Windows PC</span>
  </div>
</div>

<div class="carousel border rounded-2 js-carousel">
  <div class="carousel-image anim-fade-in text-center active screenshot-1">
    <img src="{{ "/assets/match-history.png" | relative_url }}" class="d-inline-block img-responsive" alt="Match history">
    <div class="pt-2 text-gray">
      Track your match history across multiple seasons and Battle.net accounts
    </div>
  </div>
  <div class="carousel-image anim-fade-in text-center screenshot-2">
    <img src="{{ "/assets/trends.png" | relative_url }}" class="d-inline-block img-responsive" alt="View statistics about your games">
    <div class="pt-2 text-gray">
      Visualize how your season is going
    </div>
  </div>
  <div class="carousel-image anim-fade-in text-center screenshot-3">
    <img src="{{ "/assets/log-match.png" | relative_url }}" class="d-inline-block img-responsive" alt="Log a match">
    <div class="pt-2 text-gray">
      Log as much detail per match as you want
    </div>
  </div>
  <div class="carousel-image anim-fade-in text-center screenshot-4">
    <img src="{{ "/assets/accounts.png" | relative_url }}" class="d-inline-block img-responsive" alt="Track games across different Battle.net accounts">
    <div class="pt-2 text-gray">
      Track your matches across alt accounts
    </div>
  </div>
  <div class="carousel-image anim-fade-in text-center screenshot-5">
    <img src="{{ "/assets/import.png" | relative_url }}" class="d-inline-block img-responsive" alt="Import matches from a CSV file">
    <div class="pt-2 text-gray">
      Import matches from a CSV file
    </div>
  </div>

  <div class="carousel-nav border-top d-flex flex-items-stretch flex-justify-between">
    <button aria-label="Match history" type="button" class="border-right carousel-nav-item active tooltipped tooltipped-n js-carousel-nav-item" data-target="screenshot-1">
      <img src="{{ "/assets/match-history.png" | relative_url }}" class="img-responsive" alt="Match history thumbnail">
    </button>
    <button aria-label="Trends" type="button" class="border-right carousel-nav-item tooltipped tooltipped-n js-carousel-nav-item" data-target="screenshot-2">
      <img src="{{ "/assets/trends-thumb.png" | relative_url }}" class="img-responsive" alt="Trends thumbnail">
    </button>
    <button aria-label="Log a match" type="button" class="border-right carousel-nav-item tooltipped tooltipped-n js-carousel-nav-item" data-target="screenshot-3">
      <img src="{{ "/assets/log-match-thumb.png" | relative_url }}" class="img-responsive" alt="Log a match thumbnail">
    </button>
    <button aria-label="Accounts" type="button" class="border-right carousel-nav-item tooltipped tooltipped-n js-carousel-nav-item" data-target="screenshot-4">
      <img src="{{ "/assets/accounts-thumb.png" | relative_url }}" class="img-responsive" alt="Accounts thumbnail">
    </button>
    <button aria-label="Import matches" type="button" class="carousel-nav-item tooltipped tooltipped-n js-carousel-nav-item" data-target="screenshot-5">
      <img src="{{ "/assets/import.png" | relative_url }}" class="img-responsive" alt="Import CSV thumbnail">
    </button>
  </div>
</div>
