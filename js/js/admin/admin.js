$(document).ready(function() {
    // To Top
    $().UItoTop({easingType: 'easeOutQuart'});

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

    // Using for building
    $("#e8").select2();
    // Using user house
    $("#e9").select2();
    $("#e10").select2();
    $("#e11").select2();

    // Use for all select2
    $('.build_select2').select2();


    //FancyBox
    $('.fancyboxClick').fancybox();

    //Parse URL
    var url = $.url(document.location.href);
    if (url.segment(-1) != 'update' && url.segment(-2) != 'update') {
        if (url.fsegment(1) == 'back' || url.fsegment(1) == 'save') {
            if ($('#start').val() == '') {
                $('#start').val(0);
            }
            searchContent($('#start').val(), 10);
        } else {
            if (url.segment(-1) != 'update_profile') {
                //Load Content
                if (module != 'admincp') {
                    searchContent(0, 10);
                }
            }
        }
    }
    /*******gallery******************/
    $(".pics ul li").hover(
            function() {
                $(this).children(".actions").show("fade", 200);
            },
            function() {
                $(this).children(".actions").hide("fade", 200);
            }
    );

    $("div[class^='widget']").simpleTabs(); //Run function on any div with class name of "Simple Tabs" 
});
function searchContent(start, per_page) {
    if (per_page == undefined) {
        if ($('#per_page').val()) {
            per_page = $('#per_page').val();
        } else {
            per_page = 10;
        }
    }
    var func_sort = $('#func_sort').val();
    var type_sort = $('#type_sort').val();
    $.post(root + 'admincp/' + module + '/ajaxLoadContent', {
        func_order_by: func_sort,
        order_by: type_sort,
        start: start,
        per_page: per_page,
        dateFrom: $('#caledar_from').val(),
        dateTo: $('#caledar_to').val(),
        content: $('#search_content').val(),
        price_from: $('#price_from').val(),
        price_to: $('#price_to').val(),
        title:$('#title').val(),
    }, function(data) {
        $('#ajax_loadContent').html(data);

        //Custom Form
        $('.custom_chk').jqTransCheckBox();

        //Set Icon Order By
        $('.sort').removeClass('icon_sort_desc');
        $('.sort').removeClass('icon_sort_asc');
        $('.sort').addClass('icon_no_sort');
        if (type_sort == 'DESC') {
            $('#' + func_sort).addClass('icon_sort_desc');
        } else {
            $('#' + func_sort).addClass('icon_sort_asc');
        }
    });
}

function enterSearch(e) {
    if (e.keyCode == 13) {
        searchContent(0);
    }
}

function sort(func) {
    var func_sort = $('#func_sort').val();
    var type_sort = $('#type_sort').val();
    if (func == func_sort) {
        if (type_sort == 'DESC') {
            $('#type_sort').val('ASC');
        } else {
            $('#type_sort').val('DESC');
        }
    } else {
        $('#func_sort').val(func)
        $('#type_sort').val('DESC');
    }
    searchContent(0, $('#per_page').val());
}

function save() {
    var options = {
        beforeSubmit: showRequest, // pre-submit callback 
        success: showResponse  // post-submit callback 
    };

    if ($('#contentAdmincp').length) {
        $('#contentAdmincp').val(oEdit1.getHTMLBody());
    }
    if ($('#contentAdmincp_jp').length) {
        $('#contentAdmincp_jp').val(oEdit1_jp.getHTMLBody());
    }
    if ($('#contentAdmincp_vn').length) {
        $('#contentAdmincp_vn').val(oEdit1_vn.getHTMLBody());
    }
    //$('#contentAdmincp').val(oEdit1.getHTMLBody());
    $('#frmManagement').ajaxSubmit(options);
}

function save_setting() {
    $('#frmManagement').submit();
}

