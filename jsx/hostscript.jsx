/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

var files
var doc = activeDocument;
var allLayers = [];

function selectFiles(){
    alert(activeDocument.path)
    var input = Folder.selectDialog("Select Folder")
    files = input.getFiles(/\.(jpg|tif|psd|bmp|gif|png|psb|)$/i)
    if (input != null) {
        var inputData = {
            name: input.name,
            path: input.path,
            fullName: input.fullName,
            fsName: input.fsName,
            relativeURI: input.relativeURI,
            absoluteURI: input.absoluteURI
        }
        return inputData.absoluteURI
    }
}

function output(){
    var input = Folder.selectDialog("Select Output Folder")
    // var files = input.getFiles(/\.(jpg|tif|psd|bmp|gif|png|)$/i)
    if (input != null) {
        var inputData = {
            name: input.name,
            path: input.path,
            fullName: input.fullName,
            fsName: input.fsName,
            relativeURI: input.relativeURI,
            absoluteURI: input.absoluteURI
        }
        return inputData.absoluteURI
    }
}

function run(){
    for (var i = 0; i < files.length; i++) {
        var selected = files[i];
        parent = replaceContents(selected, parent)
        // Save JPG
        activeDocument.saveAs((new File(thePath + '/Edited/' + activeDocument.name + '_' +selected.name + ".jpg")), jpgSaveOptions, true,Extension.LOWERCASE);
        
    }
}

function getLayers(){
    collectAllLayers(doc, allLayers);
    // return 'hello'
    // collectAllLayers(theParent, level, allLayers)
}

function collectAllLayers(parent, allLayers) {
    for (var m = 0; m < parent.layers.length; m++)
    {
        var currentLayer = parent.layers[m];
        if (currentLayer.typename === "ArtLayer")
        {
            allLayers.push(currentLayer);
        }
        else {
            collectAllLayers(currentLayer, allLayers);
        }
        alert(allLayers)
    }
    return allLayers;
}

function getFiles(input) {
    if (input.name.match(/\.(psd|tif|jpg|png|psb)$/i) != null || input.constructor.name == "Folder") {
        return true
    };
}
