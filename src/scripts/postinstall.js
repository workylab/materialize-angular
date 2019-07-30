var env = process.env;
var ADBLOCK = is(env.ADBLOCK);
var CI = is(env.CI);
var COLOR = is(env.npm_config_color);
var SILENT = !!~['silent', 'error', 'warn'].indexOf(env.npm_config_loglevel);

function is(it) {
  return !!it && it !== '0' && it !== 'false';
}

function log(it) {
  console.log(COLOR ? it : it.replace(/\u001B\[\d+m/g, ''));
}

if (!ADBLOCK && !CI && !SILENT) {
  log('\u001B[96mThank you for using materialize-angular (\u001B[94m https://github.com/workylab/materialize-angular \u001B[96m) for create awesome websites!\u001B[0m\n');
  log('\u001B[96mThe project needs your help! Please consider supporting of materialize-angular on Patreon or check our site: \u001B[0m');
  log('\u001B[96m>\u001B[94m https://www.patreon.com/materialize_angular \u001B[0m\n');
  log('\u001B[96m>\u001B[94m https://materialize-angular.workylab.com/help \u001B[0m\n');
}