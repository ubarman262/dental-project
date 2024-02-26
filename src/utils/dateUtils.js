/**
 * Convert a date string in "YYYY-MM-DD" format to a valid timestamp format.
 * @param {string} dateString - The date string in "YYYY-MM-DD" format.
 * @returns {Date} The date object in valid timestamp format.
 */
function convertDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day); // Month is zero-based in Date constructor
}

module.exports = {
  convertDate,
};
