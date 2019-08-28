#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");
const fs = require("fs")
const init = ()=>{
    console.log(
        chalk.green(
            figlet.textSync("Node JS CLI",{
                font: "GHOST",
                horizontalLayout: "default",
                verticalLayout: "default"
            })
        )
    )
}

const askQuestions = () =>{
    const questions = [
        {
          name: "FILENAME",
          type: "input",
          message: "What is the name of the file without extension?"
        },
        {
          type: "list",
          name: "EXTENSION",
          message: "What is the file extension?",
          choices: [".rb", ".js", ".php", ".css"],
          filter: function(val) {
            return val.split(".")[1];
          }
        }
      ];
      return inquirer.prompt(questions);
}
const success = (filePath)=>{
    console.log(
        chalk.white.bgGreen.bold(`Done! File created at ${filepath}`)
      );
}
const createFile = (FILENAME,EXTENSION)=>{
    const filePath = `${process.cwd()}/${FILENAME}.${EXTENSION}`
    shell.touch(filePath);
    return filePath;
}
const run = async ()=>{
    //show script description
    init()
    //ask questions
    const answers = await askQuestions()
    const {FILENAME,EXTENSION} = answers
    //create the file
    const filepath = createFile(FILENAME,EXTENSION)

    //show success message
    success(filepath)
}

run()