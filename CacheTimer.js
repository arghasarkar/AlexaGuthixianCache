"use strict";

exports.timeToNextCache = function() {
    return generateTextFromTime();
};


const CACHE_INTERVAL = 3;
const MINUTES_PER_HOUR = 60;

function getTimeToNextCache() {
    const moment = require("moment");

    let currentHour = moment().format("H");
    let hoursOfNextCache = CACHE_INTERVAL - (currentHour % CACHE_INTERVAL) - 1;

    let currentMinutes = moment().format("m");
    let minutesRemainingInHour = MINUTES_PER_HOUR - currentMinutes;

    return {
        hour: hoursOfNextCache,
        minute: minutesRemainingInHour
    }
};

function generateTextFromTime() {
    let SPEECH = "The next boosted guthixian cache is in ";
    let timeTillCache = getTimeToNextCache();

    if (timeTillCache.hour > 0) {
        SPEECH += `${timeTillCache.hour} hour and `
    }
    SPEECH += `${timeTillCache.minute} minutes.`;

    return SPEECH;
}