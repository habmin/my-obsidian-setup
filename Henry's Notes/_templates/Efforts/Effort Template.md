---
<% tp.file.include("[[eSquare Template Frontmatter]]") %>
createdAt: <% tp.date.now("YYYY-MM-DDTHH:mm") %>
topics: 
up:
  - "[[Efforts Map]]"
in:
  - Efforts
effortStatus: off
difficulty: 0
---
<%*
const fileName = tp.file.title;
const relPath = tp.file.folder
const tagName = fileName.toLowerCase().substring(0, tp.file.title.lastIndexOf(" ")).replace(/\s/g, '');
-%>
# Status
```js-engine
const mb = await app.plugins.getPlugin('obsidian-meta-bind-plugin')?.api;
const file = await this.app.workspace.getActiveFile();

const listUi = container.createEl('ul');

const effortStatusText = listUi.createEl('li');
effortStatusText.innerText = "Effort Status: ";
const effortStatusInput = effortStatusText.createEl('div');

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
	declaration: "INPUT[inlineSelect(defaultValue(off),option(off, Off), option(simmering, Simmering), option(ongoing, Ongoing), option(on, On), option(finished, Finished), option(discarded, Discarded)):effortStatus]",
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

await mb.wrapInMDRC(mountableStatus, effortStatusInput, component);

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
		const appendTimeline = `- **${inputDate.toISOString().substring(0,10)} ${inputDate.toLocaleString('default', { hour: 'numeric', minute: 'numeric', hour12: true })}** - ${file.basename} changed to ${property}: ${value}`;
		const timelineIndex = lines.findIndex(line => line.trim() === '# Log');
		lines.splice(timelineIndex + 1, 0, appendTimeline);

		await app.vault.modify(file, lines.join('\n'));
	} catch (error) {
		console.error('Error updating grid: ', error);
	}
}

// Write changed to Log
effortStatusInput.children[0].children[0].addEventListener("change", (event) => updateLog("Effort Status", event.target.value));
difficultyInput.children[0].children[0].addEventListener("change", (event) => updateLog("Difficulty", event.target.value));
```
## eSquare
<% tp.file.include("[[eSquare Template Code]]") %>
# Elements
```dataview
TABLE WITHOUT ID
file.link AS Element,
eSquare AS Action,
difficulty AS Difficulty,
smartScore as Score,
elementStatus AS Status
FROM "03 - Efforts"
WHERE contains(up, [[]])
SORT smartScore DESC
```
# To Dos
> [!calendar-x]+ Overdue
> ```tasks
> tags include #t/efforts/<% tagName %>
> ((due before today) AND (not done)) OR ((due before today) AND (done today)) 
> group by priority
> ```

> [!calendar-clock]+ Due Today
> ```tasks
> tags include #t/efforts/<% tagName %>
> ((due today) AND (not done)) OR ((due today) AND (done today))
> group by priority
> ```

> [!calendar-range]+ In Progress
> ```tasks
> tags include #t/efforts/<% tagName %>
> has start date
> ((starts before today) AND (not done)) OR ((starts before today) AND (done today)) 
> group by priority
> ```

> [!calendar-search]+ Upcoming
> ```tasks
> tags include #t/efforts/<% tagName %>
> not done
> due AFTER today
> sort by due
> ```

> [!calendar-plus]+ Unscheduled
> ```tasks
> tags include #t/efforts/<% tagName %>
> ((not done) AND (no due date)) OR ((no due date) AND (done today))
> group by priority
> ```
# External Links
> [!link-in]+ Linked Notes
> ```dataview
> LIST
> WHERE contains(up, [[<% fileName %>]])
> SORT createdAt desc
> ```

> [!web-link]+ Web Links
> 
# Description
<% tp.file.include("[[SMART Goal Template]]") %>
## Use
## Motivation
## Example
## Requirements
# Agenda
## Action Points
## Timeline
# Log