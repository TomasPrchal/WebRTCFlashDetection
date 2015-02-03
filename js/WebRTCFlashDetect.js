// global with properties with bool values for supported technology
// isWebRTCSupported bool
// isFlashSupported bool
var RTCFlashSupport = (function () {
    // Check for existance of RTCPeerConnection
    // webkitRTCPeerConnection for Chrome/Opera
    // mozRTCPeerConnection for Firefox
    // !! ensures boolean
    var webRTCEnabled = !!window.webkitRTCPeerConnection || !!window.mozRTCPeerConnection;

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

    return {
        isWebRTCSupported: webRTCEnabled,
        isFlashSupported: flashEnabled
    }
})();