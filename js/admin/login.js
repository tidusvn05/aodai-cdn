function EnterLogin(e){
	if(e.keyCode == 13){ 
		login();
	}
}

function login(){
	name = $('#loginUser').val();
	pass = $('#loginPass').val();
	
	if(name=="" && pass==''){
		$('.erorr_username').show();
		$('.erorr_password').show();
		$('#divError').html('');
		return false;
	}else if(pass=="" && name!=""){
		$('.erorr_username').hide();
		$('.erorr_password').show();
		$('#divError').html('');
		return false;
	}else if(pass!="" && name==""){
		$('.erorr_password').hide();
		$('.erorr_username').show();
		$('#divError').html('');
		return false;
	}else if(name!='' && pass!=''){
		$('#divError').html('<span style="color: #00b3f1; font-weight: bold;">Processing data...</span>');
		var url = root+'admincp/login/';
		$('.erorr_username').hide();
		$('.erorr_password').hide();
		$.post(url,{
				user: name,
				pass: pass
			},
			function(data){
				if(data==1){
					location.href = root+"admincp";
				}else{
					$('#divError').html('Username or Password is incorrect.');
				}
			}
		);
	}
}

function reset(){
	$('#loginUser').val('');
	$('#loginPass').val('');
}