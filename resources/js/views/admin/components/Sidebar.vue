<template>
    <ul
      class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >

    <router-link
        class="sidebar-brand d-flex align-items-center justify-content-center"
        to="/"
      >
        <div class="sidebar-brand-icon rotate-n-15">
          <i class="fas fa-laugh-wink"></i>
        </div>
        <div class="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
      </router-link>

      <li class="nav-item">
        <router-link class="nav-link" to="/admin/companiesList">
          <i class="fas fa-fw fa-chart-area"></i>
          <span>Companies</span></router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/admin/employeeList">
          <i class="fas fa-fw fa-chart-area"></i>
          <span>Employees</span></router-link
        >
      </li>

      <hr class="sidebar-divider d-none d-md-block" />

      <!-- Sidebar Toggler (Sidebar) -->
      <div class="text-center d-none d-md-inline">
        <button class="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
    </ul>
    <!-- End of Sidebar -->
</template>

<script>

export default {
    name: 'Sidebar'
}
</script>
