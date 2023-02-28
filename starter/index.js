const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");



// TODO: Write Code to gather information about the development team members, and render the HTML file.

function createEngineer(team) {
    inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: "What is Engineer's name?",
        },
        {
          type: 'number',
          name: 'id',
          message: 'What is their id number?',
        },
        {
          type: 'input',
          name: 'email',
          message: 'What is their email?',
        },
        {
          type: 'input',
          name: 'github',
          message: 'What is their Github user name?'
        }
      
      ]).then((engineerDetails) => {
        // Initialise Engineer class to create Manager object
        const engineer = new Engineer(engineerDetails.name, engineerDetails.id, engineerDetails.email, engineerDetails.githubUsername)
         team.push(engineer);
        createTeam(team); // at this point we add an engineer to the team array
    });
}

function createIntern(team) {
    inquirer.prompt( [
        {
          type: 'input',
          name: 'name',
          message: "What is Intern's name?",
        },
        {
          type: 'number',
          name: 'id',
          message: 'What is their id number?',
        },
        {
          type: 'input',
          name: 'email',
          message: 'What is their email?',
        },
        {
          type: 'input',
          name: 'school',
          message: 'What school do they attend?'
        }
      ]).then((internDetails) => {
        // Initialise Intern class to create Manager object
         const intern = new Intern(internDetails.name, internDetails.id, internDetails.email, internDetails.school)
         team.push(intern);
        createTeam(team); // at this point we add an intern to the team array
    });
}

function createTeam(team) {
    inquirer.prompt([
        {
            type: 'list',
            name: 'memberChoice',
            message: 'Which type of team member you wan to add?',
            choices: [
                'Engineer',
                'Intern',
                "I don't want to add any more team member",
            ],
        }
    ]).then((choice) => {
        if (choice.memberChoice === 'Engineer') {
            createEngineer(team);
        } else if (choice.memberChoice === 'Intern') {
            createIntern(team);
        } else {
            // at this point, team array should have a manager and however many engineers and interns the user inputted
            const html = render(team); // html will be html file as string
            // write html to a file index.html using fs library
            fs.writeFile(outputPath, html, (err) => {
                if (err) {
                    console.log('Failed to write HTML file');
                }
            });
        }
    });
}

function createManager(team) {
    inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: "What is the team manager's name?",
        },
        {
          type: 'number',
          name: 'id',
          message: 'What is their id number?',
        },
        {
          type: 'input',
          name: 'email',
          message: 'What is their email?',
        },
        {
          type: 'number',
          name: 'office',
          message: 'What is their Office number?'
        }
      
      ]).then((managerDetails) => {
        // Initialise Manager class to create Manager object
        const manager = new Manager(managerDetails.name, managerDetails.id, managerDetails.email, managerDetails.office)
        team.push(manager);
        createTeam(team); // at this point, team array have a manager in it
    });
}

function start() {
    const team = []; // array of Employee objects (array of Manager, or Engineers, or Interns)
    // Employee can be Manager, Engineer, or Intern
    createManager(team);
}

start();
