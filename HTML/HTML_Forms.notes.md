## Intro to Forms Workshop

- Intro the exercise by having students go through the README.md and discussing what's expected.
- Point out that they need _valid_ HTML - demo how to validate HTML using the validator and validator favelets.  Set the expectation that they shouldn't waste your time with invalid HTML.  Validating HTML (and remembering to do so regularly) is a skill akin to TDD - it's a habit, and regularly shipping invalid HTML is a problem

## Expectations

Students will generally take a day or more to get through the forms repo.  Be very rigorous about validating all of their HTML.  They will almost uniformly mess up labels and boolean attributes.

This repo lays the groundwork for understanding Express routes.  The ability to succinctly describe how things are sent to the server will be a predictor of how well they understand routing in general.

## Slides

* [g15](https://docs.google.com/presentation/d/1BeonEGxHl0uQUWQJc_1XJFKS794T4zZnJAIUUoUBy4M/edit#slide=id.p)

## Resources

* http://morgancarter.com.au/design-solutions/which-input-when/


## Adam's Notes:

- first exercise hint:
-> Is the `h2` "Query Params" or `<p>` block not showing
up? Look in the CSS. What does `display: none` do???


## CONTROLLING FORMS:

-What will form do with action left blank?
-What will form do with action pointing at some random web site?
-what will form do with fields matching query params for search on another site?
-what will form do with no `method` set?

```html
<form action="http://www.imdb.com/find" method="get">
  <input type="text" name="ref_" value="nv_sr_fn" />
  <input type="text" name="q" value="mars" />
  <input type="text" name="s" value="all" />

  <input type="submit" />
</form>
```
