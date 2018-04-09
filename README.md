# adobeScripts
a collection of scripts used to automate some process'

## Folders

### buildScripts
bash scripts for osx, that build and install the scripts.

### JavaScripts
This is the actual script that is used to create the jsxbin file that is installed and run when the script is run, ths scripts in this folder would normally call a object from uiScripts, and use the settings from that object and then call an equivalent script from jsObjects.

### jsObjects
This is a collection of JavaScript objects that actually do all the work, by separating them out it makes it easier to maintain and test.

### uiObjects
This is a collection of ScriptUI scripts that create teh UI required for the tools.

## installation

### Just install

Go to the releases tab, download the files you want, and place them in the required tools scripts panel folder.

### Build and install

Clone the repository, run the script located in buildScripts/buildTools.sh.

## Reason for these scripts

These scripts are created for a specific purpose, normally because we needed a new document with certain things and have to redo it constantly so create a script to do it for us. Others are just variations on the script to learn about a new technology or method that is available in the Adobe Suite.
