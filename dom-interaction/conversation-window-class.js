/**
 * A ConversationWindow is a wrapper around a conversation window element in DOM which provides
 * utility function for interaction.
 *
 * @class ConversationWindow
 * @public
 * @type {Object}
 * @constructor
 * @property {Node} element - The DOM element
 * @property {string} contactName -
 */
var ConversationWindow = function (element) {
    this.element = element;
    this.contactName = this.element.querySelectorAll(ConversationWindow.prototype.CONTACT_NAME_CONTAINER_CLASS)[0].children[0].children[0].innerHTML;
};

/**
 * Name of the css class which only open conversation windows have.
 * @const {string}
 * */
ConversationWindow.prototype.CONVERSATION_WINDOW_CLASS = ".opened";

/**
 * Name of the css class which contains the contact name of a conversation.
 * @const {string}
 */
ConversationWindow.prototype.CONTACT_NAME_CONTAINER_CLASS = ".titlebarText";

/**
 * Name of the css class used to identity message elements.
 * @const {string}
 */
ConversationWindow.prototype.MESSAGE_CONTAINER_CLASS = "._5wd4";

/**
 * Gets the message text.
 *
 * @function
 * @return {string}
 */
ConversationWindow.prototype.getContactName = function () {
    return this.contactName;
};

/**
 * Finds all messages in this conversation.
 *
 * @function
 * @return {Message[]} Array containing all messages in this conversation.
 */
ConversationWindow.prototype.getMessages = function() {
    var message_elements = this.element.querySelectorAll(ConversationWindow.prototype.MESSAGE_CONTAINER_CLASS);
    var messages = [];
    for (var i = 0; i < message_elements.length; ++i) {
        messages[i] = new Message(message_elements[i]);
    }
    return messages;
};

/**
 * Finds all open conversation windows.
 *
 * @function
 * @static
 * @return {ConversationWindow[]} array containing the top level 'div's of the conversation windows.
 */
ConversationWindow.findAll = function () {
    var conversation_elements = document.querySelectorAll(ConversationWindow.prototype.CONVERSATION_WINDOW_CLASS);
    var conversations = [];
    for (var i = 0; i < conversation_elements.length; ++i) {
        conversations[i] = new ConversationWindow(conversation_elements[i]);
    }
    return conversations;
};