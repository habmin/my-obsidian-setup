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

    const listHeader = "- **" + year + "-" + month + "-" + day + " - " + time + " - ";

    let preHeaders = "";
    //check for year
    if (!content.includes(yearHeader)) {
        preHeaders += yearHeader + "\n";
    }
    //check for month
    if (!content.contains(listHeader.slice(0, 11))) {
        preHeaders += monthHeader + "\n";
    }
    if (!content.contains(listHeader.slice(0, 14))) {
        preHeaders += dayHeader + "\n";
    }

    // Create list item header for log event
    const eventList = listHeader + roomSelection + "**: " + input;

    // Ending anchor and jump to top link
    const jumpToTop = "[[#^73cc94|Jump To Top]] ^f7a1d3"

    // Append to Rat Log content
    const newContent = content.slice(0, -(jumpToTop.length + 1)) + preHeaders + eventList + '\n\n' + jumpToTop;
    
    await this.app.vault.modify(ratLogFile, newContent);

    new Notice("Rat event logged.");
}
