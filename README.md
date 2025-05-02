# TaskPrompt CLI

A flexible and extensible task management system for Node.js applications. TaskPrompt CLI allows you to create interactive command-line applications with a menu-driven interface, user input handling, and task dependencies.

## Features

- 🎯 Task-based architecture
- 🔄 Task chaining and dependencies
- 💬 Interactive user input with validation
- 🎨 Customizable task ordering
- 💾 Persistent answer storage
- 🧹 Built-in cache management
- 🚪 Graceful exit handling

## File Structure

```
your-app/
├── src/
│   ├── tasks/           # All tasks go here
│   │   ├── index.js     # Export all tasks
│   │   ├── TaskA.js     # Individual task files
│   │   └── TaskB.js
│   ├── ...             # Your application files
│   └── ...             # Additional core files
├── index.js            # Main application file
├── package.json
└── README.md
```

Each task should be in its own file under the `src/tasks` directory. Use `index.js` to export all tasks for easy importing. The `src` directory can contain any additional files needed by your application.

## Installation

```bash
npm install taskprompt-cli
```

## Quick Start

1. Create a new task file in `src/tasks/HelloWorldTask.js`:
```javascript
const { Task } = require('taskprompt-cli');

/**
 * @type {Task}
 */
const HelloWorldTask = {
    id: 'hello-world',
    name: 'Hello World',
    description: 'Prints a hello world message',
    weight: 0,
    chain: true,
    execute: async (taskManager) => {
        console.log('Hello, World! 👋');
    }
};

module.exports = { HelloWorldTask };
```

2. Set up your main application file at the root level (`index.js`):
```javascript
const { TaskManager } = require('taskprompt-cli');
const { HelloWorldTask } = require('./src/tasks/HelloWorldTask');

async function main() {
    const taskManager = new TaskManager();
    taskManager.registerTask(HelloWorldTask);
    await taskManager.run();
}

main().catch(console.error);
```

## Task Structure

A task is defined with the following properties:

```javascript
{
    // Required properties
    id: 'unique-id',         // Unique identifier
    name: 'Task Name',       // Display name
    description: 'Description', // Task description
    execute: async (taskManager, answers) => {
        // Task implementation
    },

    // Optional properties
    weight: 0,              // Controls task order (higher = later)
    chain: true,            // Whether to show menu after completion
    dependencies: ['task-id'], // Tasks that must run first
    questions: []           // User input questions
}
```

## User Input

Tasks can collect user input using the `questions` property.  We use the [Inquirer](https://www.npmjs.com/package/inquirer#objects) package for user input, so you can define questions using their docs.

```javascript
const UserInputTask = {
    id: 'user-input',
    name: 'User Input Example',
    description: 'Demonstrates user input',
    questions: [
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            validate: (input) => {
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
            validate: (input) => {
                if (input < 0 || input > 150) {
                    return 'Please enter a valid age';
                }
                return true;
            }
        }
    ],
    execute: async (taskManager, answers) => {
        const { name, age } = answers;
        console.log(`Hello, ${name}! You are ${age} years old.`);
    }
};
```

## Task Dependencies

Tasks can depend on other tasks:

```javascript
const ProcessDataTask = {
    id: 'process-data',
    name: 'Process Data',
    description: 'Processes the input data',
    dependencies: ['user-input'], // Will run after user-input
    execute: async (taskManager) => {
        const userInfo = taskManager.getTaskAnswers('user-input');
        // Use the stored answers from user-input task
    }
};
```

## Task Ordering

Control task order using the `weight` property:

```javascript
const ExitTask = {
    id: 'exit',
    name: 'Exit Program',
    description: 'Exit the application',
    weight: 100, // Appears last in the menu
    chain: false, // Exits after completion
    execute: async () => {
        console.log('Goodbye! 👋');
        process.exit(0);
    }
};
```

## Built-in Tasks

The library includes two built-in tasks:

1. `ExitTask` (weight: 100)
   - Exits the application
   - Appears last in the menu

2. `ClearCacheTask` (weight: 99)
   - Clears stored task answers
   - Appears second to last in the menu

## Example Application

Check out the `example` directory for a complete working example that demonstrates:
- Basic task creation
- User input handling
- Task dependencies
- Answer persistence
- Task ordering

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT 