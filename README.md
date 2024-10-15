# theme3_forms
Forms UI add-ons to Theme_3 , part of Theme_3 family; this build focus on forms for build insertions using handlebars and vue as core concept.

Panini is using Handlebars and the Theme3 forms runs on Theme_3


## Usage

- Run Theme_3 as normal on console to build the HTML, CSS , JS and SASS 

### Sample Concept Usage Under Partial

#### Input

```html

    <div class="demo-page">

        {{> text-input
            id="username"
            label=true
            label-title="Username"
            class-label="label label--block label--required"
            input-attrs='
            autofocus=true
            autocomplete="username"
            placeholder="Enter Username"'
            required=true
            error=true }}

    </div>
```

