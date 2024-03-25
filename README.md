# Hast, command helper
Hast is a project created by Maxims Enterprise that allows you to create simple files that you can run to the terminal as it would in a 'Makefile'

## Setup
First download the files and use this command to copy the 'Hast' folder to your bash folder:
```Bash
sudo mv bash /usr/local/bin # I'm using macOS
chmod +x /usr/local/bin/hast.sh
```
----
To start create a 'Hastentry' or '.hast' file in your location
```Bash
touch Hastentry
touch a.hast
```
Then, open your Hastentry in your desire IDE or Text Editor.
ex.
```Bash
sudo nano ./Hastentry
code ./Hastentry
nvim ./Hastentry
fleet ./Hastentry
```
<sub>If you want you can install our Visual Studio Code Extension here: -</sub>

## Run
To run a `.hast` or a `Hastentry` file, type to the console: 
- If you want to run the `main` section: `hast`
- If you want to run the `clear` section: `hast clear`
- If you want to run the `run` section: `hast run`
- If you want to run custom sections: `hast customName`
<br><br><b> Be aware that the `data` section will always run </b><br>
<b> Be aware that to run a `custom` section it needs to be declared with `hast-custom`</b>

## Overview
A 'Hastentry' is divided in 4 locations:
- #### Data: for defining variables
- #### Main: for normal uses
- #### Clean: for cleaning your mess
- #### Run: for running your code
- #### Others: to define your own functions
Each section is defined by putting `hast-` in front of each name, like this:
```Hast
hast-data
hast-main
hast-clear
hast-run
hast-custom
```

There are two types of locations:
## Data Entry
This is defined with: `hast-data` and it usually goes at the beggining of the file, there you define variables following this pattern:
```Hast
hast-data

*This defines a variable like:*
*$varName: varVal*

$hello: Hello, World!
$bye: Bye, World!
```

## Other Entries
In other entries like: `hast-main`, `hast-run` or `hast-clear` you can do two commands:

### (print)
You can print things to the screeen:
```Hast
hast-data
$hello: Hello,
hast-main
(print) $(hello) World!
```
<b> Be aware that variables overlap like this.</b>

### (run)
Use `(run)` to run commands:
```Hast
hast-data
$path = ./hello/main.ts
hast-main
(run) touch $(path)
```