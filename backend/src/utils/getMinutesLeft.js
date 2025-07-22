function getMinutesLeft(futureDate) {
    const now = new Date();
    const diffMs = new Date(futureDate) - now;

    if (diffMs <= 0) return 0;

    const totalMinutes = Math.ceil(diffMs / (1000 * 60)); // Round up to next full minute
    return totalMinutes;
}

export default getMinutesLeft