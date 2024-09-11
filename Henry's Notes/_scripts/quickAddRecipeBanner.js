module.exports = async function recipeBanner(params) {
    // 1. Get recipe name from the note's frontloader and transform it to lowercase_underscore
    const activeFile = this.app.workspace.getActiveFile();
    if (!activeFile) {
      new Notice("No active note found.");
      return;
    }
    const fileContent = await this.app.vault.read(activeFile);
    const frontMatterRegex = /---\n(?:.|\n)*?recipe-name:\s*(.*?)\n(?:.|\n)*?---/;
    const match = frontMatterRegex.exec(fileContent);
    if (!match || match.length < 2) {
        new Notice("Recipe name not found in the note's frontmatter.");
        return;
    }
    const newImageFileName = match[1].toLowerCase().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
    
    // 2. Get the first pasted image in the note (assumes its the pasted one)
    const imageRegex = /!\[\[(.*?)\]\]/;
    const imageMatch = imageRegex.exec(fileContent);
    if (!imageMatch || imageMatch.length < 2) {
        new Notice("No image found in the note.");
        return;
    }
    // get file extension
    const imageExtension = imageMatch[1].split('.').pop();

    // 3. rename and move the image to the transformed recipe name (be sure to keep original extension)
    const newPath = `_attachments/_banners/_recipes/${newImageFileName}.${imageExtension}`;
    const oldPath = this.app.vault.getAbstractFileByPath('_attachments/' + imageMatch[1]);
    if (!oldPath) {
        new Notice(`File not found at path: ${imageMatch[1]}`);
        return;
    }
    await this.app.fileManager.renameFile(oldPath, newPath);

    // 4. Edit the old image reference in the file to the newer one with '|banner' appended to it
    const newFileContent = fileContent.replace(`![[${imageMatch[1]}]]`, `![[${newImageFileName}.${imageExtension}|banner]]`);
    await this.app.vault.modify(activeFile, newFileContent);

    new Notice("Image processed, moved, and note updated successfully.");
}