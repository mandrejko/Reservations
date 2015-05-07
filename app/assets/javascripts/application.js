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
    setActiveBar();
    
    //deal with the date search page
    var dateElem = $("#date");
    var dateTitle = $('#date-title');
    
    var date = dateElem.val();
    fillDateTable(date, dateTitle);
    
    $('#submit').click(function() {
        date = dateElem.val();
        
        fillDateTable(date, dateTitle);
    });
    
    //deal with the email search page
    var today = "2015-05-12"
    var emailElem = $("#email");
    var emailTitle = $("#email-title")
    
    $('#search').click(function(){
        var email = emailElem.val();
        
        fillEmailTable(today, email, emailTitle);
    });
});

function fillDateTable(date, dateTitle){
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
                        body.append(getDateSessionHtml(session));
                });    
            }
        });
}

function getDateSessionHtml(session) {
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

function fillEmailTable(date, email, emailTitle){
    var emailError = $("#email-error");
    
    $.get('/sessions/email_search/filter', {date: date, email: email}, function(data) {
        var body = $('#table-body');
        var table = $('#table');
        body.empty();
    
        if(data != null) {
            emailError.hide();
            emailTitle.parent().show();
            
            if(data.length == 0) {
                table.hide();
                emailTitle.text("No sessions on or after today");
            }
            
            else {
                emailTitle.text("Showing sessions on or after today");
                table.show();
                data.forEach(function(session) {
                    body.append(getEmailSessionHtml(session));
                });    
            }
        }
        else {
            table.hide();
            emailTitle.parent().hide();
            emailError.show();
        }
    });
}

function getEmailSessionHtml(session) {
    var html =  '<tr>' +
                    '<td align="center">' +
                        session.date +
                    '</td>' +
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
    
    return html;
}

function setActiveBar() {
    var homeNav = $("#home-nav");
    var emailNav = $("#email-nav");
    
    var url = window.location.href.toString();
    if(url.search('email_search') != -1) {
        homeNav.removeClass('active');
        emailNav.addClass('active');
    }
}