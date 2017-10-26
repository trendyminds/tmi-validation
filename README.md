# TMI Validation

A validation library that sets up standard input masking and field requirements for common fields.

## Installation
```sh
$ npm i -S tmi-validation
$ yarn add tmi-validation
```

```js
import TMIValidation from 'tmi-validation';

const form = document.querySelector('#form');
new TMIValidation(form);
```

## Usage

You can validate forms on the site by adding some `data-` attributes to various form fields.

### Example form code without validation

Take the following form code as an example. **Note:** This isn't necessarily the standard format of all forms on the site. Some code has been modified simply to be more readable.

```html
<form>
  <label>
    First Name: <span class="form__required">*</span>
  </label>
  <input type="text" name="first_name">

  <label>
    Last Name: <span class="form__required">*</span>
  </label>
  <input type="text" name="last_name">

  <label>
    Email: <span class="form__required">*</span>
  </label>
  <input type="email" name="email">

  <label>
    Favorite color: <span class="form__required">*</span>
  </label>
  <select name="favorite_color">
    <option value="">Select a color</option>
    <option value="Blue">Blue</option>
    <option value="Green">Green</option>
    <option value="Red">Red</option>
    <option value="Yellow">Yellow</option>
  </select>

  <label>
    Favorite pizza topping: <span class="form__required">*</span>
  </label>
  <fieldset>
    <label><input type="radio" name="favorite_pizza_topping" value="Sausage"> Sausage</label>
    <label><input type="radio" name="favorite_pizza_topping" value="Pepperoni"> Pepperoni</label>
    <label><input type="radio" name="favorite_pizza_topping" value="Cheese"> Cheese</label>
  </fieldset>

  <label>
    Please write an explanation for your answers:
  </label>
  <textarea name="explanation"></textarea>

  <input type="submit" value="Submit Form">
</form>
```

### Custom validation rules
**Note**: You may also use the built-in HTML5 validation rules like `required`.

Type            | Data Attribute                     | Error Message                                      | Requirements                                   |
----------------|------------------------------------|----------------------------------------------------|------------------------------------------------|
**First Name**  | `data-validate-first-name`         | "Please enter your first name"                     | Required, must be 2 characters minimum         |
**Last Name**   | `data-validate-last-name`          | "Please enter your last name"                      | Required, must be 2 characters minimum         |
**Email**       | `data-validate-email`              | "Please enter a valid email"                       | Required, must be a valid email address        |
**Zip Code**    | `data-validate-zip-code`           | "Please enter a zip code"                          | Required, must be 5 characters, must be digits |
**Phone**       | `data-validate-phone`              | "Please enter a valid phone number"                | Required, must be in a (XXX) XXX-XXXX format   |
**Birthdate**   | `data-validate-birthdate`          | "Please enter a valid date of birth"               | Required, must be in a XX/XX/XXXX format       |
**Comment**     | `data-validate-comment`            | Standard "is required" message                     | Required, must be between 5-2500 characters    |
**Field Limit** | `data-parsley-field-limit="1000"`  | "This field cannot be more than X characters long" | Required, cannot be more than 1000 characters  |

### Example form with validation applied

```html
<!--
  The form must have a data-validate data attribute to enable validation
-->
<form data-validate>
  <label>
    First Name: <span class="form__required">*</span>
  </label>
  <input type="text" name="first_name" data-validate-first-name>

  <label>
    Last Name: <span class="form__required">*</span>
  </label>
  <input type="text" name="last_name" data-validate-last-name>

  <label>
    Email: <span class="form__required">*</span>
  </label>
  <input type="email" name="email" data-validate-email>

  <label>
    Favorite color: <span class="form__required">*</span>
  </label>
  <select name="favorite_color" required>
    <option value="">Select a color</option>
    <option value="Blue">Blue</option>
    <option value="Green">Green</option>
    <option value="Red">Red</option>
    <option value="Yellow">Yellow</option>
  </select>

  <label>
    Favorite pizza topping: <span class="form__required">*</span>
  </label>
  <!--
    To validate a field group you must wrap the group with a fieldset and then
    add the element below as the place where your error message will display.
    Note: Only one field is required to have the "required" attribute because they
    all share the same name.
  -->
  <fieldset>
    <label><input type="radio" name="favorite_pizza_topping" value="Sausage" required> Sausage</label>
    <label><input type="radio" name="favorite_pizza_topping" value="Pepperoni"> Pepperoni</label>
    <label><input type="radio" name="favorite_pizza_topping" value="Cheese"> Cheese</label>
    <div data-validate-errors></div>
  </fieldset>
  

  <label>
    Please write an explanation for your answers:
  </label>
  <!--
    data-validate-field-limit will display the number of characters remaining
    for their response
  -->
  <textarea name="explanation" data-parsley-field-limit="3000"></textarea>

  <input type="submit" value="Submit Form">
</form>
```

## Development

### Requirements
- Node 7.8.0 (use [nvm](https://github.com/creationix/nvm) to manage your Node versions!)
- [Yarn](https://yarnpkg.com) `npm i -g yarn`

### Setting up
1. Clone/download to your machine
2. Run `yarn` to install dependencies

### Tasks

| Task         | Description                                      |
|:-------------|:-------------------------------------------------|
| `yarn test`  | Lints your JS.                                   |
| `yarn build` | Lints and then compiles JS to the `dist/` folder |
