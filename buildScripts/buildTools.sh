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
COMPILEJSXFILE="compile.jsx"

## DEFAULT VARiABLES
CURDIR="$(pwd)"
SRCROOT=$(dirname "$CURDIR")/
PATHSEP=";"
JSXFOLDER="JavaScripts"
JSXBINFOLDER="bin"
JSXBUILTFOLDER="built"
JSXFILESLOCATION="$SRCROOT$JSXFOLDER"
JSXBINOUTPUTLOCATION="$SRCROOT$JSXBINFOLDER"/
JSXBUILTLOCATION="$SRCROOT$JSXBUILTFOLDER"/
JSOBJECTSFOLDER="jsObjects/"
UIOBJECTSFOLDER="uiObjects/"
INCPATH="$SRCROOT$JSOBJECTSFOLDER$PATHSEP$SRCROOT$UIOBJECTSFOLDER"

## HELP functions
function helpInfo ()
{
	echo "BuildTools Help"
	echo ""
	echo "This tool builds all the samples or a specific one"
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
	echo "T - STRING - The toolname to build"
	echo ""
}

while getopts cD:hT: opt
do
	case $opt in 
		c) CLEANUP=false;;
		D) _DEBUG=$OPTARG;;
		h) HELP=true;;
		T) TOOLNAME="$OPTARG";;
	esac
done

if [ "$HELP" == true ] ; then
	helpInfo
	exit;
fi

logLine "Running BuildTools"
logLine "_DEBUG === $_DEBUG"
logLine "HELP === $HELP"
logLine "TOOLNAME === $TOOLNAME"
logLine "CURDIR === $CURDIR"
logLine "SRCROOT === $SRCROOT"
logLine "JSXFOLDER === $JSXFOLDER"
logLine "JSXBINFOLDER === $JSXBINFOLDER"
logLine "JSXFILESLOCATION === $JSXFILESLOCATION"
logLine "INCPATH === $INCPATH"

## find all JSX files
JSXFILES=$(find "$JSXFILESLOCATION" -type f -name '*.jsx')

for JSXFILE in "$JSXFILES"; do

	logLine "JSXFILE === $JSXFILE"
	JSXBINFILEPATH=$(basename "$JSXFILE")$JSXBINFOLDER
	logLine "JSXBINFILEPATH === $JSXBINFILEPATH"
	JSXBINPATH=$JSXBUILTLOCATION$JSXBINFILEPATH
	logLine "JSXBINPATH === $JSXBINPATH"
	
	## TBD : add code to remove jsxbin files for all jsx files found
	if [ -f "$JSXBINPATH" ] ; then
		logLine "$JSXFILEBINPATH exists deleting"
		rm "$JSXBINPATH"
	fi
	
	
	
	## code to compile jsxbin
	JSXCODE0="#target estoolkit#dbg\n"
	JSXCODE1="var scriptPath = '$JSXFILE';\n"
	JSXCODE2="var bundlePath = '$JSXBINPATH';\n"
	JSXCODE3="var incPath = '$INCPATH';\n"
	JSXCODE4="var fileIn = File( scriptPath);\n"
	JSXCODE5="fileIn.open('r');\n"
	JSXCODE6="var s = fileIn.read();\n"
	JSXCODE7="fileIn.close();\n"
	JSXCODE8="var t = app.compile(s, fileIn.absoluteURI, incPath);\n"
	JSXCODE9="var fileOut = new File( bundlePath );\n"
	JSXCODE10="fileOut.open('w');\n"
	JSXCODE11="fileOut.write(t);\n"
	JSXCODE12="fileOut.close();\n"
	
	if [ -f "$JSXBINOUTPUTLOCATION$COMPILEJSXFILE" ] ; then 
		logLine "$COMPILEJSXFILE exists deleting"
		rm "$JSXBINOUTPUTLOCATION$COMPILEJSXFILE"
	fi
		
	JSXCODE=$JSXCODE0$JSXCODE1$JSXCODE2$JSXCODE3$JSXCODE4$JSXCODE5$JSXCODE6$JSXCODE7$JSXCODE8$JSXCODE9$JSXCODE10$JSXCODE11$JSXCODE12
	## this is not a log line.
	logLine "$JSXCODE"
	echo $JSXCODE > $JSXBINOUTPUTLOCATION$COMPILEJSXFILE

	logLine "input == $JSXFILE"
	logLine "output == $JSXBINPATH"
	logLine "CALLING - /Applications/Adobe\ ExtendScript\ Toolkit\ CC/ExtendScript\ Toolkit.app/Contents/MacOS/ExtendScript\ Toolkit -cmd $JSXBINOUTPUTLOCATION$COMPILEJSXFILE"
	/Applications/Adobe\ ExtendScript\ Toolkit\ CC/ExtendScript\ Toolkit.app/Contents/MacOS/ExtendScript\ Toolkit -cmd "$JSXBINOUTPUTLOCATION$COMPILEJSXFILE"
	
	if [ "$CLEANUP" == true ] ; then
		logLine "calling - rm  $JSXBINOUTPUTLOCATION$COMPILEJSXFILE"
		rm "$JSXBINOUTPUTLOCATION$COMPILEJSXFILE"
	fi
	
	## check required files have been created
	if [ ! -f "$JSXBINPATH" ] ; then
		echo "ERROR - compiled script not created."
	fi
done
