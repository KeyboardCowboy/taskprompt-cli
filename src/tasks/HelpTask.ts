import { Task } from '../core/Task.js';
import { TaskManager } from '../core/TaskManager.js';

/**
 * HelpTask
 * 
 * A system task that displays information about all available tasks.
 * This task will:
 * 1. Get all registered tasks
 * 2. Display each task's name and description in a formatted way
 * 3. Show task dependencies if any exist
 */
export const HelpTask: Task = {
    id: 'help',
    name: 'Help',
    description: 'Display information about all available tasks',
    weight: 90,
    chain: true,
    execute: async (taskManager: TaskManager) => {
        const tasks = taskManager.getAllTasks();
        
        console.log('\nAvailable Tasks:\n');
        
        tasks.forEach(task => {
            // Print task name and description
            console.log(`\x1b[1m${task.name}\x1b[0m`);
            console.log(`  ${task.description}`);
            
            // Print dependencies if they exist
            if (task.dependencies && task.dependencies.length > 0) {
                const dependencyTasks = task.dependencies
                    .map(depId => taskManager.getTask(depId)?.name)
                    .filter(Boolean);
                
                if (dependencyTasks.length > 0) {
                    console.log(`  Dependencies: ${dependencyTasks.join(', ')}`);
                }
            }
            
            console.log(''); // Add spacing between tasks
        });
    }
}; 