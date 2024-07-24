---
cssclasses:
  - daily-note
  - bannerimg
---
<%*
const fileDate = tp.file.title.slice(0, 10);
const dayOfYear = moment(fileDate).dayOfYear();
const numOfFiles = this.app.vault.getFolderByPath('_attachments/_banners/_daily_notes').children.length;
-%>
![[<% (dayOfYear % numOfFiles).toString().padStart(3, '0') %>.jpg##bannerimgfade]]
> [!bannericonc]
> <% moment(fileDate).format('MMM D YY') %>
```dataviewjs
const currentFileDate = await dv.current().file.name.slice(0, 10);

const prevHref = dv.page(`Daily Notes/${moment(currentFileDate).subtract(1, 'days').format('YYYY-MM-DD-ddd')} - Daily Notes.md`)?.file.path ?? "#";

const nextHref = dv.page(`Daily Notes/${moment(currentFileDate).add(1, 'days').format('YYYY-MM-DD-ddd')} - Daily Notes.md`)?.file.path ?? "#";

const homeHref = dv.page(`Daily Notes/${moment().format('YYYY-MM-DD-ddd')} - Daily Notes.md`)?.file.path ?? "#";

const prevDisabled = prevHref === "#" ? "disabled" : '';
const nextDisabled = nextHref === "#" ? "disabled" : '';
const homeDisabled = homeHref === "#" ? "disabled" : '';

function removeChild(element) {
	element.removeChild(element.firstChild);
}

// Create the nav-bar container
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

// Create Home nav-button
const homeButton = dv.el('div', '', {cls: `nav-button home ${homeDisabled}`});
removeChild(homeButton);

const homeLink = dv.el('a', '', {cls: 'internal-link', href: homeHref});
removeChild(homeLink);

const homeLinkChildren = `<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide-calendar-check"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="m9 16 2 2 4-4"></path></svg>`

homeLink.innerHTML = homeLinkChildren;

homeButton.appendChild(homeLink)

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
navBar.appendChild(homeButton);
navBar.appendChild(nextButton);

// Append the nav-bar to the Dataview container
dv.container.appendChild(navBar);
```
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