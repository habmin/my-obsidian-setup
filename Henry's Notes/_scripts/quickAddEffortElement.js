module.exports = async function addEfforElement(params) {
    const {
        app,
        quickAddApi: { inputPrompt, suggester },
    } = params;
    const createNew = app.plugins.plugins['templater-obsidian'].templater.functions_generator.internal_functions.modules_array[1].static_functions.get('create_new');
    const findTFile = app.plugins.plugins['templater-obsidian'].templater.functions_generator.internal_functions.modules_array[1].static_functions.get('find_tfile');
    
    // get list of efforts, 
    // Method 1: Filter by path and 'Effort' as the last word in the title
    const efforts = await app.vault.getMarkdownFiles().filter(f => {
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
        const newEffort = await createNew(findTFile("_templates/Efforts/Effort Element Template.md"), fileNameInput, true, filePath);
        await app.fileManager.processFrontMatter(newEffort, fm => {fm['up'] = [`[[${effortSelection}]]`]});
        new Notice("Effort Element created.");
    }
    catch (e) {
        new Notice("Error: " + e);
        return;
    }

    return;
}
