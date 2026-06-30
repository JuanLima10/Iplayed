export function getHourSeed() {
  const now = new Date()
  now.setMinutes(0, 0, 0)
  return now.getTime()
}
