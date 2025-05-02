import { TaskManager } from '../dist/core/TaskManager.js';
import { HelloWorldTask, UserInputTask } from './src/tasks/index.js';
/**
 * Example Application
 *
 * This is a simple example application that demonstrates how to use
 * the TaskManager with custom tasks.
 */
async function main() {
    // Create a new TaskManager instance
    // System tasks (Exit and Clear Cache) are automatically registered
    const taskManager = new TaskManager();
    // Register our custom tasks
    taskManager.registerTask(HelloWorldTask);
    taskManager.registerTask(UserInputTask);
    // Start the task manager
    console.log('\nWelcome to the TaskManager Example! 🚀\n');
    await taskManager.run();
}
// Run the application
main().catch(error => {
    console.error('An error occurred:', error);
    process.exit(1);
});
