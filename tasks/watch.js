const { exec, execFile, spawn, spawnSync } = require('child_process');
const chokidar = require(`chokidar`);
const chalk = require(`chalk`);
const { line } = require(`./modules`);
const pkg = require(`../package.json`)

const did = {
  transpile: {
    es: false,
    sass: false
  }
};

const NPM = (() => {
  if( /^win(32|64)$/.test( process.platform ) ) {
    return "npm.cmd"
  } else {
    return "npm"
  }
})();


( async () => {
  const transpileES = async () => {
    if( did.transpile.es ) return;
    did.transpile.es = true;
    await process.stdout.write(
      chalk.yellow( line("_") ) + `\n` +
      chalk.yellow( " Transpile modern ECMAScript to JavaScript for WEB" ) + `\n`
    );
    spawnSync(NPM, [`run`, `build-js`], { stdio: `inherit` });
    await process.stdout.write( `\n` + chalk.gray(" End task") + `\n\n\n` );
    setTimeout(() => { did.transpile.es = false; }, 1000 );
  };

  const watcher = chokidar.watch(`./assets/es`, { persistent: true, ignored: /\~$/ });
  watcher.on(`ready`, () => {
    watcher.on(`change`, async path => transpileES() );
    watcher.on(`add`, async path => transpileES() );
    watcher.on(`unlink`, async path => transpileES() );
  });
})();


( async () => {
  const transpileSASS = async () => {
    if( did.transpile.sass ) return;
    did.transpile.sass = true;
    await process.stdout.write(
      chalk.yellow( line("_") ) + `\n` +
      chalk.yellow( " Transpile SASS to CSS" ) + `\n`
    )
    spawnSync(NPM, [`run`, `build-css`], { stdio: `inherit` });
    await process.stdout.write( `\n` + chalk.gray(" End task") + `\n\n\n`);
    setTimeout(() => { did.transpile.sass = false; }, 1000 )
  };

  const watcher = chokidar.watch(`./assets/sass`, { persistent: true, ignored: /\~$/ });
  watcher.on(`ready`, () => {
    watcher.on(`change`, async path => transpileSASS() );
    watcher.on(`add`, async path => transpileSASS() );
    watcher.on(`unlink`, async path => transpileSASS() );
  });
})();

let aa = `
         .e%%%be.                             ${chalk.gray("ver. " + pkg.version) }
        d%PY  V "T.  ee   __
       d%%  ^ | /    ""   %%
      A%%%L__^|/___  ee %%%%%%% %%,e%% %%    %%  .d%%%b.
    __%%%%Y   /|^  Y %%   %%    %%^    %%    %%  %{   '"
  <_  %%%%%b./ | ^   %%   %%    %%     %%    %%   "T%%b.
   .>--V%%%%%L.A _A/ %%   %%.   %%     %%.  .%%, e.   }%
  /     "}T%%%%%%P"  %%    "Y%% %%      "T%%V""l."T%%%T"
 /_-~"~""
`.replace(/\^/g,"\\");

process.stdout.write( chalk.cyan(
`
${line(`-`)}
${aa}
${line(`-`)}
`)
);

process.stdout.write( chalk.white( `
  > Start watch
`));

