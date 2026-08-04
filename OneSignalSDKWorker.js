importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// Minimal pass-through fetch handler so the site qualifies as an installable PWA
// (Add to Home Screen). Does not cache or alter requests.
self.addEventListener("fetch", function () {});
