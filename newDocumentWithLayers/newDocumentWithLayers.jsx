// actual code that does the work
// Simple object that does the lifting, see each function for specifics on what happens
function CreateDocument () 
{
            this.numPages = null;
            this.layerNames = [];   
            this.detailsTextFrames = false;
            
            this.initialBounds = [10, 10, 15, 25];
            this.newBounds = [];
}
// Function: getNewBounds
// This moves the location of the text box by a little so that they are not drawn on top of each other
CreateDocument.prototype.getNewBounds = function ( intNumBoxes)
{
    // to allow for zero
    intNumBoxes++;
    var newBounds = []
    newBounds.push (this.initialBounds[0] * intNumBoxes);
    newBounds.push (this.initialBounds[1]);
    newBounds.push (this.initialBounds[2] * intNumBoxes);
    newBounds.push (this.initialBounds[3]);
    return newBounds;
}
//Function: setNumPages
// Set the number of pages to be placed in the document, this is used by a loop later, which just loops until the number of pages in the document match the number here
CreateDocument.prototype.setNumPages = function ( intNumPages)
{
    if ( !isNaN (parseInt ( intNumPages , 10) ))
    {
        this.numPages = intNumPages;
    }
}

CreateDocument.prototype.setLayerNames = function ( strLayerNames)
{
    if ( strLayerNames.indexOf(";") !== -1)
    {
        this.layerNames = strLayerNames.split(";");
    }
    else
    {
        this.layerNames.push ( strLayerNames);
     }
 }

CreateDocument.prototype.setAddTextFrames = function ( boolTextFrames)
{
    if ( ( boolTextFrames == true) || ( boolTextFrames == false))
    {
        this.detailsTextFrames = boolTextFrames;
    }
}

CreateDocument.prototype.run = function ()
{
    if (( this.numPages !== null) && ( this.layerNames.length !== 0))
    {
        var newDoc = app.documents.add ();
        for ( var i = newDoc.pages.length; i < this.numPages; i++)
        {
            newDoc.pages.add();
        }
        for ( var i = 0; i < this.layerNames.length; i++)
        {
            if ( i <  newDoc.layers.length)
            {
                newDoc.layers[i].name = this.layerNames[i];
            }
            else
            {
                var newLayer = newDoc.layers.add();
                newLayer.name = this.layerNames[i];
            }
        }
    }
    if ( this.detailsTextFrames)
    {
        for ( var k = 0; k < newDoc.layers.length; k++)
        {
            var curLayer = newDoc.layers[k];
            newDoc.activeLayer = curLayer;
            for ( var j = 0; j < newDoc.pages.length; j++)
            {
                var curPage = newDoc.pages[j];
                var textString = "This is layer " + curLayer.name + " on page " + curPage.name;
                var curTextFrame = curPage.textFrames.add();
                curTextFrame.geometricBounds =this.getNewBounds ( k);
                curTextFrame.contents = textString;
             }
         }
    }
}

// UI
function CreateDocumentUserInterface  ()
{
        this.winRef = null;
       
        this.leftEdge = 15;
        this.rightEdge = 300;
        this.startTop = 10;
        this.startBottom = 35;
        this.spacing = 25;
        this.spacingAndTen = 35;
        this.buttonSpacing = 40;
}

CreateDocumentUserInterface.prototype.bump = function ( boolFull)
{
    var normalSpacing = this.spacing;
    if ( !boolFull)
    {
        normalSpacing =this.spacingAndTen
    }
    this.startTop = this.startTop + normalSpacing;
    this.startBottom = this.startBottom + normalSpacing;
}

CreateDocumentUserInterface.prototype.bumpButtons = function ( )
{
    this.startTop = this.startTop + this.buttonSpacing;
    this.startBottom = this.startBottom + this.buttonSpacing;
}

CreateDocumentUserInterface.prototype.getCoords = function ()
{
    return [ this.leftEdge, this.startTop, this.rightEdge, this.startBottom];
}

CreateDocumentUserInterface.prototype.run = function ()
{
    var win = new Window ( "dialog", "NewDocPalette", [100, 100, 500, 375]);
    this.winRef = win;
    win.btnPanel = win.add ( "panel", [25,15,370,245], "NewDocPalette");

    win.btnPanel.numPagesString = win.btnPanel.add ( "statictext", this.getCoords(), "Enter number of pages:");
    this.bump(true);
    win.btnPanel.numPages = win.btnPanel.add ("edittext",this.getCoords(), "1");
    this.bump(true);
    win.btnPanel.nameLayersString = win.btnPanel.add ( "statictext", this.getCoords(), "Enter names of layer(s):");
    this.bump(true);
    win.btnPanel.nameLayerStringEtc = win.btnPanel.add("statictext",this.getCoords(), "(semi-colon separated list)");
    this.bump(true);
    win.btnPanel.nameLayers = win.btnPanel.add ("edittext",this.getCoords(), "layerName");
    this.bump(false);
    win.btnPanel.addTextFrames = win.btnPanel.add ( "checkbox", this.getCoords(), "Check to add details text frame");
    this.bumpButtons();
    win.btnPanel.okBtn = win.btnPanel.add ( "button", [this.leftEdge, this.startTop, 105, this.startBottom], "OK");
    win.btnPanel.cancelBtn = win.btnPanel.add ( "button", [120,this.startTop, 210,this.startBottom], "Cancel");

    win.btnPanel.okBtn.onClick = function () 
    {
        win.close([ true, win.btnPanel.numPages.value, win.btnPanel.nameLayers.value]);
    }
    win.btnPanel.cancelBtn.onClick = function ()
    {   
        win.close([false]);
    }

   return  win;
}
   
var myWindow =  new CreateDocumentUserInterface().run();
var retValue = myWindow.show();
var numPages = myWindow.btnPanel.numPages.text;
var nameLayers = myWindow.btnPanel.nameLayers.text;
var detailChk = myWindow.btnPanel.addTextFrames.value;

if (( numPages !== null) && ( nameLayers !== ""))
{
        var createDocument = new CreateDocument ();
        createDocument.setNumPages (numPages);
        createDocument.setLayerNames (nameLayers);
        createDocument.setAddTextFrames ( detailChk);
        createDocument.run();
}


