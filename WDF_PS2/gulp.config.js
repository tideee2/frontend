module.exports = function () {
  var root = 'app/';
  var name = 'test';
  var build = 'app/build/';
  var styles = root + 'less/';
  var js = root + 'js/';
  var fonts = root + 'fonts/';
  var bower = root + 'libs/'

  var config = {
    root: root,
    name: name,
    build: build,
    index: root + 'index.html',
    styles: styles,
    buildCss: build+'css/',
    buildMinCss: name + '.min.css',
    buildJs: build + 'js/',
    buildMinJs: name + '.min.js',
    
    bowerCss: bower + '**/*.css',
    bowerJs: bower + '**/dist/*min.js'
  };

  return config;
};