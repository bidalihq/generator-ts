'use strict';

var Generator = require('yeoman-generator');
var path = require('path');

module.exports = class TypeScriptGenerator extends Generator {
  constructor (args, opts) {
    super(args, opts);

    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    this.props = {
      name: process.cwd().split(path.sep).pop(),
      description: this.pkg.description
    };
    this.fileMap = {
      'package.json': 'package.json',
      'index.ts': 'src/index.ts',
      'index.test.ts': 'test/index.test.ts',
      'README.md': 'README.md',
      '__gitignore': '.gitignore',
      '__npmignore': '.npmignore'
    };
  }

  prompting () {
    const prompts = [{
      name: 'name',
      message: 'Project name',
      when: !this.pkg.name,
      default: this.props.name
    }, {
      name: 'repository',
      message: 'The GitHub repository URL (e.g. bidalihq/myplugin)',
      default: 'bidalihq/' + this.props.name
    }, {
      name: 'description',
      message: 'Description',
      when: !this.pkg.description
    }];

    return this.prompt(prompts).then(props => {
      this.props = Object.assign(this.props, props);
    });
  }

  writing () {
    this.fs.copy(this.templatePath('static/.*'), this.destinationPath());
    this.fs.copy(this.templatePath('static/**/*'), this.destinationPath());

    Object.keys(this.fileMap).forEach(src => {
      const target = this.fileMap[src];

      this.fs.copyTpl(
        this.templatePath(src),
        this.destinationPath(target),
        this.props
      );
    });

    this.npmInstall([ 'debug' ], { save: true });

    this.npmInstall([
      '@types/node',
      '@types/jest',
      '@types/debug',
      'jest',
      'shx',
      'ts-jest',
      'tslint',
      'typescript'
    ], { saveDev: true});
  }
};
