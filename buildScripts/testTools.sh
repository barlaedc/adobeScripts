#!/bin/sh

## DEBUG VARIABLES
## pos values - OFF, ON, WARNING, ERROR
## off - log nothing
## on - log everything
## warning - log warning or error
## error - log only errors.
_DEBUG="OFF"

## DEBUG functions
function logLine ()
{
	if [ $_DEBUG == "ON" ] ; then
		echo $1
	fi
}

function logWarning ()
{
	if [ $_DEBUG == "ON" ] ; then
		echo $1
	elif [ $_DEBUG == "WARNING" ] ; then
		echo $1
	elif [ $_DEBUG == "ERROR" ] ; then
		echo $1
	fi		
}

function logError ()
{
	if [ $DEBUG == "ON" ] ; then
		echo $1
	elif [ $_DEBUG == "ERROR" ] ; then
		echo $1
	fi
}

## CODE VARIABLES
HELP=false
CLEANUP=true
COMPILEJSXFILE="test.jsx"

## DEFAULT VARiABLES
CURDIR="$(pwd)"
SRCROOT=$(dirname "$CURDIR")/
PATHSEP=";"
TESTFOLDER="tests"
TESTFILESLOCATION="$SRCROOT$TESTFOLDER"
BINFOLDER="bin"

## HELP functions
function helpInfo ()
{
	echo "TestTools Help"
	echo ""
	echo "This tool tests all the samples or a specific one"
	echo ""
	echo "OPTIONAL args"
	echo ""
	echo "c - BOOLEAN - Don't cleanup, leave intermediate files, good for debugging"
	echo "D - STRING - default OFF, values are"
	echo "    OFF - show nothing"
	echo "    ON - show everything"
	echo "    WARNING - show warnings and errors"
	echo "    ERROR - show errors only"
	echo "h - BOOLEAN - shows this message"
	echo ""
}

while getopts cD:hT: opt
do
	case $opt in 
		c) CLEAN=false;;
		D) _DEBUG=$OPTARG;;
		h) HELP=true;;
		T) TOOLNAME="$OPTARG";;
	esac
done

if [ "$HELP" == true ] ; then
	helpInfo
	exit;
fi

logLine "Running TestTools"
logLine "_DEBUG === $_DEBUG"
logLine "HELP === $HELP"
logLine "TOOLNAME === $TOOLNAME"
logLine "CURDIR === $CURDIR"
logLine "SRCROOT === $SRCROOT"
logLine "TESTFOLDER === $TESTFOLDER"

## find all TEST files
JSXFILES=$(find "$TESTFILESLOCATION" -type f -name '*.jsx')

JSXCODE0="#target 'indesign'\n"

for JSXFILE in "$JSXFILES"; do

	logLine "JSXFILE === $JSXFILE"
	JSXBINFILEPATH=$(basename "$JSXFILE")$JSXBINFOLDER
	logLine "JSXBINFILEPATH === $JSXBINFILEPATH"
	JSXBINPATH=$JSXBUILTLOCATION$JSXBINFILEPATH
	logLine "JSXBINPATH === $JSXBINPATH"
	
	COUNT="0"
	
	
	## code to compile jsxbin

	JSXCODE1="var testFile$COUNT = File ( '$JSXFILE')\n"
	JSXCODE2="$.evalFile ( testFile$COUNT)\n"
		
	JSXCODE=$JSXCODE1$JSXCODE2
done

	JSXCODE=$JSXCODE0$JSXCODE
	## this is not a log line.
	logLine "$JSXCODE"
	echo $JSXCODE > $JSXBINOUTPUTLOCATION$COMPILEJSXFILE

	logLine "input == $JSXFILE"
	logLine "output == $JSXBINPATH"
	logLine "CALLING - /Applications/Adobe\ ExtendScript\ Toolkit\ CC/ExtendScript\ Toolkit.app/Contents/MacOS/ExtendScript\ Toolkit -cmd $JSXBINOUTPUTLOCATION$COMPILEJSXFILE"
	/Applications/Adobe\ ExtendScript\ Toolkit\ CC/ExtendScript\ Toolkit.app/Contents/MacOS/ExtendScript\ Toolkit -cmd "$JSXBINOUTPUTLOCATION$COMPILEJSXFILE"
	
