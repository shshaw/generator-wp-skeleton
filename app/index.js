'use strict';
var yeoman = require('yeoman-generator');
var exec = require('child_process').exec;
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the legendary ' + chalk.red('Wordpress Skeleton') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'pkgname',
      message: 'Package Name/Short URL',
      default: 'package'
    }/*
,{
      type: 'confirm',
      name: 'includeNormalize',
      message: 'Would you like to include normalize.css?',
      default: true
    }, {
      type: 'confirm',
      name: 'includeJQuery',
      message: 'Would you like to include jQuery?',
      default: true
    }
*/];

    this.prompt(prompts, function (answers) {

      for ( var a in answers ) {
        if ( answers.hasOwnProperty(a) ) {
          this[a] = answers[a];
        }
      }

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.template('_package.json', 'package.json', this);
      this.template('_bower.json', 'bower.json', this);
    },

    src: function(){
      this.copy('Gruntfile.js','Gruntfile.js');
      this.copy('gitignore.txt','.gitignore');
      this.directory('src','src'); // create /src/ dir
    }
  },

  mampCreate: function mampCreate() {
    var done = this.async(),
        mysql = require('mysql'),
        _this = this;

    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
    });

    connection.connect(function(err) {
      if ( err ) { _this.log(err); }
    });
    connection.query('CREATE DATABASE ellcreat_' + _this.pkgname,function(err) {
      if ( err ) { _this.log(err); }
    });
    connection.end();

    var async = require('async');
    async.series([
      function (taskDone) {
        exec('ln -s ' + _this.destinationPath() + ' /Applications/MAMP/htdocs/' + _this.pkgname,taskDone);
      }
    ], function (err) {

      if ( err ) { this.log(err); }

      this.log(chalk.green('complete') + ' MAMP setup');
      done();
    }.bind(this));
  },

  gitCommit: function gitCommit() {
    var done = this.async();
    var async = require('async');
    var _this = this;

    async.series([
      function (taskDone) {
        exec('cp -n -R ' + _this.templatePath('src') + '/. ' + _this.destinationPath('src'), taskDone); // Copy over all /src/ dirs and files
      },
      function (taskDone) {
        exec('git init', taskDone);
      },
      function (taskDone) {
        exec('git add . --all', taskDone);
      },
      function (taskDone) {
        exec('git commit -m "Initial Setup"', taskDone);
      },
      function (taskDone) {
        exec('git subtree add https://github.com/markjaquith/WordPress-Skeleton --squash --prefix public_html -- master', taskDone);
      },
      function (taskDone) {
        exec('git commit -m "Fetched Wordpress Skeleton"', taskDone);
      }
    ], function (err) {

      console.log(err);
      if (err === 127) {
        this.log('Could not find the ' + chalk.yellow.bold('git') + ' command. Make sure Git is installed on this machine');
        return;
      }

      this.copy('sourcetreeconfig.txt','.git/sourcetreeconfig');

      this.log(chalk.green('complete') + ' Git repository has been setup. If this fails, try running ' + chalk.yellow.bold('git init') + ' and make a first commit manually');
      done();
    }.bind(this));
  },


/*
  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
*/
});
