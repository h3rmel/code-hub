//* Imports dos plugins do Gulp
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

//* Função para compilar SASS e adicionar prefixos
function compileSass() {
  return gulp
    .src("styles/scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulp.dest("styles/css/"))
    .pipe(browserSync.stream());
}

//* Concatenar o JS
function gulpJs() {
  return gulp
    .src("js/main/*.js")
    .pipe(concat("main.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("js/"))
    .pipe(browserSync.stream());
}

//* Libs Externas do JS
function pluginsJs() {
  return gulp
  .src(["node_modules/jquery/dist/jquery.min.js", "node_modules/moment/min/moment.min.js"])
  .pipe(concat("plugins.js"))
  .pipe(gulp.dest("js/"))
  .pipe(browserSync.stream());
}

//* Abre o Browser
function openBrowser() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
}

//* Declaração das Tarefas
gulp.task("compileSass", compileSass);
gulp.task("gulpJs", gulpJs);
gulp.task("pluginsJs", pluginsJs);
gulp.task("openBrowser", openBrowser);

//* Watch do Gulp
function watchProject() {
  gulp.watch("styles/scss/*.scss", compileSass);
  gulp.watch("js/main/*.js", gulpJs);
  gulp.watch(["*.html"]).on("change", browserSync.reload);
}

gulp.task("watch", watchProject);

//* Tarefa padrão do projeto
gulp.task("default", gulp.parallel("watch", "openBrowser", "compileSass", "pluginsJs", "gulpJs"));
