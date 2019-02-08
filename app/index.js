'use strict';

const Generator = require('yeoman-generator');
const path = require('path');
const readPkgUp = require('read-pkg-up');
const createPkg = require('./templates/package.json');

module.exports = class TypeScriptGenerator extends Generator {
  constructor (args, opts) {
    super(args, opts);

    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    this.props = {
      name: process.cwd().split(path.sep).pop(),
      description: this.pkg.description
    };
  }

  async prompting () {
    const { pkg: rootPkg = {} } = await readPkgUp();
    const prompts = [{
      name: 'name',
      message: 'Project name',
      default: `@bidalihq/${this.props.name}`
    }, {
      name: 'repository',
      message: 'The GitHub repository URL (e.g. bidalihq/myplugin)',
      default(prompts) {
        return `bidalihq/${rootPkg.name || prompts.name}`;
      }
    }, {
      name: 'monorepo',
      type: 'confirm',
      message: 'Is this a module in a monorepo (Lerna)?',
      default: !!rootPkg.name
    }, {
      name: 'description',
      message: 'Description',
      when: !this.pkg.description
    }];

    this.props = Object.assign(this.props, await this.prompt(prompts));
  }

  writing () {
    const { props } = this;
    const fileMap = {
      'index.ts': 'src/index.ts',
      'index.test.ts': 'test/index.test.ts',
      'README.md': 'README.md',
      '__npmignore': '.npmignore'
    };
    const staticFolder = props.monorepo ? 'static/monorepo' : 'static/standalone';

    if(!props.monorepo) {
      fileMap.__gitignore = '.gitignore';
      this.fs.copy(this.templatePath(`${staticFolder}/.*`), this.destinationPath());
    }

    this.fs.copy(this.templatePath(`${staticFolder}/**/*`), this.destinationPath());

    Object.keys(fileMap).forEach(src => {
      const target = fileMap[src];

      this.fs.copyTpl(
        this.templatePath(src),
        this.destinationPath(target),
        this.props
      );
    });

    this.fs.writeJSON(this.destinationPath('package.json'), createPkg(props));

    this.npmInstall([
      '@types/node',
      '@types/mocha',
      '@types/debug',
      'mocha',
      'nyc',
      'ts-node',
      'shx',
      'tslint',
      'typescript'
    ], { saveDev: true});
  }
};
