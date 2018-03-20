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