for /f "tokens=*" %%b in ('git branch -r ^| findstr /v "->"') do (
    set "branch=%%b"
    setlocal enabledelayedexpansion
    set "branch=!branch:origin/=!"
    git branch --track !branch! origin/!branch! 2>nul
    endlocal
)
