dir=docs
cp -r src/* $dir
minify src/index.html > $dir/index.html
minify src/index.js > $dir/index.js
minify src/2/index.html > $dir/2/index.html
minify src/2.js > $dir/2.js
minify src/3/index.html > $dir/3/index.html
minify src/3.js > $dir/3.js
minify src/sw.js > $dir/sw.js

