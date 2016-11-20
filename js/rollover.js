function smartRollover() {  
	if(document.getElementsByTagName) {  
		var images = document.getElementsByTagName("img");  
		for(var i=0; i < images.length; i++) {
			try{
			  if(images[i].getAttribute("src").match("_off.")) 
				  {  
					  images[i].onmouseover = function() {  
					  this.setAttribute("src", this.getAttribute("src").replace("_off.", "_on."));  
				  }
				  images[i].onmouseout = function() {  
					  this.setAttribute("src", this.getAttribute("src").replace("_on.", "_off."));  
				  }  
			  }
			}catch(e){
				//getAttribute�Ŏ擾���鑮�������������ꍇ�Anull���Ԃ��Ă��ăG���[�ɂȂ�׉��
			}
		}  
	}  
}  
if(window.addEventListener) {  
	window.addEventListener("load", smartRollover, false);  
}  
else if(window.attachEvent) {  
	window.attachEvent("onload", smartRollover);  
}