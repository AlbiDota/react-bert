/* Task 1: Syntax and Comments
this is a multi-line comment.
I will use single-line comments for the coming tasks */

// Task 2: Variables and Data Types
console.log("\n------------TASK2-------------");
const MAX_SCORE = 100; // Constant

let currentScore = 0; // Number
let userName = "Bert"; // String
let userAge = 25; // Number
let newUser = true; // Boolean

//print the variables
console.log(
    "-------------------------" +
    "\nUsername: " + userName +
    "\nUser Age: " + userAge +
    "\nNew User: " + newUser +
    "\n-------------------------"
);

/* console.log(`
    User Name: ${userName}
    User Age: ${userAge}
    New User: ${newUser}
    Current Score: ${currentScore}
    Max Score: ${MAX_SCORE}
`);*/

// Task 3: Operators and Numbers
console.log("\n------------TASK3-------------");
//arithmetic operators with results in new variables
let currentScoreAdded = currentScore + 5; // Addition
let currentScoreMultiplied = currentScore * 2; // Multiplication
MAX_SCORE_DIVIDED = MAX_SCORE / 10; // Division
MAX_SCORE_MODULUS = MAX_SCORE % 3; // Modulus
console.log(
    "-------------------------" +
    "\ncurrentScore Added 5: " + currentScoreAdded    +
    "\nthen Multiplied by 2: " + currentScoreMultiplied +
    "\nthen MAX_SCORE Divided by 10: " + MAX_SCORE_DIVIDED +
    "\nthen MAX_SCORE Modulus 3: " + MAX_SCORE_MODULUS +
    "\n-------------------------"
);

//same operations, but on the same variable
console.log("\n-------------------------");
currentScore += 5; // Addition
console.log("currentScore Added 5: " + currentScore);

currentScore *= 2; // Multiplication
console.log("then Multiplied by 2: " + currentScore);

currentScore /= 10; // Division
console.log("then Divided by 10: " + currentScore);

currentScore %= 3; // Modulus
console.log("then Modulus 3: " + currentScore);
console.log("-------------------------");

//same operations, but with the Math object
console.log("\n-------------------------");
console.log("Rounded to nearest integer: " + Math.round(currentScore)); // Round to nearest integer
console.log("Square root of MAX_SCORE: " + Math.sqrt(MAX_SCORE)); // Square root of MAX_SCORE
console.log("Random integer between 0 and MAX_SCORE: " + Math.floor(Math.random() * MAX_SCORE)); // Random integer between 0 and MAX_SCORE //Math.floor rounds down to the nearest whole number (integer)
console.log("-------------------------");


// Task 4: Strings
console.log("\n------------TASK4-------------");
//creating a string variable with the value "JavaScript is awesome!"
console.log("-------------------------");
let stringVariable = "JavaScript is awesome!";
console.log("String Variable: " + stringVariable);
console.log("-------------------------");

//using string methods
console.log("\n-------------------------");
console.log("converted to uppercase: " + stringVariable.toUpperCase()); // Convert to uppercase
console.log("index of 'awesome': " + stringVariable.indexOf("awesome")); // Index of "awesome"
console.log("'awesome' replaced with 'amazing': " + stringVariable.replace("awesome", "amazing")); // Replace "awesome" with "amazing"
console.log("-------------------------");

// Task 5: Arrays
console.log("\n------------TASK5-------------");
//creating an array of 5 different data types
console.log("-------------------------");
let coolArray = ["JavaBert", 25, false, new Date("2025-02-11"), {name: "Bert", age: 25}]; // Array of 5 different data types: String, Number, Boolean, Date, Object
console.log("Array: " + coolArray);
console.log("this array consists of a String, Number, Boolean, Date, and Object");
console.log("-------------------------");

//using array methods
console.log("\n-------------------------");
coolArray.push("new item 1", "new item 2"); // Add two new items to the end of the array
coolArray.shift(); // Delete the first item. .pop() would delete the last item
console.log("Array after adding two new items and deleting the first item: " + coolArray);
console.log("index of a specific item (the boolean item): " + coolArray.indexOf(false)); // Index of a specific item
console.log("-------------------------");

//creating a new array with the first 3 elements of the previous array
console.log("\n-------------------------");
let newArray = coolArray.slice(0, 3); // Create a new array with the first 3 elements of the previous array using slice(). negative numbers can be used to count from the end of the array
//for example, let newArray = coolArray.slice(-5, -2); would create a the same array
console.log("New Array with the first 3 elements: " + newArray);
console.log("-------------------------");

// Task 6: Objects
console.log("\n------------TASK6-------------");
//An object representing a user with properties for name, age, scores(an array), and an address (an object with properties for street, city, and country).
console.log("-------------------------");
let user = { // Object representing a user
    name: "Bert", // Property for name
    age: 25, // Property for age
    scores: [33, 66, 99], // Property for scores (an array)
    address: {street: "stejnveien 3", city: "Trondheim", country: "Norway"} // Property for address (an object with properties for street, city, and country)
}
console.log("User Object: " , user);
console.log("-------------------------");

//add a new property to the user object for "totalScore" manually assign it a value.
console.log("\n-------------------------");
Object.defineProperty(user, "totalScore", {value: 69, enumerable: true});
console.log("User object with new property 'totalScore': " , user);
console.log("-------------------------");
//Object.keys(user).forEach((prop)=> console.log(prop));
//JAVASCRIPT MOMENT LMAOAOOAOAOAOA
/*const obj1 = { a:1 };
const obj2 = obj1;
const obj3 = { a:1 };
console.log(obj1 === obj2, obj1 === obj3);
console.log(1 + "2" -"3");*/

// Task 7: Bringing it all together
console.log("\n------------TASK7-------------");
//create an array with three student objects. each object should have properties for name, id and grades( an array of three numbers).
console.log("-------------------------");
let student = {
    student1: {name: "Solid", id:1, grades: [6, 3, 4]},
    student2: {name: "Liquid", id:2, grades: [4, 6, 4]},
    student3: {name: "Solidus", id:3, grades: [5, 6, 6]}
}
console.log("Array with three student objects: " , student);
console.log("-------------------------");

//manually calculate the average grade for the first student.
console.log("\n-------------------------");
let studAvg = (student.student1.grades.reduce((a, b) => a + b, 0) / student.student1.grades.length);
console.log("Average grade for student1: " + studAvg);
console.log("-------------------------");

//add this average as a new property to the first students object
console.log("\n-------------------------");
Object.defineProperty(student.student1, "averageGrade", {value: studAvg, enumerable: true});
console.log("Student object with new property 'averageGrade': " , student.student1);
console.log("-------------------------");

//create a new array containing only the names of all the students
console.log("\n-------------------------");
let studentNames = [];
console.log("student.length", Object.keys(student).length);
for (let key in student) {
    studentNames.push(student[key].name);
    console.log(student[key].name);
}
/*for (let i=0; i < Object.keys(student).length; i++) {
    console.log(student[i].name);
    studentNames.push(student[i].name);
}*/

console.log("New array containing only the names of the students: " + studentNames);
console.log("-------------------------");

//Using indexOf() method to find the position of a specific student in the array
console.log("\n-------------------------");
console.log("Index of student 'Liquid' using '.indexOf': " + studentNames.indexOf("Liquid"));
console.log("-------------------------");
// This concludes this JavaScript syntax practice.