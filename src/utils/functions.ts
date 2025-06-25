export const formatDuration = (seconds: any): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
        return [hours, minutes, secs]
            .map(unit => String(unit).padStart(2, '0'))
            .join(':');
    } else {
        return [minutes, secs]
            .map(unit => String(unit).padStart(2, '0'))
            .join(':');
    }
};

export const truncateDescription = (description: string): string => {
    const truncateMarkers = [
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

    let earliestIndex = description.length;
    
    for (const marker of truncateMarkers) {
        const index = description.indexOf(marker);
        if (index !== -1 && index < earliestIndex) {
            earliestIndex = index;
        }
    }

    return earliestIndex < description.length
        ? description.substring(0, earliestIndex).trim()
        : description;
};