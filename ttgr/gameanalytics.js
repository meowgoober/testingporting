(function() {
    'use strict';
    var defaultGA = {
        init: function() {},
        addDesignEvent: function() {},
        addBusinessEvent: function() {},
        addResourceEvent: function() {},
        addProgressionEvent: function() {},
        addErrorEvent: function() {}
    };

    window.GameAnalytics = new Proxy(defaultGA, {
        get: function(target, prop) {
            if (prop in target) return target[prop];
            return function() {};
        }
    });
    window.gameanalytics = window.GameAnalytics;
})();