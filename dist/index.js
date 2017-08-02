(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["TMIValidation"] = factory();
	else
		root["TMIValidation"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 34);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


/* and datetime-local? Spec says “Nah!” */
const dates = [ 'datetime', 'date', 'month', 'week', 'time', ];
/* harmony export (immutable) */ __webpack_exports__["a"] = dates;


const plain_numbers = [ 'number', 'range', ];
/* unused harmony export plain_numbers */


/* everything that returns something meaningful for valueAsNumber and
 * can have the step attribute */
const numbers = dates.concat(plain_numbers, 'datetime-local');
/* harmony export (immutable) */ __webpack_exports__["e"] = numbers;


/* the spec says to only check those for syntax in validity.typeMismatch.
 * ¯\_(ツ)_/¯ */
const type_checked = [ 'email', 'url', ];
/* harmony export (immutable) */ __webpack_exports__["g"] = type_checked;


/* check these for validity.badInput */
const input_checked = [ 'email', 'date', 'month', 'week', 'time',
  'datetime', 'datetime-local', 'number', 'range', 'color', ];
/* harmony export (immutable) */ __webpack_exports__["b"] = input_checked;


const text = [ 'text', 'search', 'tel', 'password', ].concat(type_checked);
/* harmony export (immutable) */ __webpack_exports__["f"] = text;


/* input element types, that are candidates for the validation API.
 * Missing from this set are: button, hidden, menu (from <button>), reset and
 * the types for non-<input> elements. */
const validation_candidates = [ 'checkbox', 'color', 'file', 'image',
  'radio', 'submit', ].concat(numbers, text);
/* harmony export (immutable) */ __webpack_exports__["h"] = validation_candidates;


/* all known types of <input> */
const inputs = ['button', 'hidden', 'reset'].concat(validation_candidates);
/* harmony export (immutable) */ __webpack_exports__["c"] = inputs;


/* apparently <select> and <textarea> have types of their own */
const non_inputs = ['select-one', 'select-multiple', 'textarea'];
/* harmony export (immutable) */ __webpack_exports__["d"] = non_inputs;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_types__ = __webpack_require__(0);






/**
 * get the element's type in a backwards-compatible way
 */
/* harmony default export */ __webpack_exports__["a"] = (function(element) {
  if (element instanceof window.HTMLTextAreaElement) {
    return 'textarea';

  } else if (element instanceof window.HTMLSelectElement) {
    return element.hasAttribute('multiple')? 'select-multiple' : 'select-one';

  } else if (element instanceof window.HTMLButtonElement) {
    return (element.getAttribute('type') || 'submit').toLowerCase();

  } else if (element instanceof window.HTMLInputElement) {
    const attr = (element.getAttribute('type') || '').toLowerCase();
    if (attr && __WEBPACK_IMPORTED_MODULE_0__components_types__["c" /* inputs */].indexOf(attr) > -1) {
      return attr;
    } else {
      /* perhaps the DOM has in-depth knowledge. Take that before returning
       * 'text'. */
      return element.type || 'text';
    }

  }

  return '';
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_hooks__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_wrapper__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tools_get_type__ = __webpack_require__(1);









/**
 * check if an element is a candidate for constraint validation
 *
 * @see https://html.spec.whatwg.org/multipage/forms.html#barred-from-constraint-validation
 */
/* harmony default export */ __webpack_exports__["a"] = (function(element) {

  /* allow a shortcut via filters, e.g. to validate type=hidden fields */
  const filtered = Object(__WEBPACK_IMPORTED_MODULE_0__components_hooks__["c" /* do_filter */])('is_validation_candidate', null, element);
  if (filtered !== null) {
    return !! filtered;
  }

  /* it must be any of those elements */
  if (element instanceof window.HTMLSelectElement
      ||
      element instanceof window.HTMLTextAreaElement
      ||
      element instanceof window.HTMLButtonElement
      ||
      element instanceof window.HTMLInputElement) {

    const type = Object(__WEBPACK_IMPORTED_MODULE_3__tools_get_type__["a" /* default */])(element);
    /* its type must be in the whitelist or missing (select, textarea) */
    if (! type ||
        __WEBPACK_IMPORTED_MODULE_1__components_types__["d" /* non_inputs */].indexOf(type) > -1 ||
        __WEBPACK_IMPORTED_MODULE_1__components_types__["h" /* validation_candidates */].indexOf(type) > -1) {

      /* it mustn't be disabled or readonly */
      if (! element.hasAttribute('disabled') &&
          ! element.hasAttribute('readonly')) {

        const wrapped_form = Object(__WEBPACK_IMPORTED_MODULE_2__components_wrapper__["b" /* get_wrapper */])(element);
        /* it hasn't got the (non-standard) attribute 'novalidate' or its
         * parent form has got the strict parameter */
        if ((wrapped_form && wrapped_form.settings.novalidateOnElements) ||
            ! element.hasAttribute('novalidate') ||
            ! element.noValidate) {

          /* it isn't part of a <fieldset disabled> */
          let p = element.parentNode;
          while (p && p.nodeType === 1) {
            if (p instanceof window.HTMLFieldSetElement &&
                p.hasAttribute('disabled')) {
              /* quick return, if it's a child of a disabled fieldset */
              return false;
            } else if (p.nodeName.toUpperCase() === 'DATALIST') {
              /* quick return, if it's a child of a datalist
               * Do not use HTMLDataListElement to support older browsers,
               * too.
               * @see https://html.spec.whatwg.org/multipage/forms.html#the-datalist-element:barred-from-constraint-validation
               */
              return false;
            } else if (p === element.form) {
              /* the outer boundary. We can stop looking for relevant
               * fieldsets. */
              break;
            }
            p = p.parentNode;
          }

          /* then it's a candidate */
          return true;
        }
      }

    }

  }

  /* this is no HTML5 validation candidate... */
  return false;
});


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Wrapper;
/* harmony export (immutable) */ __webpack_exports__["b"] = get_wrapper;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools_catch_submit__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__polyfills_validityState__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__polyfills_reportValidity__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tools_property_uninstaller__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tools_polyfill__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tools_polyunfill__ = __webpack_require__(43);











const instances = new WeakMap();


/**
 * wrap <form>s, window or document, that get treated with the global
 * hyperform()
 */
function Wrapper(form, settings) {

  /* do not allow more than one instance per form. Otherwise we'd end
   * up with double event handlers, polyfills re-applied, ... */
  var existing = instances.get(form);
  if (existing) {
    existing.settings = settings;
    return existing;
  }

  this.form = form;
  this.settings = settings;
  this.revalidator = this.revalidate.bind(this);

  instances.set(form, this);

  Object(__WEBPACK_IMPORTED_MODULE_0__tools_catch_submit__["a" /* catch_submit */])(form, settings.revalidate === 'never');

  if (form === window || form.nodeType === 9) {
    /* install on the prototypes, when called for the whole document */
    this.install([
      window.HTMLButtonElement.prototype,
      window.HTMLInputElement.prototype,
      window.HTMLSelectElement.prototype,
      window.HTMLTextAreaElement.prototype,
      window.HTMLFieldSetElement.prototype,
    ]);
    Object(__WEBPACK_IMPORTED_MODULE_4__tools_polyfill__["a" /* default */])(window.HTMLFormElement);
  } else if (form instanceof window.HTMLFormElement ||
             form instanceof window.HTMLFieldSetElement) {
    this.install(form.elements);
    if (form instanceof window.HTMLFormElement) {
      Object(__WEBPACK_IMPORTED_MODULE_4__tools_polyfill__["a" /* default */])(form);
    }
  }

  if (settings.revalidate === 'oninput' || settings.revalidate === 'hybrid') {
    /* in a perfect world we'd just bind to "input", but support here is
     * abysmal: http://caniuse.com/#feat=input-event */
    form.addEventListener('keyup', this.revalidator);
    form.addEventListener('change', this.revalidator);
  }
  if (settings.revalidate === 'onblur' || settings.revalidate === 'hybrid') {
    /* useCapture=true, because `blur` doesn't bubble. See
     * https://developer.mozilla.org/en-US/docs/Web/Events/blur#Event_delegation
     * for a discussion */
    form.addEventListener('blur', this.revalidator, true);
  }
}


Wrapper.prototype = {

  destroy() {
    Object(__WEBPACK_IMPORTED_MODULE_0__tools_catch_submit__["b" /* uncatch_submit */])(this.form);
    instances.delete(this.form);
    this.form.removeEventListener('keyup', this.revalidator);
    this.form.removeEventListener('change', this.revalidator);
    this.form.removeEventListener('blur', this.revalidator, true);
    if (this.form === window || this.form.nodeType === 9) {
      this.uninstall([
        window.HTMLButtonElement.prototype,
        window.HTMLInputElement.prototype,
        window.HTMLSelectElement.prototype,
        window.HTMLTextAreaElement.prototype,
        window.HTMLFieldSetElement.prototype,
      ]);
      Object(__WEBPACK_IMPORTED_MODULE_5__tools_polyunfill__["a" /* default */])(window.HTMLFormElement);
    } else if (this.form instanceof window.HTMLFormElement ||
               this.form instanceof window.HTMLFieldSetElement) {
      this.uninstall(this.form.elements);
      if (this.form instanceof window.HTMLFormElement) {
        Object(__WEBPACK_IMPORTED_MODULE_5__tools_polyunfill__["a" /* default */])(this.form);
      }
    }
  },

  /**
   * revalidate an input element
   */
  revalidate(event) {
    if (event.target instanceof window.HTMLButtonElement ||
        event.target instanceof window.HTMLTextAreaElement ||
        event.target instanceof window.HTMLSelectElement ||
        event.target instanceof window.HTMLInputElement) {

      if (this.settings.revalidate === 'hybrid') {
        /* "hybrid" somewhat simulates what browsers do. See for example
         * Firefox's :-moz-ui-invalid pseudo-class:
         * https://developer.mozilla.org/en-US/docs/Web/CSS/:-moz-ui-invalid */
        if (event.type === 'blur' &&
            event.target.value !== event.target.defaultValue ||
            Object(__WEBPACK_IMPORTED_MODULE_1__polyfills_validityState__["a" /* default */])(event.target).valid) {
          /* on blur, update the report when the value has changed from the
           * default or when the element is valid (possibly removing a still
           * standing invalidity report). */
          Object(__WEBPACK_IMPORTED_MODULE_2__polyfills_reportValidity__["a" /* default */])(event.target);
        } else if (event.type === 'keyup' || event.type === 'change') {
          if (Object(__WEBPACK_IMPORTED_MODULE_1__polyfills_validityState__["a" /* default */])(event.target).valid) {
            // report instantly, when an element becomes valid,
            // postpone report to blur event, when an element is invalid
            Object(__WEBPACK_IMPORTED_MODULE_2__polyfills_reportValidity__["a" /* default */])(event.target);
          }
        }

      } else {
        Object(__WEBPACK_IMPORTED_MODULE_2__polyfills_reportValidity__["a" /* default */])(event.target);
      }

    }
  },

  /**
   * install the polyfills on each given element
   *
   * If you add elements dynamically, you have to call install() on them
   * yourself:
   *
   * js> var form = hyperform(document.forms[0]);
   * js> document.forms[0].appendChild(input);
   * js> form.install(input);
   *
   * You can skip this, if you called hyperform on window or document.
   */
  install(els) {
    if (els instanceof window.Element) {
      els = [ els ];
    }

    const els_length = els.length;

    for (let i = 0; i < els_length; i++) {
      Object(__WEBPACK_IMPORTED_MODULE_4__tools_polyfill__["a" /* default */])(els[i]);
    }
  },

  uninstall(els) {
    if (els instanceof window.Element) {
      els = [ els ];
    }

    const els_length = els.length;

    for (let i = 0; i < els_length; i++) {
      Object(__WEBPACK_IMPORTED_MODULE_5__tools_polyunfill__["a" /* default */])(els[i]);
    }
  },

};


/**
 * try to get the appropriate wrapper for a specific element by looking up
 * its parent chain
 *
 * @return Wrapper | undefined
 */
function get_wrapper(element) {
  var wrapped;

  if (element.form) {
    /* try a shortcut with the element's <form> */
    wrapped = instances.get(element.form);
  }

  /* walk up the parent nodes until document (including) */
  while (! wrapped && element) {
    wrapped = instances.get(element);
    element = element.parentNode;
  }

  if (! wrapped) {
    /* try the global instance, if exists. This may also be undefined. */
    wrapped = instances.get(window);
  }

  return wrapped;
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__get_date_from_week__ = __webpack_require__(42);






/**
 * calculate a date from a string according to HTML5
 */
/* harmony default export */ __webpack_exports__["a"] = (function(string, element_type) {
  const date = new Date(0);
  var ms;
  switch (element_type) {
    case 'datetime':
      if (! /^([0-9]{4,})-([0-9]{2})-([0-9]{2})T([01][0-9]|2[0-3]):([0-5][0-9])(?::([0-5][0-9])(?:\.([0-9]{1,3}))?)?$/.test(string)) {
        return null;
      }
      ms = RegExp.$7 || '000';
      while (ms.length < 3) {
        ms += '0';
      }
      date.setUTCFullYear(Number(RegExp.$1));
      date.setUTCMonth(Number(RegExp.$2) - 1,
                       Number(RegExp.$3));
      date.setUTCHours(Number(RegExp.$4),
                       Number(RegExp.$5),
                       Number(RegExp.$6 || 0),
                       Number(ms));
      return date;

    case 'date':
      if (! /^([0-9]{4,})-([0-9]{2})-([0-9]{2})$/.test(string)) {
        return null;
      }
      date.setUTCFullYear(Number(RegExp.$1));
      date.setUTCMonth(Number(RegExp.$2) - 1,
                       Number(RegExp.$3));
      return date;

    case 'month':
      if (! /^([0-9]{4,})-([0-9]{2})$/.test(string)) {
        return null;
      }
      date.setUTCFullYear(Number(RegExp.$1));
      date.setUTCMonth(Number(RegExp.$2) - 1, 1);
      return date;

    case 'week':
      if (! /^([0-9]{4,})-W(0[1-9]|[1234][0-9]|5[0-3])$/.test(string)) {
        return null;
      }
      return Object(__WEBPACK_IMPORTED_MODULE_0__get_date_from_week__["a" /* default */])(Number(RegExp.$2), Number(RegExp.$1));

    case 'time':
      if (! /^([01][0-9]|2[0-3]):([0-5][0-9])(?::([0-5][0-9])(?:\.([0-9]{1,3}))?)?$/.test(string)) {
        return null;
      }
      ms = RegExp.$4 || '000';
      while (ms.length < 3) {
        ms += '0';
      }
      date.setUTCHours(Number(RegExp.$1), Number(RegExp.$2),
          Number(RegExp.$3 || 0), Number(ms));
      return date;
  }

  return null;
});


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools_is_validation_candidate__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools_mark__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_message_store__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_wrapper__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tools_validity_state_checkers__ = __webpack_require__(44);










/**
 * the validity state constructor
 */
const ValidityState = function(element) {
  if (! (element instanceof window.HTMLElement)) {
    throw new Error('cannot create a ValidityState for a non-element');
  }

  const cached = ValidityState.cache.get(element);
  if (cached) {
    return cached;
  }

  if (! (this instanceof ValidityState)) {
    /* working around a forgotten `new` */
    return new ValidityState(element);
  }

  this.element = element;
  ValidityState.cache.set(element, this);
};


/**
 * the prototype for new validityState instances
 */
const ValidityStatePrototype = {};
ValidityState.prototype = ValidityStatePrototype;

ValidityState.cache = new WeakMap();

/**
 * copy functionality from the validity checkers to the ValidityState
 * prototype
 */
for (let prop in __WEBPACK_IMPORTED_MODULE_4__tools_validity_state_checkers__["a" /* default */]) {
  Object.defineProperty(ValidityStatePrototype, prop, {
    configurable: true,
    enumerable: true,
    get: (func => function() {
      return func(this.element);
    })(__WEBPACK_IMPORTED_MODULE_4__tools_validity_state_checkers__["a" /* default */][prop]),
    set: undefined,
  });
}

/**
 * the "valid" property calls all other validity checkers and returns true,
 * if all those return false.
 *
 * This is the major access point for _all_ other API methods, namely
 * (check|report)Validity().
 */
Object.defineProperty(ValidityStatePrototype, 'valid', {
  configurable: true,
  enumerable: true,
  get: function() {
    const wrapper = Object(__WEBPACK_IMPORTED_MODULE_3__components_wrapper__["b" /* get_wrapper */])(this.element);
    const validClass = wrapper && wrapper.settings.classes.valid || 'hf-valid';
    const invalidClass = wrapper && wrapper.settings.classes.invalid || 'hf-invalid';
    const userInvalidClass = wrapper && wrapper.settings.classes.userInvalid || 'hf-user-invalid';
    const userValidClass = wrapper && wrapper.settings.classes.userValid || 'hf-user-valid';
    const inRangeClass = wrapper && wrapper.settings.classes.inRange || 'hf-in-range';
    const outOfRangeClass = wrapper && wrapper.settings.classes.outOfRange || 'hf-out-of-range';
    const validatedClass = wrapper && wrapper.settings.classes.validated || 'hf-validated';

    this.element.classList.add(validatedClass);

    if (Object(__WEBPACK_IMPORTED_MODULE_0__tools_is_validation_candidate__["a" /* default */])(this.element)) {
      for (let prop in __WEBPACK_IMPORTED_MODULE_4__tools_validity_state_checkers__["a" /* default */]) {
        if (__WEBPACK_IMPORTED_MODULE_4__tools_validity_state_checkers__["a" /* default */][prop](this.element)) {
          this.element.classList.add(invalidClass);
          this.element.classList.remove(validClass);
          this.element.classList.remove(userValidClass);
          if (this.element.value !== this.element.defaultValue) {
            this.element.classList.add(userInvalidClass);
          } else {
            this.element.classList.remove(userInvalidClass);
          }
          this.element.setAttribute('aria-invalid', 'true');
          return false;
        }
      }
    }

    __WEBPACK_IMPORTED_MODULE_2__components_message_store__["a" /* default */].delete(this.element);
    this.element.classList.remove(invalidClass, userInvalidClass, outOfRangeClass);
    this.element.classList.add(validClass, inRangeClass);
    if (this.element.value !== this.element.defaultValue) {
      this.element.classList.add(userValidClass);
    } else {
      this.element.classList.remove(userValidClass);
    }
    this.element.setAttribute('aria-invalid', 'false');
    return true;
  },
  set: undefined,
});

/**
 * mark the validity prototype, because that is what the client-facing
 * code deals with mostly, not the property descriptor thing */
Object(__WEBPACK_IMPORTED_MODULE_1__tools_mark__["a" /* default */])(ValidityStatePrototype);

/* harmony default export */ __webpack_exports__["a"] = (ValidityState);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wrapper__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools_mark__ = __webpack_require__(12);







/**
 * the internal storage for messages
 */
const store = new WeakMap();


/* jshint -W053 */
const message_store = {

  set(element, message, is_custom=false) {
    if (element instanceof window.HTMLFieldSetElement) {
      const wrapped_form = Object(__WEBPACK_IMPORTED_MODULE_0__wrapper__["b" /* get_wrapper */])(element);
      if (wrapped_form && ! wrapped_form.settings.extendFieldset) {
        /* make this a no-op for <fieldset> in strict mode */
        return message_store;
      }
    }

    if (typeof message === 'string') {
      message = new String(message);
    }
    if (is_custom) {
      message.is_custom = true;
    }
    Object(__WEBPACK_IMPORTED_MODULE_1__tools_mark__["a" /* default */])(message);
    store.set(element, message);

    /* allow the :invalid selector to match */
    if ('_original_setCustomValidity' in element) {
      element._original_setCustomValidity(message.toString());
    }

    return message_store;
  },

  get(element) {
    var message = store.get(element);
    if (message === undefined && ('_original_validationMessage' in element)) {
      /* get the browser's validation message, if we have none. Maybe it
       * knows more than we. */
      message = new String(element._original_validationMessage);
    }
    return message? message : new String('');
  },

  delete(element) {
    if ('_original_setCustomValidity' in element) {
      element._original_setCustomValidity('');
    }
    return store.delete(element);
  },

};
/* jshint +W053 */

/* harmony default export */ __webpack_exports__["a"] = (message_store);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = call_hook;
/* harmony export (immutable) */ __webpack_exports__["c"] = do_filter;
/* harmony export (immutable) */ __webpack_exports__["d"] = remove_hook;
/* unused harmony export remove_filter */
/* harmony export (immutable) */ __webpack_exports__["a"] = add_hook;
/* unused harmony export add_filter */



const registry = Object.create(null);


/**
 * run all actions registered for a hook
 *
 * Every action gets called with a state object as `this` argument and with the
 * hook's call arguments as call arguments.
 *
 * @return mixed the returned value of the action calls or undefined
 */
function call_hook(hook) {
  var result;
  const call_args = Array.prototype.slice.call(arguments, 1);

  if (hook in registry) {
    result = registry[hook].reduce((function(args) {

      return function(previousResult, currentAction) {
        const interimResult = currentAction.apply({
          state: previousResult,
          hook: hook,
        }, args);
        return (interimResult !== undefined)? interimResult : previousResult;
      };

    })(call_args), result);
  }

  return result;
}

/**
 * Filter a value through hooked functions
 *
 * Allows for additional parameters:
 * js> do_filter('foo', null, current_element)
 */
function do_filter(hook, initial_value) {
  var result = initial_value;
  var call_args = Array.prototype.slice.call(arguments, 1);

  if (hook in registry) {
    result = registry[hook].reduce(function(previousResult, currentAction) {
      call_args[0] = previousResult;
      const interimResult = currentAction.apply({
        state: previousResult,
        hook: hook,
      }, call_args);
      return (interimResult !== undefined)? interimResult : previousResult;
    }, result);
  }

  return result;
}

/**
 * remove an action again
 */
function remove_hook(hook, action) {
  if (hook in registry) {
    for (let i = 0; i < registry[hook].length; i++) {
      if (registry[hook][i] === action) {
        registry[hook].splice(i, 1);
        break;
      }
    }
  }
}


/**
 * add an action to a hook
 */
function add_hook(hook, action, position) {
  if (! (hook in registry)) {
    registry[hook] = [];
  }
  if (position === undefined) {
    position = registry[hook].length;
  }
  registry[hook].splice(position, 0, action);
}



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = reportValidity;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools_trigger_event__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_renderer__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__validityState__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_wrapper__ = __webpack_require__(3);









/**
 * check element's validity and report an error back to the user
 */
function reportValidity(element) {
  /* if this is a <form>, report validity of all child inputs */
  if (element instanceof window.HTMLFormElement) {
    return (
             Array.prototype.map.call(element.elements, reportValidity)
           ).every(b=>b);
  }

  /* we copy checkValidity() here, b/c we have to check if the "invalid"
   * event was canceled. */
  const valid = Object(__WEBPACK_IMPORTED_MODULE_2__validityState__["a" /* default */])(element).valid;
  var event;
  if (valid) {
    const wrapped_form = Object(__WEBPACK_IMPORTED_MODULE_3__components_wrapper__["b" /* get_wrapper */])(element);
    if (wrapped_form && wrapped_form.settings.validEvent) {
      event = Object(__WEBPACK_IMPORTED_MODULE_0__tools_trigger_event__["b" /* default */])(element, 'valid', { cancelable: true });
    }
  } else {
    event = Object(__WEBPACK_IMPORTED_MODULE_0__tools_trigger_event__["b" /* default */])(element, 'invalid', { cancelable: true });
  }

  if (! event || ! event.defaultPrevented) {
    __WEBPACK_IMPORTED_MODULE_1__components_renderer__["a" /* default */].showWarning(element);
  }

  return valid;
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__string_to_date__ = __webpack_require__(4);






/**
 * calculate a date from a string according to HTML5
 */
/* harmony default export */ __webpack_exports__["a"] = (function(string, element_type) {
    const rval = Object(__WEBPACK_IMPORTED_MODULE_0__string_to_date__["a" /* default */])(string, element_type);
    if (rval !== null) {
      return +rval;
    }
    /* not parseFloat, because we want NaN for invalid values like "1.2xxy" */
    return Number(string);
});


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = valueAsNumber;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools_get_type__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools_string_to_number__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__valueAsDate__ = __webpack_require__(17);









/**
 * implement the valueAsNumber functionality
 *
 * @see https://html.spec.whatwg.org/multipage/forms.html#dom-input-valueasnumber
 */
function valueAsNumber(element, value=undefined) {
  const type = Object(__WEBPACK_IMPORTED_MODULE_0__tools_get_type__["a" /* default */])(element);
  if (__WEBPACK_IMPORTED_MODULE_2__components_types__["e" /* numbers */].indexOf(type) > -1) {
    if (type === 'range' && element.hasAttribute('multiple')) {
      /* @see https://html.spec.whatwg.org/multipage/forms.html#do-not-apply */
      return NaN;
    }

    if (value !== undefined) {
      /* setter: value must be NaN or a finite number */
      if (isNaN(value)) {
        element.value = '';
      } else if (typeof value === 'number' && window.isFinite(value)) {
        try {
          /* try setting as a date, but... */
          Object(__WEBPACK_IMPORTED_MODULE_3__valueAsDate__["a" /* default */])(element, new Date(value));
        } catch (e) {
          /* ... when valueAsDate is not responsible, ... */
          if (! (e instanceof window.DOMException)) {
            throw e;
          }
          /* ... set it via Number.toString(). */
          element.value = value.toString();
        }
      } else {
        throw new window.DOMException(
          'valueAsNumber setter encountered invalid value', 'TypeError');
      }
      return;
    }

    return Object(__WEBPACK_IMPORTED_MODULE_1__tools_string_to_number__["a" /* default */])(element.value, type);

  } else if (value !== undefined) {
    /* trying to set a number on a not-number input fails */
    throw new window.DOMException(
      'valueAsNumber setter cannot set number on this element',
      'InvalidStateError');
  }

  return NaN;
}


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = create_event;


/* the following code is borrowed from the WebComponents project, licensed
 * under the BSD license. Source:
 * <https://github.com/webcomponents/webcomponentsjs/blob/5283db1459fa2323e5bfc8b9b5cc1753ed85e3d0/src/WebComponents/dom.js#L53-L78>
 */
// defaultPrevented is broken in IE.
// https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
const workingDefaultPrevented = (function() {
  const e = document.createEvent('Event');
  e.initEvent('foo', true, true);
  e.preventDefault();
  return e.defaultPrevented;
})();

if (!workingDefaultPrevented) {
  const origPreventDefault = window.Event.prototype.preventDefault;
  window.Event.prototype.preventDefault = function() {
    if (!this.cancelable) {
      return;
    }

    origPreventDefault.call(this);

    Object.defineProperty(this, 'defaultPrevented', {
      get: function() {
        return true;
      },
      configurable: true
    });
  };
}
/* end of borrowed code */


function create_event(name, { bubbles=true, cancelable=false, }={}) {
  const event = document.createEvent('Event');
  event.initEvent(name, bubbles, cancelable);
  return event;
}


/* harmony default export */ __webpack_exports__["b"] = (function(element, event, {
                          bubbles=true,
                          cancelable=false,
                        }={}, payload={}) {
  if (! (event instanceof window.Event)) {
    event = create_event(event, { bubbles, cancelable });
  }

  for (let key in payload) {
    if (payload.hasOwnProperty(key)) {
      event[key] = payload[key];
    }
  }

  element.dispatchEvent(event);

  return event;
});


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


/**
 * mark an object with a '__hyperform=true' property
 *
 * We use this to distinguish our properties from the native ones. Usage:
 * js> mark(obj);
 * js> assert(obj.__hyperform === true)
 */
/* harmony default export */ __webpack_exports__["a"] = (function(obj) {
  if (['object', 'function'].indexOf(typeof obj) > -1) {
    delete obj.__hyperform;
    Object.defineProperty(obj, '__hyperform', {
      configurable: true,
      enumerable: false,
      value: true,
    });
  }

  return obj;
});


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_wrapper__ = __webpack_require__(3);






/**
 * remove `property` from element and restore _original_property, if present
 */
/* harmony default export */ __webpack_exports__["a"] = (function(element, property) {
  try {
    delete element[property];
  } catch (e) {
    /* Safari <= 9 and PhantomJS will end up here :-( Nothing to do except
     * warning */
    const wrapper = Object(__WEBPACK_IMPORTED_MODULE_0__components_wrapper__["b" /* get_wrapper */])(element);
    if (wrapper && wrapper.settings.debug) {
      /* global console */
      console.log('[hyperform] cannot uninstall custom property '+property);
    }
    return false;
  }

  const original_descriptor = Object.getOwnPropertyDescriptor(element,
                                '_original_'+property);

  if (original_descriptor) {
    Object.defineProperty(element, property, original_descriptor);
  }

});


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__date_to_string__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__string_to_number__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__get_type__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_localization__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_step_defaults__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_types__ = __webpack_require__(0);











/**
 * get previous and next valid values for a stepped input element
 */
/* harmony default export */ __webpack_exports__["a"] = (function(element, n=1) {
  const type = Object(__WEBPACK_IMPORTED_MODULE_2__get_type__["a" /* default */])(element);

  const aMin = element.getAttribute('min');
  let min = __WEBPACK_IMPORTED_MODULE_4__components_step_defaults__["b" /* default_min */][type] || NaN;
  if (aMin) {
    const pMin = Object(__WEBPACK_IMPORTED_MODULE_1__string_to_number__["a" /* default */])(aMin, type);
    if (! isNaN(pMin)) {
      min = pMin;
    }
  }

  const aMax = element.getAttribute('max');
  let max = __WEBPACK_IMPORTED_MODULE_4__components_step_defaults__["a" /* default_max */][type] || NaN;
  if (aMax) {
    const pMax = Object(__WEBPACK_IMPORTED_MODULE_1__string_to_number__["a" /* default */])(aMax, type);
    if (! isNaN(pMax)) {
      max = pMax;
    }
  }

  const aStep = element.getAttribute('step');
  let step = __WEBPACK_IMPORTED_MODULE_4__components_step_defaults__["c" /* default_step */][type] || 1;
  if (aStep && aStep.toLowerCase() === 'any') {
    /* quick return: we cannot calculate prev and next */
    return [Object(__WEBPACK_IMPORTED_MODULE_3__components_localization__["b" /* default */])('any value'), Object(__WEBPACK_IMPORTED_MODULE_3__components_localization__["b" /* default */])('any value')];
  } else if (aStep) {
    const pStep = Object(__WEBPACK_IMPORTED_MODULE_1__string_to_number__["a" /* default */])(aStep, type);
    if (! isNaN(pStep)) {
      step = pStep;
    }
  }

  const default_value = Object(__WEBPACK_IMPORTED_MODULE_1__string_to_number__["a" /* default */])(element.getAttribute('value'), type);

  const value = Object(__WEBPACK_IMPORTED_MODULE_1__string_to_number__["a" /* default */])(element.value ||
                                 element.getAttribute('value'), type);

  if (isNaN(value)) {
    /* quick return: we cannot calculate without a solid base */
    return [Object(__WEBPACK_IMPORTED_MODULE_3__components_localization__["b" /* default */])('any valid value'), Object(__WEBPACK_IMPORTED_MODULE_3__components_localization__["b" /* default */])('any valid value')];
  }

  const step_base = (
    ! isNaN(min)? min : (
      ! isNaN(default_value)? default_value : (
        __WEBPACK_IMPORTED_MODULE_4__components_step_defaults__["d" /* default_step_base */][type] || 0
      )
    )
  );

  const scale = __WEBPACK_IMPORTED_MODULE_4__components_step_defaults__["e" /* step_scale_factor */][type] || 1;

  var prev = step_base +
    Math.floor((value - step_base) / (step * scale)) * (step * scale) * n;
  var next = step_base +
    (Math.floor((value - step_base) / (step * scale)) + 1) * (step * scale) * n;

  if (prev < min) {
    prev = null;
  } else if (prev > max) {
    prev = max;
  }

  if (next > max) {
    next = null;
  } else if (next < min) {
    next = min;
  }

  /* convert to date objects, if appropriate */
  if (__WEBPACK_IMPORTED_MODULE_5__components_types__["a" /* dates */].indexOf(type) > -1) {
    prev = Object(__WEBPACK_IMPORTED_MODULE_0__date_to_string__["a" /* default */])(new Date(prev), type);
    next = Object(__WEBPACK_IMPORTED_MODULE_0__date_to_string__["a" /* default */])(new Date(next), type);
  }

  return [prev, next];
});


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";



/* harmony default export */ __webpack_exports__["a"] = (function(str, ...args) {
  const args_length = args.length;
  var global_index = 0;

  return str.replace(/%([0-9]+\$)?([sl])/g, (match, position, type) => {
    var local_index = global_index;
    if (position) {
      local_index = Number(position.replace(/\$$/, '')) - 1;
    }
    global_index += 1;

    var arg = '';
    if (args_length > local_index) {
      arg = args[local_index];
    }

    if (arg instanceof Date ||
        typeof arg === 'number' ||
        arg instanceof Number) {
      /* try getting a localized representation of dates and numbers, if the
       * browser supports this */
      if (type === 'l') {
        arg = (arg.toLocaleString || arg.toString).call(arg);
      } else {
        arg = arg.toString();
      }
    }

    return arg;
  });
});


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = set_language;
/* harmony export (immutable) */ __webpack_exports__["a"] = add_translation;



/**
 * the following validation messages are from Firefox source,
 * http://mxr.mozilla.org/mozilla-central/source/dom/locales/en-US/chrome/dom/dom.properties
 * released under MPL license, http://mozilla.org/MPL/2.0/.
 */
const catalog = {
  en: {
    TextTooLong: 'Please shorten this text to %l characters or less (you are currently using %l characters).',
    ValueMissing: 'Please fill out this field.',
    CheckboxMissing: 'Please check this box if you want to proceed.',
    RadioMissing: 'Please select one of these options.',
    FileMissing: 'Please select a file.',
    SelectMissing: 'Please select an item in the list.',
    InvalidEmail: 'Please enter an email address.',
    InvalidURL: 'Please enter a URL.',
    PatternMismatch: 'Please match the requested format.',
    PatternMismatchWithTitle: 'Please match the requested format: %l.',
    NumberRangeOverflow: 'Please select a value that is no more than %l.',
    DateRangeOverflow: 'Please select a value that is no later than %l.',
    TimeRangeOverflow: 'Please select a value that is no later than %l.',
    NumberRangeUnderflow: 'Please select a value that is no less than %l.',
    DateRangeUnderflow: 'Please select a value that is no earlier than %l.',
    TimeRangeUnderflow: 'Please select a value that is no earlier than %l.',
    StepMismatch: 'Please select a valid value. The two nearest valid values are %l and %l.',
    StepMismatchOneValue: 'Please select a valid value. The nearest valid value is %l.',
    BadInputNumber: 'Please enter a number.',
  },
};


/**
 * the global language Hyperform will use
 */
var language = 'en';


/**
 * the base language according to BCP47, i.e., only the piece before the first hyphen
 */
var base_lang = 'en';


/**
 * set the language for Hyperform’s messages
 */
function set_language(newlang) {
  language = newlang;
  base_lang = newlang.replace(/[-_].*/, '');
}


/**
 * add a lookup catalog "string: translation" for a language
 */
function add_translation(lang, new_catalog) {
  if (! (lang in catalog)) {
    catalog[lang] = {};
  }
  for (let key in new_catalog) {
    if (new_catalog.hasOwnProperty(key)) {
      catalog[lang][key] = new_catalog[key];
    }
  }
}


/**
 * return `s` translated into the current language
 *
 * Defaults to the base language and then English if the former has no
 * translation for `s`.
 */
/* harmony default export */ __webpack_exports__["b"] = (function(s) {
  if ((language in catalog) && (s in catalog[language])) {
    return catalog[language][s];
  } else if ((base_lang in catalog) && (s in catalog[base_lang])) {
    return catalog[base_lang][s];
  } else if (s in catalog.en) {
    return catalog.en[s];
  }
  return s;
});


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = valueAsDate;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools_get_type__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools_string_to_date__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tools_date_to_string__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_types__ = __webpack_require__(0);









/**
 * implement the valueAsDate functionality
 *
 * @see https://html.spec.whatwg.org/multipage/forms.html#dom-input-valueasdate
 */
function valueAsDate(element, value=undefined) {
  const type = Object(__WEBPACK_IMPORTED_MODULE_0__tools_get_type__["a" /* default */])(element);
  if (__WEBPACK_IMPORTED_MODULE_3__components_types__["a" /* dates */].indexOf(type) > -1) {
    if (value !== undefined) {
      /* setter: value must be null or a Date() */
      if (value === null) {
        element.value = '';
      } else if (value instanceof Date) {
        if (isNaN(value.getTime())) {
          element.value = '';
        } else {
          element.value = Object(__WEBPACK_IMPORTED_MODULE_2__tools_date_to_string__["a" /* default */])(value, type);
        }
      } else {
        throw new window.DOMException(
          'valueAsDate setter encountered invalid value', 'TypeError');
      }
      return;
    }

    const value_date = Object(__WEBPACK_IMPORTED_MODULE_1__tools_string_to_date__["a" /* default */])(element.value, type);
    return value_date instanceof Date? value_date : null;

  } else if (value !== undefined) {
    /* trying to set a date on a not-date input fails */
    throw new window.DOMException(
      'valueAsDate setter cannot set date on this element',
      'InvalidStateError');
  }

  return null;
}


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";



/**
 * patch String.length to account for non-BMP characters
 *
 * @see https://mathiasbynens.be/notes/javascript-unicode
 * We do not use the simple [...str].length, because it needs a ton of
 * polyfills in older browsers.
 */
/* harmony default export */ __webpack_exports__["a"] = (function(str) {
  return str.match(/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g).length;
});


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools_return_hook_or__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools_trigger_event__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__validityState__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_wrapper__ = __webpack_require__(3);









/**
 * check an element's validity with respect to it's form
 */
const checkValidity = Object(__WEBPACK_IMPORTED_MODULE_0__tools_return_hook_or__["a" /* default */])('checkValidity', function(element) {
  /* if this is a <form>, check validity of all child inputs */
  if (element instanceof window.HTMLFormElement) {
    return (
             Array.prototype.map.call(element.elements, checkValidity)
           ).every(b=>b);
  }

  /* default is true, also for elements that are no validation candidates */
  const valid = Object(__WEBPACK_IMPORTED_MODULE_2__validityState__["a" /* default */])(element).valid;
  if (valid) {
    const wrapped_form = Object(__WEBPACK_IMPORTED_MODULE_3__components_wrapper__["b" /* get_wrapper */])(element);
    if (wrapped_form && wrapped_form.settings.validEvent) {
      Object(__WEBPACK_IMPORTED_MODULE_1__tools_trigger_event__["b" /* default */])(element, 'valid');
    }
  } else {
    Object(__WEBPACK_IMPORTED_MODULE_1__tools_trigger_event__["b" /* default */])(element, 'invalid', { cancelable: true });
  }

  return valid;
});


/* harmony default export */ __webpack_exports__["a"] = (checkValidity);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__message_store__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wrapper__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tools_generate_id__ = __webpack_require__(39);








const warningsCache = new WeakMap();


const DefaultRenderer = {

  /**
   * called when a warning should become visible
   */
  attachWarning: function(warning, element) {
    /* should also work, if element is last,
     * http://stackoverflow.com/a/4793630/113195 */
    element.parentNode.insertBefore(warning, element.nextSibling);
  },

  /**
   * called when a warning should vanish
   */
  detachWarning: function(warning, element) {
    warning.parentNode.removeChild(warning);
  },

  /**
   * called when feedback to an element's state should be handled
   *
   * i.e., showing and hiding warnings
   */
  showWarning: function(element, sub_radio=false) {
    const msg = __WEBPACK_IMPORTED_MODULE_0__message_store__["a" /* default */].get(element).toString();
    var warning = warningsCache.get(element);

    if (msg) {
      if (! warning) {
        const wrapper = Object(__WEBPACK_IMPORTED_MODULE_1__wrapper__["b" /* get_wrapper */])(element);
        warning = document.createElement('div');
        warning.className = wrapper && wrapper.settings.classes.warning || 'hf-warning';
        warning.id = Object(__WEBPACK_IMPORTED_MODULE_2__tools_generate_id__["a" /* default */])();
        warning.setAttribute('aria-live', 'polite');
        warningsCache.set(element, warning);
      }

      element.setAttribute('aria-errormessage', warning.id);
      warning.textContent = msg;
      Renderer.attachWarning(warning, element);

    } else if (warning && warning.parentNode) {
      element.removeAttribute('aria-errormessage');
      Renderer.detachWarning(warning, element);

    }

    if (! sub_radio && element.type === 'radio' && element.form) {
      /* render warnings for all other same-name radios, too */
      Array.prototype
        .filter.call(document.getElementsByName(element.name),
                     radio => radio.name === element.name &&
                              radio.form === element.form
        )
        .map(radio => Renderer.showWarning(radio, 'sub_radio'));
    }
  },

};


const Renderer = {

  attachWarning: DefaultRenderer.attachWarning,
  detachWarning: DefaultRenderer.detachWarning,
  showWarning: DefaultRenderer.showWarning,

  set: function(renderer, action) {
    if (renderer.indexOf('_') > -1) {
      /* global console */
      // TODO delete before next non-patch version
      console.log('Renderer.set: please use camelCase names. '+renderer+' will be removed in the next non-patch release.');
      renderer = renderer.replace(/_([a-z])/g, g => g[1].toUpperCase());
    }
    if (! action) {
      action = DefaultRenderer[renderer];
    }
    Renderer[renderer] = action;
  },

};


/* harmony default export */ __webpack_exports__["a"] = (Renderer);


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_wrapper__ = __webpack_require__(3);






/**
 * add `property` to an element
 *
 * js> installer(element, 'foo', { value: 'bar' });
 * js> assert(element.foo === 'bar');
 */
/* harmony default export */ __webpack_exports__["a"] = (function(element, property, descriptor) {
  descriptor.configurable = true;
  descriptor.enumerable = true;
  if ('value' in descriptor) {
    descriptor.writable = true;
  }

  const original_descriptor = Object.getOwnPropertyDescriptor(element, property);

  if (original_descriptor) {

    if (original_descriptor.configurable === false) {
      /* Safari <= 9 and PhantomJS will end up here :-( Nothing to do except
       * warning */
      const wrapper = Object(__WEBPACK_IMPORTED_MODULE_0__components_wrapper__["b" /* get_wrapper */])(element);
      if (wrapper && wrapper.settings.debug) {
        /* global console */
        console.log('[hyperform] cannot install custom property '+property);
      }
      return false;
    }

    /* we already installed that property... */
    if ((original_descriptor.get && original_descriptor.get.__hyperform) ||
        (original_descriptor.value && original_descriptor.value.__hyperform)) {
      return;
    }

    /* publish existing property under new name, if it's not from us */
    Object.defineProperty(
      element,
      '_original_'+property,
      original_descriptor
    );
  }

  delete element[property];
  Object.defineProperty(element, property, descriptor);

  return true;
});


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


/* harmony default export */ __webpack_exports__["a"] = (function(element) {
  return (
          element instanceof window.HTMLButtonElement ||
          element instanceof window.HTMLInputElement ||
          element instanceof window.HTMLSelectElement ||
          element instanceof window.HTMLTextAreaElement ||
          element instanceof window.HTMLFieldSetElement ||
          element === window.HTMLButtonElement.prototype ||
          element === window.HTMLInputElement.prototype ||
          element === window.HTMLSelectElement.prototype ||
          element === window.HTMLTextAreaElement.prototype ||
          element === window.HTMLFieldSetElement.prototype
         );
});



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = setCustomValidity;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_message_store__ = __webpack_require__(6);






/**
 * set a custom validity message or delete it with an empty string
 */
function setCustomValidity(element, msg) {
  __WEBPACK_IMPORTED_MODULE_0__components_message_store__["a" /* default */].set(element, msg, true);
}


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = stepDown;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools_get_next_valid__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools_get_type__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__valueAsNumber__ = __webpack_require__(10);









/**
 *
 */
function stepDown(element, n=1) {
  if (__WEBPACK_IMPORTED_MODULE_2__components_types__["e" /* numbers */].indexOf(Object(__WEBPACK_IMPORTED_MODULE_1__tools_get_type__["a" /* default */])(element)) === -1) {
    throw new window.DOMException('stepDown encountered invalid type',
                                  'InvalidStateError');
  }
  if ((element.getAttribute('step') || '').toLowerCase() === 'any') {
    throw new window.DOMException('stepDown encountered step "any"',
                                  'InvalidStateError');
  }

  const prev = Object(__WEBPACK_IMPORTED_MODULE_0__tools_get_next_valid__["a" /* default */])(element, n)[0];

  if (prev !== null) {
    Object(__WEBPACK_IMPORTED_MODULE_3__valueAsNumber__["a" /* default */])(element, prev);
  }
}


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = date_to_string;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprintf__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__get_week_of_year__ = __webpack_require__(41);







function pad(num, size=2) {
  var s = num + '';
  while (s.length < size) {
    s = '0' + s;
  }
  return s;
}


/**
 * calculate a string from a date according to HTML5
 */
function date_to_string(date, element_type) {
  if (! (date instanceof Date)) {
    return null;
  }

  switch (element_type) {
    case 'datetime':
      return date_to_string(date, 'date') + 'T' +
             date_to_string(date, 'time');

    case 'datetime-local':
      return Object(__WEBPACK_IMPORTED_MODULE_0__sprintf__["a" /* default */])('%s-%s-%sT%s:%s:%s.%s',
                     date.getFullYear(),
                     pad(date.getMonth() + 1),
                     pad(date.getDate()),
                     pad(date.getHours()),
                     pad(date.getMinutes()),
                     pad(date.getSeconds()),
                     pad(date.getMilliseconds(), 3)
                   ).replace(/(:00)?\.000$/, '');

    case 'date':
      return Object(__WEBPACK_IMPORTED_MODULE_0__sprintf__["a" /* default */])('%s-%s-%s',
                     date.getUTCFullYear(),
                     pad(date.getUTCMonth() + 1),
                     pad(date.getUTCDate()));

    case 'month':
      return Object(__WEBPACK_IMPORTED_MODULE_0__sprintf__["a" /* default */])('%s-%s', date.getUTCFullYear(),
                     pad(date.getUTCMonth() + 1));

    case 'week':
      const params = Object(__WEBPACK_IMPORTED_MODULE_1__get_week_of_year__["a" /* default */])(date);
      return __WEBPACK_IMPORTED_MODULE_0__sprintf__["a" /* default */].call(null, '%s-W%s', params[0], pad(params[1]));

    case 'time':
      return Object(__WEBPACK_IMPORTED_MODULE_0__sprintf__["a" /* default */])('%s:%s:%s.%s',
                      pad(date.getUTCHours()),
                      pad(date.getUTCMinutes()),
                      pad(date.getUTCSeconds()),
                      pad(date.getUTCMilliseconds(), 3)
                    ).replace(/(:00)?\.000$/, '');
  }

  return null;
}


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";



const default_step = {
  'datetime-local': 60,
  datetime: 60,
  time: 60,
};
/* harmony export (immutable) */ __webpack_exports__["c"] = default_step;


const step_scale_factor = {
  'datetime-local': 1000,
  datetime: 1000,
  date: 86400000,
  week: 604800000,
  time: 1000,
};
/* harmony export (immutable) */ __webpack_exports__["e"] = step_scale_factor;


const default_step_base = {
  week: -259200000,
};
/* harmony export (immutable) */ __webpack_exports__["d"] = default_step_base;


const default_min = {
  range: 0,
};
/* harmony export (immutable) */ __webpack_exports__["b"] = default_min;


const default_max = {
  range: 100,
};
/* harmony export (immutable) */ __webpack_exports__["a"] = default_max;



/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = stepUp;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools_get_next_valid__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools_get_type__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__valueAsNumber__ = __webpack_require__(10);









/**
 *
 */
function stepUp(element, n=1) {
  if (__WEBPACK_IMPORTED_MODULE_2__components_types__["e" /* numbers */].indexOf(Object(__WEBPACK_IMPORTED_MODULE_1__tools_get_type__["a" /* default */])(element)) === -1) {
    throw new window.DOMException('stepUp encountered invalid type',
                                  'InvalidStateError');
  }
  if ((element.getAttribute('step') || '').toLowerCase() === 'any') {
    throw new window.DOMException('stepUp encountered step "any"',
                                  'InvalidStateError');
  }

  const next = Object(__WEBPACK_IMPORTED_MODULE_0__tools_get_next_valid__["a" /* default */])(element, n)[1];

  if (next !== null) {
    Object(__WEBPACK_IMPORTED_MODULE_3__valueAsNumber__["a" /* default */])(element, next);
  }
}


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = validationMessage;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_message_store__ = __webpack_require__(6);






/**
 * get the validation message for an element, empty string, if the element
 * satisfies all constraints.
 */
function validationMessage(element) {
  const msg = __WEBPACK_IMPORTED_MODULE_0__components_message_store__["a" /* default */].get(element);
  if (! msg) {
    return '';
  }

  /* make it a primitive again, since message_store returns String(). */
  return msg.toString();
}


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = willValidate;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools_is_validation_candidate__ = __webpack_require__(2);






/**
 * check, if an element will be subject to HTML5 validation at all
 */
function willValidate(element) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__tools_is_validation_candidate__["a" /* default */])(element);
}


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return install_properties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return uninstall_properties; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools_property_installer__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools_property_uninstaller__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_hooks__ = __webpack_require__(7);








const gA = prop => function() {
  return Object(__WEBPACK_IMPORTED_MODULE_2__components_hooks__["c" /* do_filter */])('attr_get_'+prop, this.getAttribute(prop), this);
};

const sA = prop => function(value) {
  this.setAttribute(prop, Object(__WEBPACK_IMPORTED_MODULE_2__components_hooks__["c" /* do_filter */])('attr_set_'+prop, value, this));
};

const gAb = prop => function() {
  return Object(__WEBPACK_IMPORTED_MODULE_2__components_hooks__["c" /* do_filter */])('attr_get_'+prop, this.hasAttribute(prop), this);
};

const sAb = prop => function(value) {
  if (Object(__WEBPACK_IMPORTED_MODULE_2__components_hooks__["c" /* do_filter */])('attr_set_'+prop, value, this)) {
    this.setAttribute(prop, prop);
  } else {
    this.removeAttribute(prop);
  }
};

const gAn = prop => function() {
  return Object(__WEBPACK_IMPORTED_MODULE_2__components_hooks__["c" /* do_filter */])('attr_get_'+prop, Math.max(0, Number(this.getAttribute(prop))), this);
};

const sAn = prop => function(value) {
  value = Object(__WEBPACK_IMPORTED_MODULE_2__components_hooks__["c" /* do_filter */])('attr_set_'+prop, value, this);
  if (/^[0-9]+$/.test(value)) {
    this.setAttribute(prop, value);
  }
};

function install_properties(element) {
  for (let prop of [ 'accept', 'max', 'min', 'pattern', 'placeholder', 'step', ]) {
    Object(__WEBPACK_IMPORTED_MODULE_0__tools_property_installer__["a" /* default */])(element, prop, {
      get: gA(prop),
      set: sA(prop),
    });
  }

  for (let prop of [ 'multiple', 'required', 'readOnly', ]) {
    Object(__WEBPACK_IMPORTED_MODULE_0__tools_property_installer__["a" /* default */])(element, prop, {
      get: gAb(prop.toLowerCase()),
      set: sAb(prop.toLowerCase()),
    });
  }

  for (let prop of [ 'minLength', 'maxLength', ]) {
    Object(__WEBPACK_IMPORTED_MODULE_0__tools_property_installer__["a" /* default */])(element, prop, {
      get: gAn(prop.toLowerCase()),
      set: sAn(prop.toLowerCase()),
    });
  }
}

function uninstall_properties(element) {
  for (let prop of [ 'accept', 'max', 'min', 'pattern', 'placeholder', 'step',
       'multiple', 'required', 'readOnly', 'minLength', 'maxLength', ]) {
    Object(__WEBPACK_IMPORTED_MODULE_1__tools_property_uninstaller__["a" /* default */])(element, prop);
  }
}




/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";



/**
 * internal storage for custom error messages
 */
const store = new WeakMap();


/**
 * register custom error messages per element
 */
const custom_messages = {

  set(element, validator, message) {
    const messages = store.get(element) || {};
    messages[validator] = message;
    store.set(element, messages);
    return custom_messages;
  },

  get(element, validator, _default=undefined) {
    const messages = store.get(element);
    if (messages === undefined || ! (validator in messages)) {
      const data_id = 'data-' + validator.replace(/[A-Z]/g, '-$&').toLowerCase();
      if (element.hasAttribute(data_id)) {
        /* if the element has a data-validator attribute, use this as fallback.
         * E.g., if validator == 'valueMissing', the element can specify a
         * custom validation message like this:
         *     <input data-value-missing="Oh noes!">
         */
        return element.getAttribute(data_id);
      }
      return _default;
    }
    return messages[validator];
  },

  delete(element, validator=null) {
    if (! validator) {
      return store.delete(element);
    }
    const messages = store.get(element) || {};
    if (validator in messages) {
      delete(messages[validator]);
      store.set(element, messages);
      return true;
    }
    return false;
  },

};

/* harmony default export */ __webpack_exports__["a"] = (custom_messages);


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";



const internal_registry = new WeakMap();


/**
 * A registry for custom validators
 *
 * slim wrapper around a WeakMap to ensure the values are arrays
 * (hence allowing > 1 validators per element)
 */
const custom_validator_registry = {

  set(element, validator) {
    const current = internal_registry.get(element) || [];
    current.push(validator);
    internal_registry.set(element, current);
    return custom_validator_registry;
  },

  get(element) {
    return internal_registry.get(element) || [];
  },

  delete(element) {
    return internal_registry.delete(element);
  },

};

/* harmony default export */ __webpack_exports__["a"] = (custom_validator_registry);


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";



const ws_on_start_or_end = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;


/**
 * trim a string of whitespace
 *
 * We don't use String.trim() to remove the need to polyfill it.
 */
/* harmony default export */ __webpack_exports__["a"] = (function(str) {
  return str.replace(ws_on_start_or_end, '');
});


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hyperform = __webpack_require__(35);

var _hyperform2 = _interopRequireDefault(_hyperform);

var _vanillaTextMask = __webpack_require__(57);

var _vanillaTextMask2 = _interopRequireDefault(_vanillaTextMask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TMIValidation = function () {
  function TMIValidation(el) {
    _classCallCheck(this, TMIValidation);

    this.el = el;

    // Set variables for custom error handling per fieldtype
    this.$firstName = this.el.querySelectorAll('[data-validate-first-name]');
    this.$lastName = this.el.querySelectorAll('[data-validate-last-name]');
    this.$name = this.el.querySelectorAll('[data-validate-name]');
    this.$email = this.el.querySelectorAll('[data-validate-email]');
    this.$zipCode = this.el.querySelectorAll('[data-validate-zip-code]');
    this.$phone = this.el.querySelectorAll('[data-validate-phone]');
    this.$optionalPhone = this.el.querySelectorAll('[data-validate-optional-phone]');
    this.$birthdate = this.el.querySelectorAll('[data-validate-birthdate]');
    this.$comment = this.el.querySelectorAll('[data-validate-comment]');
    this.$type = this.el.querySelectorAll('[data-validate-type]');
    this.$address = this.el.querySelectorAll('[data-validate-city]');
    this.$city = this.el.querySelectorAll('[data-validate-city]');
    this.$fieldLimit = this.el.querySelectorAll('[data-validate-field-limit]');
    this.$checkboxGroup = this.el.querySelectorAll('[data-validate-required-checkbox]');

    // Kick off the instantiation process for the form
    this.initializeValidation();
    this.setupCustomRules();
  }

  _createClass(TMIValidation, [{
    key: 'forEach',
    value: function forEach(array, callback, scope) {
      for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]);
      }
    }
  }, {
    key: 'initializeValidation',
    value: function initializeValidation() {
      (0, _hyperform2.default)(this.el, {
        revalidate: 'onblur',
        classes: {
          valid: 'is-valid',
          invalid: 'is-invalid',
          validated: 'is-validated',
          warning: 'is-warning'
        }
      });

      // Set default values for standard error messages
      _hyperform2.default.addTranslation('x-tmi', {
        ValueMissing: 'This value is required.'
      });

      _hyperform2.default.setLanguage('x-tmi');
    }
  }, {
    key: 'setupCustomRules',
    value: function setupCustomRules() {
      var _this = this;

      // Loop through matching fields and validate the inputs
      this.forEach(this.$firstName, function (i, el) {
        return _this.validateFirstName(el);
      });
      this.forEach(this.$lastName, function (i, el) {
        return _this.validateLastName(el);
      });
      this.forEach(this.$name, function (i, el) {
        return _this.validateName(el);
      });
      this.forEach(this.$email, function (i, el) {
        return _this.validateEmail(el);
      });
      this.forEach(this.$phone, function (i, el) {
        return _this.validatePhone(el);
      });
      this.forEach(this.$optionalPhone, function (i, el) {
        return _this.validateOptionalPhone(el);
      });
      this.forEach(this.$zipCode, function (i, el) {
        return _this.validateZipCode(el);
      });
      this.forEach(this.$birthdate, function (i, el) {
        return _this.validateBirthdate(el);
      });
      this.forEach(this.$comment, function (i, el) {
        return _this.validateComment(el);
      });
      this.forEach(this.$city, function (i, el) {
        return _this.validateCity(el);
      });
      this.forEach(this.$type, function (i, el) {
        return _this.validateType(el);
      });
      this.forEach(this.$fieldLimit, function (i, el) {
        return _this.validateFieldLimit(el);
      });
      this.forEach(this.$checkboxGroup, function (i, el) {
        return _this.validateCheckboxGroup(el);
      });
    }
  }, {
    key: 'validateFirstName',
    value: function validateFirstName($el) {
      _hyperform2.default.addValidator($el, function (element) {
        var valid = element.value.length >= 2; // Value is at least two characters

        element.setCustomValidity(valid ? '' : 'Please enter your first name');

        return valid;
      });
    }
  }, {
    key: 'validateLastName',
    value: function validateLastName($el) {
      _hyperform2.default.addValidator($el, function (element) {
        var valid = element.value.length >= 2; // Value is at least two characters

        element.setCustomValidity(valid ? '' : 'Please enter your last name');

        return valid;
      });
    }
  }, {
    key: 'validateName',
    value: function validateName($el) {
      _hyperform2.default.addValidator($el, function (element) {
        var valid = /[A-Za-z]+(\s[A-Za-z]+)?/.test(element.value);

        element.setCustomValidity(valid ? '' : 'Please enter your name');

        return valid;
      });
    }
  }, {
    key: 'validateEmail',
    value: function validateEmail($el) {
      _hyperform2.default.addValidator($el, function (element) {
        var valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(element.value); // Value is a valid email

        element.setCustomValidity(valid ? '' : 'Please enter a valid email');

        return valid;
      });
    }
  }, {
    key: 'validateType',
    value: function validateType($el) {
      var pattern = '';
      var errorMsg = $el.dataset.validateError || 'This field is required';

      if ($el.dataset.validateType === 'number') {
        pattern = /^\d+$/;
      }

      _hyperform2.default.addValidator($el, function (element) {
        var valid = pattern.test(element.value);

        element.setCustomValidity(valid ? '' : errorMsg);

        return valid;
      });
    }
  }, {
    key: 'validateCheckboxGroup',
    value: function validateCheckboxGroup($el) {
      var group = $el.querySelectorAll('input[type="checkbox"]');
      var container = $el.querySelector('[data-validate-errors]');

      _hyperform2.default.addValidator($el.querySelector('input[type="checkbox"]'), function () {
        var checked = [].filter.call(group, function (el) {
          return el.checked;
        });

        var valid = checked.length > 0;

        if (valid) {
          container.classList.remove('is-warning');
          container.innerHTML = '';
        } else {
          container.classList.add('is-warning');
          container.innerHTML = 'Please select at least one option.';
        }

        return valid;
      });
    }
  }, {
    key: 'validateZipCode',
    value: function validateZipCode($el) {
      _hyperform2.default.addValidator($el, function (element) {
        var valid = element.value.length === 5 && // Value is 5 characters long
        /^\d+$/.test(element.value); // Value only uses numbers

        element.setCustomValidity(valid ? '' : 'Please enter a zip code');

        return valid;
      });

      (0, _vanillaTextMask2.default)({
        inputElement: $el,
        mask: [/\d/, /\d/, /\d/, /\d/, /\d/]
      });
    }
  }, {
    key: 'validatePhone',
    value: function validatePhone($el) {
      _hyperform2.default.addValidator($el, function (element) {
        var valid = /\([0-9][0-9][0-9]\) [0-9]*-[0-9][0-9][0-9][0-9]/.test(element.value); // Value is in (555) 555-5555 format

        element.setCustomValidity(valid ? '' : 'Please enter a valid phone number');

        return valid;
      });

      $el.placeholder = '(123) 456-7890';

      (0, _vanillaTextMask2.default)({
        inputElement: $el,
        mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      });
    }
  }, {
    key: 'validateCity',
    value: function validateCity($el) {
      _hyperform2.default.addValidator($el, function (element) {
        var valid = /[A-Za-z]+(\s[A-Za-z]+)?/.test(element.value); // Value only allows alphabetical and space chars

        element.setCustomValidity(valid ? '' : 'Please enter a valid city');

        return valid;
      });
    }
  }, {
    key: 'validateOptionalPhone',
    value: function validateOptionalPhone($el) {
      $el.placeholder = '(123) 456-7890';

      (0, _vanillaTextMask2.default)({
        inputElement: $el,
        mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      });
    }
  }, {
    key: 'validateBirthdate',
    value: function validateBirthdate($el) {
      _hyperform2.default.addValidator($el, function (element) {
        var valid = /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/.test(element.value); // Value is in 00/00/0000 format

        element.setCustomValidity(valid ? '' : 'Please enter a valid date of birth');

        return valid;
      });

      $el.placeholder = '05/12/1990';

      (0, _vanillaTextMask2.default)({
        inputElement: $el,
        mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
      });
    }
  }, {
    key: 'validateComment',
    value: function validateComment($el) {
      var minLength = 5;
      var maxLength = 2500;

      _hyperform2.default.addValidator($el, function (element) {
        var valid = element.value.length >= minLength;

        element.setCustomValidity(valid ? '' : 'This value is too short. It should have ' + minLength + ' characters or more.');

        return valid;
      });

      _hyperform2.default.addValidator($el, function (element) {
        var valid = element.value.length <= maxLength;

        element.setCustomValidity(valid ? '' : 'This value is too long. It should have ' + maxLength + ' characters or fewer.');

        return valid;
      });
    }
  }, {
    key: 'validateFieldLimit',
    value: function validateFieldLimit($el) {
      var _this2 = this;

      var allowedChars = parseInt($el.dataset.validateFieldLimit, 10);

      $el.insertAdjacentHTML('afterend', '\n        <label class=\'form__validation-feedback\' data-validate-feedback>\n          You have <span data-validate-feedback-amt>' + allowedChars + '</span>\n          total characters remaining.\n        </label>\n      ');

      $el.addEventListener('input', function (event) {
        return _this2.calculateFieldLimit(event, {
          $el: $el,
          $feedbackEl: $el.parentNode.querySelector('[data-validate-feedback]'),
          $amountEl: $el.parentNode.querySelector('[data-validate-feedback-amt]')
        });
      });

      _hyperform2.default.addValidator($el, function (element) {
        var valid = $el.value.length >= 5;

        element.setCustomValidity(valid ? '' : 'This value is too short. It should have 5 characters or more.');

        return valid;
      });

      _hyperform2.default.addValidator($el, function (element) {
        var valid = $el.value.length <= allowedChars;

        element.setCustomValidity(valid ? '' : 'This value is too long. It should have ' + allowedChars + ' characters or fewer.');

        return valid;
      });
    }
  }, {
    key: 'calculateFieldLimit',
    value: function calculateFieldLimit(ev, els) {
      var totalChars = parseInt(els.$el.dataset.validateFieldLimit, 10);
      var typedChars = parseInt(els.$el.value.length, 10);
      var charsRemaining = totalChars - typedChars;

      els.$amountEl.innerHTML = charsRemaining;

      if (typedChars > totalChars) {
        els.$feedbackEl.style = 'display: none';
      } else {
        els.$feedbackEl.style = 'display: block';
      }
    }
  }]);

  return TMIValidation;
}();

exports.default = TMIValidation;

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_checkValidity__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__polyfills_reportValidity__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__polyfills_setCustomValidity__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__polyfills_stepDown__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__polyfills_stepUp__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__polyfills_validationMessage__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__polyfills_validityState__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__polyfills_valueAsDate__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__polyfills_valueAsNumber__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__polyfills_willValidate__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_custom_messages__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_hooks__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_localization__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_registry__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_renderer__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_wrapper__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__tools_sprintf__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__version__ = __webpack_require__(56);























/* deprecate the old snake_case names
 * TODO: delme before next non-patch release
 */
function w(name) {
  const deprecated_message = 'Please use camelCase method names! The name "%s" is deprecated and will be removed in the next non-patch release.';
  /* global console */
  console.log(Object(__WEBPACK_IMPORTED_MODULE_16__tools_sprintf__["a" /* default */])(deprecated_message, name));
}


/**
 * public hyperform interface:
 */
function hyperform(form, {
                     classes,
                     debug=false,
                     extend_fieldset,
                     extendFieldset,
                     novalidate_on_elements,
                     novalidateOnElements,
                     prevent_implicit_submit,
                     preventImplicitSubmit/* TODO: uncomment =false */,
                     revalidate,
                     strict=false,
                     valid_event,
                     validEvent,
                   }={}) {

  if (! classes) {
    classes = {};
  }
  // TODO: clean up before next non-patch release
  if (extendFieldset === undefined) {
    if (extend_fieldset === undefined) {
      extendFieldset = ! strict;
    } else {
      w('extend_fieldset');
      extendFieldset = extend_fieldset;
    }
  }
  if (novalidateOnElements === undefined) {
    if (novalidate_on_elements === undefined) {
      novalidateOnElements = ! strict;
    } else {
      w('novalidate_on_elements');
      novalidateOnElements = novalidate_on_elements;
    }
  }
  if (preventImplicitSubmit === undefined) {
    if (prevent_implicit_submit === undefined) {
      preventImplicitSubmit = false;
    } else {
      w('prevent_implicit_submit');
      preventImplicitSubmit = prevent_implicit_submit;
    }
  }
  if (revalidate === undefined) {
    /* other recognized values: 'oninput', 'onblur', 'onsubmit' and 'never' */
    revalidate = strict? 'onsubmit' : 'hybrid';
  }
  if (validEvent === undefined) {
    if (valid_event === undefined) {
      validEvent = ! strict;
    } else {
      w('valid_event');
      validEvent = valid_event;
    }
  }

  const settings = { debug, strict, preventImplicitSubmit, revalidate,
                     validEvent, extendFieldset, classes, };

  if (form instanceof window.NodeList ||
      form instanceof window.HTMLCollection ||
      form instanceof Array) {
    return Array.prototype.map.call(form,
                                    element => hyperform(element, settings));
  }

  return new __WEBPACK_IMPORTED_MODULE_15__components_wrapper__["a" /* default */](form, settings);
}

hyperform.version = __WEBPACK_IMPORTED_MODULE_17__version__["a" /* default */];

hyperform.checkValidity = __WEBPACK_IMPORTED_MODULE_0__polyfills_checkValidity__["a" /* default */];
hyperform.reportValidity = __WEBPACK_IMPORTED_MODULE_1__polyfills_reportValidity__["a" /* default */];
hyperform.setCustomValidity = __WEBPACK_IMPORTED_MODULE_2__polyfills_setCustomValidity__["a" /* default */];
hyperform.stepDown = __WEBPACK_IMPORTED_MODULE_3__polyfills_stepDown__["a" /* default */];
hyperform.stepUp = __WEBPACK_IMPORTED_MODULE_4__polyfills_stepUp__["a" /* default */];
hyperform.validationMessage = __WEBPACK_IMPORTED_MODULE_5__polyfills_validationMessage__["a" /* default */];
hyperform.ValidityState = __WEBPACK_IMPORTED_MODULE_6__polyfills_validityState__["a" /* default */];
hyperform.valueAsDate = __WEBPACK_IMPORTED_MODULE_7__polyfills_valueAsDate__["a" /* default */];
hyperform.valueAsNumber = __WEBPACK_IMPORTED_MODULE_8__polyfills_valueAsNumber__["a" /* default */];
hyperform.willValidate = __WEBPACK_IMPORTED_MODULE_9__polyfills_willValidate__["a" /* default */];

hyperform.setLanguage = lang => { Object(__WEBPACK_IMPORTED_MODULE_12__components_localization__["c" /* set_language */])(lang); return hyperform; };
hyperform.addTranslation = (lang, catalog) => { Object(__WEBPACK_IMPORTED_MODULE_12__components_localization__["a" /* add_translation */])(lang, catalog); return hyperform; };
hyperform.setRenderer = (renderer, action) => { __WEBPACK_IMPORTED_MODULE_14__components_renderer__["a" /* default */].set(renderer, action); return hyperform; };
hyperform.addValidator = (element, validator) => { __WEBPACK_IMPORTED_MODULE_13__components_registry__["a" /* default */].set(element, validator); return hyperform; };
hyperform.setMessage = (element, validator, message) => { __WEBPACK_IMPORTED_MODULE_10__components_custom_messages__["a" /* default */].set(element, validator, message); return hyperform; };
hyperform.addHook = (hook, action, position) => { Object(__WEBPACK_IMPORTED_MODULE_11__components_hooks__["a" /* add_hook */])(hook, action, position); return hyperform; };
hyperform.removeHook = (hook, action) => { Object(__WEBPACK_IMPORTED_MODULE_11__components_hooks__["d" /* remove_hook */])(hook, action); return hyperform; };

// TODO: Remove in next non-patch version
hyperform.set_language = lang => { w('set_language'); Object(__WEBPACK_IMPORTED_MODULE_12__components_localization__["c" /* set_language */])(lang); return hyperform; };
hyperform.add_translation = (lang, catalog) => { w('add_translation'); Object(__WEBPACK_IMPORTED_MODULE_12__components_localization__["a" /* add_translation */])(lang, catalog); return hyperform; };
hyperform.set_renderer = (renderer, action) => { w('set_renderer'); __WEBPACK_IMPORTED_MODULE_14__components_renderer__["a" /* default */].set(renderer, action); return hyperform; };
hyperform.add_validator = (element, validator) => { w('add_validator'); __WEBPACK_IMPORTED_MODULE_13__components_registry__["a" /* default */].set(element, validator); return hyperform; };
hyperform.set_message = (element, validator, message) => { w('set_message'); __WEBPACK_IMPORTED_MODULE_10__components_custom_messages__["a" /* default */].set(element, validator, message); return hyperform; };
hyperform.add_hook = (hook, action, position) => { w('add_hook'); Object(__WEBPACK_IMPORTED_MODULE_11__components_hooks__["a" /* add_hook */])(hook, action, position); return hyperform; };
hyperform.remove_hook = (hook, action) => { w('remove_hook'); Object(__WEBPACK_IMPORTED_MODULE_11__components_hooks__["d" /* remove_hook */])(hook, action); return hyperform; };

if (document.currentScript && document.currentScript.hasAttribute('data-hf-autoload')) {
  hyperform(window);
}

/* harmony default export */ __webpack_exports__["default"] = (hyperform);


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_hooks_js__ = __webpack_require__(7);






/**
 * return either the data of a hook call or the result of action, if the
 * former is undefined
 *
 * @return function a function wrapper around action
 */
/* harmony default export */ __webpack_exports__["a"] = (function(hook, action) {
  return function() {
    const data = Object(__WEBPACK_IMPORTED_MODULE_0__components_hooks_js__["b" /* call_hook */])(hook, Array.prototype.slice.call(arguments));

    if (data !== undefined) {
      return data;
    }

    return action.apply(this, arguments);
  };
});


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = catch_submit;
/* harmony export (immutable) */ __webpack_exports__["b"] = uncatch_submit;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__trigger_event__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__matches__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__polyfills_reportValidity__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_wrapper__ = __webpack_require__(3);










/**
 * submit a form, because `element` triggered it
 *
 * This method also dispatches a submit event on the form prior to the
 * submission. The event contains the trigger element as `submittedVia`.
 *
 * If the element is a button with a name, the name=value pair will be added
 * to the submitted data.
 */
function submit_form_via(element) {
  /* apparently, the submit event is not triggered in most browsers on
   * the submit() method, so we do it manually here to model a natural
   * submit as closely as possible.
   * Now to the fun fact: If you trigger a submit event from a form, what
   * do you think should happen?
   * 1) the form will be automagically submitted by the browser, or
   * 2) nothing.
   * And as you already suspected, the correct answer is: both! Firefox
   * opts for 1), Chrome for 2). Yay! */
  var event_got_cancelled;

  var submit_event = Object(__WEBPACK_IMPORTED_MODULE_0__trigger_event__["a" /* create_event */])('submit', { cancelable: true });
  /* force Firefox to not submit the form, then fake preventDefault() */
  submit_event.preventDefault();
  Object.defineProperty(submit_event, 'defaultPrevented', {
    value: false,
    writable: true,
  });
  Object.defineProperty(submit_event, 'preventDefault', {
    value: () => submit_event.defaultPrevented = event_got_cancelled = true,
    writable: true,
  });
  Object(__WEBPACK_IMPORTED_MODULE_0__trigger_event__["b" /* default */])(element.form, submit_event, {}, { submittedVia: element });

  if (! event_got_cancelled) {
    add_submit_field(element);
    window.HTMLFormElement.prototype.submit.call(element.form);
    window.setTimeout(() => remove_submit_field(element));
  }
}


/**
 * if a submit button was clicked, add its name=value by means of a type=hidden
 * input field
 */
function add_submit_field(button) {
  if (['image', 'submit'].indexOf(button.type) > -1 && button.name) {
    const wrapper = Object(__WEBPACK_IMPORTED_MODULE_4__components_wrapper__["b" /* get_wrapper */])(button.form) || {};
    var submit_helper = wrapper.submit_helper;
    if (submit_helper) {
      if (submit_helper.parentNode) {
        submit_helper.parentNode.removeChild(submit_helper);
      }
    } else {
      submit_helper = document.createElement('input');
      submit_helper.type = 'hidden';
      wrapper.submit_helper = submit_helper;
    }
    submit_helper.name = button.name;
    submit_helper.value = button.value;
    button.form.appendChild(submit_helper);
  }
}


/**
 * remove a possible helper input, that was added by `add_submit_field`
 */
function remove_submit_field(button) {
  if (['image', 'submit'].indexOf(button.type) > -1 && button.name) {
    const wrapper = Object(__WEBPACK_IMPORTED_MODULE_4__components_wrapper__["b" /* get_wrapper */])(button.form) || {};
    const submit_helper = wrapper.submit_helper;
    if (submit_helper && submit_helper.parentNode) {
      submit_helper.parentNode.removeChild(submit_helper);
    }
  }
}


/**
 * check a form's validity and submit it
 *
 * The method triggers a cancellable `validate` event on the form. If the
 * event is cancelled, form submission will be aborted, too.
 *
 * If the form is found to contain invalid fields, focus the first field.
 */
function check(button) {
  /* trigger a "validate" event on the form to be submitted */
  const val_event = Object(__WEBPACK_IMPORTED_MODULE_0__trigger_event__["b" /* default */])(button.form, 'validate',
                                  { cancelable: true });
  if (val_event.defaultPrevented) {
    /* skip the whole submit thing, if the validation is canceled. A user
     * can still call form.submit() afterwards. */
    return;
  }

  var valid = true;
  var first_invalid;
  Array.prototype.map.call(button.form.elements, element => {
    if (! Object(__WEBPACK_IMPORTED_MODULE_2__polyfills_reportValidity__["a" /* default */])(element)) {
      valid = false;
      if (! first_invalid && ('focus' in element)) {
        first_invalid = element;
      }
    }
  });

  if (valid) {
    submit_form_via(button);
  } else if (first_invalid) {
    /* focus the first invalid element, if validation went south */
    first_invalid.focus();
    /* tell the tale, if anyone wants to react to it */
    Object(__WEBPACK_IMPORTED_MODULE_0__trigger_event__["b" /* default */])(button.form, 'forminvalid');
  }
}


/**
 * test if node is a submit button
 */
function is_submit_button(node) {
  return (
    /* must be an input or button element... */
    (node.nodeName === 'INPUT' ||
     node.nodeName === 'BUTTON') &&

    /* ...and have a submitting type */
    (node.type === 'image' || node.type === 'submit')
  );
}


/**
 * test, if the click event would trigger a submit
 */
function is_submitting_click(event, button) {
  return (
    /* prevented default: won't trigger a submit */
    ! event.defaultPrevented &&

    /* left button or middle button (submits in Chrome) */
    (! ('button' in event) ||
     event.button < 2) &&

    /* must be a submit button... */
    is_submit_button(button) &&

    /* the button needs a form, that's going to be submitted */
    button.form &&

    /* again, if the form should not be validated, we're out of the game */
    ! button.form.hasAttribute('novalidate')
  );
}


/**
 * test, if the keypress event would trigger a submit
 */
function is_submitting_keypress(event) {
  return (
    /* prevented default: won't trigger a submit */
    ! event.defaultPrevented &&

    (
      (
        /* ...and <Enter> was pressed... */
        event.keyCode === 13 &&

        /* ...on an <input> that is... */
        event.target.nodeName === 'INPUT' &&

        /* ...a standard text input field (not checkbox, ...) */
        __WEBPACK_IMPORTED_MODULE_3__components_types__["f" /* text */].indexOf(event.target.type) > -1
      ) || (
        /* or <Enter> or <Space> was pressed... */
        (event.keyCode === 13 ||
         event.keyCode === 32) &&

        /* ...on a submit button */
        is_submit_button(event.target)
      )
    ) &&

    /* there's a form... */
    event.target.form &&

    /* ...and the form allows validation */
    ! event.target.form.hasAttribute('novalidate')
  );
}


/**
 * catch clicks to children of <button>s
 */
function get_clicked_button(element) {
  if (is_submit_button(element)) {
    return element;
  } else if (Object(__WEBPACK_IMPORTED_MODULE_1__matches__["a" /* default */])(element, 'button:not([type]) *, button[type="submit"] *')) {
    return get_clicked_button(element.parentNode);
  } else {
    return null;
  }
}


/**
 * return event handler to catch explicit submission by click on a button
 */
function get_click_handler(ignore=false) {
  return function(event) {
    const button = get_clicked_button(event.target);
    if (button && is_submitting_click(event, button)) {
      event.preventDefault();
      if (ignore || button.hasAttribute('formnovalidate')) {
        /* if validation should be ignored, we're not interested in any checks */
        submit_form_via(button);
      } else {
        check(button);
      }
    }
  };
}
const click_handler = get_click_handler();
const ignored_click_handler = get_click_handler(true);


/**
 * catch implicit submission by pressing <Enter> in some situations
 */
function get_keypress_handler(ignore) {
  return function keypress_handler(event) {
    if (is_submitting_keypress(event))  {
      event.preventDefault();

      const wrapper = Object(__WEBPACK_IMPORTED_MODULE_4__components_wrapper__["b" /* get_wrapper */])(event.target.form) || { settings: {} };
      if (wrapper.settings.preventImplicitSubmit) {
        /* user doesn't want an implicit submit. Cancel here. */
        return;
      }

      /* check, that there is no submit button in the form. Otherwise
      * that should be clicked. */
      const el = event.target.form.elements.length;
      var submit;
      for (let i = 0; i < el; i++) {
        if (['image', 'submit'].indexOf(event.target.form.elements[i].type) > -1) {
          submit = event.target.form.elements[i];
          break;
        }
      }

      if (submit) {
        submit.click();
      } else if (ignore) {
        submit_form_via(event.target);
      } else {
        check(event.target);
      }
    }
  };
}
const keypress_handler = get_keypress_handler();
const ignored_keypress_handler = get_keypress_handler(true);


/**
 * catch all relevant events _prior_ to a form being submitted
 *
 * @param bool ignore bypass validation, when an attempt to submit the
 *                    form is detected. True, when the wrapper's revalidate
 *                    setting is 'never'.
 */
function catch_submit(listening_node, ignore=false) {
  if (ignore) {
    listening_node.addEventListener('click', ignored_click_handler);
    listening_node.addEventListener('keypress', ignored_keypress_handler);
  } else {
    listening_node.addEventListener('click', click_handler);
    listening_node.addEventListener('keypress', keypress_handler);
  }
}


/**
 * decommission the event listeners from catch_submit() again
 */
function uncatch_submit(listening_node) {
  listening_node.removeEventListener('click', ignored_click_handler);
  listening_node.removeEventListener('keypress', ignored_keypress_handler);
  listening_node.removeEventListener('click', click_handler);
  listening_node.removeEventListener('keypress', keypress_handler);
}


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


/* shim layer for the Element.matches method */

const ep = window.Element.prototype;
const native_matches = ep.matches ||
                       ep.matchesSelector ||
                       ep.msMatchesSelector ||
                       ep.webkitMatchesSelector;

/* harmony default export */ __webpack_exports__["a"] = (function(element, selector) {
  return native_matches.call(element, selector);
});


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";



/**
 * counter that will be incremented with every call
 *
 * Will enforce uniqueness, as long as no more than 1 hyperform scripts
 * are loaded. (In that case we still have the "random" part below.)
 */
var uid = 0;


/**
 * generate a random ID
 *
 * @see https://gist.github.com/gordonbrander/2230317
 */
/* harmony default export */ __webpack_exports__["a"] = (function(prefix='hf_') {
  return prefix + ( uid++ ) + Math.random().toString(36).substr(2);
});


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__property_installer__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__is_field__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mark__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__polyfills_checkValidity__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__polyfills_reportValidity__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__polyfills_setCustomValidity__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__polyfills_stepDown__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__polyfills_stepUp__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__polyfills_validationMessage__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__polyfills_validityState__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__polyfills_valueAsDate__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__polyfills_valueAsNumber__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__polyfills_willValidate__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__polyfills_properties__ = __webpack_require__(30);




















const polyfills = {
    checkValidity: {
      value: Object(__WEBPACK_IMPORTED_MODULE_2__mark__["a" /* default */])(function() { return Object(__WEBPACK_IMPORTED_MODULE_3__polyfills_checkValidity__["a" /* default */])(this); }),
    },
    reportValidity: {
      value: Object(__WEBPACK_IMPORTED_MODULE_2__mark__["a" /* default */])(function() { return Object(__WEBPACK_IMPORTED_MODULE_4__polyfills_reportValidity__["a" /* default */])(this); }),
    },
    setCustomValidity: {
      value: Object(__WEBPACK_IMPORTED_MODULE_2__mark__["a" /* default */])(function (msg) { return Object(__WEBPACK_IMPORTED_MODULE_5__polyfills_setCustomValidity__["a" /* default */])(this, msg); }),
    },
    stepDown: {
      value: Object(__WEBPACK_IMPORTED_MODULE_2__mark__["a" /* default */])(function(n=1) { return Object(__WEBPACK_IMPORTED_MODULE_6__polyfills_stepDown__["a" /* default */])(this, n); }),
    },
    stepUp: {
      value: Object(__WEBPACK_IMPORTED_MODULE_2__mark__["a" /* default */])(function(n=1) { return Object(__WEBPACK_IMPORTED_MODULE_7__polyfills_stepUp__["a" /* default */])(this, n); }),
    },
    validationMessage: {
      get: Object(__WEBPACK_IMPORTED_MODULE_2__mark__["a" /* default */])(function() { return Object(__WEBPACK_IMPORTED_MODULE_8__polyfills_validationMessage__["a" /* default */])(this); }),
    },
    validity: {
      get: Object(__WEBPACK_IMPORTED_MODULE_2__mark__["a" /* default */])(function() { return Object(__WEBPACK_IMPORTED_MODULE_9__polyfills_validityState__["a" /* default */])(this); }),
    },
    valueAsDate: {
      get: Object(__WEBPACK_IMPORTED_MODULE_2__mark__["a" /* default */])(function() { return Object(__WEBPACK_IMPORTED_MODULE_10__polyfills_valueAsDate__["a" /* default */])(this); }),
      set: Object(__WEBPACK_IMPORTED_MODULE_2__mark__["a" /* default */])(function(value) { Object(__WEBPACK_IMPORTED_MODULE_10__polyfills_valueAsDate__["a" /* default */])(this, value); }),
    },
    valueAsNumber: {
      get: Object(__WEBPACK_IMPORTED_MODULE_2__mark__["a" /* default */])(function() { return Object(__WEBPACK_IMPORTED_MODULE_11__polyfills_valueAsNumber__["a" /* default */])(this); }),
      set: Object(__WEBPACK_IMPORTED_MODULE_2__mark__["a" /* default */])(function(value) { Object(__WEBPACK_IMPORTED_MODULE_11__polyfills_valueAsNumber__["a" /* default */])(this, value); }),
    },
    willValidate: {
      get: Object(__WEBPACK_IMPORTED_MODULE_2__mark__["a" /* default */])(function() { return Object(__WEBPACK_IMPORTED_MODULE_12__polyfills_willValidate__["a" /* default */])(this); }),
    },
};

/* harmony default export */ __webpack_exports__["a"] = (function(element) {
  if (Object(__WEBPACK_IMPORTED_MODULE_1__is_field__["a" /* default */])(element)) {

    for (let prop in polyfills) {
      Object(__WEBPACK_IMPORTED_MODULE_0__property_installer__["a" /* default */])(element, prop, polyfills[prop]);
    }

    Object(__WEBPACK_IMPORTED_MODULE_13__polyfills_properties__["a" /* install_properties */])(element);

  } else if (element instanceof window.HTMLFormElement ||
             element === window.HTMLFormElement.prototype) {
    Object(__WEBPACK_IMPORTED_MODULE_0__property_installer__["a" /* default */])(element, 'checkValidity', polyfills.checkValidity);
    Object(__WEBPACK_IMPORTED_MODULE_0__property_installer__["a" /* default */])(element, 'reportValidity', polyfills.reportValidity);
  }
});


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";



/* For a given date, get the ISO week number
 *
 * Source: http://stackoverflow.com/a/6117889/113195
 *
 * Based on information at:
 *
 *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
 *
 * Algorithm is to find nearest thursday, it's year
 * is the year of the week number. Then get weeks
 * between that date and the first day of that year.
 *
 * Note that dates in one year can be weeks of previous
 * or next year, overlap is up to 3 days.
 *
 * e.g. 2014/12/29 is Monday in week  1 of 2015
 *      2012/1/1   is Sunday in week 52 of 2011
 */
/* harmony default export */ __webpack_exports__["a"] = (function(d) {
  /* Copy date so don't modify original */
  d = new Date(+d);
  d.setUTCHours(0, 0, 0);
  /* Set to nearest Thursday: current date + 4 - current day number
   * Make Sunday's day number 7 */
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  /* Get first day of year */
  const yearStart = new Date(d.getUTCFullYear(),0,1);
  /* Calculate full weeks to nearest Thursday */
  const weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
  /* Return array of year and week number */
  return [d.getUTCFullYear(), weekNo];
});


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";



/**
 * return a new Date() representing the ISO date for a week number
 *
 * @see http://stackoverflow.com/a/16591175/113195
 */
/* harmony default export */ __webpack_exports__["a"] = (function(week, year) {
  const date = new Date(Date.UTC(year, 0, 1 + (week - 1) * 7));

  if (date.getUTCDay() <= 4/* thursday */) {
    date.setUTCDate(date.getUTCDate() - date.getUTCDay() + 1);
  } else {
    date.setUTCDate(date.getUTCDate() + 8 - date.getUTCDay());
  }

  return date;
});


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__is_field__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__property_uninstaller__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__polyfills_properties__ = __webpack_require__(30);








/* harmony default export */ __webpack_exports__["a"] = (function(element) {
  if (Object(__WEBPACK_IMPORTED_MODULE_0__is_field__["a" /* default */])(element)) {

    Object(__WEBPACK_IMPORTED_MODULE_1__property_uninstaller__["a" /* default */])(element, 'checkValidity');
    Object(__WEBPACK_IMPORTED_MODULE_1__property_uninstaller__["a" /* default */])(element, 'reportValidity');
    Object(__WEBPACK_IMPORTED_MODULE_1__property_uninstaller__["a" /* default */])(element, 'setCustomValidity');
    Object(__WEBPACK_IMPORTED_MODULE_1__property_uninstaller__["a" /* default */])(element, 'stepDown');
    Object(__WEBPACK_IMPORTED_MODULE_1__property_uninstaller__["a" /* default */])(element, 'stepUp');
    Object(__WEBPACK_IMPORTED_MODULE_1__property_uninstaller__["a" /* default */])(element, 'validationMessage');
    Object(__WEBPACK_IMPORTED_MODULE_1__property_uninstaller__["a" /* default */])(element, 'validity');
    Object(__WEBPACK_IMPORTED_MODULE_1__property_uninstaller__["a" /* default */])(element, 'valueAsDate');
    Object(__WEBPACK_IMPORTED_MODULE_1__property_uninstaller__["a" /* default */])(element, 'valueAsNumber');
    Object(__WEBPACK_IMPORTED_MODULE_1__property_uninstaller__["a" /* default */])(element, 'willValidate');

    Object(__WEBPACK_IMPORTED_MODULE_2__polyfills_properties__["b" /* uninstall_properties */])(element);

  } else if (element instanceof window.HTMLFormElement) {
    Object(__WEBPACK_IMPORTED_MODULE_1__property_uninstaller__["a" /* default */])(element, 'checkValidity');
    Object(__WEBPACK_IMPORTED_MODULE_1__property_uninstaller__["a" /* default */])(element, 'reportValidity');
  }
});


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__format_date__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__get_next_valid__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__get_type__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sprintf__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__string_to_number__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__string_to_date__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__unicode_string_length__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_custom_messages__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_localization__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_message_store__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_registry__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_wrapper__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__validators_bad_input__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__validators_max__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__validators_maxlength__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__validators_min__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__validators_minlength__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__validators_pattern__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__validators_required__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__validators_step__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__validators_type__ = __webpack_require__(54);


/**
 * Implement constraint checking functionality defined in the HTML5 standard
 *
 * @see https://html.spec.whatwg.org/multipage/forms.html#dom-cva-validity
 * @return bool true if the test fails [!], false otherwise
 */

























/**
 * boilerplate function for all tests but customError
 */
function check(test, react) {
  return element => {
    const invalid = ! test(element);
    if (invalid) {
      react(element);
    }
    return invalid;
  };
}


/**
 * create a common function to set error messages
 */
function set_msg(element, msgtype, _default) {
  __WEBPACK_IMPORTED_MODULE_9__components_message_store__["a" /* default */].set(element, __WEBPACK_IMPORTED_MODULE_7__components_custom_messages__["a" /* default */].get(element, msgtype, _default));
}


const badInput = check(__WEBPACK_IMPORTED_MODULE_12__validators_bad_input__["a" /* default */], element => set_msg(element, 'badInput',
                       Object(__WEBPACK_IMPORTED_MODULE_8__components_localization__["b" /* default */])('Please match the requested type.')));


function customError(element) {
  /* check, if there are custom validators in the registry, and call
   * them. */
  const custom_validators = __WEBPACK_IMPORTED_MODULE_10__components_registry__["a" /* default */].get(element);
  const cvl = custom_validators.length;
  var valid = true;

  if (cvl) {
    for (let i = 0; i < cvl; i++) {
      const result = custom_validators[i](element);
      if (result !== undefined && ! result) {
        valid = false;
        /* break on first invalid response */
        break;
      }
    }
  }

  /* check, if there are other validity messages already */
  if (valid) {
    const msg = __WEBPACK_IMPORTED_MODULE_9__components_message_store__["a" /* default */].get(element);
    valid = ! (msg.toString() && ('is_custom' in msg));
  }

  return ! valid;
}


const patternMismatch = check(__WEBPACK_IMPORTED_MODULE_17__validators_pattern__["a" /* default */], element => {
  set_msg(element, 'patternMismatch',
    element.title?
      Object(__WEBPACK_IMPORTED_MODULE_3__sprintf__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_8__components_localization__["b" /* default */])('PatternMismatchWithTitle'), element.title)
      :
      Object(__WEBPACK_IMPORTED_MODULE_8__components_localization__["b" /* default */])('PatternMismatch')
  );
});


