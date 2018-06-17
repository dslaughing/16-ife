function $(id){
	return document.querySelector(id)
	}

function addHandler(element,type,handler){
	if(element.addEventListener){
		element.addEventListener(type,handler,false)
	}else if(element.attachEvent){
		element.attachEvent("on"+type,handler)
	}else{element["on"+type]=handler}
}

function getTarget(event){
	var event=(event)? event:window.event;    //var event= event || window.event
	return (event.target)? event.target:event.srcElement;  //return event.target || event.srcElement
}
