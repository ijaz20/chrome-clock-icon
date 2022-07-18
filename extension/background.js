
function pad(s, n) {
    s = '' + s;
    while(s.length < n) {
        s = '0' + s;
    }
    return s;
}

function updateTime() {
    dateobj = new Date();

    minute = pad(dateobj.getMinutes(), 2);
    seconds = pad(dateobj.getSeconds(), 2);

    badge = minute + ':' + seconds;
    title = badge;
    chrome.browserAction.setBadgeText({"text": badge});
    chrome.browserAction.setTitle({"title": title});
    chrome.tabs.query({}, function(tabs) {
        tabs.forEach((tab) => {
            if(tab.url == "") {
                chrome.tabs.executeScript(tab.id, {
                    code:"var x = document.getElementById('on_demand_table_body').getElementsByTagName('a').length; x"
                },
                 function(results){
                 console.log(results[0])
                    if(results != 0) {
                        chrome.browserAction.setBadgeBackgroundColor({"color": "red"});
                    } else {
                        chrome.browserAction.setBadgeBackgroundColor({"color": "black"});
                    }
                 } );
            }
        })
    } );
}

setInterval(updateTime, 1000)
