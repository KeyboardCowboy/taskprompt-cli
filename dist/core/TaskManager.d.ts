import { Task } from './Task.js';
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
export declare class TaskManager {
    private tasks;
    private taskAnswers;
    constructor();
    /**
     * Register a task with the TaskManager.
     * @param task The task to register
     * @throws Error if a task with the same ID is already registered
     */
    registerTask(task: Task): void;
    /**
     * Get a task by its ID.
     * @param id The ID of the task to retrieve
     * @returns The task if found, undefined otherwise
     */
    getTask(id: string): Task | undefined;
    /**
     * Get all registered tasks, sorted by weight.
     * Tasks with higher weights appear later in the list.
     * @returns An array of all registered tasks, sorted by weight
     */
    getAllTasks(): Task[];
    /**
     * Get stored answers for a task.
     * @param taskId The ID of the task
     * @returns The stored answers or undefined if none exist
     */
    getTaskAnswers(taskId: string): Record<string, any> | undefined;
    /**
     * Store answers for a task.
     * @param taskId The ID of the task
     * @param answers The answers to store
     */
    private storeTaskAnswers;
    /**
     * Clear all stored task answers.
     * This is typically used when clearing the application cache.
     */
    clearTaskAnswers(): void;
    /**
     * Execute a task and its dependencies.
     * @param taskId The ID of the task to execute
     * @throws Error if the task is not found or if there's a circular dependency
     */
    executeTask(taskId: string): Promise<void>;
    /**
     * Check if a task exists.
     * @param id The ID of the task to check
     * @returns true if the task exists, false otherwise
     */
    hasTask(id: string): boolean;
    /**
     * Start the task manager CLI interface.
     * This method will:
     * 1. Show a menu of available tasks
     * 2. Execute the selected task
     * 3. Handle task chaining (show menu again or exit)
     */
    run(): Promise<void>;
}
