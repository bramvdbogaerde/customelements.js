import CustomElement from "../../customelement.js" 

class BasicElement extends CustomElement{
	createdCallback(){
		super.template("#basic-element")
	}
}

document.registerElement("basic-element", BasicElement)