/**
 * TODO: when rangeOverflow and rangeUnderflow are both called directly and
 * successful, the inRange and outOfRange classes won't get removed, unless
 * element.validityState.valid is queried, too.
 */
const rangeOverflow = check(__WEBPACK_IMPORTED_MODULE_13__validators_max__["a" /* default */], element => {
  const type = Object(__WEBPACK_IMPORTED_MODULE_2__get_type__["a" /* default */])(element);
  const wrapper = Object(__WEBPACK_IMPORTED_MODULE_11__components_wrapper__["b" /* get_wrapper */])(element);
  const outOfRangeClass = wrapper && wrapper.settings.classes.outOfRange || 'hf-out-of-range';
  const inRangeClass = wrapper && wrapper.settings.classes.inRange || 'hf-in-range';

  let msg;

  switch (type) {
    case 'date':
    case 'datetime':
    case 'datetime-local':
      msg = Object(__WEBPACK_IMPORTED_MODULE_3__sprintf__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_8__components_localization__["b" /* default */])('DateRangeOverflow'),
                    Object(__WEBPACK_IMPORTED_MODULE_0__format_date__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_5__string_to_date__["a" /* default */])(element.getAttribute('max'), type), type));
      break;
    case 'time':
      msg = Object(__WEBPACK_IMPORTED_MODULE_3__sprintf__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_8__components_localization__["b" /* default */])('TimeRangeOverflow'),
                    Object(__WEBPACK_IMPORTED_MODULE_0__format_date__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_5__string_to_date__["a" /* default */])(element.getAttribute('max'), type), type));
      break;
    // case 'number':
    default:
      msg = Object(__WEBPACK_IMPORTED_MODULE_3__sprintf__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_8__components_localization__["b" /* default */])('NumberRangeOverflow'),
                    Object(__WEBPACK_IMPORTED_MODULE_4__string_to_number__["a" /* default */])(element.getAttribute('max'), type));
      break;
  }

  set_msg(element, 'rangeOverflow', msg);
  element.classList.add(outOfRangeClass);
  element.classList.remove(inRangeClass);
});


