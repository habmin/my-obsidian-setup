```js-engine
const mb = await app.plugins.getPlugin('obsidian-meta-bind-plugin')?.api;
const file = await this.app.workspace.getActiveFile();

const importanceLevelBind = mb.createBindTarget('frontmatter', file.path, ['importanceLevel']);
const urgencyLevelBind = mb.createBindTarget('frontmatter', file.path, ['urgencyLevel']);
const smartScoreBind = mb.createBindTarget('frontmatter', file.path, ['smartScore']);
const eSquareBind = mb.createBindTarget('frontmatter', file.path, ['eSquare']);

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
			el.appendChild(cell).className = "grid-item-pos decision shelve";
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
			return "shelve"
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
	if (file.path !== this.app.workspace.getActiveFile().path)
		return;
	const currentDecisionClass = decisionClass(urgencyInput, importanceInput);
	const cellEls = component.containerEl.children[0].children[0].children;
	for (const item of cellEls) {
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
	if (file.path !== this.app.workspace.getActiveFile().path)
		return;
	try {
		movePosition(urgencyInput, importanceInput);

		await new Promise(resolve => setTimeout(resolve, 2000));
		const fileContent = await app.vault.read(file);
		const lines = fileContent.split('\n');

		// auto-log change
		const inputDate = new Date();
		const appendTimeline = `- **${inputDate.toISOString().substring(0,10)} ${inputDate.toLocaleString('default', { hour: 'numeric', minute: 'numeric', hour12: true })}** - ES: ${file.basename} changed to ${returnDecision(urgencyInput, importanceInput)}`;
		const timelineIndex = lines.findIndex(line => line.trim() === '# Log');
		lines.splice(timelineIndex + 1, 0, appendTimeline);
		await app.vault.modify(file, lines.join('\n'));
		
		//change metadata
		mb.setMetadata(importanceLevelBind, parseInt(importanceInput));
		mb.setMetadata(urgencyLevelBind, parseInt(urgencyInput));
		mb.setMetadata(smartScoreBind, urgencyInput * importanceInput);
		mb.setMetadata(eSquareBind, decisionClass(urgencyInput, importanceInput));
		 
	} catch (error) {
		console.error('Error updating grid: ', error);
	}
}
```