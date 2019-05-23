/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

var files

function getLayers() {
    var doc = activeDocument;
    var allLayers = [];
    var allLayers = collectAllLayers(doc, allLayers);
    var res;

    function collectAllLayers (doc, allLayers){
        for (var m = 0; m < doc.layers.length; m++){
            var theLayer = doc.layers[m];
            if (theLayer.typename === "ArtLayer"){
                allLayers.push('"'+theLayer.name+'"');
            }else{
                collectAllLayers(theLayer.name, allLayers);
            }
        }
        alert(allLayers);
        res = allLayers;
    }
    
    return res
}

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


function getFiles(input) {
    if (input.name.match(/\.(psd|tif|jpg|png|psb)$/i) != null || input.constructor.name == "Folder") {
        return true
    };
}