const rangeUnderflow = check(__WEBPACK_IMPORTED_MODULE_15__validators_min__["a" /* default */], element => {
  const type = Object(__WEBPACK_IMPORTED_MODULE_2__get_type__["a" /* default */])(element);
  const wrapper = Object(__WEBPACK_IMPORTED_MODULE_11__components_wrapper__["b" /* get_wrapper */])(element);
  const outOfRangeClass = wrapper && wrapper.settings.classes.outOfRange || 'hf-out-of-range';
  const inRangeClass = wrapper && wrapper.settings.classes.inRange || 'hf-in-range';

  let msg;

  switch (type) {
    case 'date':
    case 'datetime':
    case 'datetime-local':
      msg = Object(__WEBPACK_IMPORTED_MODULE_3__sprintf__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_8__components_localization__["b" /* default */])('DateRangeUnderflow'),
                    Object(__WEBPACK_IMPORTED_MODULE_0__format_date__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_5__string_to_date__["a" /* default */])(element.getAttribute('min'), type), type));
      break;
    case 'time':
      msg = Object(__WEBPACK_IMPORTED_MODULE_3__sprintf__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_8__components_localization__["b" /* default */])('TimeRangeUnderflow'),
                    Object(__WEBPACK_IMPORTED_MODULE_0__format_date__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_5__string_to_date__["a" /* default */])(element.getAttribute('min'), type), type));
      break;
    // case 'number':
    default:
      msg = Object(__WEBPACK_IMPORTED_MODULE_3__sprintf__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_8__components_localization__["b" /* default */])('NumberRangeUnderflow'),
                    Object(__WEBPACK_IMPORTED_MODULE_4__string_to_number__["a" /* default */])(element.getAttribute('min'), type));
      break;
  }

  set_msg(element, 'rangeUnderflow', msg);
  element.classList.add(outOfRangeClass);
  element.classList.remove(inRangeClass);
});


