'use strict';

const BaseBoilerplate = require('common-boilerplate');
const assert = require('assert');
const { rimraf, mkdirp } = require('mz-modules');
const compressing = require('compressing');
const path = require('path');
const os = require('os');
const is = require('is-type-of');

class LegacyBoilerplate extends BaseBoilerplate {
  constructor(...args) {
    super(...args);
    this.saveDir = path.join(os.tmpdir(), 'egg-init-boilerplate');
  }

  get [Symbol.for('boilerplate#root')]() {
    return __dirname;
  }

  initOptions() {
    return {
      ...super.initOptions(),

      package: {
        type: 'string',
        description: 'boilerplate name',
      },

      template: {
        type: 'string',
        description: 'boilerplate package name',
      },
    };
  }

  /**
   * download boilerplate by pkgName then extract it
   * @param {String} pkgName - boilerplate package name
   * @return {String} extracted boilerplate path
   */
  async downloadBoilerplate(pkgName) {
    await rimraf(this.saveDir);
    await mkdirp(this.saveDir);
    const url = `${this.locals.registry}/${pkgName}/latest`;
    this.logger.info(`Download template from ${url}`);
    const { data: pkgInfo } = await this.request(url, { dataType: 'json' });
    const response = await this.request(pkgInfo.dist.tarball, { streaming: true });
    await compressing.tgz.uncompress(response.res, this.saveDir);
    this.logger.info(`extract to ${this.saveDir}`);
    return path.join(this.saveDir, 'package');
  }

  async initQuestions() {
    let { template, package: boilerplateName } = this.locals;
    assert(template || boilerplateName, '--template or --package is required');

    if (!template) template = await this.downloadBoilerplate(boilerplateName);
    this.boilerplatePaths.push(template);

    try {
      let obj = require(template);
      // support function
      if (is.function(obj)) {
        obj = obj(this.locals);
      }
      const questions = [];
      for (const key of Object.keys(obj)) {
        const item = obj[key];
        questions.push({
          type: item.type || 'input',
          name: key,
          message: item.description || item.desc,
          default: item.default,
          filter: item.filter,
          choices: item.choices,
        });
      }
      return questions;
    } catch (_) { /* istanbul ignore next */
      // ignore if do not provide index.js
      return [];
    }
  }

  async run() {
    try {
      await super.run();
    } finally {
      await rimraf(this.saveDir);
    }
  }
}

module.exports = LegacyBoilerplate;
