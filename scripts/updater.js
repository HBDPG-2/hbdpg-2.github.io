/*  (c) 2024 Piotr Kniaz

    This file is part of HBDPG-2.
    Repository: https://github.com/HBDPG-2/hbdpg-2.github.io

    Licensed under the MIT License. See LICENSE file in the project root for details.
*/

const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register(
                './serviceworker.js',
                {
                    scope: './',
                }
            );

            // debug
            if (registration.installing) {
                console.log('Service worker installing');
            } else if (registration.waiting) {
                console.log('Service worker installed');
            } else if (registration.active) {
                console.log('Service worker active');
            }
        } catch (error) {
            console.error(`Service Worker registration failed with ${error}`);
        }
    } else {
        // debug
        window.alert('SW is not in Navigator');
    }
};
  
// registerServiceWorker();