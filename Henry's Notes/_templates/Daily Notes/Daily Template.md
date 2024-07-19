---
cssclasses:
  - daily-note
  - bannerimg
---
<%*
const numOfFiles = this.app.vault.getFolderByPath('_attachments/_banners/_daily_notes').children.length;
-%>
![[<% (Math.ceil(moment.now() / 86400000) % numOfFiles).toString().padStart(3, '0') %>.jpg##bannerimgfade]]
> [!bannericonc]
> <% tp.date.now('MMM D YY') %>
# Morning
<% tp.file.include("[[Morning Template]]") %>
# Professional
<% tp.file.include("[[Professional Template]]") %>
# Project
<% tp.file.include("[[Project Template]]") %>
# Personal
<% tp.file.include("[[Personal Template]]") %>
# Evening
<% tp.file.include("[[Evening Template]]") %>