const stepMismatch = check(__WEBPACK_IMPORTED_MODULE_19__validators_step__["a" /* default */], element => {
  const list = Object(__WEBPACK_IMPORTED_MODULE_1__get_next_valid__["a" /* default */])(element);
  const min = list[0];
  const max = list[1];
  let sole = false;
  let msg;

  if (min === null) {
    sole = max;
  } else if (max === null) {
    sole = min;
  }

  if (sole !== false) {
    msg = Object(__WEBPACK_IMPORTED_MODULE_3__sprintf__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_8__components_localization__["b" /* default */])('StepMismatchOneValue'), sole);
  } else {
    msg = Object(__WEBPACK_IMPORTED_MODULE_3__sprintf__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_8__components_localization__["b" /* default */])('StepMismatch'), min, max);
  }
  set_msg(element, 'stepMismatch', msg);
});


const tooLong = check(__WEBPACK_IMPORTED_MODULE_14__validators_maxlength__["a" /* default */], element => {
  set_msg(element, 'tooLong',
          Object(__WEBPACK_IMPORTED_MODULE_3__sprintf__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_8__components_localization__["b" /* default */])('TextTooLong'), element.getAttribute('maxlength'),
                  Object(__WEBPACK_IMPORTED_MODULE_6__unicode_string_length__["a" /* default */])(element.value)));
});


