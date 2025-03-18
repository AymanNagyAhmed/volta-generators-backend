#!/bin/sh
set -e

echo 'Waiting for database to be ready...'
sleep 10

echo 'Running Prisma migrations...'
yarn prisma migrate dev

echo 'Running database seed...'
yarn prisma db seed

echo 'Starting the application...'
exec yarn start 