define('zlib', {
    gunzip: (buffer, callback) => {
        try {
            callback(null, new Zlib.Gunzip(buffer).decompress());
        }
        catch(e) {
            callback(e, null);
        }
    }
});

requirejs(['index', 'zlib'], function(index) {
    index.start();
});