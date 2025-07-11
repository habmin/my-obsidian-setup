class TaskProgressBar {
    create(app, file, component, container) {
        const progressBar = container.createEl('div', {cls: "progress-bar"});
        progressBar.createEl('div', {cls: "left-pb", attr: {style: "width: 0%"}});
        const stats = container.createEl('div', {cls: "stats"});
        stats.createEl('h6', {cls: "percent", text: "0%"});
        stats.createEl('h6', {cls: "ratio", text: "0/0"});

        const leftPB = component.containerEl.children[0].children[0];
        const percentEl = component.containerEl.children[1].children[0];
        const ratioEl = component.containerEl.children[1].children[1];

        async function updateProgressBar() {
            try {
                await new Promise(resolve => setTimeout(resolve, 100));
                const metadata = await app.metadataCache.getFileCache(file);
                const listItems = metadata.listItems || [];
                const totalTasks = listItems.filter((listItem) => 'task' in listItem).length;
                const completed = listItems.filter((listItem) => 'task' in listItem && listItem['task'] === 'x').length;
                const completedFill = Math.floor(completed * (100 / totalTasks));
                leftPB.setAttribute("style", `width: ${completedFill}%`);
                percentEl.innerText = `${((completed/totalTasks) * 100).toFixed(2)}%`
                ratioEl.innerText = `${completed}/${totalTasks}`;
            } catch (error) {
                console.error('Error updating progress bar: ', error);
            }
        }

        updateProgressBar();

        async function updateProgressBarHandler() {
            if (file.path === await app.workspace.getActiveFile().path)
                updateProgressBar();
        };

        component.registerEvent(app.metadataCache.on('changed', updateProgressBarHandler));
    }
}