import hyperform from 'hyperform/dist/hyperform.amd';
import maskInput from 'vanilla-text-mask';

export default class TMIValidation {
  constructor(el) {
    this.el = el;

    // Set variables for custom error handling per fieldtype
    this.$firstName = this.el.querySelectorAll('[data-validate-first-name]');
    this.$lastName = this.el.querySelectorAll('[data-validate-last-name]');
    this.$name = this.el.querySelectorAll('[data-validate-name]');
    this.$email = this.el.querySelectorAll('[data-validate-email]');
    this.$optionalEmail = this.el.querySelectorAll('[data-validate-optional-email]');
    this.$zipCode = this.el.querySelectorAll('[data-validate-zip-code]');
    this.$phone = this.el.querySelectorAll('[data-validate-phone]');
    this.$optionalPhone = this.el.querySelectorAll('[data-validate-optional-phone]');
    this.$birthdate = this.el.querySelectorAll('[data-validate-birthdate]');
    this.$date = this.el.querySelectorAll('[data-validate-date]');
    this.$comment = this.el.querySelectorAll('[data-validate-comment]');
    this.$type = this.el.querySelectorAll('[data-validate-type]');
    this.$address = this.el.querySelectorAll('[data-validate-city]');
    this.$city = this.el.querySelectorAll('[data-validate-city]');
    this.$fieldLimit = this.el.querySelectorAll('[data-validate-field-limit]');
    this.$checkboxGroup = this.el.querySelectorAll('[data-validate-required-checkbox]');
    this.$dupNumCheck = this.el.querySelectorAll('[data-validate-duplicate-num-check]');

    // Kick off the instantiation process for the form
    this.initializeValidation();
    this.setupCustomRules();
  }

  forEach(array, callback, scope) {
    for (let i = 0; i < array.length; i++) {
      callback.call(scope, i, array[i]);
    }
  }

  initializeValidation() {
    hyperform(this.el, {
      revalidate: 'onblur',
      classes: {
        valid: 'is-valid',
        invalid: 'is-invalid',
        validated: 'is-validated',
        warning: 'is-warning'
      }
    });

    // Set default values for standard error messages
    hyperform.addTranslation('x-tmi', {
      ValueMissing: 'This value is required.'
    });

    hyperform.setLanguage('x-tmi');
  }

  setupCustomRules() {
    // Loop through matching fields and validate the inputs
    this.forEach(this.$firstName, (i, el) => this.validateFirstName(el));
    this.forEach(this.$lastName, (i, el) => this.validateLastName(el));
    this.forEach(this.$name, (i, el) => this.validateName(el));
    this.forEach(this.$email, (i, el) => this.validateEmail(el));
    this.forEach(this.$optionalEmail, (i, el) => this.validateOptionalEmail(el));
    this.forEach(this.$phone, (i, el) => this.validatePhone(el));
    this.forEach(this.$optionalPhone, (i, el) => this.validateOptionalPhone(el));
    this.forEach(this.$zipCode, (i, el) => this.validateZipCode(el));
    this.forEach(this.$birthdate, (i, el) => this.validateBirthdate(el));
    this.forEach(this.$date, (i, el) => this.validateDate(el));
    this.forEach(this.$comment, (i, el) => this.validateComment(el));
    this.forEach(this.$city, (i, el) => this.validateCity(el));
    this.forEach(this.$type, (i, el) => this.validateType(el));
    this.forEach(this.$fieldLimit, (i, el) => this.validateFieldLimit(el));
    this.forEach(this.$checkboxGroup, (i, el) => this.validateCheckboxGroup(el));
    this.forEach(this.$dupNumCheck, (i, el) => this.validateDupNum(el));
  }

  validateFirstName($el) {
    hyperform.addValidator(
      $el, element => {
        const valid = (element.value.length >= 2);      // Value is at least two characters

        element.setCustomValidity(
          valid ?
            '' :
            'Please enter your first name'
        );

        return valid;
      }
    );
  }

  validateLastName($el) {
    hyperform.addValidator(
      $el, element => {
        const valid = (element.value.length >= 2);      // Value is at least two characters

        element.setCustomValidity(
          valid ?
            '' :
            'Please enter your last name'
        );

        return valid;
      }
    );
  }

  validateName($el) {
    hyperform.addValidator(
      $el, element => {
        const valid = /[A-Za-z]+(\s[A-Za-z]+)?/.test(element.value);

        element.setCustomValidity(
          valid ?
            '' :
            'Please enter your name'
        );

        return valid;
      }
    );
  }

  validateEmail($el) {
    hyperform.addValidator(
      $el, element => {
        const valid =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(element.value);   // Value is a valid email

        element.setCustomValidity(
          valid ?
            '' :
            'Please enter a valid email'
        );

        return valid;
      }
    );
  }

  validateOptionalEmail($el) {
    hyperform.addValidator(
      $el, element => {
        if (element.value != '') {
          const valid =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(element.value);   // Value is a valid email

          element.setCustomValidity(
            valid ?
              '' :
              'Please enter a valid email'
          );

          return valid;
        } else {
          element.setCustomValidity('');
          return true;
        }
      }
    );
  }

  validateType($el) {
    let pattern = '';
    const errorMsg = $el.dataset.validateError || 'This field is required';

    if ($el.dataset.validateType === 'number') {
      pattern = /^\d+$/;
    }

    hyperform.addValidator(
      $el, element => {
        const valid = pattern.test(element.value);

        element.setCustomValidity(
          valid ? '' : errorMsg
        );

        return valid;
      }
    );
  }

