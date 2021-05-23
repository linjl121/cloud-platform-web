// rule配置说明： rule由name和配置组成。如：'name:[0,'always',72]',数组中第一位为level，可选0，1，2。0为disable，1为warn，2为error。第二位为应用与否，可选always|never。第三位该rule的值。
module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'type-enum': [2, 'always', ['fix', 'refactor', 'docs', 'feature', 'style', 'revert', 'test']],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72]
  }
};
