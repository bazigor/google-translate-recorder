(function(){
    document.documentElement.setAttribute("data-google-translate-recorder", chrome.runtime.id)
    var script = document.createElement('script');
    script.src = chrome.extension.getURL('content/catcher_injected.js');
    script.onload = function() {
        this.parentNode.removeChild(this);
    };
    (document.head||document.documentElement).appendChild(script);
})()
