/**
 * Inject a script into document with the contents of 'source' parameter.
 * @param source Source code to be injected into document.
 */
function injectScript(source) {
    var elem = document.createElement("script");
    elem.type = "text/javascript";
    elem.innerHTML = source;
    document.documentElement.appendChild(elem);
}

function setupXMLHttpRequestInterceptor() {
    var isChatMessage = false;

    var originalOpen = window.XMLHttpRequest.prototype.open;

    function proxyOpen(method, path, async) {
        if (method == "POST" && path.startsWith("/ajax/mercury/send_messages.php")) {
            isChatMessage = true;
        }

        return originalOpen.apply(this, [].slice.call(arguments));
    }

    window.XMLHttpRequest.prototype.open = proxyOpen;

    var originalSend = window.XMLHttpRequest.prototype.send;

    function proxySend(method, path, async) {
        if (isChatMessage == true) {
            var messagePayload = arguments[0];
            var startOfMessage = 7 + messagePayload.indexOf("[body]");
            var endOfMessage = messagePayload.indexOf("&", startOfMessage);
            var message = messagePayload.substring(startOfMessage, endOfMessage);
            console.log(message);
            isChatMessage = false;

            arguments[0] = messagePayload.substring(0, startOfMessage) + "muhahaha" + messagePayload.substring(endOfMessage);
        }

        return originalSend.apply(this, [].slice.call(arguments));
    }

    //alert("injected");

    window.XMLHttpRequest.prototype.send = proxySend;

}

injectScript("(" + setupXMLHttpRequestInterceptor.toString() + ")()");
