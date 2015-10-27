var MESSAGE_CONTAINER_CLASS = "_5yl5";
var CONVERSATION_WINDOW_CLASS = "conversation";
var MESSAGE_UPDATED_MARKER_ATTRIBUTE_NAME = "rsa-on-facebook-message-updated";
var OPEN_CONVERSATION_WINDOWS = [];
var REFRESH_OPEN_CONVERSATION_WINDOWS_TIMER = undefined;
var REFRESH_OPEN_CONVERSATION_WINDOW_DELAY_IN_MILLIS = 100;

var OBSERVER = new MutationObserver(newMessagesInConversationDetected);
//function (mutations) {
//    mutations.forEach(function(mutation) {
//        console.log(mutation.type);
//    });
//});

var OBSERVER_CONFIG = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
};

/**
 * Finds the open conversation windows.
 *
 * @return NodeList array containing the top level 'div's of the conversation windows.
 */
function findOpenConversations() {
    return document.querySelectorAll("." + CONVERSATION_WINDOW_CLASS);
}

/**
 * Finds all messages in an open conversation window.
 *
 * @return NodeList array containing all message 'div's inside the conversation window.
 */
function findMessagesInAllConversations() {
    return document.querySelectorAll("." + MESSAGE_CONTAINER_CLASS);
}

///**
// * Checks if an element is a message container.
// *
// * @param {Node} element The element to check.
// * @return Boolean
// */
//function isMessageContainer(element) {
//    return element.classList.contains(MESSAGE_CONTAINER_CLASS);
//}

/**
 * Updates/Replaces the message contained by 'message_container' with 'new_message'
 *
 * @param {Node} message_container The 'div' containing the message.
 * @param {string} new_message New message text for the displayed message.
 * @return undefined
 */
function updateMessageText(message_container, new_message) {
    message_container.children[0].innerHTML = new_message;
    message_container.setAttribute(MESSAGE_UPDATED_MARKER_ATTRIBUTE_NAME, true);
}

/**
 * Checks if a container had its message updated.
 *
 * @param {Node} message_container The 'div' containing the message.
 * @return Boolean true if the container had its message updated, or false otherwise.
 */
function hasMessageUpdated(message_container) {
    return message_container.hasAttribute(MESSAGE_UPDATED_MARKER_ATTRIBUTE_NAME);
}

function newMessagesInConversationDetected() {
    console.log("New messages must be there");
    var message_containers = findMessagesInAllConversations();
    for (var i = 0; i < message_containers.length; ++i) {
        var message_container = message_containers[i];
        if (!hasMessageUpdated(message_container)) {
            updateMessageText(message_containers[i], "changed");
        }
    }
}

/**
 * Searches the DOM for open windows and updates the global variable containing the list.
 * This function runs on loop with a set delay;
 *
 * NOTE: I was aware of the concurrency issue, but just didn't care enough. If index out of bounds exceptions are thrown I will fix it.
 *
 * @param {number} delayInMillis Time in milliseconds between refreshes.
 */
function startRefreshOpenConversationWindowsLoop(delayInMillis) {
    var openConversationWindows = findOpenConversations();
    for (var i = 0; i < openConversationWindows.length; ++i) {
        OBSERVER.observe(openConversationWindows[i], OBSERVER_CONFIG);
    }

    OPEN_CONVERSATION_WINDOWS = openConversationWindows;
    REFRESH_OPEN_CONVERSATION_WINDOWS_TIMER = setTimeout(startRefreshOpenConversationWindowsLoop, delayInMillis);
}

startRefreshOpenConversationWindowsLoop(REFRESH_OPEN_CONVERSATION_WINDOW_DELAY_IN_MILLIS);
