/**
 * ClearCacheTask
 *
 * A system task that clears the application cache.
 * This task should appear near the end of the task list,
 * just before the exit task.
 */
export const ClearCacheTask = {
    id: 'clear-cache',
    name: 'Clear Cache',
    description: 'Clears the application cache',
    weight: 80,
    chain: true,
    execute: async (taskManager, answers) => {
        console.log('Clearing cache...');
        // Clear stored task answers
        taskManager.clearTaskAnswers();
        // Simulate cache clearing
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Cache cleared successfully');
    }
};
//# sourceMappingURL=ClearCacheTask.js.map