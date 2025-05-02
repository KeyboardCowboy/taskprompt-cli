import { Task } from '../../../dist/core/Task.js';
import { TaskManager } from '../../../dist/core/TaskManager.js';
import inquirer from 'inquirer';

/**
 * UserInputTask
 * 
 * Demonstrates how to get user input in a task.
 * This task will:
 * 1. Ask the user for their name, age, favorite color, and programming preference
 * 2. Display the collected information
 */
export const UserInputTask: Task = {
    id: 'user-input',
    name: 'User Input Example',
    description: 'Demonstrates how to get user input in a task',
    weight: 0,
    chain: true,
    dependencies: ['clear-cache'],
    questions: [
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            validate: (input: string) => {
                if (input.length < 2) {
                    return 'Name must be at least 2 characters long';
                }
                return true;
            }
        },
        {
            type: 'number',
            name: 'age',
            message: 'What is your age?',
            validate: (input: number) => {
                if (input < 0 || input > 150) {
                    return 'Please enter a valid age between 0 and 150';
                }
                return true;
            }
        },
        {
            type: 'list',
            name: 'favoriteColor',
            message: 'What is your favorite color?',
            choices: ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange']
        },
        {
            type: 'confirm',
            name: 'likesProgramming',
            message: 'Do you like programming?',
            default: true
        }
    ],
    execute: async (taskManager: TaskManager, answers?: Record<string, any>) => {
        if (!answers) {
            console.log('No answers provided');
            return;
        }

        const { name, age, favoriteColor, likesProgramming } = answers;

        console.log('\nCollected Information:');
        console.log('---------------------');
        console.log(`Name: ${name}`);
        console.log(`Age: ${age}`);
        console.log(`Favorite Color: ${favoriteColor}`);
        console.log(`Likes Programming: ${likesProgramming ? 'Yes' : 'No'}`);
        console.log('---------------------\n');
    }
}; 