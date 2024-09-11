module.exports = async function addRatLog(params) {
    const {
        app,
        quickAddApi: { inputPrompt },
    } = params;

    // 1. Load Rat Log
    const ratLogFile = app.vault.getAbstractFileByPath("Personal/Rat Log.md");
    if (!ratLogFile) {
      new Notice("Rat Log file not found.");
      return;
    }

    // 2. Capture input
    const input = await inputPrompt("Log Rat Event");
    if (!input) {
        new Notice("No input.");
        return;
    }

    // 3. Format date strings for markdown
    const today = new Date();
    const year = "# " + String(today.getFullYear());
    const month = "## " + today.toLocaleString('default', { month: 'long' });
    const day = "### " + String(today.getDate()) + " - " + today.toLocaleDateString('default', { weekday: 'short' });
    const time = "**" + today.toLocaleString('default', { hour: 'numeric', minute: 'numeric', hour12: true }) + ":** ";

    // 4. Check to see if the date already exists in the Rat Log and create headers
    const content = await this.app.vault.read(ratLogFile);
    let preHeaders = "";
    if (!content.includes(year)) {
        preHeaders += year + "\n";
    }
    if (!(content.includes(month) && content.includes(year))) {
        preHeaders += month + "\n";
    }
    if (!(content.includes(day) && content.includes(month) && content.includes(year))) {
        preHeaders += day + "\n";
    }
    // 5. Append to Rat Log content
    const newContent = content + '\n' + preHeaders + "- " + time + input;
    
    await this.app.vault.modify(ratLogFile, newContent);

    new Notice("Rat event logged.");
}