  validateCheckboxGroup($el) {
    const group = $el.querySelectorAll('input[type="checkbox"]');
    const container = $el.querySelector('[data-validate-errors]');

    hyperform.addValidator(
      $el.querySelector('input[type="checkbox"]'), () => {
        const checked = [].filter.call(group, el => {
          return el.checked;
        });

        const valid = (checked.length > 0);

        if (valid) {
          container.classList.remove('is-warning');
          container.innerHTML = '';
        } else {
          container.classList.add('is-warning');
          container.innerHTML = 'Please select at least one option.';
        }

        return valid;
      }
    );
  }

  validateZipCode($el) {
    hyperform.addValidator(
      $el, element => {
        const valid =
          (element.value.length === 5) &&     // Value is 5 characters long
          /^\d+$/.test(element.value);        // Value only uses numbers

        element.setCustomValidity(
          valid ?
            '' :
            'Please enter a zip code'
        );

        return valid;
      }
    );
  }

  validatePhone($el) {
    hyperform.addValidator(
      $el, element => {
        const valid =
          /\([0-9][0-9][0-9]\) [0-9]*-[0-9][0-9][0-9][0-9]/.test(element.value); // Value is in (555) 555-5555 format

        element.setCustomValidity(
          valid ?
            '' :
            'Please enter a valid phone number'
        );

        return valid;
      }
    );

    maskInput({
      inputElement: $el,
      mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      guide: true
    });
  }

  validateCity($el) {
    hyperform.addValidator(
      $el, element => {
        const valid =
          /[A-Za-z]+(\s[A-Za-z]+)?/.test(element.value); // Value only allows alphabetical and space chars

        element.setCustomValidity(
          valid ?
            '' :
            'Please enter a valid city'
        );

        return valid;
      }
    );
  }

  validateOptionalPhone($el) {
    hyperform.addValidator(
      $el, element => {
        if (element.value != '') {
          const valid =
            /\([0-9][0-9][0-9]\) [0-9]*-[0-9][0-9][0-9][0-9]/.test(element.value); // Value is in (555) 555-5555 format

          element.setCustomValidity(
            valid ?
              '' :
              'Please enter a valid phone number'
          );

          return valid;
        } else {
          element.setCustomValidity('');
          return true;
        }
      }
    );
  }

  validateBirthdate($el) {
    hyperform.addValidator(
      $el, element => {
        const valid =
          /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/.test(element.value); // Value is in 00/00/0000 format

        element.setCustomValidity(
          valid ?
            '' :
            'Please enter a valid date of birth'
        );

        return valid;
      }
    );

    maskInput({
      inputElement: $el,
      mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
      guide: true
    })
  }

  validateDate($el) {
    hyperform.addValidator(
      $el, element => {
        const valid =
          /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/.test(element.value); // Value is in 00/00/0000 format

        element.setCustomValidity(
          valid ?
            '' :
            'Please enter a valid date'
        );

        return valid;
      }
    );

    maskInput({
      inputElement: $el,
      mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
      guide: true
    })
  }

  validateComment($el) {
    const minLength = 5;
    const maxLength = 2500;

    hyperform.addValidator(
      $el, element => {
        const valid = (element.value.length >= minLength);

        element.setCustomValidity(
          valid ?
            '' :
            `This value is too short. It should have ${minLength} characters or more.`
        );

        return valid;
      }
    );

    hyperform.addValidator(
      $el, element => {
        const valid = (element.value.length <= maxLength);

        element.setCustomValidity(
          valid ?
            '' :
            `This value is too long. It should have ${maxLength} characters or fewer.`
        );

        return valid;
      }
    );
  }

  validateFieldLimit($el) {
    const allowedChars = parseInt($el.dataset.validateFieldLimit, 10);

    $el.insertAdjacentHTML(
      'afterend',
      `
        <label class='form__validation-feedback' data-validate-feedback>
          You have <span data-validate-feedback-amt>${allowedChars}</span>
          total characters remaining.
        </label>
      `
    );

    $el.addEventListener('input',
      event => this.calculateFieldLimit(event, {
        $el,
        $feedbackEl: $el.parentNode.querySelector('[data-validate-feedback]'),
        $amountEl: $el.parentNode.querySelector('[data-validate-feedback-amt]')
      })
    );

    hyperform.addValidator(
      $el, element => {
        const valid = $el.value.length >= 5;

        element.setCustomValidity(
          valid ?
            '' :
            'This value is too short. It should have 5 characters or more.'
        );

        return valid;
      }
    );

    hyperform.addValidator(
      $el, element => {
        const valid = $el.value.length <= allowedChars;

        element.setCustomValidity(
          valid ?
            '' :
            `This value is too long. It should have ${allowedChars} characters or fewer.`
        );

        return valid;
      }
    );
  }

  calculateFieldLimit(ev, els) {
    const totalChars = parseInt(els.$el.dataset.validateFieldLimit, 10);
    const typedChars = parseInt(els.$el.value.length, 10);
    const charsRemaining = totalChars - typedChars;

    els.$amountEl.innerHTML = charsRemaining;

    if (typedChars > totalChars) {
      els.$feedbackEl.style = 'display: none';
    } else {
      els.$feedbackEl.style = 'display: block';
    }
  }

  validateDupNum($el) {
    hyperform.addValidator(
      $el, element => {
        const $dupNum = this.el.querySelector('[data-validate-duplicate-num]');
        let valid = false;
        if ($el.value === $dupNum.value) {
          valid = true;
        }

        element.setCustomValidity(
          valid ?
            '' :
            'Please enter the same number again'
        );

        return valid;
      }
    );
  }
}