const tooShort = check(__WEBPACK_IMPORTED_MODULE_16__validators_minlength__["a" /* default */], element => {
  set_msg(element, 'tooShort',
          Object(__WEBPACK_IMPORTED_MODULE_3__sprintf__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_8__components_localization__["b" /* default */])('Please lengthen this text to %l characters or more (you are currently using %l characters).'),
                  element.getAttribute('minlength'),
                  Object(__WEBPACK_IMPORTED_MODULE_6__unicode_string_length__["a" /* default */])(element.value)));
});


const typeMismatch = check(__WEBPACK_IMPORTED_MODULE_20__validators_type__["a" /* default */], element => {
  let msg = Object(__WEBPACK_IMPORTED_MODULE_8__components_localization__["b" /* default */])('Please use the appropriate format.');
  const type = Object(__WEBPACK_IMPORTED_MODULE_2__get_type__["a" /* default */])(element);

  if (type === 'email') {
    if (element.hasAttribute('multiple')) {
      msg = Object(__WEBPACK_IMPORTED_MODULE_8__components_localization__["b" /* default */])('Please enter a comma separated list of email addresses.');
    } else {
      msg = Object(__WEBPACK_IMPORTED_MODULE_8__components_localization__["b" /* default */])('InvalidEmail');
    }
  } else if (type === 'url') {
    msg = Object(__WEBPACK_IMPORTED_MODULE_8__components_localization__["b" /* default */])('InvalidURL');
  } else if (type === 'file') {
    msg = Object(__WEBPACK_IMPORTED_MODULE_8__components_localization__["b" /* default */])('Please select a file of the correct type.');
  }

  set_msg(element, 'typeMismatch', msg);
});


