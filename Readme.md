# LeanIX frontend

## How to run

You need Node installed, and npm (comes with node). 

Download all dependencies with 

`npm install` 

then run

`./node_modules/bower/bin/bower install --config.interactive=false;`

Then start the build with `brunch build`. Start the web server with `node server.js`.

## Deploy a new version (develop or master branch)

* create a post-commit hook (see below)
* build for production `gulp build`
* commit (hooks runs afterwards)
* `git push` (pushes both your branch and the gh-pages branch)

The code will be published in https://leanix.github.io/leanix-dashboard-as/__branch__


### git post-commit hook


Create an executable file under .git/hooks/post-commit from https://gist.github.com/bonndan/42cecfc5c5f4936321ce
