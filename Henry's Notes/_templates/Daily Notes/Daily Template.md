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
```js-engine
const mb = await app.plugins.getPlugin('obsidian-meta-bind-plugin')?.api;
const {EnergyLevel} = await cJS()
EnergyLevel.create(mb, component, container, context)
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