import { QuestionCollection } from 'inquirer';
import { TaskManager } from './TaskManager.js';

/**
 * Task Interface
 * 
 * Defines the structure of a task in our application.
 * A task is a unit of work that can be executed and optionally
 * chained to other tasks.
 */
export interface Task {
    /**
     * Unique identifier for the task.
     * Example: "process-data", "exit-program"
     */
    id: string;

    /**
     * Human-readable name of the task.
     * Example: "Process Data", "Exit Program"
     */
    name: string;

    /**
     * Description of what the task does.
     * Example: "Processes the input data and generates a report"
     */
    description: string;

    /**
     * Optional questions to ask the user before executing the task.
     * These questions will be presented to the user in order,
     * and their answers will be passed to the execute function.
     * 
     * Example:
     * questions: [
     *   {
     *     type: 'input',
     *     name: 'username',
     *     message: 'What is your username?'
     *   },
     *   {
     *     type: 'number',
     *     name: 'age',
     *     message: 'What is your age?'
     *   }
     * ]
     */
    questions?: QuestionCollection;

    /**
     * The main execution function of the task.
     * The TaskManager is always passed as the first parameter.
     * If questions are provided, the answers will be passed as the second parameter.
     * 
     * Example:
     * execute: async (taskManager, answers) => {
     *   const { username, age } = answers;
     *   // Do something with the user input
     * }
     */
    execute: (taskManager: TaskManager, answers?: Record<string, any>) => Promise<void>;

    /**
     * Optional list of task IDs that must be executed before this task.
     * Example: ["validate-input", "prepare-data"]
     */
    dependencies?: string[];

    /**
     * Determines what happens after the task completes.
     * - true: Show the task menu again
     * - false: End the program
     */
    chain?: boolean;

    /**
     * Optional weight to control the order of tasks in the menu.
     * Higher weights appear later in the list.
     * Default is 0.
     * 
     * Example weights:
     * - Exit task: 100 (appears last)
     * - Clear cache: 99 (appears second to last)
     * - Regular tasks: 0 (appear in the middle)
     */
    weight?: number;
} 