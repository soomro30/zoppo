---
layout: page
title: The process of building this site
permalink: /building-process/
published: false
author: Jonas Sandstedt
date: 2016-06-29
---

## Multiple Sections
To be able to style all posts differently, I hade to come up with a sollution to add multiple sections in a markdown file.

First I tried to using an [variable-list-array][multiple-sections]:

```markdown
sections:
- Lorem ipsum section 1.
- |
  ## Headline for section 2
  Lorem ipsum section 2 with multiple lines and markdown
```
And then print out the sections in the layout:

{% raw %}
```liquid
<div>{{ page.sections[0] | markdownify }}</div>
<div>{{ page.sections[1] | markdownify }}</div>
<div>{{ page.sections[2] | markdownify }}</div>
```
{% endraw %}

But it wasn't possible to add the markdownify filter to the array items. So hade to break up the sections in individual variables. I also checked if the current variable wasn't null (nil) to prevent the codeblock from executing in case the variable wasn't set.

{% raw %}
```liquid
{% unless page.section1 == nil %}
<div class="section section--1">
    <div class="text-content">
        {{ page.section1 | markdownify }}
    </div>
</div>
{% endunless %}
```
{% endraw %}

## Custom JS
To add custom javascript files to different post, I used [this sollution][custom-js] described by Emma Tosch. First I addes the URL to the files in the post

```markdown
scripts: 
- vivus.js
- curious/speed-bumps.js
```

Then in the layout, I looped trough the files and inlined them:

{% raw %}
```liquid
{% for js in cc.scripts %}
    {% assign root = 'js/' %}
    <script type="text/javascript">
    {% include {{ root | append: js }} %}
    </script>
{% endfor %}
```
{% endraw %}

The js files are located in the include/js folder


### Resources:

* [Multiple sections][multiple-sections]
* [Custom JS][custom-js]

[multiple-sections]: https://github.com/jekyll/jekyll/issues/246#issuecomment-1639375
[custom-js]: http://etosch.github.io/2016/03/09/using-custom-javascript-in-jekyll-blogs.html