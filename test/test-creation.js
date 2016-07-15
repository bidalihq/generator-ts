/* global describe, it*/
'use strict';

var path = require('path');
var assert = require('assert');
var fs = require('fs');
var exec = require('child_process').exec;
var helpers = require('yeoman-test');

describe('node module generator', function () {
    it('created a module with passing tests', function (done) {
      var tmpDir;

      helpers.run(path.join(__dirname, '../app'))
       .inTmpDir(function (dir) {
        tmpDir = dir;
       })
       .withOptions({
         skipInstall: false
       })
       .withPrompts({
         name: 'node-tmp',
         repository: 'daffl/node-tmp',
         description: 'Plugin description here'
       })
       .on('end', function () {
         assert.ok(fs.existsSync(path.join(tmpDir, '.jshintrc')));
         assert.ok(fs.existsSync(path.join(tmpDir, '.npmignore')));
         assert.ok(fs.existsSync(path.join(tmpDir, '.travis.yml')));
         assert.ok(fs.existsSync(path.join(tmpDir, '.editorconfig')));
         assert.ok(fs.existsSync(path.join(tmpDir, '.babelrc')));

         var child = exec('npm test', {
           cwd: tmpDir
         });

         child.on('exit', function (status) {
           assert.equal(status, 0, 'Got correct exist status');
           done();
         });
       });
    });
});
