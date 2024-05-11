browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
    console.log("Received response: ", response);
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);
});

function afterNavigate() {
    const newPathname = window.location.pathname.replace(/\/intl-\w+\//g, "/");

    if (/album|artist|episode|playlist|show|track|user/.test(newPathname)) {
        window.location.href = `spotify:/${newPathname}`;
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
