function startExam(){
	alert('Start Exam ..');

}

function checkConnection() {
	 $.ajax({
         jsonp: 'callback',
         url : 'http://careeraddons.com/MyAddons/MESC',
         dataType : 'jsonp',
         jsonpCallback : '_checkConnectioncallback',
         data : {
              method : 'jsonp',
              action:  'checkConnection',
          },
         success: function( data, textStatus, jqXHR) {
         	alert(data);
         },
         error:function(){
         	 if (jqXHR.status === 0) {
                         alert('Not connect.\n Verify Network.');
                     } else if (jqXHR.status == 404) {
                         alert('Requested page not found. [404]');
                     } else if (jqXHR.status == 500) {
                         alert('Internal Server Error [500].');
                     } else if (exception === 'parsererror') {
                         alert('Requested JSON parse failed.');
                     } else if (exception === 'timeout') {
                         alert('Time out error.');
                     } else if (exception === 'abort') {
                         alert('Ajax request aborted.');
                     } else {
                         alert('Uncaught Error.\n' + jqXHR.responseText);
                     }
         	$(document.getElementById('checkConnectionDiv')).html('Internet Connection Error');

             }
     });
 }

function _checkConnectioncallback(response) {
 	alert("Response from crossfff origin: " + response.Status);
 	if (response.Status==false ) {

 		$(document.getElementById('checkConnectionDiv')).html('Internet Connection Error');
 		}
 }





function vendorChangeEvent() {
	 alert($('#VendorList').find(":selected").text());
	 $(document.getElementById('selectedVendor')).html( $('#VendorList').find(":selected").text());
	 fetchExamsList('AvlExams',$('#VendorList').find(":selected").text());
 }


 function examChangeEvent() {
	 alert($('#ExamList').find(":selected").text());
	 $(document.getElementById('selectedVendor')).html( $('#ExamList').find(":selected").text());
	 fetchExamDetails('DtlExam',$('#ExamList').find(":selected").text());
 }





 function fetchExamDetails(_action,_subaction) {
     $.ajax({
         jsonp: 'callback',
         url : 'http://careeraddons.com/MyAddons/MESC',
         dataType : 'jsonp',
         jsonpCallback : '_fetchExamDetailscallback',
         data : {
              method : 'jsonp',
              action:  _action,
              subaction: _subaction,
          },
         success: function( data, textStatus, jqXHR) {
         	alert(data);
         	$("#StartExamDiv").show();
         }
     });
 }
 function _fetchExamDetailscallback(response) {
 	alert("Response from crossfff origin: " + response.Status);
 	if (response.Status==true ) {

 		$(document.getElementById('selectedExam')).html(response.ExamDetails);
 	//	alert(response.StartExam);
 		//$("#StartExamDiv").show();
 		$(document.getElementById('StartExamDiv')).html('<a onclick="javaScript:startExam();" ><img style="border:0;" src="./img/startExamBtn.gif" alt="Start Exam" /></a>');

 	}
 	else
 		{
 		    alert("Response from crossfff origin: " + response.StatusObject.statusDesc);
 		    alert("Response from crossfff origin: " + response.StatusObject.message1);
 		}
 }







function delegateAction(actionParam) {
	if (actionParam=='SignUp') {
		doSignUp(document.forms["form1"]["fName"].value,document.forms["form1"]["userName1"].value,document.forms["form1"]["password1"].value);
	}

	if (actionParam=='SignIn') {
		alert(document.forms["loginForm"]["userName"].value);
		alert(document.forms["loginForm"]["password"].value);
		doSignIn(document.forms["loginForm"]["userName"].value , document.forms["loginForm"]["password"].value);
	}
	if (actionParam=='Categories')
		fetchExams();

	if (actionParam=='Question')
		fetchQuestion();

	//alert('existing from delegate');

	return false;

}


function doSignIn(uname,psswd) {
    $.ajax({
        jsonp: 'callback',
        url : 'http://careeraddons.com/MyAddons/MESC',
        dataType : 'jsonp',
        jsonpCallback : '_doSignIncallback',
        data : {
             method : 'jsonp',
             action: 'login',
             username : uname,
             password: psswd ,
         },
        success: function( data, textStatus, jqXHR) {
        	alert(data);
        }
    });
}
function _doSignIncallback(response) {
	alert("Response from crossfff origin: " + response.Status);
	if (response.Status==true ) {
		$(document.getElementById('counterDiv')).empty();
		$(document.getElementById('message1Div')).html( response.notice);
		$(document.getElementById('bodyDiv1')).empty();
		$(document.getElementById('bodyDiv1')).html(response.VendorPane);
		$(document.getElementById('message2Div')).html(' ');
	}
	else
		{
		    alert("Response from crossfff origin: " + response.StatusObject.statusDesc);
		    alert("Response from crossfff origin: " + response.StatusObject.message1);
		}
}