const valueMissing = check(__WEBPACK_IMPORTED_MODULE_18__validators_required__["a" /* default */], element => {
  let msg = Object(__WEBPACK_IMPORTED_MODULE_8__components_localization__["b" /* default */])('ValueMissing');
  const type = Object(__WEBPACK_IMPORTED_MODULE_2__get_type__["a" /* default */])(element);

  if (type === 'checkbox') {
    msg = Object(__WEBPACK_IMPORTED_MODULE_8__components_localization__["b" /* default */])('CheckboxMissing');
  } else if (type === 'radio') {
    msg = Object(__WEBPACK_IMPORTED_MODULE_8__components_localization__["b" /* default */])('RadioMissing');
  } else if (type === 'file') {
    if (element.hasAttribute('multiple')) {
      msg = Object(__WEBPACK_IMPORTED_MODULE_8__components_localization__["b" /* default */])('Please select one or more files.');
    } else {
      msg = Object(__WEBPACK_IMPORTED_MODULE_8__components_localization__["b" /* default */])('FileMissing');
    }
  } else if (element instanceof window.HTMLSelectElement) {
    msg = Object(__WEBPACK_IMPORTED_MODULE_8__components_localization__["b" /* default */])('SelectMissing');
  }

  set_msg(element, 'valueMissing', msg);
});


