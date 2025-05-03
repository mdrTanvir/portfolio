export const calculateXP = (startDate: string | Date, endDate: string | null | Date = null) => {
    // Ensure both start and end are Date objects
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date(); // Default to current date if endDate is null

    // Calculate the difference in milliseconds
    const diff = end.getTime() - start.getTime(); // .getTime() returns the number of milliseconds since the Unix epoch

    if (diff < 0) return 0;

    // Calculate years and months
    const years = Math.floor(diff / 31536000000); // 31536000000 ms in a year
    const months = Math.floor((diff % 31536000000) / 2628000000); // 2628000000 ms in a month

    // Return the result based on the years and months calculated
    if (years) {
        return `${years} year${years > 1 ? 's' : ''} ${months + 1} month${months + 1 > 1 ? 's' : ''}`;
    } else if (months) {
        return `${months + 1} month${months + 1 > 1 ? 's' : ''}`;
    } else {
        return null; // Return null if less than a month
    }
}
