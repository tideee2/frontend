var
	gulp = require('gulp'),
	less = require('gulp-less'),
	path = require('path'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename');

gulp.task('mytask', function(){
	return gulp.src('source-files')
		.pipe(plugin())
		.pipe(gulp.dest('folder)'))
});

gulp.task('less', function(){
	return gulp.src('app/less/**/*.less')
		.pipe(less({
			paths: [path.join(__dirname, 'less', 'includes')]
		}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync',function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	})
});

gulp.task('scripts', function(){
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js'
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
});

gulp.task('css-libs', ['less'], function(){
	return gulp.src('app/css/libs.css')
	.pipe(cssnano)
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'));
});

gulp.task('watch', ['browser-sync', 'css-libs','scripts'],function(){
	gulp.watch('app/less/**/*.less',['less']);
	gulp.watch('app/*.html',browserSync.reload);
	gulp.watch('app/js/**/*.js',browserSync.reload);
});