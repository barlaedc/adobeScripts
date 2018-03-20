#include "../jsObjects/createDocumentWH.jsx"
#include "../uiObjects/createDocumentUI.jsx"
  
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


