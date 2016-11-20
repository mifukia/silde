/*--------------------------------------------------------------------------------
ver 1.1
auther: Tadakuma Shuhei
mail: s.tadakuma@gmail.com
last modified: 2015/10/16


[Regulation]
Basically, counter can not be displayed.
Basically, character encoding is UTF-8.

[Common Options]
data-url		You can define or location.href(default)
img tag			You can define or default images


[Facebook Share]
data-layout		"button"(default).Can be one of "box_count", "button_count", "button", "link", "icon_link", or "icon".


[Facebook Like]
data-layout		"button"(default). Can be one of "standard", "button_count", "button" or "box_count".
Can't use image.

[Twitter Options]
data-text		You can define or meta document.title(default)
data-hashtags	You can define or not
data-count		"none"(default). Can be one of "vertical", "horizontal", "none".


[Google Plus Options]
data-annotation		"none"(default). Can be one of "inline", "bubble", "vertical-bubble".

[LINE Options]
data-text		You can define or document.title(default)
data-url		You can define or location.href(default)

--------------------------------------------------------------------------------*/

function loadSNSScript(){

	
	//for FaceBook Like
	(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.4";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
		
	//for FaceBook AppId
	function getFbAppId(){
		var metaTags = document.getElementsByTagName("meta");
	
		var fbAppId = "";
		for (var i = 0; i < metaTags.length; i++) {
			if (metaTags[i].getAttribute("property") == "fb:app_id") {
				fbAppId = metaTags[i].getAttribute("content");
			}
		}
		return fbAppId;
	}

	//for FaceBook Share
	(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.3&appId=" + getFbAppId();
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	//for Twitter
	!function(d,s,id){
		var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
		if(!d.getElementById(id)){
			js=d.createElement(s);
			js.id=id;
			js.src=p+'://platform.twitter.com/widgets.js';
			fjs.parentNode.insertBefore(js,fjs);
		}
	}(document, 'script', 'twitter-wjs');


	//for Google Plus
	window.___gcfg = {lang: 'ja'};
	(function() {
	var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
	po.src = 'https://apis.google.com/js/platform.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
	})();

}

function writeSNSObject(){
	
	//Facebook Share
	//------------------------------------------------------------------------------------------------------------------------------------------------------
		
	try{
		
		var fbArr = document.getElementsByClassName('fb_share_btn');
		var fbParam = {};
		
		
		for(var fb_i = 0; fb_i < fbArr.length; fb_i++){
			//URL
			if(fbArr[fb_i].getAttribute('data-url') == "" || fbArr[fb_i].getAttribute('data-url') == null){
				fbParam['URL'] = location.href;
			}else{
				fbParam['URL'] = fbArr[fb_i].getAttribute('data-url');
			}
			
			//COUNTER
			if(fbArr[fb_i].getAttribute('data-layout') == 'button_count' || fbArr[fb_i].getAttribute('data-layout') == 'box_count' || fbArr[fb_i].getAttribute('data-layout') == 'icon' || fbArr[fb_i].getAttribute('data-layout') == 'icon_link' || fbArr[fb_i].getAttribute('data-layout') == 'link'){
				fbParam['COUNTER'] = fbArr[fb_i].getAttribute('data-layout');
			}else{
				fbParam['COUNTER'] = 'button';
			}
			
			//IMAGE
			if(fbArr[fb_i].children[0]){
				fbParam['IMAGE'] = fbArr[fb_i].children[0].getAttribute('src');
			}else{
				fbParam['IMAGE'] = "";
			}
				
			//Make SNS Button With Params]
			if(fbParam['IMAGE'] != ""){
				fbArr[fb_i].innerHTML ="<a href='https://www.facebook.com/sharer/sharer.php?u=" + fbParam['URL'] + "' onClick='window.open(this.href, \"FBwindow\", \"width=650, height=450, menubar=no, toolbar=no, scrollbars=yes\"); return false;'><img src='" + fbParam['IMAGE'] + "'></a>";
			}else{
				fbArr[fb_i].innerHTML ="<div id='fb-root'></div><div class='fb-share-button' data-href='" + fbParam['URL'] + "' data-layout='" + fbParam['COUNTER'] + "'></div>";
			}
		}

	}
		catch( e ){
	}


	//Facebook Like Button(no use)
	//------------------------------------------------------------------------------------------------------------------------------------------------------

	/*
	try{		
		//Don't Use Images For Like Button
		var fb_like_url = document.getElementById('fb_like_btn').getAttribute('data-url');
		if(fb_like_url == "" || fb_like_url == null){
			fb_like_url = location.href;
		}
		
		var fb_like_layout = document.getElementById('fb_like_btn').getAttribute('data-layout');
		
		if(fb_like_layout == 'button_count' || fb_like_layout == 'box_count' || fb_like_layout == 'standard'){
			//
		}else{
			fb_like_layout = 'button';
		}
		document.getElementById('fb_like_btn').innerHTML ="<div id='fb-root'></div><div class='fb-like' data-href='" + fb_like_url + "' data-layout='" + fb_like_layout + "' data-action='like' data-show-faces='false' data-share='false'></div>";

	}
		catch( e ){
	}
	*/


	//Twitter
	//------------------------------------------------------------------------------------------------------------------------------------------------------
	try{
		
		var twArr = document.getElementsByClassName('tw_btn');
		var twParam = {};

		for(var tw_i = 0; tw_i < twArr.length; tw_i++){

			//URL
			if(twArr[tw_i].getAttribute('data-url') == "" || twArr[tw_i].getAttribute('data-url') == null){
				twParam['URL'] = location.href;
			}else{
				twParam['URL'] = twArr[tw_i].getAttribute('data-url');
			}

			//TWEET TEXT
			if(twArr[tw_i].getAttribute('data-text') == "" || twArr[tw_i].getAttribute('data-text') == null){
				twParam['TEXT'] = document.getElementsByName ('description').item(0).content + " " + document.title;
			}else{
				twParam['TEXT'] = twArr[tw_i].getAttribute('data-text');
			}

			//HASHTAG
			if(twArr[tw_i].getAttribute('data-hashtags') == "" || twArr[tw_i].getAttribute('data-hashtags') == null){
				twParam['HASHTAG'] = '';
			}else{
				twParam['HASHTAG'] = twArr[tw_i].getAttribute('data-hashtags');
			}

			//COUNTER
			if(twArr[tw_i].getAttribute('data-count') == "vertical" || twArr[tw_i].getAttribute('data-count') == 'horizontal'){
				twParam['COUNTER'] = twArr[tw_i].getAttribute('data-count');
			}else{
				twParam['COUNTER'] = 'none';
			}
			
			//IMAGE
			if(twArr[tw_i].children[0]){
				twParam['IMAGE'] = twArr[tw_i].children[0].getAttribute('src');
			}else{
				twParam['IMAGE'] = "";
			}
			
			//Make SNS Button With Params]
			if(twParam['IMAGE'] != ""){
				twArr[tw_i].innerHTML ="<a href='https://twitter.com/share?url=" + twParam['URL'] + "&text=" + twParam['TEXT'] + "&hashtags=" + twParam['HASHTAG'] + "&data-count=" + twParam['COUNTER'] + "' onClick='window.open(this.href, \"TWwindow\", \"width=650, height=450, menubar=no, toolbar=no, scrollbars=yes\"); return false;'><img src=" + twParam['IMAGE'] + "></a>";
			}else{
				twArr[tw_i].innerHTML ="<a href='https://twitter.com/share' class='twitter-share-button' data-url=" + twParam['URL']  + " data-lang='ja' data-text='" + twParam['TEXT'] + "' data-hashtags='" + twParam['HASHTAG'] + "' data-count='" + twParam['COUNTER'] +"'></a>";
			}
		}
	}
	catch( e ){
	}
	

	//Google Plus Share
	//------------------------------------------------------------------------------------------------------------------------------------------------------

	try{
		
		var gpArr = document.getElementsByClassName('googleplus_btn');
		var gpParam = {};
		
		
		for(var gp_i = 0; gp_i < gpArr.length; gp_i++){
			//URL
			if(gpArr[gp_i].getAttribute('data-url') == "" || gpArr[gp_i].getAttribute('data-url') == null){
				gpParam['URL'] = location.href;
			}else{
				gpParam['URL'] = gpArr[gp_i].getAttribute('data-url');
			}
			
			//COUNTER
			if(gpArr[gp_i].getAttribute('data-annotation') == 'inline' || gpArr[gp_i].getAttribute('data-annotation') == 'bubble' || gpArr[gp_i].getAttribute('data-annotation') == 'vertical-bubble'){
				gpParam['COUNTER'] = gpArr[gp_i].getAttribute('data-annotation');
			}else{
				gpParam['COUNTER'] = 'none';
			}
			
			//IMAGE
			if(gpArr[gp_i].children[0]){
				gpParam['IMAGE'] = gpArr[gp_i].children[0].getAttribute('src');
			}else{
				gpParam['IMAGE'] = "";
			}
				
			//Make SNS Button With Params]
			if(gpParam['IMAGE'] != ""){
				gpArr[gp_i].innerHTML ="<a href='https://plus.google.com/share?url=" + gpParam['URL'] + "' onClick='window.open(this.href, \"GPwindow\", \"width=650, height=450, menubar=no, toolbar=no, scrollbars=yes\"); return false;'><img src=" + gpParam['IMAGE'] + "></a>";
			}else{
				gpArr[gp_i].innerHTML ="<div class='g-plus' data-href='" + gpParam['URL'] + "' data-action='share' data-annotation='" + gpParam['COUNTER'] + "'></div>";
			}
		}
	}
		catch( e ){
	}

	
	//Line Button
	//------------------------------------------------------------------------------------------------------------------------------------------------------

	try{
		
			var lineArr = document.getElementsByClassName('line_btn');
			var lineParam = {};
	
			for(var line_i = 0; line_i < lineArr.length; line_i++){
	
				//URL
				if(lineArr[line_i].getAttribute('data-url') == "" || lineArr[line_i].getAttribute('data-url') == null){
					lineParam['URL'] = location.href;
				}else{
					lineParam['URL'] = lineArr[line_i].getAttribute('data-url');
				}
	
				//LINE TEXT
				if(lineArr[line_i].getAttribute('data-text') == "" || lineArr[line_i].getAttribute('data-text') == null){
					lineParam['TEXT'] = document.getElementsByName ('description').item(0).content + " " + document.title;
				}else{
					lineParam['TEXT'] = lineArr[line_i].getAttribute('data-text');
				}
	
				//IMAGE
				if(lineArr[line_i].children[0]){
					lineParam['IMAGE'] = lineArr[line_i].children[0].getAttribute('src');
				}else{
					lineParam['IMAGE'] = "/common/include/sns/images/Line.png";
				}
				
				//Make SNS Button With Params]
				if(lineParam['IMAGE'] != ""){
					lineArr[line_i].innerHTML ="<a href='http://line.me/R/msg/text/?" + lineParam['TEXT'] + "%0D%0A" + lineParam['URL'] + "' target='_blank'><img src=" + lineParam['IMAGE'] + "></a>";
				}else{
					lineArr[line_i].innerHTML ="<a href='http://line.me/R/msg/text/?" + lineParam['TEXT'] + "%0D%0A" + lineParam['URL'] + "' target='_blank'><img src=" + lineParam['IMAGE'] + "></a>";
				}
			}

	}
		catch( e ){
	}


	//
	loadSNSScript();
	
}


//DOM load
if( document.addEventListener )
{
    document.addEventListener( 'DOMContentLoaded', writeSNSObject, false );
}
else if( document.attachEvent )
{
    //IE8
    var CheckReadyState = function()
    {
        if( document.readyState == 'complete' )
        {
            document.detachEvent( 'onreadystatechange', CheckReadyState );
            writeSNSObject();
        }
    }
    document.attachEvent( 'onreadystatechange', CheckReadyState );

    ( function()
    {
        try
        {
            document.documentElement.doScroll( 'left' );
        }
        catch( e )
        {
            setTimeout( arguments.callee, 10 );
            return;
        }

        document.detachEvent( 'onreadystatechange', CheckReadyState );
        writeSNSObject();
    } )();
}
else
{
    //not support attachEvent Browser
    writeSNSObject();
}
