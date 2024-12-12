/*  (c) 2024 Piotr Kniaz

    This file is part of HBDPG-2.
    Repository: https://github.com/HBDPG-2/hbdpg-2.github.io

    Licensed under the MIT License. See LICENSE file in the project root for details.
*/

const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('./serviceworker.js', { scope: './' } );

            if (registration.waiting) {
                showUpdateNotification(registration.waiting);
            }

            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing || registration.waiting;
    
                if (newWorker) {
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            showUpdateNotification(newWorker);
                        }
                    });
                }
            });
        } catch (error) {
            console.error(`Service Worker registration failed with ${error}`);
        }
    }
};

// registerServiceWorker();

function updateServiceWorker(worker) {
    worker.postMessage({ type: 'SKIP_WAITING' });

    worker.addEventListener('statechange', () => {
        if (worker.state === 'activated') {
            reloadPage(false);
        }
    });
}