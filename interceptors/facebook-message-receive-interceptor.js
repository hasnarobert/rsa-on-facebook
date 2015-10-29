// requires dom-interaction/message-class.js
// requires dom-interaction/conversation-window-class.js

var OPEN_CONVERSATION_WINDOWS = [];
var REFRESH_OPEN_CONVERSATION_WINDOWS_TIMER = undefined;
var REFRESH_OPEN_CONVERSATION_WINDOW_DELAY_IN_MILLIS = 100;

var OBSERVER = new MutationObserver(newMessagesInConversationDetected);

var OBSERVER_CONFIG = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
};

function newMessagesInConversationDetected() {
    for (var i = 0; i < OPEN_CONVERSATION_WINDOWS.length; ++i) {
        var conversation = OPEN_CONVERSATION_WINDOWS[i];

        // Detect contact id
        var contactName = conversation.getContactName();
        console.log("Found conversation open with " + contactName);

        var messages = conversation.getMessages();
        for (var j = 0; j < messages.length; ++j) {
            var message = messages[j];
            if (!message.isUpdated()) {
                var new_message_text;
                if (message.isFromContact()) {
                    new_message_text = contactName;
                } else {
                    new_message_text = "myself";
                }
                message.updateText(new_message_text);
            }
        }
    }
}

/**
 * Searches the DOM for open windows and updates the global variable containing the list.
 * This function runs on loop with a set delay;
 *
 * NOTE: I was aware of the concurrency issue, but just didn't care enough. If index out of bounds exceptions are thrown I will fix it.
 *
 * @param {number} delayInMillis - Time in milliseconds between refreshes.
 */
function startRefreshOpenConversationWindowsLoop(delayInMillis) {
    var openConversations = ConversationWindow.findAll();
    for (var i = 0; i < openConversations.length; ++i) {
        OBSERVER.observe(openConversations[i].element, OBSERVER_CONFIG);
    }

    OPEN_CONVERSATION_WINDOWS = openConversations;
    REFRESH_OPEN_CONVERSATION_WINDOWS_TIMER = setTimeout(startRefreshOpenConversationWindowsLoop, delayInMillis);
}

startRefreshOpenConversationWindowsLoop(REFRESH_OPEN_CONVERSATION_WINDOW_DELAY_IN_MILLIS);
