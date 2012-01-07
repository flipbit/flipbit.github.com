// Load jQuery from Google
google.load("jquery", "1.3.2");
google.load("jqueryui", "1.7.2");

function WriteEmail(text) {
    var anchor = '<a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#105;&#110;&#102;&#111;&#64;&#102;&#108;&#105;&#112;&#98;&#105;&#116;&#46;&#99;&#111;&#46;&#117;&#107;">' + text + '</a>';    
    document.write(anchor)
}

function getTicks() {
    var now = new Date();
    return now.getTime();
}