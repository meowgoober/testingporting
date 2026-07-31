(function() {
    'use strict';
    if (window.PokiSDK && window.PokiSDK._isStubbed) return;
    
    var defaultPoki = {
        init: function() { return Promise.resolve(true); },
        initWithVideoHB: function() { return Promise.resolve(true); },
        commercialBreak: function(fn) { if (typeof fn === 'function') fn(); return Promise.resolve(true); },
        rewardedBreak: function(fn) { if (typeof fn === 'function') fn(true); return Promise.resolve(true); },
        displayAd: function(a, b, c, d) { if (typeof c === 'function') c(); if (typeof d === 'function') d(true); },
        getLanguage: function() { return (navigator.language || 'en').split('-')[0]; },
        getDeviceInfo: function() { return { category: 'desktop' }; },
        isAdBlocked: function() { return false; },
        getUser: function() { return Promise.resolve(null); },
        getToken: function() { return Promise.resolve(''); },
        _isStubbed: true
    };

    window.PokiSDK = new Proxy(defaultPoki, {
        get: function(target, prop) {
            if (prop in target) return target[prop];
            return function() {
                return Promise.resolve(true);
            };
        }
    });
})();