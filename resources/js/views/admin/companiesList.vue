<template>
    <div>
        <h1 class="h3 mb-2 text-gray-800">Companies</h1>
        <div class="modal fade" id="confirmDeleteModal" tabindex="-1" role="dialog" aria-labelledby="confirmDeleteModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="confirmDeleteModalLabel">Confirm Deletion</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this company?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-danger" @click="confirmDelete">Delete</button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
        <div class="text-right mb-3">
            <router-link to="/admin/add-company" class="btn btn-primary">Add Company</router-link>
        </div>

        <!-- DataTales Example -->
        <div class="card shadow mb-4">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Website</th>
                                <th>Logo</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="company in companies" :key="company.id">
                                <td>{{ company.name }}</td>
                                <td>{{ company.email }}</td>
                                <td>{{ company.website }}</td>
                                <td>
                                    <img :src="getLogoUrl(company.logo)" alt="Company Logo" width="50">
                                </td>
                                <td>
                                    <router-link :to="'/admin/edit-company/' + company.id" :data="company" class="btn btn-primary">
                                        Edit
                                    </router-link>

                                    <button @click="showConfirmDeleteModal(company.id)" class="btn btn-danger">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

export default {
    name: 'companiesList',
    data() {
        return {
            companies: [],
            successMessage: this.$route.params.successMessage,
            companyToDelete: null, // Track the company to delete
        };
    },
    methods: {
        // Method to fetch company data from the API
        fetchCompanies() {
            axios.get('/companies')
                .then(response => {
                    this.companies = response.data.data;

                })
                .catch(error => {
                    console.error('Error fetching company data:', error);
                });
        },
        // Method to get the logo URL
        getLogoUrl(logo) {
            if (logo) {
                return `/storage/logos/${logo}`;
            }
            return '/default-logo.png';
        },
        // Show the confirmation modal and store the company to delete
        showConfirmDeleteModal(companyId) {
            this.companyToDelete = companyId;
            $('#confirmDeleteModal').modal('show');
        },
        // Confirm and delete the company
        confirmDelete() {
            if (this.companyToDelete) {
                axios.delete(`/companies/${this.companyToDelete}`)
                    .then(response => {
                        // Remove the company from the list
                        this.companies = this.companies.filter(company => company.id !== this.companyToDelete);

                        // Hide the confirmation modal
                        $('#confirmDeleteModal').modal('hide');
                        
                    })
                    .catch(error => {
                        console.error('Error deleting company:', error);
                    });
            }
        },
    },
    mounted() {
        this.fetchCompanies();
        setTimeout(function() { 
            $('#dataTable').DataTable();
        }, 200);
    },
};
</script>
