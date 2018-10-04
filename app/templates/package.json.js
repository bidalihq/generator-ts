module.exports = props => {
  const pkg = {
    name: props.name,
    description: props.description,
    version: '0.0.0',
    homepage: `https://github.com/${props.repository}`,
    main: 'lib/',
    keywords: [],
    repository: {
      type: 'git',
      url: `git://github.com/${props.repository}.git`
    },
    author: {
      name: 'Bidali',
      email: 'info@bidali.com',
      url: 'https://bidali.com'
    },
    contributors: [],
    bugs: {
      url: `https://github.com/${props.repository}/issues`
    },
    engines: {
      node: '>= 8.0.0'
    },
    scripts: {
      prepublish: 'npm run compile',
      lint: 'tslint --fix src/**/* test/**/*',
      compile: 'shx rm -rf lib/ && tsc',
      test: 'npm run lint && npm run jest',
      jest: 'jest --detectOpenHandles --forceExit',
      'test:watch': 'jest --watch --collectCoverage=false'
    },
    directories: {
      lib: 'lib'
    },
    dependencies: {},
    devDependencies: {}
  };

  if(!props.monorepo) {
    Object.assign(pkg, {
      publish: 'git push origin --tags && npm run changelog && git push origin',
      'release:pre': 'npm version prerelease && npm publish --tag pre',
      'release:patch': 'npm version patch && npm publish',
      'release:minor': 'npm version minor && npm publish',
      'release:major': 'npm version major && npm publish',
      'changelog': 'github_changelog_generator && git add CHANGELOG.md && git commit -am \'Updating changelog\'',
    });
  }

  return pkg;
}
