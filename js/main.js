/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
    'use strict';

    function evalScript(command) {
        return new Promise(function(resolve, reject) {
            csInterface.evalScript(command, resolve);
        });
    }

    function loadJSX(fileName) {
        var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + "/jsx/";
        csInterface.evalScript('$.evalFile("' + extensionRoot + fileName + '")');
    }

    var csInterface = new CSInterface();
    
    function init() {
                
        initColors();

        var text = document.getElementById('input_name')
        var outputText = document.getElementById('output_name')
        var inputFolder = undefined
        var outputFolder = undefined

        evalScript(`getLayers()`)
            .then(function(res) {
                console.log(res)
                // return evalScript(`selectFiles()`)
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
    
