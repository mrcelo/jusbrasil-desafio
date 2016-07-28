/**
 * Created by Marcelo on 7/13/16.
 */


$(function () {

    var APIURL = "http://localhost:3000/entities/";
    var total  = 0;
    $('#myform').submit(function ( event ) {
        event.preventDefault();
        $('ol').empty();
        var searchTerms = $('.searchTerm').val();
        if ( searchTerms.length ) {
            $('.searchTerm').val("");

        }
        $.ajax({
            type:        "GET",
            url:         APIURL,
            contentType: "application/json; charset=utf-8",
            data:        { "q": searchTerms },
            cache:       true,
            success:     function ( data ) {

                if ( data.total == 0 ) {
                    total = 0;
                    $('ol').append('<h3>No results for \"' + searchTerms + '\".</h3>')
                } else {

                    $('ol').append('<h3>Results (' + data.total + ')</h3>')
                    total = data.total;

                }


                data.hits.map(function ( hit ) {
                    console.log(hit._source.title);

                    $('ol').append('<li>' + hit._source.title + '<span class="type">' + hit._source.entitytype + '</span>' + '</li>');
                });
            }
        });

    });

    $(".searchTerm").autocomplete({
        source:    function ( request, response ) {

            $.ajax({
                type:        "GET",
                url:         APIURL + "/suggest/",
                contentType: "application/json; charset=utf-8",
                data:        { "q": request.term },
                cache:       true,
                success:     function ( data ) {
                    total = data.length;
                    response($.map(data, function ( item ) {
                        return {
                            label: item.text,
                            value: item.text
                        }
                    }));

                }
            });
        },
        minLength: 2,
        select:    function ( event, ui ) {
            // log(ui.item ? "Selected: " + ui.item.label : "Nothing selected, input was " + this.value);
            // $('ol').empty();
            // $('ol').append('<h3>Results (' + total + ')</h3>');
            // $('ol').append('<li>' + ui.item.label + '<span class="type">' + ui.item.type + '</span>' + '</li>');
        }
    })

    function log( message ) {
        $("<div>").text(message).prependTo("#log");
        $("#log").scrollTop(0);
    }
});