const currentTime = () => {
  const now = new Date()
  const formatTwoDigit = (date) => date.toString().padStart(2, '0');
  return {
    year: now.getFullYear(),
    month: formatTwoDigit(now.getMonth() + 1),
    day: formatTwoDigit(now.getDate()),
    hours: formatTwoDigit(now.getHours()),
    minutes: formatTwoDigit(now.getMinutes()),
    seconds: formatTwoDigit(now.getSeconds()),
  }
}

export default currentTime;