/* harmony default export */ __webpack_exports__["a"] = ({
  badInput,
  customError,
  patternMismatch,
  rangeOverflow,
  rangeUnderflow,
  stepMismatch,
  tooLong,
  tooShort,
  typeMismatch,
  valueMissing,
});


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";



/* harmony default export */ __webpack_exports__["a"] = (function(date, part=undefined) {
  switch (part) {
    case 'date':
      return (date.toLocaleDateString || date.toDateString).call(date);
    case 'time':
      return (date.toLocaleTimeString || date.toTimeString).call(date);
    case 'month':
      return ('toLocaleDateString' in date)?
        date.toLocaleDateString(undefined, {
          year: 'numeric',
          month: '2-digit',
        })
        :
        date.toDateString();
    // case 'week':
    // TODO
    default:
      return (date.toLocaleString || date.toString).call(date);
  }
});


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools_get_type__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools_is_validation_candidate__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tools_string_to_date__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_types__ = __webpack_require__(0);









/**
 * test whether the element suffers from bad input
 */
/* harmony default export */ __webpack_exports__["a"] = (function(element) {
  const type = Object(__WEBPACK_IMPORTED_MODULE_0__tools_get_type__["a" /* default */])(element);

  if (! Object(__WEBPACK_IMPORTED_MODULE_1__tools_is_validation_candidate__["a" /* default */])(element) ||
      __WEBPACK_IMPORTED_MODULE_3__components_types__["b" /* input_checked */].indexOf(type) === -1) {
    /* we're not interested, thanks! */
    return true;
  }

  /* the browser hides some bad input from the DOM, e.g. malformed numbers,
   * email addresses with invalid punycode representation, ... We try to resort
   * to the original method here. The assumption is, that a browser hiding
   * bad input will hopefully also always support a proper
   * ValidityState.badInput */
  if (! element.value) {
    if ('_original_validity' in element &&
        ! element._original_validity.__hyperform) {
      return ! element._original_validity.badInput;
    }
    /* no value and no original badInput: Assume all's right. */
    return true;
  }

  var result = true;
  switch (type) {
    case 'color':
      result = /^#[a-f0-9]{6}$/.test(element.value);
      break;
    case 'number':
    case 'range':
      result = ! isNaN(Number(element.value));
      break;
    case 'datetime':
    case 'date':
    case 'month':
    case 'week':
    case 'time':
      result = Object(__WEBPACK_IMPORTED_MODULE_2__tools_string_to_date__["a" /* default */])(element.value, type) !== null;
      break;
    case 'datetime-local':
      result = /^([0-9]{4,})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9])(?::([0-5][0-9])(?:\.([0-9]{1,3}))?)?$/.test(element.value);
      break;
    case 'tel':
      /* spec says No! Phone numbers can have all kinds of formats, so this
       * is expected to be a free-text field. */
      // TODO we could allow a setting 'phone_regex' to be evaluated here.
      break;
    case 'email':
      break;
  }

  return result;
});


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools_get_type__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools_is_validation_candidate__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tools_string_to_date__ = __webpack_require__(4);









/**
 * test the max attribute
 *
 * we use Number() instead of parseFloat(), because an invalid attribute
 * value like "123abc" should result in an error.
 */
/* harmony default export */ __webpack_exports__["a"] = (function(element) {
  const type = Object(__WEBPACK_IMPORTED_MODULE_0__tools_get_type__["a" /* default */])(element);

  if (! Object(__WEBPACK_IMPORTED_MODULE_1__tools_is_validation_candidate__["a" /* default */])(element) ||
      ! element.value || ! element.hasAttribute('max')) {
    /* we're not responsible here */
    return true;
  }

  let value, max;
  if (__WEBPACK_IMPORTED_MODULE_2__components_types__["a" /* dates */].indexOf(type) > -1) {
    value = 1 * Object(__WEBPACK_IMPORTED_MODULE_3__tools_string_to_date__["a" /* default */])(element.value, type);
    max = 1 * (Object(__WEBPACK_IMPORTED_MODULE_3__tools_string_to_date__["a" /* default */])(element.getAttribute('max'), type) || NaN);
  } else {
    value = Number(element.value);
    max = Number(element.getAttribute('max'));
  }

  return (isNaN(max) || value <= max);
});


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools_get_type__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools_is_validation_candidate__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tools_unicode_string_length__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_types__ = __webpack_require__(0);









/**
 * test the maxlength attribute
 */
/* harmony default export */ __webpack_exports__["a"] = (function(element) {
  if (
      ! Object(__WEBPACK_IMPORTED_MODULE_1__tools_is_validation_candidate__["a" /* default */])(element)
      ||
      ! element.value
      ||
      __WEBPACK_IMPORTED_MODULE_3__components_types__["f" /* text */].indexOf(Object(__WEBPACK_IMPORTED_MODULE_0__tools_get_type__["a" /* default */])(element)) === -1
      ||
      ! element.hasAttribute('maxlength')
      ||
      ! element.getAttribute('maxlength') // catch maxlength=""
  ) {
    return true;
  }

  const maxlength = parseInt(element.getAttribute('maxlength'), 10);

  /* check, if the maxlength value is usable at all.
   * We allow maxlength === 0 to basically disable input (Firefox does, too).
   */
  if (isNaN(maxlength) || maxlength < 0) {
    return true;
  }

  return Object(__WEBPACK_IMPORTED_MODULE_2__tools_unicode_string_length__["a" /* default */])(element.value) <= maxlength;
});


/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools_get_type__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools_is_validation_candidate__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tools_string_to_date__ = __webpack_require__(4);









/**
 * test the min attribute
 *
 * we use Number() instead of parseFloat(), because an invalid attribute
 * value like "123abc" should result in an error.
 */
/* harmony default export */ __webpack_exports__["a"] = (function(element) {
  const type = Object(__WEBPACK_IMPORTED_MODULE_0__tools_get_type__["a" /* default */])(element);

  if (! Object(__WEBPACK_IMPORTED_MODULE_1__tools_is_validation_candidate__["a" /* default */])(element) ||
      ! element.value || ! element.hasAttribute('min')) {
    /* we're not responsible here */
    return true;
  }

  let value, min;
  if (__WEBPACK_IMPORTED_MODULE_2__components_types__["a" /* dates */].indexOf(type) > -1) {
    value = 1 * Object(__WEBPACK_IMPORTED_MODULE_3__tools_string_to_date__["a" /* default */])(element.value, type);
    min = 1 * (Object(__WEBPACK_IMPORTED_MODULE_3__tools_string_to_date__["a" /* default */])(element.getAttribute('min'), type) || NaN);
  } else {
    value = Number(element.value);
    min = Number(element.getAttribute('min'));
  }

  return (isNaN(min) || value >= min);
});


/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools_get_type__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools_is_validation_candidate__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tools_unicode_string_length__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_types__ = __webpack_require__(0);









/**
 * test the minlength attribute
 */
/* harmony default export */ __webpack_exports__["a"] = (function(element) {
  if (
      ! Object(__WEBPACK_IMPORTED_MODULE_1__tools_is_validation_candidate__["a" /* default */])(element)
      ||
      ! element.value
      ||
      __WEBPACK_IMPORTED_MODULE_3__components_types__["f" /* text */].indexOf(Object(__WEBPACK_IMPORTED_MODULE_0__tools_get_type__["a" /* default */])(element)) === -1
      ||
      ! element.hasAttribute('minlength')
      ||
      ! element.getAttribute('minlength') // catch minlength=""
  ) {
    return true;
  }

  const minlength = parseInt(element.getAttribute('minlength'), 10);

  /* check, if the minlength value is usable at all. */
  if (isNaN(minlength) || minlength < 0) {
    return true;
  }

  return Object(__WEBPACK_IMPORTED_MODULE_2__tools_unicode_string_length__["a" /* default */])(element.value) >= minlength;
});


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools_is_validation_candidate__ = __webpack_require__(2);






/**
 * test the pattern attribute
 */
/* harmony default export */ __webpack_exports__["a"] = (function(element) {
  return (
      ! Object(__WEBPACK_IMPORTED_MODULE_0__tools_is_validation_candidate__["a" /* default */])(element)
      ||
      ! element.value
      ||
      ! element.hasAttribute('pattern')
      ||
      (new RegExp('^(?:'+ element.getAttribute('pattern') +')$')).test(element.value)
    );
});


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools_is_validation_candidate__ = __webpack_require__(2);






/**
 * test the required attribute
 */
