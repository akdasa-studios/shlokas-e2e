<p align="center">
    <img src="docs/logo.svg" height="184px"/>
</p>

This repository contains the end-to-end tests for the Shlokas mobile app. The tests are written in [Playwrght](https://playwright.dev/), a Node.js library to automate Chromium, Firefox and WebKit with a single API. The tests are run on a nightly basis using GitHub Actions.


<p align="center">
  <a href="https://github.com/akdasa-studios/shlokas-e2e/actions/workflows/tests-nightly.yml"><img src="https://github.com/akdasa-studios/shlokas-e2e/actions/workflows/tests-nightly.yml/badge.svg?event=schedule" alt="Tests"></a>
</p>


## Environment variables
| Variable    | Default               | Descriptiion                      |
| ----------- | --------------------- | --------------------------------- |
| SHLOKAS_URL | http://localhost:8080 | Url to run tests against for      |
| MAIL_URL    | http://localhost:1080 | Url for real or fake mail service |

##

You can run tests against specific urls:
```sh
SHLOKAS_URL=http://app:8080 MAIL_URL=http://mail:1080 npm run tests
```