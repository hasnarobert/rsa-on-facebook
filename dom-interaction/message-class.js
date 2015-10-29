/**
 * A Message is a wrapper around a message element in DOM which provides
 * utility function for interaction.
 *
 * @class Message
 * @public
 * @type {Object}
 * @constructor
 * @property {Node} innerElement
 * @property {Node} outerElement
 * @param {Node} outerElement
 */
var Message = function (outerElement) {
    this.outerElement = outerElement;
    this.innerElement = outerElement.querySelectorAll(Message.prototype.INNER_MESSAGE_CONTAINER_CLASS)[0];
    this.isMessageFromContact = outerElement.classList.contains(Message.prototype.MESSAGE_IS_FROM_CONTACT_CLASS);
};

/**
 * Name of the attribute added to the message DOM element to mark it as altered.
 * @const {string}
 * */
Message.prototype.MESSAGE_UPDATED_MARKER_ATTRIBUTE_NAME = "rsa-on-facebook-message-updated";

/**
 * Name of the css class used to identity message inner elements.
 * @const {string}
 */
Message.prototype.INNER_MESSAGE_CONTAINER_CLASS = "._5yl5";

/**
 * Name of the css class used to identity is the message was sent from contact.
 * @const {string}
 */
Message.prototype.MESSAGE_IS_FROM_CONTACT_CLASS = "_1nc7";

/**
 * Gets the message text.
 *
 * @return {string}
 */
Message.prototype.getText = function () {
    return this.innerElement.children[0].innerHTML;
};

/**
 * Updates/Replaces the message text a new one.
 *
 * @param {string} message - New message text for the displayed message.
 * @return {undefined}
 */
Message.prototype.updateText = function (message) {
    this.innerElement.children[0].innerHTML = message;
    this.innerElement.setAttribute(Message.prototype.MESSAGE_UPDATED_MARKER_ATTRIBUTE_NAME, true);
};

/**
 * Checks if message is received from contact or I sent it.
 *
 * @return {Boolean} True if message is from contact in conversation or false if message is sent by me.
 */
Message.prototype.isFromContact = function() {
    return this.isMessageFromContact;
};

/**
 * Checks if the message has been altered.
 *
 * @return {Boolean} true if the container had its message updated, or false otherwise.
 */
Message.prototype.isUpdated = function () {
    return this.innerElement.hasAttribute(Message.prototype.MESSAGE_UPDATED_MARKER_ATTRIBUTE_NAME);
};