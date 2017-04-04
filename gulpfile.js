
var gulp        = require('gulp'),
    sass     = require('sass'),
    browserSync = require('browser-sync'),
    concat      = require('gulp-concat'),
    imagemin    = require('gulp-imagemin');


var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * atualiza a página
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Espera até que o jekyll-build seja executado e então levanta o
 * servidor utilizando o _site como pasta raiz
 */
gulp.task('browser-sync', ['jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

gulp.task('sass', function () {
 return gulp.src('_/assets/_sass/base.scss')
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(gulp.dest('_site/dist/css'));
});


gulp.task('watch', function () {
    gulp.watch('_/assets/_sass/base.scss', ['sass']);
    gulp.watch(['index.html', '_includes/*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

gulp.task('default', ['sass', 'browser-sync', 'watch']);