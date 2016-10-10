function WriteEmail(text) {
    var anchor = '<a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#105;&#110;&#102;&#111;&#64;&#102;&#108;&#105;&#112;&#98;&#105;&#116;&#46;&#99;&#111;&#46;&#117;&#107;">' + text + '</a>';    
    document.write(anchor)
}

$(function () {
    $('pre').each(function () {
        if ($(this).children("code").length > 0) {
            $(this).addClass('prettyprint');
            $(this).append($(this).children("code").html());
            $(this).children("code").remove();
        }
    });

    if (window.prettyPrint) {
        prettyPrint();
    }

    $('#scroll-down').click(function () {
        $("html,body").animate({ scrollTop: $('.megatron').height() }, 250);
        return false;
    });

    // Download SVGs
    jQuery('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a').css({ fill: '#999' });

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');
    });

    $('.highlight-svg').hover(function () {
        $(this).find('svg').css({ fill: '#428bca' });
        console.log('hello')
    }, function () {
        $(this).find('svg').css({ fill: '#999' });
    });
}); 