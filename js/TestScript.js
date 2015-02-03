$(document).ready(function () {
    // For testing purposes
    var debug = {
        active : false,
        RTC : false,
        Flash : true
    };

var RTCFlashSupport = (function () {
    // Check for existance of RTCPeerConnection
    // webkitRTCPeerConnection for Chrome/Opera
    // mozRTCPeerConnection for Firefox
    // !! ensures boolean
    var webRTCEnabled = !!window.webkitRTCPeerConnection || !!window.mozRTCPeerConnection;
    if (debug.active) {
        console.log("WebRTC support: " + webRTCEnabled);
    }

    var flashEnabled = false;

    try {
        // For IE 8-10, try to create ActiveXObject
        var dummyAXO = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if (dummyAXO) {
            flashEnabled = true;
        }
    } catch (e) {
        // If exception is thrown (not IE) check for other browsers support for flash 
        if (navigator.mimeTypes
         && navigator.mimeTypes['application/x-shockwave-flash'] != undefined
         && navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
            flashEnabled = true;
        }
    }
    if (debug.active) {
        console.log("Flash support: " + flashEnabled);
    }

    // Just for testing purposes
    if (debug.active) {
        webRTCEnabled = debug.RTC;
    }

    return {
        isWebRTCSupported: webRTCEnabled,
        isFlashSupported: flashEnabled
    }
})();

if (RTCFlashSupport.isWebRTCSupported) {
    $("body").append("<div class=\"support\">WebRTC supported</div>");
} else if (RTCFlashSupport.isFlashSupported) {
    $("body").append(
    "<div class=\"support_flash\"> \
        <object> \
            <param name=\"pic\" value=\"img/Window.swf\"> \
            <embed src=\"img/Window.swf\"> \
            </embed> \
        </object> \
    </div>");
} else {
    $("body").append("<div class=\"support\">Bad Luck</div>");
}
});