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
await dv.view("_scripts/dv-dailynote-navbar", {currentFileDate: await this.app.workspace.getActiveFile().name.slice(0, 10)});
```
# :LiListTodo: Tasks 
```js-engine
const {TaskProgressBar} = await cJS()
TaskProgressBar.create(app, await app.workspace.getActiveFile(), component, container)
```
## :LiSun: Morning
- [ ] Morning Routine
	- [ ] Take Adderall
	- [ ] Make bed
	- [ ] Work Out
	- [ ] Breakfast
	- [ ] vitamin D
	- [ ] Tidy kitchen
	- [ ] Tea
	- [ ] Work Outfit
	- [ ] Clean teeth
## :LiPower: Startup
- [ ] Startup Routine
	- [ ] Clean up Microsoft To-Do List
	- [ ] Check Messages and emails
	- [ ] Review/reform todo list
	- [ ] Leechblock sites
	- [ ] Personal Standup
## :LiBriefcase: Professional
## :LiPencilRuler: Project
## :LiHome: Personal
- [ ] [[Hobonichi Effort|At least 1 Older Hobonichi]]
## :LiPowerOff: Shutdown
- [ ] Work prep
	- [ ] Consolidate Work Notes
	- [ ] Clothes
	- [ ] Lunch
	- [ ] Bag
- [ ] Tomorrow To-do
- [ ] today's hobonichi
## :LiMoon: Evening
- [ ] 23:00 Evening Routine
	- [ ] wash face
	- [ ] little bit of moisturizer
	- [ ] Brush/floss/mouth wash
	- [ ] tretinoin
	- [ ] metrogel
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