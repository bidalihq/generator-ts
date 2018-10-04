/* global describe, it*/
'use strict';

var path = require('path');
var assert = require('assert');
var fs = require('fs');
var exec = require('child_process').exec;
var helpers = require('yeoman-test');

describe('node module generator', () => {
    it('created a module with passing tests', done => {
      let tmpDir;

      helpers.run(path.join(__dirname, '../app'))
       .inTmpDir(function (dir) {
        tmpDir = dir;
        console.log(dir);
       })
       .withOptions({
         skipInstall: false
       })
       .withPrompts({
         name: 'node-tmp',
         repository: 'bidalihq/node-tmp',
         description: 'Plugin description here'
       })
       .on('end', function () {
         assert.ok(fs.existsSync(path.join(tmpDir, '.npmignore')));
         assert.ok(fs.existsSync(path.join(tmpDir, '.editorconfig')));
         assert.ok(fs.existsSync(path.join(tmpDir, '.gitignore')));

         const child = exec('npm test', {
           cwd: tmpDir
         });

         child.on('exit', status => {
           assert.equal(status, 0, 'Got correct exist status');
           done();
         });
       });
    });
});
