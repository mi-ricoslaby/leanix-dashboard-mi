# LeanIX Custom Dashboard by AxelSpringer

This project is a custom dashboard for [LeanIX EAM](https://www.leanix.net/en/product/knowledge) which gives an overview on certain Fact Sheets from data gathered form the API. It can be plugged in "out of the box".

![Screenshot](https://raw.githubusercontent.com/leanix/leanix-dashboard-as/master/docs/screen.png)

## Usage

In the production environment the plugin needs to be enabled by LeanIX support. However, the plugin is an AngularJS app which just needs two query parameters to work: token and baseUrl.

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

The code for "master" branch will be published in https://leanix.github.io/leanix-dashboard-as/master.


### git post-commit hook

Create an executable file under .git/hooks/post-commit from https://gist.github.com/bonndan/42cecfc5c5f4936321ce
