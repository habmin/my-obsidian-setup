module.exports = async function addEfforElement(params) {
    const {
        app,
        quickAddApi: { inputPrompt, suggester },
    } = params;
    const tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object;
    // get list of efforts, 
    // Method 1: Filter by path and 'Effort' as the last word in the title
    const efforts = await app.vault.getFiles().filter(f => {
        return f.path.contains('03 - Efforts') && f.basename.split(' ').pop() == "Effort";
    }).reduce((acc, f) => ({
        ...acc, [f.basename] : f
    }), {});
    
    // Method 2: Filter by path and frontmatter
    // const efforts = {};
    // await app.vault.getFiles().forEach(f => {
    //     if (f.path.contains('03 - Effort')) {
    //         app.fileManager.processFrontMatter(f, fm => {
    //             if (fm['up']?.includes('[[Efforts Map]]'))
    //                 efforts[f.basename] = f;
    //         });
    //     }
    // })

    const effortSelection = await suggester(
        (effortInput) => effortInput,
        Object.keys(efforts).map(f => f)
    );

    if (!effortSelection) {
        new Notice("No effort selected.");
        return;
    }
    
    // Capture Element Filename
    const fileNameInput = await inputPrompt("Element Name");
    if (!fileNameInput) {
        new Notice("No filename input.");
        return;
    }

    const filePath = efforts[effortSelection].parent.path;

    try {
        const newEffort = await tp.file.create_new(tp.file.find_tfile("_templates/Efforts/Effort Element Template.md"), fileNameInput, true, filePath);
        await app.fileManager.processFrontMatter(newEffort, fm => {fm['up'] = [`[[${effortSelection}]]`]});
        new Notice("Effort Element created.");
    }
    catch (e) {
        new Notice("Error: " + e);
        return;
    }

    return;
}
