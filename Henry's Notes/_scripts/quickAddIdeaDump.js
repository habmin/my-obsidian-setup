module.exports = async function addRatLog(params) {
    const {
        app,
        quickAddApi: { inputPrompt},
    } = params;

    // Load Idea Dump Log
    const ideaDumpFile = app.vault.getAbstractFileByPath("02 - Calendar/Idea Dump Log.md");
    if (!ideaDumpFile) {
      new Notice("Rat Log file not found.");
      return;
    }
    
    // Capture input.
    const input = await inputPrompt("Enter Idea");
    if (!input) {
        new Notice("No input.");
        return;
    }
    
    // Format date strings for markdown
    const today = new Date();
    const date = today.toLocaleDateString('default', { year: 'numeric', month: 'short', day: 'numeric' }).replace(",", "");
    const time = today.toLocaleString('default', { hour: 'numeric', minute: 'numeric', hour12: true });

    // Anchors in the Idea Dump Log
    const topAnchor = "[[#^2f80cb|Jump To Bottom]] ^b9d47f";
    const bottomAnchor = "[[#^b9d47f|Jump To Top]] ^2f80cb"; // don't need it for now but nice to know
           
    const content = await this.app.vault.read(ideaDumpFile);

    // New text to insert is date is there or not
    const dateHeader = `- ***${date}***\n`;
    const newIdea = `${content.contains(date) ? '' : dateHeader}\t- **${time}**: ${input}\n`;

    // Slice point for insertion
    const cursorIndex = content.contains(date) ? content.indexOf(dateHeader) + dateHeader.length : content.indexOf(topAnchor) + topAnchor.length + 2;

    const newContent = content.slice(0, cursorIndex) + newIdea + content.slice(cursorIndex, content.length + 1);
    
    await this.app.vault.modify(ideaDumpFile, newContent);

    new Notice("Idea Logged.");
}
