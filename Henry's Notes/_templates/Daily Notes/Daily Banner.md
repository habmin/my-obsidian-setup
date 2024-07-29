---
cssclasses:
  - daily-note
  - bannerimg
---
```dataviewjs
const dayOfYear = moment().dayOfYear();
const numOfFiles = this.app.vault.getFolderByPath('_attachments/_banners/_daily_notes').children.length;
```
`$= "![[" + (moment().dayOfYear() % this.app.vault.getFolderByPath('_attachments/_banners/_daily_notes').children.length).toString().padStart(3, '0') + ".jpg##bannerimgfade]]"`
> [!bannericonc]
> `$= moment().format('MMM D YY')`