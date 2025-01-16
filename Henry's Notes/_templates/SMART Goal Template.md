---
urgencyLevel: 1
importanceLevel: 1
smartScore: 1
eSquare: delete
cssclasses:
  - smart-goal-grid
---
# SMART Details
## Specific
### What do you want to accomplish?
### Who needs to be included? 
### When do you want to do this? 
### What is the motivation of this goal
## Measurable
### How can you measure progress?
### How is it determined when a goal has been successfully completed?
## Achievable
### What skills or resources are required?
### Are you missing any of them required to achieve this goal?
### Is the amount of effort required on par with what the goal will achieve?
### What are some external blockers?
## Relevant
### Why am I setting this goal now?
### Is it aligned with overall objectives?
## Time-bound
### What's the deadline and is it realistic?
# Overview and Action Items
```js-engine
const file = await this.app.workspace.getActiveFile();

const gridContainer = await container.createEl('div', {cls: "grid-container"});
const gridItems = await gridContainer.createEl('div', {cls: "grid-items"});
const textContainer = await container.createEl('div', {cls: "text-container"});
const text = await textContainer.createEl('h1', {cls: "text-info"});

function makeItems(el, rows, cols) {
  el.style.setProperty('--grid-rows', rows);
  el.style.setProperty('--grid-cols', cols);
  const middle = Math.floor((rows * cols) / 2);
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
	cell.setAttribute('data-urgency', (c % rows) + 1);
	cell.setAttribute('data-importance', (cols - (Math.floor(c / cols))));
	cell.addEventListener('click', (event) => {
		updateGrid(event.target.getAttribute('data-urgency'), event.target.getAttribute('data-importance'));
	})
	const dot = document.createElement('div');
	dot.className = "grid-dot";
    cell.appendChild(dot);
    if (c % rows < 5) {
	    if (c < middle) {
		    el.appendChild(cell).className = "grid-item-pos decision schedule";
		} else {
			el.appendChild(cell).className = "grid-item-pos decision delete";
		}
    }
    else {
	    if (c < middle) {
		    el.appendChild(cell).className = "grid-item-pos decision do";
		} else {
			el.appendChild(cell).className = "grid-item-pos decision delegate";
		}
    }
  };
};

function returnDecision(urgency, importance) {
	const score = urgency * importance;
	let decision = "";
	if (urgency <= 5) {
		if (importance <= 5) {
			decision = "Shelving For Freetime"
		}
		else {
			decision = "Scheduling"
		}
	}
	else {
		if (importance <= 5) {
			decision = "Delegating"
		}
		else {
			decision = "Addressing Now"
		}
	}
	return `Score: ${score}, ${decision}`;
}

function decisionClass(urgency, importance) {
	if (urgency <= 5) {
		if (importance <= 5) {
			return "delete"
		}
		else {
			return "schedule"
		}
	}
	else {
		if (importance <= 5) {
			return "delegate"
		}
		else {
			return "do"
		}
	}
}

function movePosition(urgencyInput, importanceInput) {
	const currentDecisionClass = decisionClass(urgencyInput, importanceInput);
	for (const item of document.getElementsByClassName("grid-item-pos")) {
		console.log(item.classList);
		if (item.classList.contains(currentDecisionClass)) {
			item.classList.add('current');
		}
		else {
			item.classList.remove('current');
		}
		if (item.getAttribute('data-urgency') == urgencyInput && item.getAttribute('data-importance') == importanceInput) {
			item.childNodes[0].style.display = "block";
		}
		else {
			item.childNodes[0].style.display = "none";
		}
	}
	text.innerHTML = returnDecision(urgencyInput, importanceInput);
}

makeItems(gridItems, 10, 10);
const metadata = await app.metadataCache.getFileCache(file);
movePosition(metadata.frontmatter.urgencyLevel, metadata.frontmatter.importanceLevel);

async function updateGrid(urgencyInput, importanceInput) {
	try {
		movePosition(urgencyInput, importanceInput);

		await new Promise(resolve => setTimeout(resolve, 1000));
		const fileContent = await app.vault.read(file);
		const lines = fileContent.split('\n');
		const replace = `urgencyLevel: ${urgencyInput}
importanceLevel: ${importanceInput}
smartScore: ${urgencyInput * importanceInput}
eSquare: ${decisionClass(urgencyInput, importanceInput)}`;
		lines.splice(1, 4, replace);
		await app.vault.modify(file, lines.join('\n'));
	} catch (error) {
		console.error('Error updating grid: ', error);
	}
}
```
## Deadlines
## Action Items
# Timeline