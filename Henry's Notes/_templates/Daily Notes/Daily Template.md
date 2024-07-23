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
const completed = dv.current().file.tasks.where(t => t.completed).length;
const totalTasks = dv.current().file.tasks.length;
const completedFill = Math.floor(completed * (100 / totalTasks));

dv.el("div", dv.el("div","", {cls:"left-pb", attr: {style: `width: ${completedFill}%`}}), {cls: "progress-bar"}); 
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