/**
 * Created by Marcelo on 7/13/16.
 */


$(function () {

    var APIURL = "http://localhost:3000/entities/";

    var postfix = "";

    $('#submitTerm').on('click', function () {
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

    // $( "#searchTerm" ).autocomplete({
    //     source: function( request, response ) {
    //         var wildcard = { "title": "*" + request.term + "*" };
    //         var postData = {
    //             "query": { "wildcard": wildcard },
    //             "fields": ["title", "entitytype"]
    //         };
    //         $.ajax({
    //             url: "http://50.18.47.23:9200/mongo-recipes/_search",
    //             type: "POST",
    //             dataType: "json",
    //             data: JSON.stringify(postData),
    //             success: function( data ) {
    //                 response( $.map( data.hits.hits, function( item ) {
    //                     return {
    //                         label: item.fields.title,
    //                         id: item.fields._id
    //                     }
    //                 }));
    //             }
    //         });
    //     },
    //     minLength: 2,
    //     select: function( event, ui ) {
    //         $("#company_id").val(ui.item.id);
    //     },
    //     open: function() {
    //         $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
    //     },
    //     close: function() {
    //         $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
    //     }
    // })
});