/**
 * Created by Marcelo on 7/13/16.
 */


$(function () {

    var APIURL = "http://localhost:3000/entities/";

    $('#myform').submit(function ( event ) {
        event.preventDefault();
        var searchTerms = $('#searchTerm').val();
        if ( searchTerms.length ) {
            $('#searchTerm').val("");

        }

        $.ajax({
            type:        "GET",
            url:         APIURL,
            contentType: "application/json; charset=utf-8",
            data:        { "q": searchTerms },
            cache:       false,
            success:     function ( data ) {

                data.hits.map(function ( hit ) {
                    console.log(hit._source.title);
                    $('ul').append('<li>' + hit._source.title + '</li>');
                });
            }
        });

    });

    $("#searchTerm").autocomplete({
        source:    function ( request, response ) {

            $.ajax({
                type:        "GET",
                url:         APIURL,
                contentType: "application/json; charset=utf-8",
                data:        { "q": request.term },
                cache:       false,
                success:     function ( data ) {
                    response($.map(data.hits, function ( item ) {
                        return {
                            label: item._source.title,
                            value: item._source.title
                        }
                    }));

                }
            });
        },
        minLength: 2,
        select:    function ( event, ui ) {
            log(ui.item ? "Selected: " + ui.item.label : "Nothing selected, input was " + this.value);
        }
    })

    function log( message ) {
        $("<div>").text(message).prependTo("#log");
        $("#log").scrollTop(0);
    }
});