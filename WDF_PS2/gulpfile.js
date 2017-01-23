var gulp = require('gulp-help')(require('gulp'));
var	browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')({lazy: true});
var config = require('./gulp.config')();

gulp.task('inject', 'Inject css  and js files to the head section of index.html', function() {
	return gulp.src(config.index)
		.pipe($.inject(gulp.src(
			[config.buildCss + '*.css', 
			config.buildJs + '*.js',
			config.bowerCss, 
			config.bowerJs],
		 {read: false})))
		.pipe(gulp.dest(__dirname));
});

gulp.task('inject-min-css', 'Inject min.css and min.js files to the head section of index.html', function() {
	return gulp.src(config.index)
		.pipe($.inject(gulp.src(
			['app/css/*.css',
			'app/js/*.js',
			config.bowerCss, 
			config.bowerJs],
			 {read: false}), {addRootSlash: false}))
		.pipe(gulp.dest(__dirname));
});

gulp.task('less', 'Convert less to css file and put it to the build folder', function() {
	return gulp.src(config.styles + '*.less')
		.pipe($.less())
		.pipe($.concat(config.name + '.css'))
		.pipe(gulp.dest(config.buildCss));
		// .pipe(browserSync.reload({stream: true}));
});

gulp.task('minify-css', 'Minify css', ['less'], function() {
	return gulp.src(config.buildCss+'*.css')
		.pipe($.cssnano())
		.pipe($.concat(config.buildMinCss))
		.pipe(gulp.dest(config.root + '/css'));
});

gulp.task('browser-sync', 'Browser-sync configuration', function() {
	browserSync({
		server: {
			baseDir: config.root
		},
		notify: true
	})
});

gulp.task('scripts', 'minimize and obfuscate js file', function(){
	return gulp.src(config.buildJs+'*.js')
		.pipe($.obfuscate())
		.pipe($.concat(config.buildMinJs))
		.pipe($.uglifyjs())
		.pipe(gulp.dest(config.root + 'js/'));
});

gulp.task('serve', 'Development build. Watch less files for changes.', ['browser-sync', 'less', 'scripts', 'inject'], function() {
	gulp.watch(config.styles + '*.less', ['less', browserSync.reload]);
	gulp.watch(config.buildJs + '*.js', ['scripts', browserSync.reload]);
}); 

gulp.task('build', 'Production build', ['less', 'minify-css', 'scripts', 'inject-min-css']);