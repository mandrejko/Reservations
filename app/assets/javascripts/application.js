// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
//= require bootstrap-sprockets

$(document).ready(function() {
    //on page load, check database for today's date
    //if nothing, render "no sessions today"
    //else render the table view
    var dateElem = $("#date");
    var dateTitle = $('#date-title');
    
    var date = dateElem.val();
    fillTable(date, dateTitle);
    
    $('#submit').click(function() {
        date = dateElem.val();
        
        fillTable(date, dateTitle);
    });
});

function fillTable(date, dateTitle){
    $.get('/sessions/home/filter', {date: date}, function(data) {
            var body = $('#table-body');
            var table = $('#table');
            body.empty();
            
            if(data.length == 0) {
               table.hide();
               dateTitle.text("No sessions on " + date);
            }
            
            else {
                dateTitle.text("Showing sessions on " + date);
                table.show();
                data.forEach(function(session) {
                        body.append(getSessionHtml(session));
                });    
            }
        });
}

function getSessionHtml(session) {
    var html =  '<tr>' +
                    '<td align="center">' +
                        session.time +
                    '</td>' +
                    '<td align="center"> ' +
                        session.current_capacity +
                    '</td> ' +
                    '<td align="center"> ' +
                        session.max_capacity + 
                    '</td> ' +
                    '<td align="center">';
    if(session.current_capacity < session.max_capacity) {
        html += '<td>' + 
                '<a class="btn btn-sm btn-info" href="/sessions/' + session.id + '/new_reservation">Reserve Slot</a>' +
                '</td>';
    }
    else{
        html += '<td>This session is full</td>';
    }
    
    html += '<tr>';
    
    return html;
}