function fetchExamsList(_action,_subaction) {
    $.ajax({
        jsonp: 'callback',
        url : 'http://careeraddons.com/MyAddons/MESC',
        dataType : 'jsonp',
        jsonpCallback : '_fetchExamsListcallback',
        data : {
             method : 'jsonp',
             action:  _action,
             subaction: _subaction,
         },
        success: function( data, textStatus, jqXHR) {
        	alert(data);
        }
    });
}
function _fetchExamsListcallback(response) {
	alert("Response from crossfff origin: " + response.Status);
	if (response.Status==true ) {
		$(document.getElementById('counterDiv')).empty();
	 	$(document.getElementById('ExamListDiv')).html(response.ExamList);
	 	$(document.getElementById('StartExamDiv')).html('');
		$(document.getElementById('message2Div')).html(' ');
	}
	else
		{
		    alert("Response from crossfff origin: " + response.StatusObject.statusDesc);
		    alert("Response from crossfff origin: " + response.StatusObject.message1);
		}
}












function doSignUp() {
	//alert('doSignUP');

	$.ajax({
  async: false,
	  type: 'POST',

   url: './MESC',
 cache: false,

  data: { action: 'signup' },
  beforeSend:function(){
    // this is where we append a loading image
   // $(document.getElementById(ansDiv),document.getElementById(descDiv)).html('<div class="loading"><img src="./images/loading.gif" alt="Loading..." /></div>');
      },

  success:function(data){
    	  alert(data);

    if (data.status=='S' ) {
	$(document.getElementById('message1Div')).html('Welcome Chnaduuu...');
	$(document.getElementById('onloadDiv')).html(data.statusDesc);
	$(document.getElementById('message2Div')).html(' ');
	alert('holdddd');
	}
    else
  {
	$(document.getElementById('message1Div')).html('Failed');
	$(document.getElementById('onloadDiv')).html(data.statusDesc);
    $(document.getElementById('message2Div')).html('<table width="100%"> <tr> <td width="25%" align="center"> <strong><a href="javascript:displayBox(\'SignIn\');">Sign-in</strong></td><td width="25%" align="center"> <strong><a href="javascript:displayBox(\'SignUp\');" >Register</strong></td><td width="50%" /></tr></table> ');
  }


    $(document.getElementById('CategoryDiv')).html('');
	$(document.getElementById('QuestionDiv')).html('');


      },
  error:function(){
 	 if (jqXHR.status === 0) {
                 alert('Not connect.\n Verify Network.');
             } else if (jqXHR.status == 404) {
                 alert('Requested page not found. [404]');
             } else if (jqXHR.status == 500) {
                 alert('Internal Server Error [500].');
             } else if (exception === 'parsererror') {
                 alert('Requested JSON parse failed.');
             } else if (exception === 'timeout') {
                 alert('Time out error.');
             } else if (exception === 'abort') {
                 alert('Ajax request aborted.');
             } else {
                 alert('Uncaught Error.\n' + jqXHR.responseText);
             }

     }
	});
return false;
}


function validateForm()
{
	var x=document.forms["form1"]["userName1"].value;

	var atpos=x.indexOf("@");

	var dotpos=x.lastIndexOf(".");
	if (document.forms["form1"]["tnc"].checked == 'false'){
		alert ("Please read & accept Term & Conditions");
		return false;
	}


	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length)
	  {
	  alert("Not a valid e-mail address");
	  return false;
	  }
	var fName=document.forms["form1"]["fName"].value;
	if (fName=='') {
	  alert("Not a valid user name");
	  return false;

	}
	var password1=document.forms["form1"]["password1"].value;
	if (password1=='') {
	  alert("Not a valid Password");
	  return false;

	}
delegateAction('SignUp');
}


function validateLoginForm()
{
	var x=document.forms["loginForm"]["userName"].value;

	var atpos=x.indexOf("@");

	var dotpos=x.lastIndexOf(".");

	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length)
	  {
	  alert("Not a valid e-mail address");
	  return false;
	  }

	var password1=document.forms["loginForm"]["password"].value;
	if (password1=='') {
	  alert("Not a valid Password");
	  return false;

	}
return delegateAction('SignIn');
}

