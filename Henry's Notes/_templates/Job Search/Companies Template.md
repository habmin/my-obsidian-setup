---
name: 
locations: 
company-desc: 
size-range: 
size-low: 
size-high: 
careers-portal: 
languages: 
frameworks: 
libraries: 
other-tech: 
website: 
linkedin: 
work-connections: 
watch: false
tags:
---
# Job Postings
```dataviewjs
dv.table(
	['Job Postings', 'Applied', 'Result'], dv.pages('"Job Search/Postings"')
		.where(p => p.file.frontmatter.company == `[[${dv.current().file.name}]]`)
		.sort(p => p["date-applied"], "desc")
		.map(p => [p.file.link, p["date-applied"], p.result])
)
```
# Connections




