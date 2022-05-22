// name of app
const APP_TITLE ='budget-tracker'
// version of the app
const VERSION = '-v1';
const CACHE_NAME = APP_TITLE + VERSION;
// adding all the files to be cached
const ADD_CACHE_FILES = [
    '/index.html',
    '/js/index.html',
    '/js/idb.js',
    '/css/styles.css',
    '/icons/icon-72x72.png',
    '/icons/icon-96x96.png',
    '/icons/icon-128x128.png',
    '/icons/icon-144x144.png',
    '/icons/icon-152x152.png',
    '/icons/icon-192x192.png',
    '/icons/icon-384x384.png',
    '/icons/icon-512x512.png'  
];
// event listener to install
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache){
            console.log('Installing cache:' + CACHE_NAME)
            // fetch the array "ADD_CACHE_FILES" using the addAll method
            return cache.addAll(ADD_CACHE_FILES)
        })
    )
});
// event listener to activate
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (keyList) {
            let cacheList = keyList.filter(function (key) {
                return key.indexOf(APP_TITLE);
            })

            cacheList.push(CACHE_NAME);

            return Promise.all(keyList.map(function (key, i) {
                if (cacheList.indexOf(key) === -1) {
                    console.log('deleting cache: ' + keyList[i]);
                    return caches.delete(keyList[i]);
                }
            }));
        })
    )
});
// event listener to fetch
self.addEventListener('fetch', function (event) {
    console.log('fetch request: ' + event.request.url);
    event.respondWith(
        caches.match(event.request).then(function (request) {
            // request if else statement to return cache
            if (request) {
                console.log('respond with cache: ' + event.request.url);
                return request
                // if cache is not available return a fetch request
            } else {
                console.log('file is not cached, fetching: ' + event.request.url);
                return fetch(event.request)
            }
        })
    )
});



