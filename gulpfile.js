var gulp    = require('gulp');
var ts      = require('gulp-typescript');


gulp.task('default', function () {
  var tsResult = gulp.src(['src/**/*.ts','./typings/tsd.d.ts'])
	.pipe(ts({
				module:'commonjs',
				out: 'index.js'
		}));

	return tsResult.js.pipe(gulp.dest('.'));
});
    
gulp.task('watch', ['default'], function() {
	gulp.watch('./src/**/*.ts', ['default']);
});
    
