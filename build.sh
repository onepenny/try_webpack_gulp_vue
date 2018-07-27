envtype=$1

NODE_ENV=$envtype npm run build || exit 1

./node_modules/.bin/gulp build
