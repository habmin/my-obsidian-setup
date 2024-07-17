---
input_text_area: |-
  1 tablespoon olive oil
  1 yellow onion, diced
  6 cloves garlic, minced
  1 tablespoon curry powder
  1 teaspoon cumin
  ½ teaspoon ground ginger
  ¼ teaspoon ground cinnamon
  1 cup split red lentils
  1 (15 oz.) can garbanzo beans, drained
  1 (13.5 oz.) can full fat coconut milk
  32 oz. vegetable broth
  juice of 1 lime (about 2 tablespoons)
  Kosher salt
  fresh cracked pepper
  fresh chopped cilantro for garnish
regex_expression: /^(\s*)(\d*\.?\/?\d+)/gm
regex_group: $2
regex_replace: "- \\`VIEW[{metabind-servings} / {servings} * $2][math]\\` "
regex_combine: |-2
      1 yellow onion ($0.37)
      4 cloves garlic ($0.34)
      1 jalapeño ($0.22)
      1 Tbsp olive oil ($0.13)
      1.5 lbs. boneless, skinless chicken thighs ($4.94)
      2 15oz. cans cannellini beans (drained) ($1.78)
      1 15oz. can pinto beans (drained) ($0.79)
      1 7oz. can diced green chiles ($1.39)
      1 Tbsp ground cumin ($0.30)
      1 tsp dried oregano ($0.10)
      1/4 tsp smoked paprika ($0.02)
      1/4 tsp cayenne pepper ($0.02)
      1/4 tsp garlic powder ($0.02)
      1/4 tsp freshly cracked black pepper ($0.02)
      3 cups chicken broth ($0.35)
      1 cup frozen corn ($0.47)
      4 oz. cream cheese ($1.10)
      ½ cup sour cream ($0.45).replace(/^(\s*)(\d*\.?\/?\d+)/gm, - \`VIEW[{metabind-servings} / {servings} * $2][math]\`)
output_text_area: |-
  - `VIEW[{metabind-servings} / {servings} * 1][math]` tablespoon olive oil
  - `VIEW[{metabind-servings} / {servings} * 1][math]` yellow onion, diced
  - `VIEW[{metabind-servings} / {servings} * 6][math]` cloves garlic, minced
  - `VIEW[{metabind-servings} / {servings} * 1][math]` tablespoon curry powder
  - `VIEW[{metabind-servings} / {servings} * 1][math]` teaspoon cumin
  ½ teaspoon ground ginger
  ¼ teaspoon ground cinnamon
  - `VIEW[{metabind-servings} / {servings} * 1][math]` cup split red lentils
  - `VIEW[{metabind-servings} / {servings} * 1][math]` (15 oz.) can garbanzo beans, drained
  - `VIEW[{metabind-servings} / {servings} * 1][math]` (13.5 oz.) can full fat coconut milk
  - `VIEW[{metabind-servings} / {servings} * 32][math]` oz. vegetable broth
  juice of 1 lime (about 2 tablespoons)
  Kosher salt
  fresh cracked pepper
  fresh chopped cilantro for garnish
---
# Function
## Input
`INPUT[textArea:input_text_area]`
```meta-bind-button
label: Transform Servings
icon: pen-line
hidden: false
class: metabind-wide-button
tooltip: ""
id: ""
style: default
action:
  type: "updateMetadata"
  bindTarget: output_text_area
  evaluate: true
  value: getMetadata('input_text_area').replace(/^(\s*)(\d*\.?\/?\d+)/gm, "- \`VIEW[{metabind-servings} / {servings} * $2][math]\`")
```
## Output
`INPUT[textArea:output_text_area]`
# Description
Helps turns servings copied from websites to be used as dynamic metabind variables in recipes templates. It's not quite there yet for the for function to directly take from the metadata, as:
- The `regex_expression` returns a string, so the `replace()` function looks for the literal characters instead of a pattern.
- Obsidian is very fussy about it's escape characters for strings, wanting two backslashes for the escape, so javascript prints that extra backslashes.
So the function itself is hardcoded, but hey, it works!
# Parameters
These do nothing right now, but at least make it easier to understand what the function is doing.
## Regex Expression
`INPUT[textArea:regex_expression]`
## Regex Replacement
`INPUT[textArea:regex_replace]`
## Regex Group
`INPUT[textArea:regex_group]`