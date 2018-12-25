$(document).ready(function() {
	// To Top
	$().UItoTop({ easingType: 'easeOutQuart' });
	
	//Caledar
	$("#caledar_from").datepicker({
		changeMonth: true,
		changeYear: true,
		dateFormat: 'yy-mm-dd',
		yearRange: '1930:2050'
	});
	$("#caledar_to").datepicker({
		changeMonth: true,
		changeYear: true,
		dateFormat: 'yy-mm-dd',
		yearRange: '1930:2050'
	});

	//Custom Form
	$('.custom_chk').jqTransCheckBox();
	$('.custom_rd').jqTransRadio();
	$('.custom_select').jqTransSelect();
    
    //Custom select
    $("#e1").select2();
    $("#e2").select2();
	$("#e3").select2();
    $("#e4").select2();
    $("#e5").select2();
    $("#e6").select2();
    $("#e7").select2();
    $("#e9").select2();
    $("#e10").select2();
    $("#e11").select2();

    //FancyBox
	$('.fancyboxClick').fancybox();
	
	//Parse URL
	var url = $.url(document.location.href);
	if(url.segment(-1)!='update' && url.segment(-2)!='update'){
		if(url.fsegment(1)=='back' || url.fsegment(1)=='save'){
			if($('#start').val()==''){
				$('#start').val(0);
			}
			searchContent($('#start').val(),10);
		}else{
			if(url.segment(-1)!='update_profile'){
				//Load Content
				if(module!='admincp'){
					searchContent(0,10);
				}
			}
		}
	}
    /*******gallery******************/
    $(".pics ul li").hover(
        function() { $(this).children(".actions").show("fade", 200); },
        function() { $(this).children(".actions").hide("fade", 200); }
    ); 
});
function searchContent(start,per_page){
	if(per_page==undefined){
		if($('#per_page').val()){
			per_page = $('#per_page').val();
		}else{
			per_page = 10;
		}
	}
	var func_sort = $('#func_sort').val();
	var type_sort = $('#type_sort').val();
	$.post(root+'admincp/'+module+'/ajaxLoadContent',{
		func_order_by: func_sort,
		order_by: type_sort,
		start: start,
		per_page: per_page,
		dateFrom: $('#caledar_from').val(),
		dateTo: $('#caledar_to').val(),
		content: $('#search_content').val()
	},function(data){
		$('#ajax_loadContent').html(data);

		//Custom Form
		$('.custom_chk').jqTransCheckBox();
		
		//Set Icon Order By
		$('.sort').removeClass('icon_sort_desc');
		$('.sort').removeClass('icon_sort_asc');
		$('.sort').addClass('icon_no_sort');
		if(type_sort=='DESC'){
			$('#'+func_sort).addClass('icon_sort_desc');
		}else{
			$('#'+func_sort).addClass('icon_sort_asc');
		}
	});
}

function enterSearch(e){
	if (e.keyCode == 13){ 
		searchContent(0);
	}
}

function sort(func){
	var func_sort = $('#func_sort').val();
	var type_sort = $('#type_sort').val();
	if(func==func_sort){
		if(type_sort=='DESC'){
			$('#type_sort').val('ASC');
		}else{
			$('#type_sort').val('DESC');
		}
	}else{
		$('#func_sort').val(func)
		$('#type_sort').val('DESC');
	}
	searchContent(0,$('#per_page').val());
}

function save(){
	var options = {
		beforeSubmit:  showRequest,  // pre-submit callback 
		success:       showResponse  // post-submit callback 
    };
	
    if($('#contentAdmincp').length) {
        $('#contentAdmincp').val(oEdit1.getHTMLBody());
    }
    //$('#contentAdmincp').val(oEdit1.getHTMLBody());
	$('#frmManagement').ajaxSubmit(options);
}

function showResponse(responseText, statusText, xhr, $form) {
	if($.trim(responseText) == 'success'){
		location.href=root+"admincp/"+module+"/#/save";
	}else if($.trim(responseText)=='success_update_profile'){
		location.href=root+"admincp/logout/";
	}else if($.trim(responseText)=='error_update_profile'){
		alert('Old password incorrect');
		return false;
	}
}

function updateStatus(id,status,module){
	var url = root+'admincp/'+module+'/ajaxUpdateStatus';
	$.post(url,{
			id: id,
			status: status
		},
		function(data){
			$('#loadStatusID_'+id).html(data);
		}
	);
}

function selectItem(id){
	var itemCheck = document.getElementById('item'+id);
	if(itemCheck.checked==false){
		$('.item_row'+id).addClass('row_active');
	}else{
		$('.item_row'+id).removeClass('row_active');
	}
}

function selectAllItems(max){
	if(document.getElementById('selectAllItems').checked==false){
		$('.jqTransformCheckboxWrapper a').addClass('jqTransformChecked');
		for(var i=0;i<max;i++){
			if(document.getElementById('item'+i)!=null){
				$('.item_row'+i).addClass('row_active');
				itemCheck = document.getElementById('item'+i);
				itemCheck.checked = true;
			}
		}
	}else{
		$('.jqTransformCheckboxWrapper a').removeClass('jqTransformChecked');
		for(var i=0;i<max;i++){
			if(document.getElementById('item'+i)!=null){
				$('.item_row'+i).removeClass('row_active');
				itemCheck = document.getElementById('item'+i);
				itemCheck.checked = false;
			}
		}
	}
}

function showStatusAll(){
	var max = $('#per_page').val();
	for(var i=0;i<max;i++){
		if(document.getElementById('item'+i)!=null){
			if(document.getElementById('item'+i).checked==true){
				updateStatus($('#item'+i).val(),0,module);
			}
		}
	}
}

function hideStatusAll(){
	var max = $('#per_page').val();
	for(var i=0;i<max;i++){
		if(document.getElementById('item'+i)!=null){
			if(document.getElementById('item'+i).checked==true){
				updateStatus($('#item'+i).val(),1,module);
			}
		}
	}
}

function deleteItem(id){
	var del = confirm("Are you sure delete item?");
	if(del){
		var url = root+'admincp/'+module+'/delete';
		$.post(url,{
				id: id
			},function(data){
				searchContent(0,$('#per_page').val());
			}
		);
	}
}

function deleteAll(){
	var del = confirm("Are you sure delete item selected?");
	if(del){
		var max = $('#per_page').val();
		for(var i=0;i<max;i++){
			if(document.getElementById('item'+i)!=null){
				if(document.getElementById('item'+i).checked==true){
					id = $('#item'+i).val();
					var url = root+'admincp/'+module+'/delete';
					$.post(url,{
						id: id
					},function(){
						searchContent(0,$('#per_page').val());
					});
				}
			}
		}
	}
}

function deleteItemGl(id){
	var del = confirm("Are you sure delete item?");
	if(del){
		var url = root+'admincp/'+module+'/deletegl';
		$.post(url,{
				id: id
			},function(data){
				//searchContent(0,$('#per_page').val());
                if(data == 'oke') {
                    $(this).parent().parent().parent().remove();
                    
                }
			}
		);
	}
    return false;
}
