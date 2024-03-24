@echo off
SETLOCAL ENABLEEXTENSIONS

set DB_NAME=WorkoutBuddy
set SQL_FILE=./wbMigration.sql
set SERVER_NAME=GEORGE\LOCALHOST

echo Creating database %DB_NAME%...
sqlcmd -S %SERVER_NAME% -E -Q "CREATE DATABASE [%DB_NAME%];"

echo Importing %SQL_FILE% into %DB_NAME%...
sqlcmd -S %SERVER_NAME% -d %DB_NAME% -E -i %SQL_FILE%

echo Migration completed successfully.
ENDLOCAL