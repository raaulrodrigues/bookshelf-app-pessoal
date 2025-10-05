#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npx prisma migrate deploy
npx prisma db seed
npm run build