import { Task } from '../core/Task.js';
import { TaskManager } from '../core/TaskManager.js';

/**
 * ExitTask
 * 
 * A system task that exits the program.
 * This task will:
 * 1. Log a goodbye message
 * 2. Exit the program
 * 
 * Note: chain is set to false since we want the program to end
 * after this task completes.
 */
export const ExitTask: Task = {
    id: 'exit',
    name: 'Exit Program',
    description: 'Exit the application',
    weight: 100,
    chain: false,
    execute: async (taskManager: TaskManager, answers?: Record<string, any>) => {
        console.log('\nGoodbye! 👋\n');
        process.exit(0);
    }
}; 