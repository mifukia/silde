//GLOBAL
//------------------------------------------------------------------------------------------------------------------------------
//���_�C���N�g���URL

var sp_redirect_url;


//�[���̃`�F�b�N
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
            // Android�g��
			gotoPCSite();
        } else {
            // PC,Android Tablet,iPad
            return false;
        }
}


//PC�T�C�g��
//------------------------------------------------------------------------------------------------------------------------------
function gotoPCSite(){
	if(sp_redirect_url != null){
		location.href = sp_redirect_url + window.location.search;
	}
}


//checkDevice();