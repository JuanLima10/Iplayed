import { format } from 'date-fns';

export function getYear(number: number | undefined) {
  if(number){
    const date = new Date(number * 1000)
    const getYear = date.getFullYear()
    return `(${getYear})`
  }
  return ""
}

export function getFullDate(number: number | undefined) {
  if(number){
    const date = new Date(number * 1000)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    return new Date(year, month, day)
  }
  return ""
}

export function getFullFormatedDate(number: number | undefined) {
  if(number){
    const date = new Date(number * 1000)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    return format(new Date(year, month, day), "MMMM do, yyyy")
  }
  return ""
}