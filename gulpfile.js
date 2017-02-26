/* this is connect for our project */
var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    cssnano      = require('gulp-cssnano'),
    rename       = require('gulp-rename'),
    del          = require('del'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglifyjs'),
    autoprefixer = require('gulp-autoprefixer'),
    spritesmith  = require('gulp.spritesmith'),
    connect      = require('gulp-connect'),
    livereload   = require('gulp-livereload');

livereload({ start: true });

/* task for compilation sass to css */
gulp.task('sass', function () {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(gulp.dest('app/css'))
        .pipe(livereload());
});

/* task for automatic compilation sass to css */
gulp.task('watch', ['css-libs', 'scripts'], function () {
    livereload.listen(),
    gulp.watch('app/sass/**/*.sass', ['sass'])
});

/* task for compilation to min.css (libs) */
gulp.task('css-libs', ['sass'], function () {
    return gulp.src('app/css/libs.css')
        .pipe(cssnano())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('app/css'))
});

/* task for compilation to min.css (main) */
gulp.task('css-main', ['sass'], function () {
    return gulp.src('app/css/main.css')
        .pipe(cssnano())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('app/css'))
});

/* task for compilation and minimization *.js (CHANGING) */
gulp.task('scripts', function () {
    return gulp.src([
        'app/libs/jquery.magnific-popup.min.js',
        'app/libs/bootstrap.min.js',
        'app/js/common.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
});

/* task for production (CHANGING) */
gulp.task ('build', ['clean', 'sass'], function () {
    var buildCss = gulp.src([
        'app/css/main.min.css',
        'app/css/main.css',
        'app/css/libs.min.css'
    ])
        .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'));

    var buildImg = gulp.src('app/img/**/*')
        .pipe(gulp.dest('dist/img'));

    var buildApach = gulp.src('app/.htaccess')
        .pipe(gulp.dest('dist'));

    var buildPhp = gulp.src('app/*.php')
        .pipe(gulp.dest('dist'));
});

/* dell all the files at folder of dist */
gulp.task('clean', function () {
    return del.sync('dist')
});

/* for costumize img */
gulp.task('img', function () {
    return gulp.src('app/img/**/*')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            une: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img'));
});

/* task for create sprite (*.pmg) */
// gulp.task('sprite', function() {
//     var spriteData = gulp.src('app/img/png/*.*')
//         .pipe(spritesmith({
//             imgName: 'sprite.png',
//             cssName: '_sprite.sass',
//             cssFormat: 'sass',
//             algorithm: 'binary-tree',
//             imgPath: '../img/sprite.png'
//         }));
//     spriteData.img.pipe(gulp.dest('app/img'));
//     spriteData.css.pipe(gulp.dest('app/sass'));
// });

/* final for comfort */
gulp.task('default', ['watch']);



