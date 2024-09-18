@echo off
REM Navigate to paths relative to the current script location
set path1=.\streaming-platform-api
set path2=.\streaming-platform
set path3=.\assets

REM Open Windows Terminal with multiple tabs running npm run start
start wt new-tab -d "%cd%\%path1%" cmd /k "npm run start" ^
` ; new-tab -d "%cd%\%path2%" cmd /k "npm run start" ^
` ; new-tab -d "%cd%\%path3%" cmd /k "npm run start"

REM Optional: Wait for a key press to close the script window
pause