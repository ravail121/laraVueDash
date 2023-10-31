<template>
    <div>
      <h1 class="h3 mb-2 text-gray-800">{{ mode === 'add' ? 'Add Company' : 'Edit Company' }}</h1>
      <form @submit.prevent="submitForm">
        <!-- Company Name Input -->
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="company.name" class="form-control" required>
          <div v-if="errors.name" class="text-danger">{{ errors.name[0] }}</div>
        </div>
        <div v-if="isLoading" class="loading-overlay">
          <Spinner></Spinner>
        </div>
        
        <!-- Email Input -->
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="company.email" class="form-control">
          <div v-if="errors.email" class="text-danger">{{ errors.email[0] }}</div>
        </div>
  
        <!-- Logo Input -->
        <div class="form-group">
          <label for="logo">Logo (Minimum 100x100)</label>
          <input type="file" id="logo" @change="handleLogoUpload" class="form-control-file">
          <div v-if="errors.logo" class="text-danger">{{ errors.logo[0] }}</div>
        </div>
  
        <!-- Website Input -->
        <div class="form-group">
          <label for="website">Website</label>
          <input type="text" id="website" v-model="company.website" class="form-control">
          <div v-if="errors.website" class="text-danger">{{ errors.website[0] }}</div>
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
        company: {
          name: '',
          email: '',
          website: '',
        },
        errors: {},
        errorMessage: '',
        logo: null,
        mode: 'add', // Default mode is 'add'
        isLoading: false
      };
    },
    created() {
      // Get the company ID from the route parameters
      const companyId = this.$route.params.id;
  
      // Check if the route parameter contains an ID for editing
      if (companyId) {
        // Use Axios or your API request method to fetch the company data by ID
        // Assign the received data to this.company
        axios.get(`/companies/${companyId}`)
          .then(response => {
            this.company = response.data;
            this.mode = 'edit'; // Set the mode to 'edit'
          })
          .catch(error => {
            // Handle the error
            console.error('Error fetching company data:', error);
          });
      }
    },
    methods: {
      handleLogoUpload(event) {
        this.logo = event.target.files[0];
      },
      showSpinner() {
      this.showGlobalSpinner = true;
      },
      hideSpinner() {
        this.showGlobalSpinner = false;
      },
      submitForm() {
        // Reset errors
        this.isLoading = true;
        this.errors = {};
  
        // Create a FormData object to send form data, including the logo file
        const formData = new FormData();
        formData.append('name', this.company.name);
        formData.append('email', this.company.email);
        formData.append('website', this.company.website);
        formData.append('logo', this.logo);
  
        // Determine the API endpoint and HTTP method based on the mode
        let apiUrl = '/companies';
        let httpMethod = 'POST';
        let params = '';
        if (this.mode === 'edit') {
          apiUrl = `/companies/${this.$route.params.id}`;
          httpMethod = 'PUT';
            params = {
                _method: 'put',
            };
        }
  
        // Send a POST or PUT request to the API to save or update the company data
        axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            params:params
        })
            .then(response => {
            // Reset form and show success message
            this.company = {
              name: '',
              email: '',
              website: '',
            };
            this.logo = null;
            this.errorMessage = '';
            this.isLoading = false;
            // Set the success message
            this.successMessage = this.mode === 'add' ? 'Company added successfully' : 'Company updated successfully';
  
            // Redirect to the companiesList page with a success message
            this.$router.push({ name: 'companiesList', params: { successMessage: this.successMessage } });
          })
          .catch(error => {
            if (error.response.status === 422 && error.response.data.errors) {
              // Handle validation errors
              this.errors = error.response.data.errors;
              this.errorMessage = 'Please correct the errors in the form.';
              this.isLoading = false;
            } else {
              // Handle other errors
              this.errorMessage = error.response.data.message;
              this.isLoading = false;
            }
            this.successMessage = '';
            this.isLoading = false;
          });
      },
    },
  };
  </script>
  