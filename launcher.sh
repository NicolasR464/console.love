#!/bin/bash
gnome-terminal --title="private-chat" -- node ./private-chat/app.js

cd ./main-lovers/
set -o allexport
source ./main-lovers/.env.local
set +o allexport
npm run dev