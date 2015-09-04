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

Start the web server with `gulp serve`.

## Deploy a new version (develop or master branch)

The code for __"master"__ branch will be published in https://leanix.github.io/leanix-dashboard-as/master.

### using git post-commit hook

* create a post-commit hook (an executable file under .git/hooks/post-commit from build.sh)
* build for production `gulp build`
* commit (hooks runs afterwards)
* `git push` (pushes both your branch and the gh-pages branch)

### without hooks

* build for production `gulp build`
* commit (hooks runs afterwards)
* run build.sh
* `git push` (pushes both your branch and the gh-pages branch)

## License

This project is MIT-licensed. See http://leanix.mit-license.org/
