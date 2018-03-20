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