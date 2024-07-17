---
input_text_area: |-2
  

      1 cup (240ml) homemade or instant dashi (see notes)

      2 tablespoons (30ml) dry sake

      1 tablespoon (15ml) soy sauce, plus more to taste

      1 tablespoon (15g) sugar, plus more to taste

      1 large onion (about 6 ounces; 170g), thinly sliced

      12 ounces (340g) boneless, skinless chicken thighs or breast, thinly sliced

      3 scallions, ends trimmed and thinly sliced, divided

      2 stems mitsuba (optional; see note)

      3 to 4 large eggs (see note)

  To Serve:

      2 cups cooked white rice

      Togarashi (see note
regex_expression: /^(\s*)(\d*\.?\/?\d+)/gm
regex_group: $2
regex_replace: "- \\`VIEW[{metabind-servings} / {servings} * $2][math]\\`"
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
  - `VIEW[{metabind-servings} / {servings} * 1][math]` cup (240ml) homemade or instant dashi (see notes)
  - `VIEW[{metabind-servings} / {servings} * 2][math]` tablespoons (30ml) dry sake
  - `VIEW[{metabind-servings} / {servings} * 1][math]` tablespoon (15ml) soy sauce, plus more to taste
  - `VIEW[{metabind-servings} / {servings} * 1][math]` tablespoon (15g) sugar, plus more to taste
  - `VIEW[{metabind-servings} / {servings} * 1][math]` large onion (about 6 ounces; 170g), thinly sliced
  - `VIEW[{metabind-servings} / {servings} * 12][math]` ounces (340g) boneless, skinless chicken thighs or breast, thinly sliced
  - `VIEW[{metabind-servings} / {servings} * 3][math]` scallions, ends trimmed and thinly sliced, divided
  - `VIEW[{metabind-servings} / {servings} * 2][math]` stems mitsuba (optional; see note)
  - `VIEW[{metabind-servings} / {servings} * 3][math]` to 4 large eggs (see note)

  To Serve:
  - `VIEW[{metabind-servings} / {servings} * 2][math]` cups cooked white rice

      Togarashi (see note
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