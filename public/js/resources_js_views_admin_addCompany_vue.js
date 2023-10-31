"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_admin_addCompany_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/addCompany.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/addCompany.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      company: {
        name: '',
        email: '',
        website: ''
      },
      errors: {},
      errorMessage: '',
      logo: null,
      mode: 'add',
      // Default mode is 'add'
      isLoading: false
    };
  },
  created: function created() {
    var _this = this;
    // Get the company ID from the route parameters
    var companyId = this.$route.params.id;

    // Check if the route parameter contains an ID for editing
    if (companyId) {
      // Use Axios or your API request method to fetch the company data by ID
      // Assign the received data to this.company
      axios.get("/companies/".concat(companyId)).then(function (response) {
        _this.company = response.data;
        _this.mode = 'edit'; // Set the mode to 'edit'
      })["catch"](function (error) {
        // Handle the error
        console.error('Error fetching company data:', error);
      });
    }
  },
  methods: {
    handleLogoUpload: function handleLogoUpload(event) {
      this.logo = event.target.files[0];
    },
    showSpinner: function showSpinner() {
      this.showGlobalSpinner = true;
    },
    hideSpinner: function hideSpinner() {
      this.showGlobalSpinner = false;
    },
    submitForm: function submitForm() {
      var _this2 = this;
      // Reset errors
      this.isLoading = true;
      this.errors = {};

      // Create a FormData object to send form data, including the logo file
      var formData = new FormData();
      formData.append('name', this.company.name);
      formData.append('email', this.company.email);
      formData.append('website', this.company.website);
      formData.append('logo', this.logo);

      // Determine the API endpoint and HTTP method based on the mode
      var apiUrl = '/companies';
      var httpMethod = 'POST';
      var params = '';
      if (this.mode === 'edit') {
        apiUrl = "/companies/".concat(this.$route.params.id);
        httpMethod = 'PUT';
        params = {
          _method: 'put'
        };
      }

      // Send a POST or PUT request to the API to save or update the company data
      axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        params: params
      }).then(function (response) {
        // Reset form and show success message
        _this2.company = {
          name: '',
          email: '',
          website: ''
        };
        _this2.logo = null;
        _this2.errorMessage = '';
        _this2.isLoading = false;
        // Set the success message
        _this2.successMessage = _this2.mode === 'add' ? 'Company added successfully' : 'Company updated successfully';

        // Redirect to the companiesList page with a success message
        _this2.$router.push({
          name: 'companiesList',
          params: {
            successMessage: _this2.successMessage
          }
        });
      })["catch"](function (error) {
        if (error.response.status === 422 && error.response.data.errors) {
          // Handle validation errors
          _this2.errors = error.response.data.errors;
          _this2.errorMessage = 'Please correct the errors in the form.';
          _this2.isLoading = false;
        } else {
          // Handle other errors
          _this2.errorMessage = error.response.data.message;
          _this2.isLoading = false;
        }
        _this2.successMessage = '';
        _this2.isLoading = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/addCompany.vue?vue&type=template&id=32e0d65b":
/*!****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/addCompany.vue?vue&type=template&id=32e0d65b ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_c("h1", {
    staticClass: "h3 mb-2 text-gray-800"
  }, [_vm._v(_vm._s(_vm.mode === "add" ? "Add Company" : "Edit Company"))]), _vm._v(" "), _c("form", {
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.submitForm.apply(null, arguments);
      }
    }
  }, [_c("div", {
    staticClass: "form-group"
  }, [_c("label", {
    attrs: {
      "for": "name"
    }
  }, [_vm._v("Name")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.company.name,
      expression: "company.name"
    }],
    staticClass: "form-control",
    attrs: {
      type: "text",
      id: "name",
      required: ""
    },
    domProps: {
      value: _vm.company.name
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.company, "name", $event.target.value);
      }
    }
  }), _vm._v(" "), _vm.errors.name ? _c("div", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.errors.name[0]))]) : _vm._e()]), _vm._v(" "), _vm.isLoading ? _c("div", {
    staticClass: "loading-overlay"
  }, [_c("Spinner")], 1) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "form-group"
  }, [_c("label", {
    attrs: {
      "for": "email"
    }
  }, [_vm._v("Email")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.company.email,
      expression: "company.email"
    }],
    staticClass: "form-control",
    attrs: {
      type: "email",
      id: "email"
    },
    domProps: {
      value: _vm.company.email
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.company, "email", $event.target.value);
      }
    }
  }), _vm._v(" "), _vm.errors.email ? _c("div", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.errors.email[0]))]) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "form-group"
  }, [_c("label", {
    attrs: {
      "for": "logo"
    }
  }, [_vm._v("Logo (Minimum 100x100)")]), _vm._v(" "), _c("input", {
    staticClass: "form-control-file",
    attrs: {
      type: "file",
      id: "logo"
    },
    on: {
      change: _vm.handleLogoUpload
    }
  }), _vm._v(" "), _vm.errors.logo ? _c("div", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.errors.logo[0]))]) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "form-group"
  }, [_c("label", {
    attrs: {
      "for": "website"
    }
  }, [_vm._v("Website")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.company.website,
      expression: "company.website"
    }],
    staticClass: "form-control",
    attrs: {
      type: "text",
      id: "website"
    },
    domProps: {
      value: _vm.company.website
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.company, "website", $event.target.value);
      }
    }
  }), _vm._v(" "), _vm.errors.website ? _c("div", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.errors.website[0]))]) : _vm._e()]), _vm._v(" "), _vm.errorMessage ? _c("div", {
    staticClass: "alert alert-danger"
  }, [_vm._v(_vm._s(_vm.errorMessage))]) : _vm._e(), _vm._v(" "), _c("button", {
    staticClass: "btn btn-primary",
    attrs: {
      type: "submit"
    }
  }, [_vm._v(_vm._s(_vm.mode === "add" ? "Save" : "Update"))])])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/views/admin/addCompany.vue":
/*!*************************************************!*\
  !*** ./resources/js/views/admin/addCompany.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _addCompany_vue_vue_type_template_id_32e0d65b__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addCompany.vue?vue&type=template&id=32e0d65b */ "./resources/js/views/admin/addCompany.vue?vue&type=template&id=32e0d65b");
/* harmony import */ var _addCompany_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addCompany.vue?vue&type=script&lang=js */ "./resources/js/views/admin/addCompany.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _addCompany_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _addCompany_vue_vue_type_template_id_32e0d65b__WEBPACK_IMPORTED_MODULE_0__.render,
  _addCompany_vue_vue_type_template_id_32e0d65b__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/addCompany.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/addCompany.vue?vue&type=script&lang=js":
/*!*************************************************************************!*\
  !*** ./resources/js/views/admin/addCompany.vue?vue&type=script&lang=js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_addCompany_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./addCompany.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/addCompany.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_addCompany_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/addCompany.vue?vue&type=template&id=32e0d65b":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/admin/addCompany.vue?vue&type=template&id=32e0d65b ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_addCompany_vue_vue_type_template_id_32e0d65b__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_addCompany_vue_vue_type_template_id_32e0d65b__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_addCompany_vue_vue_type_template_id_32e0d65b__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./addCompany.vue?vue&type=template&id=32e0d65b */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/addCompany.vue?vue&type=template&id=32e0d65b");


/***/ })

}]);