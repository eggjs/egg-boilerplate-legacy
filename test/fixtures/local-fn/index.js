'use strict';

module.exports = locals => {
  return {
    name: {
      desc: 'project name',
      default: locals.str,
    },
  };
};
