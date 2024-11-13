const activeFile = await this.app.vault.getAbstractFileByPath("ratloginput.md");
const fileContent = await this.app.vault.read(activeFile);
// Split the content into lines
const lines = fileContent.split('\n');
let currentYear = null;
let currentMonth = null;
let currentDay = null;
let transformedContent = "";
// Process each line in the file
lines.forEach(line => {
    const yearMatch = line.match(/^# (\d{4})/);
    if (yearMatch) {
        currentYear = yearMatch[1];
        transformedContent += line + "\n";
        return;
    }
    const monthMatch = line.match(/^## (\w{3})/);
    if (monthMatch) {
        currentMonth = monthMatch[1];
        transformedContent += line + "\n";
        return;
    }
    const dayMatch = line.match(/^### (\d{1,2})/);
    if (dayMatch) {
        currentDay = dayMatch[1];
        transformedContent += line + "\n";
        return;
    }
    const listItemMatch = line.match(/^\- \*\*(\d{1,2}:\d{2} [APM]{2}):\*\*/);
    if (listItemMatch && currentYear && currentMonth && currentDay) {
        const time = listItemMatch[1];
        const dateStr = moment(`${currentYear}-${currentMonth}-${currentDay}`, "YYYY-MMM-DD").format("YYYY-MM-DD");
        const newListItem = `- **${dateStr} - ${time}**:${line.substring(listItemMatch[0].length)}`;
        transformedContent += newListItem + "\n";
        return;
    }

    transformedContent += line + "\n";
});

// Output the transformed content
const outputFile = await this.app.vault.getAbstractFileByPath("ratoutput.md");
await this.app.vault.modify(outputFile, transformedContent);
