var x_html = "<div class='event-page-close'><a href='/events' class='inner'>✖</a></div>";
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
// var x_html = $('.event-page').html();

// Handles forwards and backwards on this page
if( !isMobile.any() ) {
    $(window).on('popstate', function(e) {

        var location = e.originalEvent.currentTarget.location.href;
        var location_split = location.split("/");

        // Clear event page div on "back"
        if(location_split.length == 4) {
            // HACK:
            // Popstate gets called multiple times on forward/backward
            // Need to check if html is empty before trying to store fragment.
            _html = $("#event-page").html();
            if(_html.length > 0) {
                window.sessionStorage.fragment = _html;
            }
            $('#event-page').html(x_html);

        // Set event information of "forward"
        } else if(location_split.length == 5) {
            _html = window.sessionStorage.fragment;
            if(_html.length > 0) {
                $('#event-page').html(_html);
            } else {
                event_name = location_split[4];
               $.ajax({
                    url: "/fragments/"+event_name,
                    dataType: "html",
                    success: function(response) {
                    // Load fragment into event page div and get container height
                        var event_page = $('#event-page').append(response);
                    }
                });

            }

        }

    });
}

// Used to avoid ajax request on 'x'
// $(".event-page-close").click( function() {
//     $('#event-page').html(x_html);
// });
