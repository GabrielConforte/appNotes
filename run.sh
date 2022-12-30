#!/bin/bash

cd backend
node src/index.js &

cd ../app-notes
npm start