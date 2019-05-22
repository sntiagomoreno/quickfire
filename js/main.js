/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
    'use strict';

    var csInterface = new CSInterface();
    
    function init() {
                
        initColors();
                
        document.getElementById("btn_test").addEventListener('click', function () {
            csInterface.evalScript('sayHello()');
        });

        document.getElementById("input_file").addEventListener('click', function () {
            csInterface.evalScript('selectFiles()');
        });
    }
        
    init();

}());
    
