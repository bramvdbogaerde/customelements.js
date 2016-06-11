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
class CustomElement extends HTMLElement{
	__createShadowDomFromTemplate(templateSelector){
		this.$ = this.createShadowRoot()

		let tmpl = document.querySelector(templateSelector)
		let clone = document.importNode(tmpl.content, true)
		this.$.appendChild(clone)
	}

	__attachMethods(){
		let root = this.$
		/**
		* find method on schadow DOM alias for querySelector
		*
		* @method find
		* @alias document.querySelector
		* @argument {String} selector
		*/
		this.$.find = function(selector){
			return root.querySelector(selector)
		}
		/**
		* findAll method on schadow DOM alias for querySelectorAll
		*
		* @method findAll
		* @see document.querySelectorAll
		*/
		this.$.findAll = function(selector){
			return root.querySelectorAll(selector)
		}
	}

	/**
	* @private
	* @description iterate through all placeholders and check if an attribute with its name is already set
	*/
	__attachPropertiesToPlaceholders(){
		for(let placeholder of this.__placeholderDictionary){
			if(this.getAttribute(placeholder) == null){
				continue
			}
			this.$.querySelector(`#ce-${placeholder}`).textContent = this.getAttribute(placeholder)
		}
	}

	__replacePlaceholders(){
		let placeholders = this.$.innerHTML.match(/{{(.*)}}/g)

		for(let placeholder of placeholders){
			let name = placeholder.replace(/({{|}})/g,"")
			this.$.innerHTML = this.$.innerHTML.replace(placeholder, `<span id="ce-${name}" ></span>`)
			this.__placeholderDictionary.push(name)
		}
	}

	__init(){
		this.__placeholderDictionary = []
		this.__callbackFunctions = {}
	}

	// Public methods

	/**
	* creates shadow dom with templates content and replaces placeholders
	*
	* @argument {String} templateSelector
	*/
	template(templateSelector){
		this.__init()
		this.__createShadowDomFromTemplate(templateSelector)
		this.__replacePlaceholders()
		this.__attachPropertiesToPlaceholders()
		// Attach helper methods on the shadow root
		this.__attachMethods()
	}

	/**
	* @argument {String} key
	* @argument {String} value
	* @description sets a property of the custom element, the same as "this.property =", but also updates placeholders and fires callbacks
	*/
	set(key,val){
		this[key] = val
		try{
			this.$.querySelector("#ce-"+key).textContent = val
		} catch(e){}

		if(this.__callbackFunctions[key] != undefined)
			this.__callbackFunctions[key](val)
	}

	/**
	* Attach an event listener to a class property
	*
	* @argument {String} property
	*	@argument {Function} callback
	*/
	bind(key, fn){
		this.__callbackFunctions[key] = fn
	}
}

class WebSocketProvider extends CustomElement{
	createdCallback(){
		super.__init();

		let i = 0;

		setInterval(() => {
			i += 1
			this.set("onMessage", `New Message ${i}`)
		},1000)
	}
}

class ChatElement extends CustomElement{
	createdCallback(){
		super.template("#my-chat")
		this.set("sender", "Bram")
	}
}

document.registerElement("websocket-provider", WebSocketProvider)
document.registerElement("my-chat", ChatElement)
