---
cssclasses:
  - daily-note
  - bannerimg
---
<%*
const numOfFiles = this.app.vault.getFolderByPath('_attachments/_banners/_daily_notes').children.length;
-%>
![[<% (moment().dayOfYear() % numOfFiles).toString().padStart(3, '0') %>.jpg##bannerimgfade]]
> [!bannericonc]
> <% tp.date.now('MMM D YY') %>
# :LiListTodo: Tasks (`$=dv.current().file.tasks.where(t => t.completed).length`/`$=dv.current().file.tasks.length`)
```dataviewjs
const charLimit = 43;
const completed = dv.current().file.tasks.where(t => t.completed).length;
const incompleted = dv.current().file.tasks.where(t => !t.completed).length;
const totalTasks = completed + incompleted;
const completedCells = "▮".repeat(Math.floor(completed * (charLimit / totalTasks)));
const incompletedCells = "▯".repeat(Math.floor(incompleted * (charLimit / totalTasks)));

dv.span(completedCells.padEnd(charLimit, "▯"));
```
## :LiSun: Morning
<% tp.file.include("[[Morning Template]]") %>
## :LiBriefcase: Professional
<% tp.file.include("[[Professional Template]]") %>
## :LiPencilRuler: Project
<% tp.file.include("[[Project Template]]") %>
## :LiHome: Personal
<% tp.file.include("[[Personal Template]]") %>
## :LiMoon: Evening
<% tp.file.include("[[Evening Template]]") %>
# :LiBookOpenText: Notes
## :LiMessageCircle: General
## :LiBrain: Reflections
### *How was your day?*
### *What was your highlight?*
### *What could have gone better?*
