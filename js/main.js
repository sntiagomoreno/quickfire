/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
    'use strict';

    function evalScript(command) {
        return new Promise(function(resolve, reject) {
            cs.evalScript(command, resolve);
        });
    }

    
    var cs = new CSInterface();

    function loadJSX(fileName) {
        var extensionRoot = cs.getSystemPath(SystemPath.EXTENSION) + "/jsx/";
        cs.evalScript('$.evalFile("' + extensionRoot + fileName + '")');
    }

    document.querySelector('#reload').addEventListener('click', function() { window.location.reload(true)})
    document.querySelector("#sources").addEventListener('click', function() { cs.openURLInDefaultBrowser(""); } );
    document.querySelector("#debug").addEventListener('click', function() { cs.openURLInDefaultBrowser("http://localhost:8088"); } );
    
    function init() {
                
        loadJSX('json.js')

        var text = document.getElementById('input_name')
        var outputText = document.getElementById('output_name')
        var inputFolder = undefined
        var outputFolder = undefined
        var layerDropdown = document.getElementById("select_layer")
        var formatDropdown = document.getElementById("format")
        var openOutput = document.getElementById("open")
        var runBtn = document.getElementById("run")
        var outputBtn = document.getElementById("output_file")

        evalScript(`getLayers()`)
            .then(function(res) {
                console.log(res)
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
            evalScript(`selectFiles()`)
                .then(function(res) {
                    if(res != "undefined") {
                        text.children[0].innerHTML = res
                        inputFolder = res
                        outputBtn.disabled = false
                    }
                })
        });

        document.getElementById("output_file").addEventListener('click', function () {
            evalScript(`output()`)
                .then(function(res) {
                    if(res != "undefined") {
                        outputText.children[0].innerHTML = res
                        outputFolder = res
                        openOutput.disabled = false
                        runBtn.disabled = false
                    }
                })
        });

        document.getElementById("run").addEventListener('click', function () {
            if(inputFolder == undefined && outputFolder == undefined) {
                alert('No input or output specified')
            } else {
                evalScript(`run("${layerDropdown.options[layerDropdown.selectedIndex].value}","${inputFolder}","${outputFolder}","${formatDropdown.options[formatDropdown.selectedIndex].value}")`)
                .then(function(res) {
                    // return evalScript(`selectFiles()`)
                    // console.log(res)
                });
            }
        });

        openOutput.addEventListener('click', function() {
            if(!openOutput.disabled) {
                evalScript(`openOutput("${outputFolder}")`)
            }
        })

        cs.addEventListener(CSInterface.THEME_COLOR_CHANGED_EVENT, setBgColor);

        function setBgColor() {
            var appColor = cs.getHostEnvironment().appSkinInfo.panelBackgroundColor.color;
            document.body.style.backgroundColor = 'rgb('+ Math.floor(appColor.red) + ', ' + Math.floor(appColor.green) + ', ' + Math.floor(appColor.blue) + ')';
        }

        setBgColor();

    }
        
    init();

}());
    
