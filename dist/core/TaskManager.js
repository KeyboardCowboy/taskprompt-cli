import inquirer from 'inquirer';
import { ExitTask, ClearCacheTask } from '../tasks/index.js';
/**
 * TaskManager
 *
 * Manages the registration and execution of tasks.
 * This class is responsible for:
 * 1. Storing registered tasks
 * 2. Executing tasks
 * 3. Handling task dependencies
 * 4. Managing the CLI interface
 * 5. Storing and retrieving task answers
 */
export class TaskManager {
    constructor() {
        this.tasks = new Map();
        this.taskAnswers = new Map();
        // Register system tasks
        this.registerTask(ExitTask);
        this.registerTask(ClearCacheTask);
    }
    /**
     * Register a task with the TaskManager.
     * @param task The task to register
     * @throws Error if a task with the same ID is already registered
     */
    registerTask(task) {
        if (this.tasks.has(task.id)) {
            throw new Error(`Task with ID '${task.id}' is already registered`);
        }
        this.tasks.set(task.id, task);
    }
    /**
     * Get a task by its ID.
     * @param id The ID of the task to retrieve
     * @returns The task if found, undefined otherwise
     */
    getTask(id) {
        return this.tasks.get(id);
    }
    /**
     * Get all registered tasks, sorted by weight.
     * Tasks with higher weights appear later in the list.
     * @returns An array of all registered tasks, sorted by weight
     */
    getAllTasks() {
        return Array.from(this.tasks.values()).sort((a, b) => {
            const weightA = a.weight ?? 0;
            const weightB = b.weight ?? 0;
            return weightA - weightB;
        });
    }
    /**
     * Get stored answers for a task.
     * @param taskId The ID of the task
     * @returns The stored answers or undefined if none exist
     */
    getTaskAnswers(taskId) {
        return this.taskAnswers.get(taskId);
    }
    /**
     * Store answers for a task.
     * @param taskId The ID of the task
     * @param answers The answers to store
     */
    storeTaskAnswers(taskId, answers) {
        this.taskAnswers.set(taskId, answers);
    }
    /**
     * Clear all stored task answers.
     * This is typically used when clearing the application cache.
     */
    clearTaskAnswers() {
        this.taskAnswers.clear();
    }
    /**
     * Execute a task and its dependencies.
     * @param taskId The ID of the task to execute
     * @throws Error if the task is not found or if there's a circular dependency
     */
    async executeTask(taskId) {
        const task = this.getTask(taskId);
        if (!task) {
            throw new Error(`Task with ID '${taskId}' not found`);
        }
        // Execute dependencies first
        if (task.dependencies) {
            for (const dependencyId of task.dependencies) {
                await this.executeTask(dependencyId);
            }
        }
        // Ask questions if the task has any
        let answers;
        if (task.questions) {
            // Get stored answers for this task
            const storedAnswers = this.getTaskAnswers(taskId);
            // Add default values from stored answers to questions
            const questionsWithDefaults = task.questions.map(question => {
                if (storedAnswers &&
                    typeof question === 'object' &&
                    'name' in question &&
                    question.name &&
                    question.name in storedAnswers) {
                    return {
                        ...question,
                        default: storedAnswers[question.name]
                    };
                }
                return question;
            });
            // Prompt for answers
            answers = await inquirer.prompt(questionsWithDefaults);
            // Store the new answers
            this.storeTaskAnswers(taskId, answers);
        }
        // Execute the task with the answers
        await task.execute(this, answers);
    }
    /**
     * Check if a task exists.
     * @param id The ID of the task to check
     * @returns true if the task exists, false otherwise
     */
    hasTask(id) {
        return this.tasks.has(id);
    }
    /**
     * Start the task manager CLI interface.
     * This method will:
     * 1. Show a menu of available tasks
     * 2. Execute the selected task
     * 3. Handle task chaining (show menu again or exit)
     */
    async run() {
        while (true) {
            // Get tasks sorted by weight
            const tasks = this.getAllTasks();
            const { taskId } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'taskId',
                    message: 'Select a task to execute:',
                    choices: tasks.map(task => ({
                        name: `${task.name} - ${task.description}`,
                        value: task.id
                    }))
                }
            ]);
            const task = this.getTask(taskId);
            if (!task) {
                console.error(`Task '${taskId}' not found`);
                continue;
            }
            try {
                await this.executeTask(taskId);
                // If task.chain is false, exit the program
                if (task.chain === false) {
                    break;
                }
            }
            catch (error) {
                console.error(`Error executing task '${taskId}':`, error);
                // Continue to next iteration to show menu again
            }
        }
    }
}
//# sourceMappingURL=TaskManager.js.map