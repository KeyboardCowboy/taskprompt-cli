import { Task } from '../core/Task.js';
import { TaskManager } from '../core/TaskManager.js';

/**
 * ClearCacheTask
 * 
 * A system task that clears the application cache.
 * This task should appear near the end of the task list,
 * just before the exit task.
 */
export const ClearCacheTask: Task = {
    id: 'clear-cache',
    name: 'Clear Cache',
    description: 'Clears the application cache',
    weight: 80,
    chain: true,
    execute: async (taskManager: TaskManager, answers?: Record<string, any>) => {
        console.log('Clearing cache...');
        
        // Clear stored task answers
        taskManager.clearTaskAnswers();
        
        console.log('Cache cleared successfully');
    }
}; 