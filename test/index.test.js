'use strict';

const path = require('path');
const coffee = require('coffee');
const assertFile = require('assert-file');
const { rimraf, mkdirp } = require('mz-modules');
const mm = require('mm');

describe('test/index.test.js', () => {
  const cli = path.join(__dirname, '../bin/cli.js');
  const tmpDir = path.join(__dirname, '.tmp');

  beforeEach(async () => {
    await rimraf(tmpDir);
    await mkdirp(tmpDir);
    mm.restore();
    mm(process.env, 'BOILERPLATE_TEST', true);
  });

  it('should support --package', async () => {
    await coffee.fork(cli, [ '--verbose', '--package=egg-boilerplate-empty' ], { cwd: tmpDir })
      .debug()
      .waitForPrompt()
      .writeKey('example\n')
      .writeKey('node-modules\n')
      .writeKey('this is desc\n')
      .writeKey('ENTER')
      .expect('stdout', /npm install .* --no-package-lock/)
      .expect('stdout', /1 passing/)
      .expect('code', 0)
      .end();


    assertFile(`${tmpDir}/README.md`, /travis\/node-modules\/example/);
    assertFile(`${tmpDir}/README.md`, /this is desc/);
    assertFile(`${tmpDir}/test/index.test.js`, /should work/);
    assertFile(`${tmpDir}/.gitignore`);
    assertFile(`${tmpDir}/.eslintrc`);
    assertFile(`${tmpDir}/package.json`, {
      name: 'example',
      description: 'this is desc',
      boilerplate: {
        name: 'egg-boilerplate-empty',
      },
    });
  });

  it('should support --template', async () => {
    const template = path.join(__dirname, 'fixtures/local');
    await coffee.fork(cli, [ '--verbose', `--template=${template}` ], { cwd: tmpDir })
      .debug()
      .waitForPrompt()
      .writeKey('example\n')
      .writeKey('node-modules\n')
      .writeKey('this is desc\n')
      .writeKey('ENTER')
      .expect('stdout', /npm install .* --no-package-lock/)
      .expect('code', 0)
      .end();


    assertFile(`${tmpDir}/README.md`, /## example/);
    assertFile(`${tmpDir}/package.json`, {
      name: 'example',
      boilerplate: {
        name: 'local',
      },
    });
  });

  it('should support --template with fn', async () => {
    const template = path.join(__dirname, 'fixtures/local-fn');
    await coffee.fork(cli, [ '--verbose', `--template=${template}`, '--str=abc' ], { cwd: tmpDir })
      .debug()
      .waitForPrompt()
      .writeKey('ENTER')
      .expect('stdout', /npm install .* --no-package-lock/)
      .expect('code', 0)
      .end();


    assertFile(`${tmpDir}/README.md`, /## abc/);
    assertFile(`${tmpDir}/package.json`, {
      name: 'abc',
      boilerplate: {
        name: 'local',
      },
    });
  });

  it('should support --template without index', async () => {
    const template = path.join(__dirname, 'fixtures/local-without-index');
    await coffee.fork(cli, [ '--verbose', `--template=${template}` ], { cwd: tmpDir })
      .debug()
      .expect('stdout', /npm install .* --no-package-lock/)
      .expect('code', 0)
      .end();


    assertFile(`${tmpDir}/README.md`, /## egg-boilerplate-legacy/);
    assertFile(`${tmpDir}/package.json`, {
      name: 'egg-boilerplate-legacy',
      boilerplate: {
        name: 'local',
      },
    });
  });
});
