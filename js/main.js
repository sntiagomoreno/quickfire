/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
    'use strict';

    function evalScript(command) {
        return new Promise(function(resolve, reject) {
            csInterface.evalScript(command, resolve);
        });
    }

    
    var csInterface = new CSInterface();

    function loadJSX(fileName) {
        var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + "/jsx/";
        csInterface.evalScript('$.evalFile("' + extensionRoot + fileName + '")');
    }

   

    
    function init() {
                
        initColors();
        loadJSX('json.js')

        var text = document.getElementById('input_name')
        var outputText = document.getElementById('output_name')
        var inputFolder = undefined
        var outputFolder = undefined
        var layerDropdown = document.getElementById("select_layer")

        evalScript(`getLayers()`)
            .then(function(res) {
                var json = JSON.parse("[" + res + "]");
                console.log(json)
                // return evalScript(`selectFiles()`)
                for (let i = 0; i < json.length; i++) {
                    const element = json[i];
                    var el = document.createElement("option")
                    el.textContent = element;
                    el.value = element;
                    layerDropdown.appendChild(el)
                }
            });
                
        // document.getElementById("btn_test").addEventListener('click', function () {
        //     csInterface.evalScript('sayHello()');
        // });

        document.getElementById("input_file").addEventListener('click', function () {
            evalScript(`selectFiles("${text}")`)
                .then(function(res) {
                    text.innerHTML = res
                    inputFolder = res
                    // return evalScript(`selectFiles()`)
                });
                // .then(function(res)) {

                // }
        });

        document.getElementById("output_file").addEventListener('click', function () {
            evalScript(`output()`)
                .then(function(res) {
                    outputText.innerHTML = res
                    outputFolder = res
                    // return evalScript(`selectFiles()`)
                });
                // .then(function(res)) {

                // }
        });

        document.getElementById("run").addEventListener('click', function () {
            evalScript(`run()`)
                .then(function(res) {
                    // return evalScript(`selectFiles()`)
                });
                // .then(function(res)) {

                // }
        });

      

    }
        
    init();

}());
    
