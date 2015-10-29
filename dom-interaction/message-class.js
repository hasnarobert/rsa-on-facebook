/**
 * A Message is a wrapper around a message element in DOM which provides
 * utility function for interaction.
 *
 * @class Message
 * @public
 * @type {Object}
 * @constructor
 * @property {Node} element
 * @param {Node} element
 */
var Message = function (element) {
    this.element = element;
};

/**
 * Name of the attribute added to the message DOM element to mark it as altered.
 * @const {string}
 * */
Message.prototype.MESSAGE_UPDATED_MARKER_ATTRIBUTE_NAME = "rsa-on-facebook-message-updated";

/**
 * Gets the message text.
 *
 * @return {string}
 */
Message.prototype.getText = function () {
    return this.element.children[0].innerHTML;
};

/**
 * Updates/Replaces the message text a new one.
 *
 * @param {string} message - New message text for the displayed message.
 * @return {undefined}
 */
Message.prototype.updateText = function (message) {
    this.element.children[0].innerHTML = message;
    this.element.setAttribute(Message.prototype.MESSAGE_UPDATED_MARKER_ATTRIBUTE_NAME, true);
};

/**
 * Checks if the message has been altered.
 *
 * @return {Boolean} true if the container had its message updated, or false otherwise.
 */
Message.prototype.isUpdated = function () {
    return this.element.hasAttribute(Message.prototype.MESSAGE_UPDATED_MARKER_ATTRIBUTE_NAME);
};