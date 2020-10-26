exports = {};
// nbt.js isn't doing any compression stuff for us, so doesn't actually need zlib
// but it will try to require() it if it finds requirejs, or will try to access the window if it can't
// both are bad news in a web worker, so just give it a blank require to trick it
function require() {}
importScripts('nbt.js');

importScripts('require.js', 'gzip.min.js', 'gunzip.min.js');
requirejs.config({
    baseUrl: './'
});

requirejs(['worker'], function(worker) {
    worker.start(exports);
});