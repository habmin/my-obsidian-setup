class EnergyLevel {
    async create(mb, component, container, context) {
        const energyLevel = mb.parseBindTarget('energyLevel', context.file.path);

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
        
        // The parent div for the icon and the dropdown menu
        const energyLevelDiv = container.createEl('div', {cls: "energy-level-div"})
        
        // Setup for Energy Icon
        const energyIconDiv = energyLevelDiv.createEl('div', {cls: "energy-icon-div"});
        energyIconDiv.innerHTML = batteryMap[mb.getMetadata(energyLevel)];
        mb.reactiveMetadata([energyLevel], component, (energyLevelValue) => {
            energyIconDiv.innerHTML = batteryMap[mb.getMetadata(energyLevel)];
        })
        
        // Setup for Metabind menu
        const blankDiv = energyLevelDiv.createEl('div');
        const selectOptions = {
            declaration: "INPUT[inlineSelect(option(Dead), option(Just Tired), option(Pushing Through), option(Grooving), option(I Feel GREAT!)):energyLevel]",
            renderChildType: "inline"
        };
        const mountable = mb.createInputFieldMountable(context.file.path, selectOptions);
        
        await mb.wrapInMDRC(mountable, blankDiv, component);
    }
}
