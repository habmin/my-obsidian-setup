```dataviewjs
const date = moment().format('YYYY-MM-DD-ddd');
const page = dv.page(`Daily Notes/${date} - Daily Notes.md`);
const completed = page.file.tasks.where(t => t.completed).length;
const totalTasks = page.file.tasks.length;
const completedFill = Math.floor(completed * (100 / totalTasks));

dv.el("div", dv.el("div","", {cls:"left-pb", attr: {style: `width: ${completedFill}%`}}), {cls: "progress-bar"}); 

dv.el('h1', `${completed}/${totalTasks}`)
```