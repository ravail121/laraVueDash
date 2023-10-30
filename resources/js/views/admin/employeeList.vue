<template>
    <div>
        <h1 class="h3 mb-2 text-gray-800">Employees</h1>
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
                        Are you sure you want to delete this employee?
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
            <router-link to="/admin/add-employee" class="btn btn-primary">Add Employee</router-link>
        </div>

        <!-- DataTales Example -->
        <div class="card shadow mb-4">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Company</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="employee in employees" :key="employee.id">
                                <td>{{ employee.first_name }}</td>
                                <td>{{ employee.last_name }}</td>
                                <td>{{ employee.company.name }}</td>
                                <td>{{ employee.email }}</td>
                                <td>{{ employee.phone }}</td>
                                <td>
                                    <router-link :to="'/admin/edit-employee/' + employee.id" :data="employee" class="btn btn-primary">
                                        Edit
                                    </router-link>

                                    <button @click="showConfirmDeleteModal(employee.id)" class="btn btn-danger">
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
    name: 'employeesList',
    data() {
        return {
            employees: [],
            successMessage: this.$route.params.successMessage,
            employeeToDelete: null, // Track the employee to delete
        };
    },
    methods: {
        // Method to fetch employee data from the API
        fetchEmployees() {
            axios.get('/employees')
                .then(response => {
                    this.employees = response.data.data;
                })
                .catch(error => {
                    console.error('Error fetching employee data:', error);
                });
        },
        // Show the confirmation modal and store the employee to delete
        showConfirmDeleteModal(employeeId) {
            this.employeeToDelete = employeeId;
            $('#confirmDeleteModal').modal('show');
        },
        // Confirm and delete the employee
        confirmDelete() {
            if (this.employeeToDelete) {
                axios.delete(`/employees/${this.employeeToDelete}`)
                    .then(response => {
                        // Remove the employee from the list
                        this.employees = this.employees.filter(employee => employee.id !== this.employeeToDelete);

                        // Hide the confirmation modal
                        $('#confirmDeleteModal').modal('hide');
                    })
                    .catch(error => {
                        console.error('Error deleting employee:', error);
                    });
            }
        },
    },
    mounted() {
        this.fetchEmployees()
            .then(() => {
                $('#dataTable').DataTable();
            })
            .catch((error) => {
                console.error('Error during component initialization:', error);
            });
    
    },
};
</script>
