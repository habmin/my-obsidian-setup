---
<% tp.file.include("[[eSquare Template Frontmatter]]") %>
createdAt: <% tp.date.now("YYYY-MM-DDTHH:mm") %>
topics: 
up:
in:
  - Efforts
  - Element
elementStatus: seed
difficulty: 0
---
# Status
```js-engine
const mb = await app.plugins.getPlugin('obsidian-meta-bind-plugin')?.api;
const file = await this.app.workspace.getActiveFile();

const listUi = container.createEl('ul');

const elementStatusText = listUi.createEl('li');
elementStatusText.innerText = "Element Status: ";
const elementStatusInput = elementStatusText.createEl('div');

const difficultyText = listUi.createEl('li');
difficultyText.innerText = "Difficulty: ";
const difficultyInput = difficultyText.createEl('div');

const importanceText = listUi.createEl('li')
importanceText.innerText = "Importance: ";
const importanceView = importanceText.createEl('div');
// Some reason, inline view option has to be set manually
importanceView.style["display"] = "inline";

const urgencyText = listUi.createEl('li')
urgencyText.innerText = "Urgency: ";
const urgencyView = urgencyText.createEl('div');
urgencyView.style["display"] = "inline";

const scoreText = listUi.createEl('li')
scoreText.innerText = "Score: ";
const scoreView = scoreText.createEl('div');
scoreView.style["display"] = "inline";

const eSquareText = listUi.createEl('li');
eSquareText.innerText = "eSquare: "
const eSquareView = eSquareText.createEl('div');
eSquareView.style["display"] = "inline";

const upText = listUi.createEl('li')
upText.innerText = "Involved with: ";
const upView = upText.createEl('div');
upView.style["display"] = "inline";

// Create Mountables
const mountableStatus = mb.createInputFieldMountable(context.file.path, {
	declaration: "INPUT[inlineSelect(defaultValue(seed),option(seed, Seed), option(thinking, Thinking), option(scoping, Scoping), option(ready, Ready), option(inProgress, In Progress), option(testing, Testing), option(waiting, Waiting), option(done, Done), option(refactoring, Refactoring), option(discarded, Discarded)):elementStatus]",
	renderChildType: "inline"
});

const mountableDifficulty = mb.createInputFieldMountable(context.file.path, {
	declaration: "INPUT[inlineSelect(defaultValue(0), option(0), option(1), option(2), option(3), option(4), option(5)):difficulty]",
	renderChildType: "inline"
});

const mountableImportance = mb.createViewFieldMountable(context.file.path, {
	declaration: "VIEW[{importanceLevel}][text]",
	renderChildType: "inline"
});

const mountableUrgency = mb.createViewFieldMountable(context.file.path, {
	declaration: "VIEW[{urgencyLevel}][text]",
	renderChildType: "inline"
});

const mountableScore = mb.createViewFieldMountable(context.file.path, {
	declaration: "VIEW[{smartScore}][text]",
	renderChildType: "inline"
});

const mountableESquare = mb.createViewFieldMountable(context.file.path, {
	declaration: "VIEW[{eSquare}][text]",
	renderChildType: "inline"
});

const mountableUp = mb.createViewFieldMountable(context.file.path, {
	declaration: "VIEW[{up}][link]",
	renderChildType: "inline"
});

await mb.wrapInMDRC(mountableStatus, elementStatusInput, component);

await mb.wrapInMDRC(mountableDifficulty, difficultyInput, component);

await mb.wrapInMDRC(mountableImportance, importanceView, component);

await mb.wrapInMDRC(mountableUrgency, urgencyView, component);

await mb.wrapInMDRC(mountableScore, scoreView, component);

await mb.wrapInMDRC(mountableESquare, eSquareView, component);

await mb.wrapInMDRC(mountableUp, upView, component);

async function updateLog(property, value) {
	if (file.path !== this.app.workspace.getActiveFile().path)
		return;
	try {
		await new Promise(resolve => setTimeout(resolve, 2000));
		const fileContent = await app.vault.read(file);
		const lines = fileContent.split('\n');

		const inputDate = new Date();
		const appendTimeline = `- **${inputDate.toISOString().substring(0,10)} ${inputDate.toLocaleString('default', { hour: 'numeric', minute: 'numeric', hour12: true })}** - ES: ${file.basename} changed to ${property}: ${value}`;
		const timelineIndex = lines.findIndex(line => line.trim() === '# Log');
		lines.splice(timelineIndex + 1, 0, appendTimeline);

		await app.vault.modify(file, lines.join('\n'));
	} catch (error) {
		console.error('Error updating grid: ', error);
	}
}

// Write changed to Log
elementStatusInput.children[0].children[0].addEventListener("change", (event) => updateLog("Element Status", event.target.value));
difficultyInput.children[0].children[0].addEventListener("change", (event) => updateLog("Difficulty", event.target.value));
```
## eSquare
<% tp.file.include("[[eSquare Template Code]]") %>
# Description
> [!link-in]+ Linked Notes
> ```dataview
> LIST
> WHERE contains(up, [[<% tp.file.title %>]])
> SORT createdAt desc
> ```

> [!web-link]+ Web Links
## Use
## Motivation
## Example
## Requirements
# Agenda
## Action Points
## Timeline
# Log