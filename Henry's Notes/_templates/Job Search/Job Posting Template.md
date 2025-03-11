---
company: 
role: 
posting: 
date-posted: 
listing-id: 
exp-level: 
exp-min: 
exp-max: 
office: 
languages: 
frameworks: 
libraries: 
other-tech: 
pay-range: 
pay-range-start: 
pay-range-end: 
date-applied: 
cover-letter: 
reached-out: false
started-process: false
num-stages: 
end-date: 
result: 
createdAt: <% tp.date.now("YYYY-MM-DDTHH:mm") %>
tags: 
---
# Overview
- Company: `VIEW[{company}][link]`
- Role: `VIEW[{role}][text]`
- Posting: `VIEW[{posting}][link]`
- Date Posted: `VIEW[{date-posted}][text]`
- Exp. Level: `VIEW[{exp-level}][text]`
- Pay range: `VIEW[{pay-range}][text]`
# Description

# Timeline
- Date Applied: `VIEW[{date-applied}][text]`
- Stages: `$= dv.current().file.frontmatter['num-stages'] ?? "0"`
- End Date: `VIEW[{end-date}][text]`
- Result: `$= dv.current().file.frontmatter['result'] ?? 'Pending'`