function showResponse(responseText, statusText, xhr, $form) {
    if ($.trim(responseText) == 'success') {
        location.href = root + "admincp/" + module + "/#/save";
    } else if ($.trim(responseText) == 'success_update_profile') {
        location.href = root + "admincp/logout/";
    } else if ($.trim(responseText) == 'error_update_profile') {
        alert('Old password incorrect');
        return false;
    } else if ($.trim(responseText) == 'duplicate_email') {
        alert('Duplicate email, please use other email.');
        return false;
    } else if ($.trim(responseText) == 'not_change_final_record') {
        alert("Did not change final record have Type email with is TO.");
        return false;
    } else {
        alert($.trim(responseText));
        return false;
    }
}

function updateStatus(id, status, module) {
    var url = root + 'admincp/' + module + '/ajaxUpdateStatus';
    $.post(url, {
        id: id,
        status: status
    },
    function(data) {
        $('#loadStatusID_' + id).html(data);
    }
    );
}


function selectItem(id, value) {

    var list_id = '';
    var itemCheck = document.getElementById('item' + id);
    if (itemCheck.checked == false) {
        list_id = value;
        $('.item_row' + id).addClass('row_active');
        var per_page = $('#per_page').val();
        for (var i = 0; i < per_page; i++) {
            if (document.getElementById('item' + i) != null) {
                if (document.getElementById('item' + i).checked == true) {
                    id_value = $('#item' + i).val();
                    list_id = list_id + '-' + id_value;
                }
            }
        }
     //   $("#link_popup").attr('href','popup?list_id='+list_id);
    } else {
        var per_page = $('#per_page').val();
        $('.item_row' + id).removeClass('row_active');
        for (var i = 0; i < per_page; i++) {
            if (document.getElementById('item' + i) != null) {
                if (document.getElementById('item' + i).checked == true) {
                    id_value = $('#item' + i).val();
                    if (i != id) {
                        if (list_id != '') {
                            list_id = list_id + '-' + id_value;
                        }else{
                            list_id=id_value;
                        }
                    }

                }
            }
        }
    //    $("#link_popup").attr('href','popup?list_id='+list_id);
    }
}

function selectAllItems(max){
        var list_id = '';
    if (document.getElementById('selectAllItems').checked == false) {
        $('.jqTransformCheckboxWrapper a').addClass('jqTransformChecked');
        for (var i = 0; i < max; i++) {
            if (document.getElementById('item' + i) != null) {
                $('.item_row' + i).addClass('row_active');
                itemCheck = document.getElementById('item' + i);
                itemCheck.checked = true;
            }
            // add all id
//            id_value = $('#item' + i).val();
//            if(list_id!=''){
//                list_id=list_id+'-'+id_value;
//            }else{
//                list_id=id_value;
//            }
        }
       // $("#link_popup").attr('href','popup?list_id='+list_id);
    } else {
        $('.jqTransformCheckboxWrapper a').removeClass('jqTransformChecked');
        for (var i = 0; i < max; i++) {
            if (document.getElementById('item' + i) != null) {
                $('.item_row' + i).removeClass('row_active');
                itemCheck = document.getElementById('item' + i);
                itemCheck.checked = false;
            }
        }
     //    $("#link_popup").attr('href','popup?list_id=');
    }
}

// action popup
function selectItem_popup(id, value) {

    var list_id = '';
    var itemCheck = document.getElementById('item' + id);
    if (itemCheck.checked == false) {
        list_id = value;
        $('.item_row' + id).addClass('row_active');
        var per_page = $('#per_page').val();
        for (var i = 0; i < per_page; i++) {
            if (document.getElementById('item' + i) != null) {
                if (document.getElementById('item' + i).checked == true) {
                    id_value = $('#item' + i).val();
                    list_id = list_id + '-' + id_value;
                }
            }
        }
        $("#link_popup").attr('href','popup?list_id='+list_id);
    } else {
        var per_page = $('#per_page').val();
        $('.item_row' + id).removeClass('row_active');
        for (var i = 0; i < per_page; i++) {
            if (document.getElementById('item' + i) != null) {
                if (document.getElementById('item' + i).checked == true) {
                    id_value = $('#item' + i).val();
                    if (i != id) {
                        if (list_id != '') {
                            list_id = list_id + '-' + id_value;
                        }else{
                            list_id=id_value;
                        }
                    }

                }
            }
        }
        $("#link_popup").attr('href','popup?list_id='+list_id);
    }
}

