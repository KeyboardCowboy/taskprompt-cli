import { Task } from '../../../dist/core/Task.js';
import { TaskManager } from '../../../dist/core/TaskManager.js';

/**
 * HelloWorldTask
 * 
 * A simple task that prints a hello world message.
 * This task demonstrates:
 * 1. Basic task structure
 * 2. Using stored answers from other tasks
 * 3. Creating personalized output based on user data
 */
export const HelloWorldTask: Task = {
    id: 'hello-world',
    name: 'Hello World',
    description: 'Prints a hello world message to the console',
    weight: 0,
    chain: true,
    execute: async (taskManager: TaskManager) => {
        // Check if we have user information from UserInputTask
        const userInfo = taskManager.getTaskAnswers('user-input');
        
        if (userInfo) {
            const { name, age, favoriteColor, likesProgramming } = userInfo;
            
            // Create a colorful border based on user's favorite color
            const border = '='.repeat(40);
            console.log(`\n\x1b[${getColorCode(favoriteColor)}m${border}\x1b[0m`);
            
            // Personalized greeting
            console.log(`\nHello, ${name}! 👋`);
            
            // Age-based message
            if (age < 18) {
                console.log("Wow! Starting to code so young - that's awesome! 🌟");
            } else if (age < 30) {
                console.log("Perfect time to be diving into programming! 💻");
            } else {
                console.log("It's never too late to learn something new! 🚀");
            }
            
            // Programming enthusiasm message
            if (likesProgramming) {
                console.log("\nGreat to meet another coding enthusiast!");
                console.log(`Let's write some ${favoriteColor.toLowerCase()}-colored code! 🎨`);
            } else {
                console.log("\nDon't worry if coding isn't your thing!");
                console.log("There are many ways to be creative! 🎯");
            }
            
            console.log(`\n\x1b[${getColorCode(favoriteColor)}m${border}\x1b[0m\n`);
        } else {
            // Default message if no user information is available
            console.log('\nHello, World! 👋\n');
            console.log('Tip: Try running the "User Input Example" task first');
            console.log('to get a personalized greeting next time!\n');
        }
    }
};

/**
 * Get ANSI color code for console output
 */
function getColorCode(color: string): number {
    const colorMap: Record<string, number> = {
        'Red': 31,
        'Green': 32,
        'Yellow': 33,
        'Blue': 34,
        'Purple': 35,
        'Orange': 33 // Using yellow as closest ANSI color
    };
    return colorMap[color] || 37; // Default to white if color not found
} 