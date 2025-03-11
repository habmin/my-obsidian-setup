---
createdAt: <% tp.date.now("YYYY-MM-DDTHH:mm") %>
cssclasses:
  - daily-note
  - task-progress-bar
  - bannerimg
energyLevel: Pushing Through
---
<%*
const fileDate = tp.file.title.slice(0, 10);
const daysEpoch = Math.floor(moment(fileDate).unix() / 86400);
const numOfFiles = this.app.vault.getFolderByPath('_attachments/_banners/_daily_notes').children.length;
-%>
![[<% (daysEpoch % numOfFiles).toString().padStart(3, '0') %>.jpg##bannerimgfade]]
> [!bannericonc]
> <% moment(fileDate).format('MMM D YY') %>
```dataviewjs
//const currentFileDate = await dv.current().file.name.slice(0, 10);
const currentFileDate = await this.app.workspace.getActiveFile().name.slice(0, 10);

let prevHref = await this.app.vault.getAbstractFileByPath(`Daily Notes/${moment(currentFileDate).subtract(1, 'days').format('YYYY-MM-DD-ddd')} - Daily Notes.md`)?.path ?? "#";

// Check to see if the notes moved to the Archive folder
if (prevHref === "#") {
	prevHref = await this.app.vault.getAbstractFileByPath(`Daily Notes/Archive/${moment(currentFileDate).subtract(1, 'days').format('YYYY-MM-DD-ddd')} - Daily Notes.md`)?.path ?? "#";
}

let nextHref = await this.app.vault.getAbstractFileByPath(`Daily Notes/${moment(currentFileDate).add(1, 'days').format('YYYY-MM-DD-ddd')} - Daily Notes.md`)?.path ?? "#";

if (nextHref === "#") {
	nextHref = await this.app.vault.getAbstractFileByPath(`Daily Notes/Archive/${moment(currentFileDate).add(1, 'days').format('YYYY-MM-DD-ddd')} - Daily Notes.md`)?.path ?? "#";
}

const prevDisabled = prevHref === "#" ? "disabled" : '';
const nextDisabled = nextHref === "#" ? "disabled" : '';

function removeChild(element) {
	element.removeChild(element.firstChild);
}

const navBar = dv.el('div', '', {cls: 'nav-bar'});
removeChild(navBar);
  
// Create the prev nav-button
const prevButton = dv.el('div', '', {cls: `nav-button prev ${prevDisabled}`});
removeChild(prevButton);

const prevLink = dv.el('a', '', {cls: 'internal-link', href: prevHref});
removeChild(prevLink);

// Using this as innerHTML, dataviewjs renders stuff incorrect when
// attributes have a '-', though cls seems to be fine.
const prevLinkChildren = `<svg class="lucide-chevrons-left" xmlns="http://www.w3.org/2000/svg" width="28.832px" height="28.832px" viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17-5-5 5-5"></path><path d="m18 17-5-5 5-5"></path></svg><h1 class="nav-header">Previous</h1>`

prevLink.innerHTML = prevLinkChildren;

prevButton.appendChild(prevLink);

// Create the next nav-button
let nextButton = dv.el('div', '', {cls: `nav-button next ${nextDisabled}`});
removeChild(nextButton);

let nextLink = dv.el('a', '', {cls: 'internal-link', href: nextHref});
removeChild(nextLink);

const nextLinkChildren = `<h1 class="nav-header">Next</h1><svg class="lucide-chevrons-right" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" height="28.832px" width="28.832px" xmlns="http://www.w3.org/2000/svg"><path d="m6 17 5-5-5-5"></path><path d="m13 17 5-5-5-5"></path></svg>`

nextLink.innerHTML = nextLinkChildren;

nextButton.appendChild(nextLink);
  
// Append both nav-buttons to the nav-bar
navBar.appendChild(prevButton);
navBar.appendChild(nextButton);

// Append the nav-bar to the Dataview container
dv.container.appendChild(navBar);
```
# :LiListTodo: Tasks 
```js-engine
const file = await this.app.workspace.getActiveFile();

const progressBar = await container.createEl('div', {cls: "progress-bar"});
const completedBar = await progressBar.createEl('div', {cls: "left-pb", attr: {style: "width: 0%"}});

const stats = container.createEl('div', {cls: "stats"});
const percent = stats.createEl('h6', {cls: "percent", text: "0%"});
const ratio = stats.createEl('h6', {cls: "ratio", text: "0/0"});

const leftPB = component.containerEl.children[0].children[0];
const percentEl = component.containerEl.children[1].children[0];
const ratioEl = component.containerEl.children[1].children[1];

// Clean up event listener when the script is unloaded
async function updateProgressBar() {
	try {
		await new Promise(resolve => setTimeout(resolve, 100));
		const metadata = await app.metadataCache.getFileCache(file);
		const listItems = metadata.listItems || [];
		const totalTasks = listItems.filter((listItem) => 'task' in listItem).length;
		const completed = listItems.filter((listItem) => 'task' in listItem && listItem['task'] === 'x').length;
		const completedFill = Math.floor(completed * (100 / totalTasks));
		leftPB.setAttribute("style", `width: ${completedFill}%`);
		percentEl.innerText = `${((completed/totalTasks) * 100).toFixed(2)}%`
		ratioEl.innerText = `${completed}/${totalTasks}`;
	} catch (error) {
		console.error('Error updating progress bar: ', error);
	}
}

updateProgressBar();

function updateProgressBarHandler() {
	if (file.path === this.app.workspace.getActiveFile().path)
		updateProgressBar();
};

component.registerEvent(this.app.metadataCache.on('changed', updateProgressBarHandler));
```
## :LiSun: Morning
- [ ] Morning Routine
	- [ ] Take Adderall
	- [ ] Make bed
	- [ ] Breakfast
	- [ ] vitamin D
	- [ ] Tidy kitchen
	- [ ] Tea
	- [ ] Work Outfit
	- [ ] Clean teeth
	- [ ] Clean up Microsoft To-Do List
	- [ ] Check Messages and emails
	- [ ] Review/reform todo list
	- [ ] Leechblock sites
	- [ ] Personal Standup
## :LiBriefcase: Professional
- [ ] Leetcode
- [ ] Job Applications
## :LiPencilRuler: Project
## :LiHome: Personal
- [ ] Work out
- [ ] [[Hobonichi Effort|At least 1 Older Hobonichi]]
## :LiMoon: Evening
- [ ] 23:45 Evening Routine
	- [ ] Tomorrow To-do
	- [ ] Brush/floss/mouth wash
	- [ ] wash face
	- [ ] little bit of moisturizer
	- [ ] tretinoin
	- [ ] today's hobonichi
	- [ ] no technology 1 hour before bed
# :LiUserPen: Personal Stand Up
## :LiZap: Energy Level
*How are you feeling?*
```meta-bind-js-view
{energyLevel} as energyLevel
---
const mb = await app.plugins.getPlugin('obsidian-meta-bind-plugin')?.api;

const batteryNone = `<svg class="energy-icon" xmlns="http://www.w3.org/2000/svg" width="2.7rem" height="2.7rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-battery"><rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect><line x1="22" y1="11" x2="22" y2="13"></line></svg>`;

const batteryLow = `<svg class="energy-icon" xmlns="http://www.w3.org/2000/svg" width="2.7rem" height="2.7rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-battery-low"><rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect><line x1="22" y1="11" x2="22" y2="13"></line><line x1="6" y1="11" x2="6" y2="13"></line></svg>`;

const batteryMid = `<svg class="energy-icon" xmlns="http://www.w3.org/2000/svg" width="2.7rem" height="2.7rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-battery-medium"><rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect><line x1="22" y1="11" x2="22" y2="13"></line><line x1="6" y1="11" x2="6" y2="13"></line><line x1="10" y1="11" x2="10" y2="13"></line></svg>`;

const batteryFull = `<svg class="energy-icon" xmlns="http://www.w3.org/2000/svg" width="2.7rem" height="2.7rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-battery-full"><rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect><line x1="22" y1="11" x2="22" y2="13"></line><line x1="6" y1="11" x2="6" y2="13"></line><line x1="10" y1="11" x2="10" y2="13"></line><line x1="14" y1="11" x2="14" y2="13"></line></svg>`;

const batteryCharge = `<svg class="energy-icon" xmlns="http://www.w3.org/2000/svg" width="2.7rem" height="2.7rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-battery-charging"><path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"></path><path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1"></path><path d="m11 7-3 5h4l-3 5"></path><line x1="22" y1="11" x2="22" y2="13"></line></svg>`;

const batteryMap = {
	"Dead": batteryNone,
	"Just Tired": batteryLow,
	"Pushing Through": batteryMid,
	"Grooving": batteryFull,
	"I Feel GREAT!": batteryCharge
};

const energyIconDiv = container.createEl('div', {cls: "energy-icon-div"});

energyIconDiv.innerHTML = batteryMap[context.bound.energyLevel];

const blankDiv = container.createEl('div');

const selectOptions = {
	declaration: "INPUT[inlineSelect(option(Dead), option(Just Tired), option(Pushing Through), option(Grooving), option(I Feel GREAT!)):energyLevel]",
	renderChildType: "inline"
};

const mountable = mb.createInputFieldMountable(context.file.path, selectOptions);

await mb.wrapInMDRC(mountable, blankDiv, component);

energyIconDiv.append(blankDiv);
```
- 
## :LiRewind: Recap
*What did you do yesterday?*
- 
## :LiGoal: Goals
*What do you plan to do today?*
- 
## :LiConstruction: Blockers
*Any blockers that you came across or anticipate?*
- 
## :LiHandshake: Thanks
*Anyone or anything you want to give kudos to?*
- 
# :LiBookOpenText: Notes
## :LiListPlus: New Items
## :LiMessageCircle: Freewrite