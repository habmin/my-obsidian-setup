class DailyNoteNavbar {
    async create(app, container, context) {
        const currentFileDate = context.file.basename.slice(0, 10);
        let prevHref = await app.vault.getAbstractFileByPath(`Daily Notes/${moment(currentFileDate).subtract(1, 'days').format('YYYY-MM-DD-ddd')} - Daily Notes.md`)?.path ?? "#";

        // Check to see if the notes moved to the Archive folder
        if (prevHref === "#") {
            prevHref = await app.vault.getAbstractFileByPath(`Daily Notes/Archive/${moment(currentFileDate).subtract(1, 'days').format('YYYY-MM-DD-ddd')} - Daily Notes.md`)?.path ?? "#";
        }

        let nextHref = await app.vault.getAbstractFileByPath(`Daily Notes/${moment(currentFileDate).add(1, 'days').format('YYYY-MM-DD-ddd')} - Daily Notes.md`)?.path ?? "#";

        if (nextHref === "#") {
            nextHref = await app.vault.getAbstractFileByPath(`Daily Notes/Archive/${moment(currentFileDate).add(1, 'days').format('YYYY-MM-DD-ddd')} - Daily Notes.md`)?.path ?? "#";
        }

        const prevDisabled = prevHref === "#" ? "disabled" : '';
        const nextDisabled = nextHref === "#" ? "disabled" : '';
        
        const navBar = container.createEl('div', {cls: 'nav-bar'});
        //removeChild(navBar);
        
        // Create the prev nav-button
        const prevButton = container.createEl('div', {cls: `nav-button prev ${prevDisabled}`});
        // removeChild(prevButton);

        const prevLink = container.createEl('a', {cls: 'internal-link', href: prevHref});
        // removeChild(prevLink);

        const prevLinkChildren = `<svg class="lucide-chevrons-left" xmlns="http://www.w3.org/2000/svg" width="28.832px" height="28.832px" viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17-5-5 5-5"></path><path d="m18 17-5-5 5-5"></path></svg><h1 class="nav-header">Previous</h1>`

        prevLink.innerHTML = prevLinkChildren;

        prevButton.appendChild(prevLink);

        // Create the next nav-button
        let nextButton = container.createEl('div', {cls: `nav-button next ${nextDisabled}`});

        let nextLink = container.createEl('a', {cls: 'internal-link', href: nextHref});

        const nextLinkChildren = `<h1 class="nav-header">Next</h1><svg class="lucide-chevrons-right" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" height="28.832px" width="28.832px" xmlns="http://www.w3.org/2000/svg"><path d="m6 17 5-5-5-5"></path><path d="m13 17 5-5-5-5"></path></svg>`

        nextLink.innerHTML = nextLinkChildren;

        nextButton.appendChild(nextLink);
        
        // Append both nav-buttons to the nav-bar
        navBar.appendChild(prevButton);
        navBar.appendChild(nextButton);

        container.appendChild(navBar);
    }
}