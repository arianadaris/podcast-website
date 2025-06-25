"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.truncateDescription = exports.formatDuration = void 0;
var formatDuration = function (seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var secs = seconds % 60;
    if (hours > 0) {
        return [hours, minutes, secs]
            .map(function (unit) { return String(unit).padStart(2, '0'); })
            .join(':');
    }
    else {
        return [minutes, secs]
            .map(function (unit) { return String(unit).padStart(2, '0'); })
            .join(':');
    }
};
exports.formatDuration = formatDuration;
var truncateDescription = function (description) {
    var truncateMarkers = [
        'For more',
        'Follow ',
        'Subscribe to',
        'Leave a comment',
        'Like and share',
        'follow ',
        'Date Recorded:',
        'Check out',
        'Thumbnail by',
    ];
    var earliestIndex = description.length;
    for (var _i = 0, truncateMarkers_1 = truncateMarkers; _i < truncateMarkers_1.length; _i++) {
        var marker = truncateMarkers_1[_i];
        var index = description.indexOf(marker);
        if (index !== -1 && index < earliestIndex) {
            earliestIndex = index;
        }
    }
    return earliestIndex < description.length
        ? description.substring(0, earliestIndex).trim()
        : description;
};
exports.truncateDescription = truncateDescription;
