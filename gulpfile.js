const gulp = require('gulp');
const uglify = require('gulp-uglify');//压缩
const minifyCss = require('gulp-minify-css');//压缩
const autoprefix = require('gulp-autoprefixer');//兼容处理
const htmlmin = require('gulp-htmlmin'); //压缩html里面的js，css，去除空格
const rev = require('gulp-rev');//对文件名加MD5后缀
const revCollector = require('gulp-rev-collector');//替换路径
const babel = require('gulp-babel');
const del = require('del');

//把es6语法解析成es5

const paths = {
	cssPath: "css",
	jsPath: "js",
	outPath: "dist"
}

function clean() {
	return del(paths.outPath);
}

//压缩css
function handleCss() {
	return gulp.src(paths.cssPath + "/*.css")
		.pipe(autoprefix({
			overrideBrowserslist: [
				"> 2%", "last 2 versions", "not ie 6-9"
			],
			cascade: false
		}))
		.pipe(minifyCss())
		.pipe(rev())
		.pipe(gulp.dest(paths.outPath + "/css"))
		.pipe(rev.manifest())
		.pipe(gulp.dest(paths.outPath + "/css"))
}

//压缩js
function handleJs() {
	return gulp.src([paths.jsPath + "/*.js"])
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(uglify())
		.pipe(rev())
		.pipe(gulp.dest(paths.outPath + "/js"))
		.pipe(rev.manifest())
		.pipe(gulp.dest(paths.outPath + "/js"));
}

function handleImages() {
   return gulp.src("img/**")
       .pipe(rev())
       .pipe(gulp.dest(paths.outPath + "/img"))
       .pipe(rev.manifest())
       .pipe(gulp.dest(paths.outPath + "/img"));
}

//压缩html
function handleHtml() {
	let options = {
		removeComments: true,  //清除HTML注释
		collapseWhitespace: true,  //压缩HTML
		collapseBooleanAttributes: true,  //省略布尔属性的值 <input checked="true"/> ==> <input checked />
		removeEmptyAttributes: true,  //删除所有空格作属性值 <input id="" /> ==> <input />
		removeScriptTypeAttributes: true,  //删除<script>的type="text/javascript"
		removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
		minifyJS: true,  //压缩页面JS
		minifyCSS: true  //压缩页面CSS
	};
	return gulp.src("./*.html")
		.pipe(htmlmin(options))
		.pipe(gulp.dest(paths.outPath))
}

//替换html中css、js的路径
function revHtml() {
	return gulp.src(["./dist/**/*.json", "./dist/**/*.{html,js,css}"])
		.pipe(revCollector({
			replaceReved: true
		}))
		.pipe(gulp.dest(paths.outPath));
}


exports.default = gulp.series(
	clean,
	//同时进行压缩和版本化
	gulp.parallel(handleCss, handleJs, handleHtml,handleImages),
	revHtml
);