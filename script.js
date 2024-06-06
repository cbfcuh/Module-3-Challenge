// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');


// Collect employee data
const recordedData = []; // Array for collected data from function


const collectEmployees = function() {
  let addEmployeesBtn = true; 

  while (addEmployeesBtn) {
    let firstName = window.prompt("Enter first name: ");
    if (firstName === null || firstName ===""){
    window.alert("Please enter in a valid first name.");
    return recordedData;
    }
    

    let lastName = window.prompt("Enter last name: ")
    if (lastName === null || lastName === ""){
    window.alert("Please enter in a valid last name.")
    return recordedData;
    }

    let salary = window.prompt("Enter in employee's salary: ")
    if (salary === null || isNaN(salary)) {
    window.alert("Please enter in a valid value.")
    return recordedData;
    }

    // This function allows the inputs from the user to be stored in the array that was created "recordedData". Without it the users input will not be stored and nothing will show in the table.
    recordedData.push({firstName: firstName, lastName: lastName, salary: Math.trunc(salary) });

    let nextEmployee = {firstName, lastName, salary};
    nextEmployee = window.prompt("Would you like to add another employee? Yes/No")
    if (nextEmployee.toLowerCase()!=="yes") {
      break; // This exits the user from the window prompts completely if they don't type "yes".
    }
  }
  return recordedData; 
}


// Display the average salary
const displayAverageSalary = function(employeesArray) {
  // By using the ".length" property this allows the code to be more robust and actively work when more employees are added to the table. If a fixed number was used such as "i < 100" then the function would only calculate the average up to 100 individuals
  let totalSalary = 0;
  let numEmployees = employeesArray.length;
  for (let i = 0; i < numEmployees; i++){
    totalSalary += employeesArray[i].salary;
  }
 
  let averageSalary = totalSalary / numEmployees;
  console.log(`The average salary between our ${employeesArray.length} employee(s) is: ${averageSalary.toLocaleString("en-US", { style: "currency", currency: "USD" })}`);
}



// Select a random employee
const getRandomEmployee = function(employeesArray) {
  // By using the ".length" property it allows the function to work more dynamically. Initally the "else" statement will run when the array is empty, but once an employee is added to the array the code will run beginning with the "if" statement.
 if (employeesArray.length > 1) {
  const randEmployee = employeesArray[Math.floor(Math.random() * employeesArray.length)];
  console.log(`Congratulations to ${randEmployee.firstName} ${randEmployee.lastName}, our random drawing winner!`)
 }
 else{
  console.log("Insufficient number of employee(s) to pick from.");
 }
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
