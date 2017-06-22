fullystudios.github.io
=============================
Website for the Swedish agency Fully Studios

Fully Digital site is based on Jekyll, GulpJS, SASS, AutoPrefixer &amp; BrowserSync

## Jekyll Starter

This starter uses webpack, react, and jekyll.

It also includes a multi threaded rake task to sync webpack and jekyll.
To run in dev mode: `rake start`
To build: `rake b`

### Setup

- `nvm use 7.2.1`
- `npm install -g webpack`
- if you dont have bundler run `gem install bundler`
- `npm install`
- `bundle install`
- `rake start`

#### Error?
If nothing happens after 20s when you run `rake start`, try run `rake b`. If you get following error:
```jekyll 3.4.3 | Error:  "\xE6" on US-ASCI```
Do the following:

1. In terminal, run `locale`. If LANG or LC_ALL is blank:
2. Run `cd` and `sudo nano /etc/profile`
3. Copy paste this in the end and save:
    ```
export LC_ALL=sv_SE.UTF-8  
export LANG=sv_SE.UTF-8
    ````
5. Restart you terminal
4. run `locale` and confirm the changes. 

## Todos
- för över statiska filer
- för över style
- för över cases och deras js
- importera dependencies på rätt sätt (package + webpack)
- eslinter

#Old stuff below

## System Preparation
Only if you haven't installed Jekyll, node or Gulp installed on your machine:

1. [Jekyll](http://jekyllrb.com/) - `$ gem install jekyll`
2. [NodeJS](http://nodejs.org) - use the installer. 7.2.1
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

``` shell
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