//GLOBAL
//------------------------------------------------------------------------------------------------------------------------------
//リダイレクト先のURL

var sp_redirect_url;


//端末のチェック
//------------------------------------------------------------------------------------------------------------------------------
function checkDevice() {
        var agent = navigator.userAgent;
		
        //
        if (agent.search(/iPhone/) != -1) {
            // iPhone
			gotoPCSite();
        } else if (agent.search(/iPod/) != -1) {
            // iPod
			gotoPCSite();
        } else if (agent.search(/Android/) != -1 && agent.search(/Mobile/) != -1 ) {
            // Android携帯
			gotoPCSite();
        } else {
            // PC,Android Tablet,iPad
            return false;
        }
}


//PCサイトへ
//------------------------------------------------------------------------------------------------------------------------------
function gotoPCSite(){
	if(sp_redirect_url != null){
		location.href = sp_redirect_url + window.location.search;
	}
}


//checkDevice();