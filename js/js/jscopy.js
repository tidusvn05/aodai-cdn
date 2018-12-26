$(document).ready(function(){
    var dataCopy = {};
    var targetCopy = null;
    var dataText = "";
    $(".select2-input").focusin(function(){
        if($(this).parent().parent().parent().attr("id")){
            targetCopy = { 
                id: $(this).parent().parent().parent().attr("id"),
                input: $(this).attr("id")
            };
            var _targetCopy = targetCopy.id.split("_");
            targetCopy.target = _targetCopy[1];
        }
    }).focusout(function(){
        targetCopy = null;
    });

    function clipboard(elem) {
        // create hidden text element, if it doesn't already exist
        var targetId = "_hiddenCopyText_";
        var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
        var origSelectionStart, origSelectionEnd;
        if (isInput) {
            // can just use the original source element for the selection and copy
            target = elem;
            origSelectionStart = elem.selectionStart;
            origSelectionEnd = elem.selectionEnd;
        } else {
            // must use a temporary form element for the selection and copy
            target = document.getElementById(targetId);
            if (!target) {
                var target = document.createElement("textarea");
                target.style.position = "absolute";
                target.style.left = "-9999px";
                target.style.top = "0";
                target.id = targetId;
                document.body.appendChild(target);
            }
            target.textContent = elem.textContent;
        }
        // select the content
        var currentFocus = document.activeElement;
        target.focus();
        target.setSelectionRange(0, target.value.length);
        
        // copy the selection
        var succeed;
        try {
              succeed = document.execCommand("copy");
        } catch(e) {
            succeed = false;
        }
        // restore original focus
        if (currentFocus && typeof currentFocus.focus === "function") {
            currentFocus.focus();
        }
        
        if (isInput) {
            // restore prior selection
            elem.setSelectionRange(origSelectionStart, origSelectionEnd);
        } else {
            // clear temporary content
            target.textContent = "";
        }
        return succeed;
    }


    var keyCode, isShift, isCtrl;
    $(document).keydown(function(e){
        if(targetCopy){
            var keywork = true;
            if (window.event) {
                keyCode = window.event.keyCode;
                isShift = !!window.event.shiftKey;
                isCtrl = !!window.event.ctrlKey;
            } else {
                keyCode = e.which;
                isShift = !!e.shiftKey;
                isCtrl = !!e.ctrlKey;
            }
            switch(keyCode){
                case 67:
                    if(isCtrl){
                        dataCopy.aodaihousing_id = targetCopy.target;
                        dataCopy.aodaihousing_data = [];
                        dataCopy.aodaihousing_module = module;
                        $("#" + targetCopy.id).find("li.select2-search-choice div:first-child").each(function(){
                            dataCopy.aodaihousing_data.push($(this).attr("title"));
                        });
                        $("#" + targetCopy.input).val(JSON.stringify(dataCopy));
                        clipboard(document.getElementById(targetCopy.input));
                        $("#" + targetCopy.input).val('');
                        $("#" + targetCopy.target).select2("close");
                    } else {
                        keywork = false;
                    }
                    break;

                case 46:
                    var addData = [];
                    if(!isShift){
                        var currentData = [];
                        $("#" + targetCopy.id).find("li.select2-search-choice div:first-child").each(function(){
                            currentData.push($(this).attr("title"));
                        });
                        for(var i in currentData){
                            if(i < currentData.length - 1){
                                addData.push({
                                    id: $("#" + targetCopy.target + " option:contains('" + currentData[i] + "')").val(),
                                    text: currentData[i] 
                                });
                            }
                        }
                    }
                    $("#" + targetCopy.target).select2("data", addData);
                    $("#" + targetCopy.target).select2("close");
                    break;

                case 86:
                    dataText = $("#" + targetCopy.input).val();
                    $("#" + targetCopy.input).val('');

                default:
                    keywork = false;
            }
            if(keywork){
                e.preventDefault();
                return false;
            }
        }
    }).keyup(function(e){
        if(targetCopy){
            var keywork = true;
            if (window.event) {
                keyCode = window.event.keyCode;
                isShift = !!window.event.shiftKey;
            } else {
                keyCode = e.which;
                isShift = !!e.shiftKey;
            }
            switch(keyCode){
                case 86:
                    if(isCtrl){
                        var dataString = $("#" + targetCopy.input).val();
                        if (/^[\],:{}\s]*$/.test(dataString.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                            var dataPaste = JSON.parse(dataString);
                            if(dataPaste.aodaihousing_id != null){
                                $("#" + targetCopy.input).val('');
                                if(dataPaste.aodaihousing_id == targetCopy.target && module == dataPaste.aodaihousing_module){
                                    var currentData = [];
                                    if(!isShift){
                                        $("#" + targetCopy.id).find("li.select2-search-choice div:first-child").each(function(){
                                            currentData.push($(this).attr("title"));
                                        });
                                    }
                                    for(var i in dataPaste.aodaihousing_data){
                                        if(currentData.indexOf(dataPaste.aodaihousing_data[i]) == -1){
                                            currentData.push(dataPaste.aodaihousing_data[i]);
                                        }
                                    }
                                    var addData = [];
                                    for(var i in currentData){
                                        addData.push({
                                            id: $("#" + targetCopy.target + " option:contains('" + currentData[i] + "')").val(),
                                            text: currentData[i] 
                                        });
                                    }
                                    $("#" + targetCopy.target).select2("data", addData);
                                    $("#" + targetCopy.target).select2("close");
                                } else {
                                    $("#" + targetCopy.target).select2("close");
                                }
                            }
                        } else {
                            keywork = false;
                            dataText = dataString;
                        }
                        $("#" + targetCopy.input).val(dataText);
                    }
                    break;

                default:
                    keywork = false;
            }
            if(keywork){
                e.preventDefault();
                return false;
            }
        }
    });
});