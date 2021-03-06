# egg-boilerplate-legacy

install helper for legacy egg boilerplate.

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![NPM download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-boilerplate-legacy.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-boilerplate-legacy
[travis-image]: https://img.shields.io/travis/eggjs/egg-boilerplate-legacy.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-boilerplate-legacy
[codecov-image]: https://codecov.io/gh/eggjs/egg-boilerplate-legacy/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/eggjs/egg-boilerplate-legacy
[david-image]: https://img.shields.io/david/eggjs/egg-boilerplate-legacy.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-boilerplate-legacy
[snyk-image]: https://snyk.io/test/npm/egg-boilerplate-legacy/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-boilerplate-legacy
[download-image]: https://img.shields.io/npm/dm/egg-boilerplate-legacy.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-boilerplate-legacy

## Usage

```bash
$ npx egg-boilerplate-legacy --package=egg-boilerplate-empty showcase
```

For more details:

```bash
$ npx egg-boilerplate-legacy --help

  --verbose       run at verbose mode, will print debug log                                                    [boolean]
  --baseDir       directory of application, default to `process.cwd()`                                          [string]
  --npm           npm cli, tnpm/cnpm/npm, will auto guess                                                       [string]
  --registry, -r  npm registry, support china/npm/custom, default to auto detect                                [string]
  --force, -f     force to override directory                                                                  [boolean]
  --package       boilerplate name                                                                              [string]
  --template      boilerplate package name                                                                      [string]
```
