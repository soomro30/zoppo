fullystudios.github.io
=============================
Website for the Swedish agency Fully Studios

Fully Digital site is based on Jekyll, GulpJS, SASS, AutoPrefixer &amp; BrowserSync


## System Preparation
Only if you hasn't install Jekyll, node or Gulp installed on your machine:

1. [Jekyll](http://jekyllrb.com/) - `$ gem install jekyll`
2. [NodeJS](http://nodejs.org) - use the installer.
3. [GulpJS](https://github.com/gulpjs/gulp) - `$ npm install -g gulp` (mac users may need sudo)
4. [Bundle](http://bundler.io/) -  `gem install bundler`

## Local Installation

1. Clone this repo, or download it into a directory of your choice.
2. Change to branch develop 
3. Inside the directory, run `npm install` and `bundle install`.

You may have to update ruby and all your local gems if they are to old:

Project requires ruby v2.4.1. See instructions for installation below
Update Ruby using rvm:
```\curl -sSL https://get.rvm.io | bash -s stable```
```rvm install ruby-2.4.1```
```rvm use ruby-2.4.1```
```bundle install```

If you get problems with "WARN: Unresolved spec during Gem...", try running this to clean up old gems:
```bundle clean --force``

Update gems:
```gem update```
 

## Usage

**development mode**

This will give you file watching, browser synchronisation, auto-rebuild, CSS injecting etc etc.

```shell
$ gulp
```

**jekyll**

As this is just a Jekyll project, you can use any of the commands listed in their [docs](http://jekyllrb.com/docs/usage/)

## Deploy with Gulp and GitHub Pages

Just run `gulp deploy`.


## Struture

The rendered site is in _site

### Templates

...

### CSS

...

### JS

...


## CREDITS:

based on [jekyll-gulp-sass-browser-sync](https://github.com/shakyShane/jekyll-gulp-sass-browser-sync) by shakyShane