function selectAllItems_popup(max){
        var list_id = '';
    if (document.getElementById('selectAllItems').checked == false) {
        $('.jqTransformCheckboxWrapper a').addClass('jqTransformChecked');
        for (var i = 0; i < max; i++) {
            if (document.getElementById('item' + i) != null) {
                $('.item_row' + i).addClass('row_active');
                itemCheck = document.getElementById('item' + i);
                itemCheck.checked = true;
            }
            // add all id
            id_value = $('#item' + i).val();
            if(list_id!=''){
                list_id=list_id+'-'+id_value;
            }else{
                list_id=id_value;
            }
        }
        $("#link_popup").attr('href','popup?list_id='+list_id);
    } else {
        $('.jqTransformCheckboxWrapper a').removeClass('jqTransformChecked');
        for (var i = 0; i < max; i++) {
            if (document.getElementById('item' + i) != null) {
                $('.item_row' + i).removeClass('row_active');
                itemCheck = document.getElementById('item' + i);
                itemCheck.checked = false;
            }
        }
         $("#link_popup").attr('href','popup?list_id=');
    }
}

function showStatusAll() {
    var max = $('#per_page').val();
    for (var i = 0; i < max; i++) {
        if (document.getElementById('item' + i) != null) {
            if (document.getElementById('item' + i).checked == true) {
                updateStatus($('#item' + i).val(), 0, module);
            }
        }
    }
}

function hideStatusAll() {
    var max = $('#per_page').val();
    for (var i = 0; i < max; i++) {
        if (document.getElementById('item' + i) != null) {
            if (document.getElementById('item' + i).checked == true) {
                updateStatus($('#item' + i).val(), 1, module);
            }
        }
    }
}

function deleteItem(id) {
    var del = confirm("Are you sure delete item?");
    if (del) {
        var url = root + 'admincp/' + module + '/delete';
        $.post(url, {
            id: id
        }, function(data) {
            if ($.trim(data) == 'must_at_least_two_record') {
                alert('Did not delete final record have Type email with is TO');
                return false;
            }
            searchContent(0, $('#per_page').val());
        }
        );
    }
}

function deleteAll() {
    var del = confirm("Are you sure delete item selected?");
    if (del) {
        var max = $('#per_page').val();
        for (var i = 0; i < max; i++) {
            if (document.getElementById('item' + i) != null) {
                if (document.getElementById('item' + i).checked == true) {
                    id = $('#item' + i).val();
                    var url = root + 'admincp/' + module + '/delete';
                    $.post(url, {
                        id: id
                    }, function(data) {
                        searchContent(0, $('#per_page').val());
                    });
                }
            }
        }
    }
}

function deleteItemGl(id, obj) {
    console.log(obj)
    var del = confirm("Are you sure delete item?");
    if (del) {
        var url = root + 'admincp/' + module + '/deletegl';
        $.post(url, {
            id: id
        }, function(data) {
            //searchContent(0,$('#per_page').val());
            if ($.trim(data) == 'oke') {
                $(obj).parent().parent().parent().remove();

            }
        }
        );
    }
    return false;
}

//===== Tabs =====//
$.fn.simpleTabs = function() {
    //Default Action
    $(this).find(".tab_content").hide(); //Hide all content
    $(this).find("ul.tabs li:first").addClass("activeTab").show(); //Activate first tab
    $(this).find(".tab_content:first").show(); //Show first tab content
    //On Click Event
    $("ul.tabs li").click(function() {
        $(this).parent().parent().find("ul.tabs li").removeClass("activeTab"); //Remove any "active" class
        $(this).addClass("activeTab"); //Add "active" class to selected tab
        $(this).parent().parent().find(".tab_content").hide(); //Hide all tab content
        var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
        $(activeTab).show(); //Fade in the active content
        return false;
    });
};//end function
$(document).ready(function() {
    $('input[id="item0"]').change(function() {
        alert('test');
    });
});

