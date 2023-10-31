<template>
    <div>
      <h1 class="h3 mb-2 text-gray-800">{{ mode === 'add' ? 'Add Employee' : 'Edit Employee' }}</h1>
      <form @submit.prevent="submitForm">
        <!-- First Name Input -->
        <div class="form-group">
        <label for="first_name">First Name</label>
        <input type="text" id="first_name" v-model="employee.first_name" class="form-control" required>
        <div v-if="errors.first_name" class="text-danger">{{ errors.first_name[0] }}</div>
        </div>

        <!-- Last Name Input -->
        <div class="form-group">
        <label for="last_name">Last Name</label>
        <input type="text" id="last_name" v-model="employee.last_name" class="form-control" required>
        <div v-if="errors.last_name" class="text-danger">{{ errors.last_name[0] }}</div>
        </div>

        <!-- Company Select Input -->
        <div class="form-group">
        <label for="company_id">Company</label>
        <select id="company_id" v-model="employee.company_id" class="form-control" required>
            <option value="" disabled>Select a company</option>
            <option v-for="company in companies" :value="company.id">{{ company.name }}</option>
        </select>
        <div v-if="errors.company_id" class="text-danger">{{ errors.company_id[0] }}</div>
        </div>

        <!-- Email Input -->
        <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="employee.email" class="form-control">
        <div v-if="errors.email" class="text-danger">{{ errors.email[0] }}</div>
        </div>

        <!-- Phone Input -->
        <div class="form-group">
        <label for="phone">Phone</label>
        <input type="text" id="phone" v-model="employee.phone" class="form-control">
        <div v-if="errors.phone" class="text-danger">{{ errors.phone[0] }}</div>
        </div>
  
        <!-- Error Message -->
        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
  
        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary">{{ mode === 'add' ? 'Save' : 'Update' }}</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
        return {
            employee: {
            first_name: '',
            last_name: '',
            company_id: null,
            email: '',
            phone: '',
            },
            companies: [], // List of companies
            errors: {},
            errorMessage: '',
            logo: null,
            mode: 'add', // Default mode is 'add'
        };
    },

    created() {
        // Get the employee ID from the route parameters
        const employeeId = this.$route.params.id;

        // Fetch the list of companies
        axios.get('/companies')
            .then(response => {
            this.companies = response.data.data;
            })
            .catch(error => {
            // Handle the error
            console.error('Error fetching companies:', error);
            });

        // Check if the route parameter contains an ID for editing
        if (employeeId) {
            // Use Axios or your API request method to fetch the employee data by ID
            axios.get(`/employees/${employeeId}`)
            .then(response => {
                this.employee = response.data;
                this.mode = 'edit'; // Set the mode to 'edit'
            })
            .catch(error => {
                // Handle the error
                console.error('Error fetching employee data:', error);
            });
        }
    },


    methods: {
        submitForm() {
            // Reset errors
            this.errors = {};

            // Create a FormData object to send form data, including the logo file
            const formData = new FormData();
            formData.append('first_name', this.employee.first_name);
            formData.append('last_name', this.employee.last_name);
            formData.append('company_id', this.employee.company_id);
            formData.append('email', this.employee.email);
            formData.append('phone', this.employee.phone);
            formData.append('logo', this.logo);

            // Determine the API endpoint and HTTP method based on the mode
            let apiUrl = '/employees';
            let httpMethod = 'POST';
            let params = '';
            if (this.mode === 'edit') {
                apiUrl = `/employees/${this.$route.params.id}`;
                httpMethod = 'PUT';
                params = {
                _method: 'put',
                };
            }

            // Send a POST or PUT request to the API to save or update the employee data
            axios.post(apiUrl, formData, {
                headers: {
                "Content-Type": "multipart/form-data",
                },
                params: params,
            })
                .then(response => {
                // Reset form and show success message
                this.employee = {
                    first_name: '',
                    last_name: '',
                    company_id: null,
                    email: '',
                    phone: '',
                };
                this.logo = null;
                this.errorMessage = '';

                // Set the success message
                this.successMessage = this.mode === 'add' ? 'Employee added successfully' : 'Employee updated successfully';

                // Redirect to the employeesList page with a success message
                this.$router.push({ name: 'employeeList', params: { successMessage: this.successMessage } });
                })
                .catch(error => {
                if (error.response.status === 422 && error.response.data.errors) {
                    // Handle validation errors
                    this.errors = error.response.data.errors;
                    this.errorMessage = 'Please correct the errors in the form.';
                } else {
                    // Handle other errors
                    this.errorMessage = error.response.data.message;
                }
                this.successMessage = '';
                });
        },


    },
  };
  </script>
  