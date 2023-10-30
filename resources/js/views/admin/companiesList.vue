<template>
    <div>
        <!-- Page Heading -->
                    <h1 class="h3 mb-2 text-gray-800">Companies</h1>
                     <div class="text-right mb-3">
                        <router-link to="/add-company" class="btn btn-primary">Add Company</router-link>
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="company in companies" :key="company.id">
                                            <td>{{ company.name }}</td>
                                            <td>{{ company.email }}</td>
                                            <td>{{ company.website }}</td>
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
        };
    },
    mounted(){
      axios.get('/companies') 
            .then(response => {
                this.companies = response.data;
                console.log(response);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            }),
          
        $('#dataTable').DataTable();
    }
}
</script>