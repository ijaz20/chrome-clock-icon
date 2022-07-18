
function pad(s, n) {
    s = '' + s;
    while(s.length < n) {
        s = '0' + s;
    }
    return s;
}

async function updateTime() {
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
                },
                 function(results){
                    let s = (minute == "25" || minute == "55") ?
                        "#" + ((1<<24)*Math.random() | 0).toString(16) : "black"
                    if(results != 0) {
                        s = "red"
                    }
                    chrome.browserAction.setBadgeBackgroundColor({"color": s});
                 } );
            }
        })
    } );
}

setInterval(updateTime, 1000)
