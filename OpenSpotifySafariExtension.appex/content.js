browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
    console.log("Received response: ", response);
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);
});

function afterNavigate() {
    var locationArr = window.location.pathname.split("/")
    if (locationArr.includes("album") || locationArr.includes("artist") || locationArr.includes("episode") || locationArr.includes("playlist") || locationArr.includes("show") || locationArr.includes("track") || locationArr.includes("user")) {
        window.location.href = `spotify:/${window.location.pathname}`
    }
}

(document.body || document.documentElement).addEventListener('transitionend',
  function(/*TransitionEvent*/ event) {
    if (event.propertyName === 'width' && event.target.id === 'progress') {
        afterNavigate();
    }
}, true);
// After page load
afterNavigate();
