$(document).ready(function(){
    $("#dialog").hide();
    $('#addNew').click(function(){
        addNewRow();
    });
    $('#save').click(function(){
       savenotes();
       $('td input').dblclick(function(){
        console.log("dblclicked")
        $('input').attr('readonly', false);
        $(this).focusout(function(){
          $('td input').attr('readonly', true);
        });
          });
    });
    $('#close').click(function(){
      $("#dialog").slideUp("slow");
    });
    $('td input').dblclick(function(){
      console.log("dblclicked")
      $('input').attr('readonly', false);
      $(this).focusout(function(){
        $('input').attr('readonly', true);
      });
        });
    $('#subject').click(function(){
        sortbysubject();
    });
    
    $('#date').click(function(){
      sortbydate();
  });

    $("body").on('click','#refreshNotes' ,function(){
        refreshNotes();
    });

    $(".list").on('click', '.fa', function(){
        deleteRow($(this));
        console.log(this)
    });
});

function addNewRow(){   
    $("#dialog").slideToggle("slow");
    $("#dialog").map(function() {
      $('input').text(" ");
  })}
function savenotes() {    
    var numRows = $('#newTasks tr').length,subject,note;
    var date = new Date() 
    var month = ("0"+(date.getMonth()+1)).slice(-2);
    var today = (date.getDate()+'-'+month+'-'+date.getFullYear());  
    subject=$("#dialog #subject").val();
    note=$("#dialog textarea").val();
    $('#newTasks').append('<tr class="rows"><td><input class="subject" type="text" id="title-'+numRows+'" value="'+subject+'" readonly/></td><td><input class="note" type="text" id="description-'+numRows+' " value="'+note+'" readonly/></td><td><input class="date" type="text" id="date-'+numRows+'" value="'+today+'" readonly/></td><td><i id="delete-'+numRows+'" class="fa fa-trash-o"></td></tr>');
    $('#dialog').slideUp("fast");
};

function refreshNotes(){
    
    var tableRows = $('#newTasks tr');
    
    $('.sticky_notes li').remove();

    $.each(tableRows,function(i){
        var title = $(this).find('input[id^="title"]').val();
        var description = $(this).find('input[id^="description"]').val();
        var date = $(this).find('input[id^="date"]').val();
        console.log("date",date)
        if(title != undefined && description != undefined && date != undefined){

            createNotes(title, description, date);
        }   
    });
}



function createNotes(title, description, date){
    var header = '<h2>'+title+'</h2>';
    var desc = '<p>'+description+'</p>';
    var date1 = '<h6>'+date+'</h6>';
    
    var colours = new Array();
    colours[0] = 'green';
    colours[1] = 'blue';
    colours[2] = 'yellow';
    colours[3] = 'red';
    colours[4] = 'purple';
    colours[5] = 'orange';
    colours[6] = 'orange2';
    colours[7] = 'orange3';
    colours[8] = 'orange4';
    
    
    $('.sticky_notes').append('<li class="'+colours[randomFromTo(0,(colours.length - 1))]+'">'+header+desc+date1+'</li>');
}

$("#Search").keyup(function () {
    var input='', filter, table, tr, td, i, txtValue='',rdate,rsub;
    input = $(this).val();
    console.log(input)
    filter = input.toUpperCase();
    table = $(".newTasks");
    tr = table.find(".rows");
    for (i=0; i < tr.length; i++) {
      td = table.find(".rows:eq("+i+") .note").val();
      rdate = table.find(".rows:eq("+i+") .date").val();
      rsub = table.find(".rows:eq("+i+") .subject").val();
      console.log(td,rdate)
      if (td) {
        txtValue = td;
        tdate = rdate;
        tsub = rsub;
        if ((txtValue.toUpperCase().indexOf(filter) > -1)||(tdate.indexOf(filter)> -1)||(tsub.toUpperCase().indexOf(filter) > -1) ) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  });

function sortbydate(){
  var table, rows, switching, i, x, y, shouldSwitch;
  table = $(".newTasks");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.find(".rows");
    for (i = 0; i < (rows.length-1); i++) {
      shouldSwitch = false;
      x = table.find(".rows:eq("+i+") .date").val().split("-");
      y = table.find(".rows:eq("+(i+1)+") .date").val().split("-");
      var xdate = x[2]+x[1]+x[0]
      var ydate = y[2]+y[1]+y[0]
      console.log(xdate,ydate)
      if (xdate < ydate) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function sortbysubject() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = $(".newTasks");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.find(".rows");
      for (i = 0; i < (rows.length-1); i++) {
        shouldSwitch = false;
        x = table.find(".rows:eq("+i+") .subject").val();
        y = table.find(".rows:eq("+(i+1)+") .subject").val();
        console.log(y)
        if (x.toLowerCase() > y.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }

function randomFromTo(from, to){
    return Math.floor(Math.random() * (to - from + 1) + from);
 }


function deleteRow(row){
    console.log("Deleting..!",row)
    row.parent().parent().remove();
}