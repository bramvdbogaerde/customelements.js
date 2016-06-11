"use strict";

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
* CustomElements.js
* Minimal web components library
*
*/

/**
* CustomElement class
*
* @class CustomElement
*/

var CustomElement = function (_HTMLElement) {
	_inherits(CustomElement, _HTMLElement);

	function CustomElement() {
		_classCallCheck(this, CustomElement);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(CustomElement).apply(this, arguments));
	}

	_createClass(CustomElement, [{
		key: "__createShadowDomFromTemplate",
		value: function __createShadowDomFromTemplate(templateSelector) {
			this.$ = this.createShadowRoot();

			var tmpl = document.querySelector(templateSelector);
			var clone = document.importNode(tmpl.content, true);
			this.$.appendChild(clone);
		}
	}, {
		key: "__attachMethods",
		value: function __attachMethods() {
			var root = this.$;
			/**
   * find method on schadow DOM alias for querySelector
   *
   * @method find
   * @alias document.querySelector
   * @argument {String} selector
   */
			this.$.find = function (selector) {
				return root.querySelector(selector);
			};
			/**
   * findAll method on schadow DOM alias for querySelectorAll
   *
   * @method findAll
   * @see document.querySelectorAll
   */
			this.$.findAll = function (selector) {
				return root.querySelectorAll(selector);
			};
		}

		/**
  * @private
  * @description iterate through all placeholders and check if an attribute with its name is already set
  */

	}, {
		key: "__attachPropertiesToPlaceholders",
		value: function __attachPropertiesToPlaceholders() {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.__placeholderDictionary[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var placeholder = _step.value;

					if (this.getAttribute(placeholder) == null) {
						continue;
					}
					this.$.querySelector("#ce-" + placeholder).textContent = this.getAttribute(placeholder);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}, {
		key: "__replacePlaceholders",
		value: function __replacePlaceholders() {
			var placeholders = this.$.innerHTML.match(/{{(.*)}}/g);

			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = placeholders[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var placeholder = _step2.value;

					var name = placeholder.replace(/({{|}})/g, "");
					this.$.innerHTML = this.$.innerHTML.replace(placeholder, "<span id=\"ce-" + name + "\" ></span>");
					this.__placeholderDictionary.push(name);
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		}
	}, {
		key: "__init",
		value: function __init() {
			this.__placeholderDictionary = [];
			this.__callbackFunctions = {};
		}

		// Public methods

		/**
  * creates shadow dom with templates content and replaces placeholders
  *
  * @argument {String} templateSelector
  */

	}, {
		key: "template",
		value: function template(templateSelector) {
			this.__init();
			this.__createShadowDomFromTemplate(templateSelector);
			this.__replacePlaceholders();
			this.__attachPropertiesToPlaceholders();
			// Attach helper methods on the shadow root
			this.__attachMethods();
		}

		/**
  * @argument {String} key
  * @argument {String} value
  * @description sets a property of the custom element, the same as "this.property =", but also updates placeholders and fires callbacks
  */

	}, {
		key: "set",
		value: function set(key, val) {
			this[key] = val;
			try {
				this.$.querySelector("#ce-" + key).textContent = val;
			} catch (e) {}

			if (this.__callbackFunctions[key] != undefined) this.__callbackFunctions[key](val);
		}

		/**
  * Attach an event listener to a class property
  *
  * @argument {String} property
  *	@argument {Function} callback
  */

	}, {
		key: "bind",
		value: function bind(key, fn) {
			this.__callbackFunctions[key] = fn;
		}
	}]);

	return CustomElement;
}(HTMLElement);

var WebSocketProvider = function (_CustomElement) {
	_inherits(WebSocketProvider, _CustomElement);

	function WebSocketProvider() {
		_classCallCheck(this, WebSocketProvider);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(WebSocketProvider).apply(this, arguments));
	}

	_createClass(WebSocketProvider, [{
		key: "createdCallback",
		value: function createdCallback() {
			var _this3 = this;

			_get(Object.getPrototypeOf(WebSocketProvider.prototype), "__init", this).call(this);

			var i = 0;

			setInterval(function () {
				i += 1;
				_this3.set("onMessage", "New Message " + i);
			}, 1000);
		}
	}]);

	return WebSocketProvider;
}(CustomElement);

var ChatElement = function (_CustomElement2) {
	_inherits(ChatElement, _CustomElement2);

	function ChatElement() {
		_classCallCheck(this, ChatElement);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(ChatElement).apply(this, arguments));
	}

	_createClass(ChatElement, [{
		key: "createdCallback",
		value: function createdCallback() {
			_get(Object.getPrototypeOf(ChatElement.prototype), "template", this).call(this, "#my-chat");
			this.set("sender", "Bram");
		}
	}]);

	return ChatElement;
}(CustomElement);

document.registerElement("websocket-provider", WebSocketProvider);
document.registerElement("my-chat", ChatElement);

