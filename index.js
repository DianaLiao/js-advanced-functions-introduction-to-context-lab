// Your code here

function createEmployeeRecord(array){
  const firstName = array[0]
  const familyName = array[1]
  const title = array[2]
  const payPerHour = array[3]
  const timeInEvents = []
  const timeOutEvents = []

  return {firstName, familyName, title, payPerHour, timeInEvents, timeOutEvents}
}

function createEmployeeRecords(array){
  return array.map(createEmployeeRecord)
}

function createTimeInEvent(card, stamp){
  const updatedCard = Object.assign({},card)
  let [date, time] = stamp.split(" ")
  let hour = parseInt(time.slice(0,2) + "00")
  updatedCard.timeInEvents.push({date, hour, type:"TimeIn"})
  return updatedCard
}

function createTimeOutEvent(card, stamp){
  const updatedCard = Object.assign({},card)
  let [date, time] = stamp.split(" ")
  let hour = parseInt(time.slice(0,2) + "00")
  updatedCard.timeOutEvents.push({date, hour, type:"TimeOut"})
  return updatedCard
}

function hoursWorkedOnDate(card, date){
  let timeInEntry = card.timeInEvents.find(event => event.date === date)
  let timeOutEntry = card.timeOutEvents.find(event => event.date === date)
  return (timeOutEntry.hour - timeInEntry.hour)/100
}

function wagesEarnedOnDate(card, date){
  let wage = card.payPerHour 
  let hours = hoursWorkedOnDate(card, date)
  return wage * hours
}

function allWagesFor(card){
  let dates = card.timeInEvents.map(event => event.date)
  let dateWages = dates.map(date => wagesEarnedOnDate(card, date))
  return dateWages.reduce((a,b) => a+b)
}

function calculatePayroll(employeeArray){
  const allWages = employeeArray.map(allWagesFor)
  return allWages.reduce((a,b) => a+b)
}

function findEmployeeByFirstName(employeeArray, firstName){
  return employeeArray.find(employee => employee.firstName === firstName)
}