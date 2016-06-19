import ObservableElement from "../elements/observable.js"

// An ObservableElement is a CustomElement.js provided custom element; it already extends CustomElement
class HTTP extends ObservableElement{

	attachCallback(){
		super.makeObserver()
		fetch(this.getAttribute("url")).then(function(response){
			return response.json()
		}).then(function(json){
			this.observable.onNext(json)
		})
			
	}
}
