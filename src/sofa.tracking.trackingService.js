'use strict';
/* global sofa */
/**
 * @sofadoc class
 * @name sofa.tracking.TrackingService
 * @namespace sofa.tracking
 *
 * @package sofa-tracking
 *
 * @requiresPackage sofa-core
 *
 * @requires window
 *
 * @distFile dist/sofa.tracking.js
 *
 * @description
 * Abstraction layer to communicate with concrete tracker services
 * like Google Analytics.
 */
sofa.define('sofa.tracking.TrackingService', function () {

    var self = {};
    var trackers = self.__trackers = [];

    //allow this service to raise events
    sofa.observable.mixin(self);

    /**
     * @sofadoc method
     * @name sofa.tracking.TrackingService#addTracker
     * @memberof sofa.tracking.TrackingService
     *
     * @description
     * Adds a concrete tracker service implementation and also takes care
     * of the setup.
     *
     * @param {object} tracker Concrete tracker implementation.
     */
    self.addTracker = function (tracker) {
        if (tracker.setup && typeof tracker.setup === 'function') {
            tracker.setup();
        }

        trackers.push(tracker);
    };

    /**
     * @sofadoc method
     * @name sofa.tracking.TrackingService#trackEvent
     * @memberof sofa.tracking.TrackingService
     *
     * @description
     * Forces all registered trackers to track an event.
     *
     * @param {object} eventData Event data object.
     */
    self.trackEvent = function (eventData) {

        self.emit('trackEvent', self, eventData);

        trackers.forEach(function (tracker) {
            if (tracker.trackEvent && typeof tracker.trackEvent === 'function') {
                tracker.trackEvent(eventData);
            }
        });
    };

    /**
     * @sofadoc method
     * @name sofa.tracking.TrackingService#trackTransaction
     * @memberof sofa.TrackingService
     *
     * @description
     * Forces all registered trackers to track the associated transaction.
     *
     * @param {obj} transactionData.
     */
    self.trackTransaction = function (transactionData) {

        self.emit('trackTransaction', self, transactionData);

        trackers.forEach(function (tracker) {
            if (tracker.trackTransaction && typeof tracker.trackTransaction === 'function') {
                tracker.trackTransaction(transactionData);
            }
        });
    };

    /**
     * @sofadoc method
     * @name sofa.tracking.TrackingService#trackConversion
     * @memberof sofa.TrackingService
     *
     * @description
     * Forces all registered trackers to track a conversion.
     *
     * @param {obj} conversion data object.
     */
    self.trackConversion = function (conversionData) {

        self.emit('trackConversion', self, conversionData);

        trackers.forEach(function (tracker) {
            if (tracker.trackConversion && typeof tracker.trackConversion === 'function') {
                tracker.trackConversion(conversionData);
            }
        });
    };

    return self;
});
