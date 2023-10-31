"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_admin_addEmployee_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/addEmployee.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/addEmployee.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      employee: {
        first_name: '',
        last_name: '',
        company_id: null,
        email: '',
        phone: ''
      },
      companies: [],
      // List of companies
      errors: {},
      errorMessage: '',
      logo: null,
      mode: 'add' // Default mode is 'add'
    };
  },
  created: function created() {
    var _this = this;
    // Get the employee ID from the route parameters
    var employeeId = this.$route.params.id;

    // Fetch the list of companies
    axios.get('/companies').then(function (response) {
      _this.companies = response.data.data;
    })["catch"](function (error) {
      // Handle the error
      console.error('Error fetching companies:', error);
    });

    // Check if the route parameter contains an ID for editing
    if (employeeId) {
      // Use Axios or your API request method to fetch the employee data by ID
      axios.get("/employees/".concat(employeeId)).then(function (response) {
        _this.employee = response.data;
        _this.mode = 'edit'; // Set the mode to 'edit'
      })["catch"](function (error) {
        // Handle the error
        console.error('Error fetching employee data:', error);
      });
    }
  },
  methods: {
    submitForm: function submitForm() {
      var _this2 = this;
      // Reset errors
      this.errors = {};

      // Create a FormData object to send form data, including the logo file
      var formData = new FormData();
      formData.append('first_name', this.employee.first_name);
      formData.append('last_name', this.employee.last_name);
      formData.append('company_id', this.employee.company_id);
      formData.append('email', this.employee.email);
      formData.append('phone', this.employee.phone);
      formData.append('logo', this.logo);

      // Determine the API endpoint and HTTP method based on the mode
      var apiUrl = '/employees';
      var httpMethod = 'POST';
      var params = '';
      if (this.mode === 'edit') {
        apiUrl = "/employees/".concat(this.$route.params.id);
        httpMethod = 'PUT';
        params = {
          _method: 'put'
        };
      }

      // Send a POST or PUT request to the API to save or update the employee data
      axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        params: params
      }).then(function (response) {
        // Reset form and show success message
        _this2.employee = {
          first_name: '',
          last_name: '',
          company_id: null,
          email: '',
          phone: ''
        };
        _this2.logo = null;
        _this2.errorMessage = '';

        // Set the success message
        _this2.successMessage = _this2.mode === 'add' ? 'Employee added successfully' : 'Employee updated successfully';

        // Redirect to the employeesList page with a success message
        _this2.$router.push({
          name: 'employeeList',
          params: {
            successMessage: _this2.successMessage
          }
        });
      })["catch"](function (error) {
        if (error.response.status === 422 && error.response.data.errors) {
          // Handle validation errors
          _this2.errors = error.response.data.errors;
          _this2.errorMessage = 'Please correct the errors in the form.';
        } else {
          // Handle other errors
          _this2.errorMessage = error.response.data.message;
        }
        _this2.successMessage = '';
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/addEmployee.vue?vue&type=template&id=6f98dd40":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/addEmployee.vue?vue&type=template&id=6f98dd40 ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************/
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
  }, [_vm._v(_vm._s(_vm.mode === "add" ? "Add Employee" : "Edit Employee"))]), _vm._v(" "), _c("form", {
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
      "for": "first_name"
    }
  }, [_vm._v("First Name")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.employee.first_name,
      expression: "employee.first_name"
    }],
    staticClass: "form-control",
    attrs: {
      type: "text",
      id: "first_name",
      required: ""
    },
    domProps: {
      value: _vm.employee.first_name
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.employee, "first_name", $event.target.value);
      }
    }
  }), _vm._v(" "), _vm.errors.first_name ? _c("div", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.errors.first_name[0]))]) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "form-group"
  }, [_c("label", {
    attrs: {
      "for": "last_name"
    }
  }, [_vm._v("Last Name")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.employee.last_name,
      expression: "employee.last_name"
    }],
    staticClass: "form-control",
    attrs: {
      type: "text",
      id: "last_name",
      required: ""
    },
    domProps: {
      value: _vm.employee.last_name
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.employee, "last_name", $event.target.value);
      }
    }
  }), _vm._v(" "), _vm.errors.last_name ? _c("div", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.errors.last_name[0]))]) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "form-group"
  }, [_c("label", {
    attrs: {
      "for": "company_id"
    }
  }, [_vm._v("Company")]), _vm._v(" "), _c("select", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.employee.company_id,
      expression: "employee.company_id"
    }],
    staticClass: "form-control",
    attrs: {
      id: "company_id",
      required: ""
    },
    on: {
      change: function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.$set(_vm.employee, "company_id", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
      }
    }
  }, [_c("option", {
    attrs: {
      value: "",
      disabled: ""
    }
  }, [_vm._v("Select a company")]), _vm._v(" "), _vm._l(_vm.companies, function (company) {
    return _c("option", {
      domProps: {
        value: company.id
      }
    }, [_vm._v(_vm._s(company.name))]);
  })], 2), _vm._v(" "), _vm.errors.company_id ? _c("div", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.errors.company_id[0]))]) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "form-group"
  }, [_c("label", {
    attrs: {
      "for": "email"
    }
  }, [_vm._v("Email")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.employee.email,
      expression: "employee.email"
    }],
    staticClass: "form-control",
    attrs: {
      type: "email",
      id: "email"
    },
    domProps: {
      value: _vm.employee.email
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.employee, "email", $event.target.value);
      }
    }
  }), _vm._v(" "), _vm.errors.email ? _c("div", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.errors.email[0]))]) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "form-group"
  }, [_c("label", {
    attrs: {
      "for": "phone"
    }
  }, [_vm._v("Phone")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.employee.phone,
      expression: "employee.phone"
    }],
    staticClass: "form-control",
    attrs: {
      type: "text",
      id: "phone"
    },
    domProps: {
      value: _vm.employee.phone
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.employee, "phone", $event.target.value);
      }
    }
  }), _vm._v(" "), _vm.errors.phone ? _c("div", {
    staticClass: "text-danger"
  }, [_vm._v(_vm._s(_vm.errors.phone[0]))]) : _vm._e()]), _vm._v(" "), _vm.errorMessage ? _c("div", {
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

/***/ "./resources/js/views/admin/addEmployee.vue":
/*!**************************************************!*\
  !*** ./resources/js/views/admin/addEmployee.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _addEmployee_vue_vue_type_template_id_6f98dd40__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addEmployee.vue?vue&type=template&id=6f98dd40 */ "./resources/js/views/admin/addEmployee.vue?vue&type=template&id=6f98dd40");
/* harmony import */ var _addEmployee_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addEmployee.vue?vue&type=script&lang=js */ "./resources/js/views/admin/addEmployee.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _addEmployee_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _addEmployee_vue_vue_type_template_id_6f98dd40__WEBPACK_IMPORTED_MODULE_0__.render,
  _addEmployee_vue_vue_type_template_id_6f98dd40__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/addEmployee.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/addEmployee.vue?vue&type=script&lang=js":
/*!**************************************************************************!*\
  !*** ./resources/js/views/admin/addEmployee.vue?vue&type=script&lang=js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_addEmployee_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./addEmployee.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/addEmployee.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_addEmployee_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/addEmployee.vue?vue&type=template&id=6f98dd40":
/*!********************************************************************************!*\
  !*** ./resources/js/views/admin/addEmployee.vue?vue&type=template&id=6f98dd40 ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_addEmployee_vue_vue_type_template_id_6f98dd40__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_addEmployee_vue_vue_type_template_id_6f98dd40__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_addEmployee_vue_vue_type_template_id_6f98dd40__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./addEmployee.vue?vue&type=template&id=6f98dd40 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/admin/addEmployee.vue?vue&type=template&id=6f98dd40");


/***/ })

}]);