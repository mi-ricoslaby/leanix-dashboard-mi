'use strict';

module.exports = function () {
  return {
    printStream: function (stream) {
      stream.on('data', function(chunk) {
        var contents = chunk.contents.toString().trim();
        var bufLength = process.stdout.columns;
        var hr = '\n\n' + (new Array(bufLength)).join('_') + '\n\n';
        if (contents.length > 1) {
          process.stdout.write(chunk.path + '\n' + contents + '\n');
          process.stdout.write(chunk.path + hr);
        }
      });
    }
  };
};
