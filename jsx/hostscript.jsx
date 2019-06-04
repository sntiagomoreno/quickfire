/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

var files

// JPG Options;
var jpgSaveOptions = new JPEGSaveOptions();  
jpgSaveOptions.embedColorProfile = true;  
jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;  
jpgSaveOptions.matte = MatteType.NONE;  
jpgSaveOptions.quality = 8; 
jpgSaveOptions.artboardRange = '1'; 

var pngOptions = new PNGSaveOptions();  
pngOptions.compression = 9;  
pngOptions.interlaced = false;

var png8Options = new ExportOptionsSaveForWeb();
png8Options.format = SaveDocumentType.PNG;
png8Options.PNG8 = true;
png8Options.quality = 100;

function getLayers() {
    var doc = activeDocument;
    var allLayers = [];
    var allLayers = collectAllLayers(doc, allLayers);
    var res;

    function collectAllLayers (doc, allLayers){
        
        for (var m = 0; m < doc.layers.length; m++){
            var theLayer = doc.layers[m];
            // alert(theLayer.kind + 'and ' + theLayer.typename +  'is ' + theLayer.name)
            if (theLayer.typename === "ArtLayer"){
                if(theLayer.kind == "LayerKind.SMARTOBJECT") {
                    allLayers.push('"'+theLayer.name+'"');
                }
            } else {

                collectAllLayers(theLayer, allLayers);
            }
        }
        // alert(allLayers);
        res = allLayers;
    }
    
    return res
}

function selectFiles(){
    var input = File.openDialog("Select Files", "*.*",true)
    // files = input.getFiles(/\.(jpg|tif|psd|bmp|gif|png|psb|)$/i)
    files = input
    
    if (input != undefined) {
        // for (var i = 0; i < input.length; i++) {
        //     alert(input[i])
        // }
        if (input.length > 1) {
            return '[Multiple files selected]'
        } else {
            return input[0]
        }
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

function run(value, source, target, format){
    var doc = activeDocument;

    // alert(value)
    if(value == "selected"){
        returnLayer(activeDocument.activeLayer, files, target, format)
    } else {
        // alert('finding')
        findLayer(doc, value, source, target, format)
        
    }
    // for (var i = 0; i < files.length; i++) {
    //     var selected = files[i];
    //     parent = replaceContents(selected, parent)
    //     // Save JPG
    //     activeDocument.saveAs((new File(thePath + '/Edited/' + activeDocument.name + '_' +selected.name + ".jpg")), jpgSaveOptions, true,Extension.LOWERCASE);
        
    // }
}

function findLayer(parent, value, source, target) {
   
    var layers = parent.layers;
	var len = layers.length;
	var match = false;

    // iterate through layers to find a match
	for (var i = 0; i < len; i++) {
         
		// test for matching layer
		var layer = layers[i];
		if (layer.name.toLowerCase() == value.toLowerCase()) {
			// select matching layer
            // alert('finding layer')
			activeDocument.activeLayer = layer;
			match = true;
			break;
		}
		// handle groups (layer sets)
		else if (layer.typename == 'LayerSet') {
			match = findLayer(layer, value);
			if (match) {
				break;
			}
		}
	}
    // alert(match)
	if (match) {
        returnLayer(activeDocument.activeLayer, source, target)
    }
}


function returnLayer(parent, source, target, format) {
    if(parent.kind == "LayerKind.SMARTOBJECT") {
        // var input = new Folder(source)
        // var files = input.getFiles(/\.(jpg|tif|psd|bmp|gif|png|)$/i)
        // var subFolder = new Folder(activeDocument.path + '/Edited/')
        // if (!subFolder.exists){subFolder.create()};
        // alert(format)
        alert(source.length)

        if (source.length > 1) {
            for (var i = 0; i < source.length; i++) {
                var selected = source[i];
                parent = replaceContents(selected, parent)
                if(format == "jpg") {
                    // Save JPG
                    activeDocument.saveAs((new File(target + '/' +selected.name + ".jpg")), jpgSaveOptions, true,Extension.LOWERCASE);
                } else  if (format == "png8") {
                    activeDocument.exportDocument((new File(target + '/' +selected.name + ".png")), ExportType.SAVEFORWEB, png8Options);
                } else if (format == "png24") {
                    activeDocument.saveAs((new File(target + '/' +selected.name + ".png")), pngOptions, true,Extension.LOWERCASE);
                } 
            }
        } else {
            alert(source.length)
        }
    } else {
        alert("Selected layer is not a Smart Object")
    }
}

function replaceContents(newFile, theSO) {
    activeDocument.activeLayer = theSO;
    // =======================================================
    var idplacedLayerReplaceContents = stringIDToTypeID("placedLayerReplaceContents");
    var desc3 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    desc3.putPath(idnull, new File(newFile));
    var idPgNm = charIDToTypeID("PgNm");
    desc3.putInteger(idPgNm, 1);
    executeAction(idplacedLayerReplaceContents, desc3, DialogModes.NO);
    return app.activeDocument.activeLayer
}

function getFiles(input) {
    if (input.name.match(/\.(psd|tif|jpg|png|psb)$/i) != null || input.constructor.name == "Folder") {
        return true
    };
}

function openOutput(folder) {
    var openFolder = Folder(folder)
    openFolder.execute()
}
