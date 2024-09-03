module.exports = async function recipeBanner(params) {
    const {
        app,
        quickAddApi: { wideInputPrompt },
    } = params;
    
    // 1. Check to make sure a note is open
    const activeFile = app.workspace.getActiveFile();
    if (!activeFile) {
      new Notice("No active note found.");
      return;
    }

    // 2. Get the recipe ingredients from the user
    const input = await wideInputPrompt("Paste recipe ingredients from a website");
    if (!input) {
        new Notice("No input.");
        return;
    }
    
    // 3. Find the Ingredients section
    const target = 'Servings: \`INPUT[number(placeholder({servings})):metabind-servings]\`'
    const content = await this.app.vault.read(activeFile);
    const ingredientsHeaderIndex = content.indexOf(target) + target.length; // Plus length to include the target
    if (ingredientsHeaderIndex === -1) {
        new Notice("Ingredients header not found.");
        return;
    }

    // 4. Transform the ingredients to MetaBind format
    let transformedIngredients = input;

    // transformations for Fraction Characters
    transformedIngredients = transformedIngredients.replace(/½/g, "1/2");
    console.log(transformedIngredients);
    transformedIngredients = transformedIngredients.replace(/⅓/g, "1/3");
    console.log(transformedIngredients);
    transformedIngredients = transformedIngredients.replace(/⅔/g, "2/3");
    console.log(transformedIngredients);
    transformedIngredients = transformedIngredients.replace(/¼/g, "1/4");
    console.log(transformedIngredients);
    transformedIngredients = transformedIngredients.replace(/¾/g, "3/4");
    transformedIngredients = transformedIngredients.replace(/⅕/g, "1/5");
    transformedIngredients = transformedIngredients.replace(/⅖/g, "2/5");
    transformedIngredients = transformedIngredients.replace(/⅗/g, "3/5");
    transformedIngredients = transformedIngredients.replace(/⅘/g, "4/5");
    transformedIngredients = transformedIngredients.replace(/⅙/g, "1/6");
    transformedIngredients = transformedIngredients.replace(/⅚/g, "5/6");
    transformedIngredients = transformedIngredients.replace(/⅐/g, "1/7");
    transformedIngredients = transformedIngredients.replace(/⅛/g, "1/8");
    transformedIngredients = transformedIngredients.replace(/⅜/g, "3/8");
    transformedIngredients = transformedIngredients.replace(/⅝/g, "5/8");
    transformedIngredients = transformedIngredients.replace(/⅞/g, "7/8");
    transformedIngredients = transformedIngredients.replace(/⅑/g, "1/9");
    transformedIngredients = transformedIngredients.replace(/⅒/g, "1/10");

    // replace numbers at the start of the line with the MetaBind math function
    transformedIngredients = input.replace(/^(\s*▢*\s*)(\d*\.?\/?\d+)/gm, "\`VIEW[{metabind-servings} / {servings} * $2][math]\`")

    // adding '- ' at the start of every line if there are any characters
    transformedIngredients = transformedIngredients.replace(/^(?=.*\S).+/gm, "- $&");

    // 5. Replace the ingredients in the note
    const newContent = content.slice(0, ingredientsHeaderIndex) + '\n' + transformedIngredients + content.slice(ingredientsHeaderIndex, content.length);
    
    await this.app.vault.modify(activeFile, newContent);

    new Notice("Inregedient list modified.");
}