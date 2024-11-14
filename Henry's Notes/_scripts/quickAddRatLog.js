module.exports = async function addRatLog(params) {
    const {
        app,
        quickAddApi: { inputPrompt, suggester },
    } = params;

    // Room selections
    const rooms = [
        "Guest Room/Office",
        "Living Room",
        "Hallway",
        "Kitchen",
        "Bathroom",
        "Bedroom",
        "Building/Other"
    ]

    // Load Rat Log
    const ratLogFile = app.vault.getAbstractFileByPath("Personal/Tenant Union/Rat Log.md");
    if (!ratLogFile) {
      new Notice("Rat Log file not found.");
      return;
    }
    
    // Capture input for Events.
    const input = await inputPrompt("Log Rat Event");
    if (!input) {
        new Notice("No input.");
        return;
    }
    
    // Capture input for Rooms.
    const roomSelection = await suggester(
        (roomInput) => roomInput,
        rooms
    );
    if (!roomSelection) {
        new Notice("No room selected.");
        return;
    }

    // Format date strings for markdown
    const today = new Date();

    const year = String(today.getFullYear());
    const yearHeader = "# " + year;

    const month = today.toLocaleString('default', { month: '2-digit' });
    const monthHeader = "## " + today.toLocaleString('default', { month: 'long' });

    const day = today.toLocaleString('default', { day: '2-digit' });
    const dayHeader = "### " + String(today.getDate()) + " - " + today.toLocaleDateString('default', { weekday: 'short' });
    
    const time = today.toLocaleString('default', { hour: 'numeric', minute: 'numeric', hour12: true });

    // Check to see if the date already exists in the Rat Log and create headers
    const content = await this.app.vault.read(ratLogFile);
    let preHeaders = "";
    if (!content.includes(yearHeader)) {
        preHeaders += yearHeader + "\n";
    }
    if (!(content.includes(monthHeader) && content.includes(yearHeader))) {
        preHeaders += monthHeader + "\n";
    }
    if (!(content.includes(dayHeader) && content.includes(monthHeader) && content.includes(yearHeader))) {
        preHeaders += dayHeader + "\n";
    }

    // Create list item header for log event
    const eventList = "- **" + year + "-" + month + "-" + day + " - " + time + " - " + roomSelection + "**: " + input;

    // Append to Rat Log content
    const newContent = content + '\n' + preHeaders + eventList;
    
    await this.app.vault.modify(ratLogFile, newContent);

    new Notice("Rat event logged.");
}
