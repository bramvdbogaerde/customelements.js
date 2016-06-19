import CustomElement from "../customelement.js"
import Rx from "rx"


class ObservableElement extends CustomElement{
	makeObserver(){
		stream = Rx.Observable.create(function(observable){
			this.observer = observable
		});	
	}
}

export default ObservableElement
