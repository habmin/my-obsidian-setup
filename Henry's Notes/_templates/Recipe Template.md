---
recipe-name: 
course-type: 
source: 
ingredients: 
cooking-ware: 
prep-time-minutes: 
cook-time-minutes: 
total-time-minutes: 
avg-time-minutes: 
servings: 
difficulty: 
made-before: false
tags: 
metabind-servings: 
metabind-render-addon: false
cssclasses:
  - recipe-note
---
# Description
- Servings: `VIEW[{servings}][text]`
- Prep Time: `VIEW[{prep-time-minutes}][text]` minutes
- Cook Time: `VIEW[{cook-time-minutes}][text]` minutes
- Total Time: `VIEW[{total-time-minutes}][text]` minutes
- Avg. Time: `VIEW[{avg-time-minutes}][text]` minutes
- Source: `VIEW[{source}][link]`
# Notes

# Ingredients
Servings: `INPUT[number(placeholder({servings})):metabind-servings]`
![[Metabind Servings Function#Function]]
- `VIEW[{metabind-servings} / {servings} * 1][math]`
### My add-ons
- `VIEW[{metabind-servings} / {servings} * 1][math]`
# Instructions
`INPUT[toggle:metabind-render-addon]` **Include my add-ons (refresh)**
1. 
# Tips
# Nutrition Facts (per serving)
- 
### Conditional rendering text
```
`$= dv.current().file.frontmatter['metabind-render-addon'] ? "Text here" : ""`
```
### Render frontmatter properties
```
- `VIEW[{servings}][text]` // for text
- `VIEW[{source}][link]`   // for link
```
### Render ingredient
```
- `VIEW[{metabind-servings} / {servings} * <Number>][math]`
```