/* harmony default export */ __webpack_exports__["a"] = (function(element) {
  if (! Object(__WEBPACK_IMPORTED_MODULE_0__tools_is_validation_candidate__["a" /* default */])(element)
      ||
      ! element.hasAttribute('required')) {
    /* nothing to do */
    return true;
  }

  /* we don't need get_type() for element.type, because "checkbox" and "radio"
   * are well supported. */
  switch (element.type) {
    case 'checkbox':
      return element.checked;
      //break;
    case 'radio':
      /* radio inputs have "required" fulfilled, if _any_ other radio
       * with the same name in this form is checked. */
      return !! (
        element.checked ||
        (
          element.form &&
          Array.prototype.filter.call(
            document.getElementsByName(element.name),
            radio => radio.name === element.name &&
                     radio.form === element.form &&
                     radio.checked
          ).length > 0
        )
      );
      //break;
    default:
      return !! element.value;
  }
});


/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools_get_type__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools_is_validation_candidate__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_step_defaults__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tools_string_to_number__ = __webpack_require__(9);










/**
 * test the step attribute
 */
/* harmony default export */ __webpack_exports__["a"] = (function(element) {
  const type = Object(__WEBPACK_IMPORTED_MODULE_0__tools_get_type__["a" /* default */])(element);

  if (! Object(__WEBPACK_IMPORTED_MODULE_1__tools_is_validation_candidate__["a" /* default */])(element) ||
      ! element.value ||
      __WEBPACK_IMPORTED_MODULE_2__components_types__["e" /* numbers */].indexOf(type) === -1 ||
      (element.getAttribute('step') || '').toLowerCase() === 'any') {
    /* we're not responsible here. Note: If no step attribute is given, we
     * need to validate against the default step as per spec. */
    return true;
  }

  let step = element.getAttribute('step');
  if (step) {
    step = Object(__WEBPACK_IMPORTED_MODULE_4__tools_string_to_number__["a" /* default */])(step, type);
  } else {
    step = __WEBPACK_IMPORTED_MODULE_3__components_step_defaults__["c" /* default_step */][type] || 1;
  }

  if (step <= 0 || isNaN(step)) {
    /* error in specified "step". We cannot validate against it, so the value
     * is true. */
    return true;
  }

  const scale = __WEBPACK_IMPORTED_MODULE_3__components_step_defaults__["e" /* step_scale_factor */][type] || 1;

  let value = Object(__WEBPACK_IMPORTED_MODULE_4__tools_string_to_number__["a" /* default */])(element.value, type);
  let min = Object(__WEBPACK_IMPORTED_MODULE_4__tools_string_to_number__["a" /* default */])(element.getAttribute('min') ||
                         element.getAttribute('value') || '', type);

  if (isNaN(min)) {
    min = __WEBPACK_IMPORTED_MODULE_3__components_step_defaults__["d" /* default_step_base */][type] || 0;
  }

  if (type === 'month') {
    /* type=month has month-wide steps. See
     * https://html.spec.whatwg.org/multipage/forms.html#month-state-%28type=month%29
     */
    min = (new Date(min)).getUTCFullYear() * 12 + (new Date(min)).getUTCMonth();
    value = (new Date(value)).getUTCFullYear() * 12 + (new Date(value)).getUTCMonth();
  }

  const result = Math.abs(min - value) % (step * scale);

  return (result < 0.00000001 ||
          /* crappy floating-point arithmetics! */
          result > (step * scale) - 0.00000001);
});


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools_comma_split__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools_get_type__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tools_is_validation_candidate__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tools_trim__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_types__ = __webpack_require__(0);










/* we use a dummy <a> where we set the href to test URL validity
 * The definition is out of the "global" scope so that JSDOM can be instantiated
 * after loading Hyperform for tests.
 */
var url_canary;

/* see https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address */
const email_pattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * test the type-inherent syntax
 */
/* harmony default export */ __webpack_exports__["a"] = (function(element) {
  const type = Object(__WEBPACK_IMPORTED_MODULE_1__tools_get_type__["a" /* default */])(element);

  if (! Object(__WEBPACK_IMPORTED_MODULE_2__tools_is_validation_candidate__["a" /* default */])(element) ||
      (type !== 'file' && ! element.value) ||
      (type !== 'file' && __WEBPACK_IMPORTED_MODULE_4__components_types__["g" /* type_checked */].indexOf(type) === -1)) {
    /* we're not responsible for this element */
    return true;
  }

  var is_valid = true;

  switch (type) {
    case 'url':
        if (! url_canary) {
          url_canary = document.createElement('a');
        }
        const value = Object(__WEBPACK_IMPORTED_MODULE_3__tools_trim__["a" /* default */])(element.value);
        url_canary.href = value;
        is_valid = (url_canary.href === value ||
                    url_canary.href === value+'/');
        break;
    case 'email':
        if (element.hasAttribute('multiple')) {
          is_valid = Object(__WEBPACK_IMPORTED_MODULE_0__tools_comma_split__["a" /* default */])(element.value)
                       .every(value => email_pattern.test(value));
        } else {
          is_valid = email_pattern.test(Object(__WEBPACK_IMPORTED_MODULE_3__tools_trim__["a" /* default */])(element.value));
        }
        break;
    case 'file':
        if ('files' in element && element.files.length &&
            element.hasAttribute('accept')) {
          const patterns = Object(__WEBPACK_IMPORTED_MODULE_0__tools_comma_split__["a" /* default */])(element.getAttribute('accept'))
            .map(pattern => {
              if (/^(audio|video|image)\/\*$/.test(pattern)) {
                pattern = new RegExp('^'+RegExp.$1+'/.+$');
              }
              return pattern;
            });

          if (! patterns.length) {
            break;
          }

          fileloop:
          for (let i = 0; i < element.files.length; i++) {
            /* we need to match a whitelist, so pre-set with false */
            let file_valid = false;

            patternloop:
            for (let j = 0; j < patterns.length; j++) {
              const file = element.files[i];
              const pattern = patterns[j];

              let fileprop = file.type;

              if (typeof pattern === 'string' && pattern.substr(0, 1) === '.') {
                if (file.name.search('.') === -1) {
                  /* no match with any file ending */
                  continue patternloop;
                }

                fileprop = file.name.substr(file.name.lastIndexOf('.'));
              }

              if (fileprop.search(pattern) === 0) {
                /* we found one match and can quit looking */
                file_valid = true;
                break patternloop;
              }

            }

            if (! file_valid) {
              is_valid = false;
              break fileloop;
            }
          }
        }
  }

  return is_valid;
});


/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__trim__ = __webpack_require__(33);






/**
 * split a string on comma and trim the components
 *
 * As specified at
 * https://html.spec.whatwg.org/multipage/infrastructure.html#split-a-string-on-commas
 * plus removing empty entries.
 */
/* harmony default export */ __webpack_exports__["a"] = (function(str) {
  return str.split(',')
            .map(item => Object(__WEBPACK_IMPORTED_MODULE_0__trim__["a" /* default */])(item))
            .filter(b=>b);
});


/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ('0.9.6');


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,r){ true?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.vanillaTextMask=r():e.vanillaTextMask=r()}(this,function(){return function(e){function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}var t={};return r.m=e,r.c=t,r.p="",r(0)}([function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){var r=e.inputElement,t=(0,u.default)(e),n=function(e){var r=e.target.value;return t.update(r)};return r.addEventListener("input",n),t.update(r.value),{textMaskInputElement:t,destroy:function(){r.removeEventListener("input",n)}}}Object.defineProperty(r,"__esModule",{value:!0}),r.conformToMask=void 0,r.maskInput=o;var i=t(2);Object.defineProperty(r,"conformToMask",{enumerable:!0,get:function(){return n(i).default}});var a=t(5),u=n(a);r.default=o},function(e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.placeholderChar="_"},function(e,r,t){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=t.guide,u=void 0===n||n,l=t.previousConformedValue,s=void 0===l?a:l,f=t.placeholderChar,d=void 0===f?i.placeholderChar:f,c=t.placeholder,v=void 0===c?(0,o.convertMaskToPlaceholder)(r,d):c,p=t.currentCaretPosition,h=t.keepCharPositions,g=u===!1&&void 0!==s,m=e.length,y=s.length,b=v.length,C=r.length,P=m-y,x=P>0,k=p+(x?-P:0),O=k+Math.abs(P);if(h===!0&&!x){for(var M=a,T=k;T<O;T++)v[T]===d&&(M+=d);e=e.slice(0,k)+M+e.slice(k,m)}for(var w=e.split(a).map(function(e,r){return{char:e,isNew:r>=k&&r<O}}),_=m-1;_>=0;_--){var j=w[_].char;if(j!==d){var V=_>=k&&y===C;j===v[V?_-P:_]&&w.splice(_,1)}}var S=a,E=!1;e:for(var N=0;N<b;N++){var A=v[N];if(A===d){if(w.length>0)for(;w.length>0;){var I=w.shift(),L=I.char,R=I.isNew;if(L===d&&g!==!0){S+=d;continue e}if(r[N].test(L)){if(h===!0&&R!==!1&&s!==a&&u!==!1&&x){for(var J=w.length,q=null,F=0;F<J;F++){var W=w[F];if(W.char!==d&&W.isNew===!1)break;if(W.char===d){q=F;break}}null!==q?(S+=L,w.splice(q,1)):N--}else S+=L;continue e}E=!0}g===!1&&(S+=v.substr(N,b));break}S+=A}if(g&&x===!1){for(var z=null,B=0;B<S.length;B++)v[B]===d&&(z=B);S=null!==z?S.substr(0,z+1):a}return{conformedValue:S,meta:{someCharsRejected:E}}}Object.defineProperty(r,"__esModule",{value:!0}),r.default=n;var o=t(3),i=t(1),a=""},function(e,r,t){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u.placeholderChar;if(e.indexOf(r)!==-1)throw new Error("Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.\n\n"+("The placeholder character that was received is: "+JSON.stringify(r)+"\n\n")+("The mask that was received is: "+JSON.stringify(e)));return e.map(function(e){return e instanceof RegExp?r:e}).join("")}function o(e){return"string"==typeof e||e instanceof String}function i(e){return"number"==typeof e&&void 0===e.length&&!isNaN(e)}function a(e){for(var r=[],t=void 0;t=e.indexOf(s),t!==-1;)r.push(t),e.splice(t,1);return{maskWithoutCaretTraps:e,indexes:r}}Object.defineProperty(r,"__esModule",{value:!0}),r.convertMaskToPlaceholder=n,r.isString=o,r.isNumber=i,r.processCaretTraps=a;var u=t(1),l=[],s="[]"},function(e,r){"use strict";function t(e){var r=e.previousConformedValue,t=void 0===r?o:r,i=e.previousPlaceholder,a=void 0===i?o:i,u=e.currentCaretPosition,l=void 0===u?0:u,s=e.conformedValue,f=e.rawValue,d=e.placeholderChar,c=e.placeholder,v=e.indexesOfPipedChars,p=void 0===v?n:v,h=e.caretTrapIndexes,g=void 0===h?n:h;if(0===l)return 0;var m=f.length,y=t.length,b=c.length,C=s.length,P=m-y,x=P>0,k=0===y,O=P>1&&!x&&!k;if(O)return l;var M=x&&(t===s||s===c),T=0,w=void 0,_=void 0;if(M)T=l-P;else{var j=s.toLowerCase(),V=f.toLowerCase(),S=V.substr(0,l).split(o),E=S.filter(function(e){return j.indexOf(e)!==-1});_=E[E.length-1];var N=a.substr(0,E.length).split(o).filter(function(e){return e!==d}).length,A=c.substr(0,E.length).split(o).filter(function(e){return e!==d}).length,I=A!==N,L=void 0!==a[E.length-1]&&void 0!==c[E.length-2]&&a[E.length-1]!==d&&a[E.length-1]!==c[E.length-1]&&a[E.length-1]===c[E.length-2];!x&&(I||L)&&N>0&&c.indexOf(_)>-1&&void 0!==f[l]&&(w=!0,_=f[l]);for(var R=p.map(function(e){return j[e]}),J=R.filter(function(e){return e===_}).length,q=E.filter(function(e){return e===_}).length,F=c.substr(0,c.indexOf(d)).split(o).filter(function(e,r){return e===_&&f[r]!==e}).length,W=F+q+J+(w?1:0),z=0,B=0;B<C;B++){var D=j[B];if(T=B+1,D===_&&z++,z>=W)break}}if(x){for(var G=T,H=T;H<=b;H++)if(c[H]===d&&(G=H),c[H]===d||g.indexOf(H)!==-1||H===b)return G}else if(w){for(var K=T-1;K>=0;K--)if(s[K]===_||g.indexOf(K)!==-1||0===K)return K}else for(var Q=T;Q>=0;Q--)if(c[Q-1]===d||g.indexOf(Q)!==-1||0===Q)return Q}Object.defineProperty(r,"__esModule",{value:!0}),r.default=t;var n=[],o=""},function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){var r={previousConformedValue:void 0,previousPlaceholder:void 0};return{state:r,update:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e,o=n.inputElement,s=n.mask,d=n.guide,m=n.pipe,b=n.placeholderChar,C=void 0===b?p.placeholderChar:b,P=n.keepCharPositions,x=void 0!==P&&P,k=n.showMask,O=void 0!==k&&k;if("undefined"==typeof t&&(t=o.value),t!==r.previousConformedValue){("undefined"==typeof s?"undefined":l(s))===y&&void 0!==s.pipe&&void 0!==s.mask&&(m=s.pipe,s=s.mask);var M=void 0,T=void 0;if(s instanceof Array&&(M=(0,v.convertMaskToPlaceholder)(s,C)),s!==!1){var w=a(t),_=o.selectionEnd,j=r.previousConformedValue,V=r.previousPlaceholder,S=void 0;if(("undefined"==typeof s?"undefined":l(s))===h){if(T=s(w,{currentCaretPosition:_,previousConformedValue:j,placeholderChar:C}),T===!1)return;var E=(0,v.processCaretTraps)(T),N=E.maskWithoutCaretTraps,A=E.indexes;T=N,S=A,M=(0,v.convertMaskToPlaceholder)(T,C)}else T=s;var I={previousConformedValue:j,guide:d,placeholderChar:C,pipe:m,placeholder:M,currentCaretPosition:_,keepCharPositions:x},L=(0,c.default)(w,T,I),R=L.conformedValue,J=("undefined"==typeof m?"undefined":l(m))===h,q={};J&&(q=m(R,u({rawValue:w},I)),q===!1?q={value:j,rejected:!0}:(0,v.isString)(q)&&(q={value:q}));var F=J?q.value:R,W=(0,f.default)({previousConformedValue:j,previousPlaceholder:V,conformedValue:F,placeholder:M,rawValue:w,currentCaretPosition:_,placeholderChar:C,indexesOfPipedChars:q.indexesOfPipedChars,caretTrapIndexes:S}),z=F===M&&0===W,B=O?M:g,D=z?B:F;r.previousConformedValue=D,r.previousPlaceholder=M,o.value!==D&&(o.value=D,i(o,W))}}}}}function i(e,r){document.activeElement===e&&(b?C(function(){return e.setSelectionRange(r,r,m)},0):e.setSelectionRange(r,r,m))}function a(e){if((0,v.isString)(e))return e;if((0,v.isNumber)(e))return String(e);if(void 0===e||null===e)return g;throw new Error("The 'value' provided to Text Mask needs to be a string or a number. The value received was:\n\n "+JSON.stringify(e))}Object.defineProperty(r,"__esModule",{value:!0});var u=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};r.default=o;var s=t(4),f=n(s),d=t(2),c=n(d),v=t(3),p=t(1),h="function",g="",m="none",y="object",b="undefined"!=typeof navigator&&/Android/i.test(navigator.userAgent),C="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:setTimeout}])});

/***/ })
/******/ ]);
});