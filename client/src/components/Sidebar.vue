<template>
  <aside class="sidebar-custom">
    <div class="sidebar-content">
      <ul class="nav-menu">
        <router-link to="/master" custom v-slot="{ navigate, isActive }">
          <li class="nav-item" :class="{ active: isActive }" @click="navigate">
            <i class="bi bi-house-door"></i> Home
          </li>
        </router-link>

        <router-link to="/master/manage-user" custom v-slot="{ navigate, isActive }">
          <li class="nav-item" :class="{ active: isActive }" @click="navigate">
            <i class="bi bi-people"></i> Manage User
          </li>
        </router-link>
        
        <router-link to="/master/manage-question" custom v-slot="{ navigate, isActive }">
          <li class="nav-item" :class="{ active: isActive }" @click="navigate">
            <i class="bi bi-book"></i> Manage Question
          </li>
        </router-link>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
.sidebar-custom {
  width: 260px;
  background: white;
  border-right: 1px solid #e8eaff;
  padding: 2rem 1rem;
  min-height: calc(100vh - 70px); 
}

.nav-menu {
  list-style: none;
  padding: 0;
}

.nav-item {
  padding: 12px 15px;
  border-radius: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  color: #5a5a7a;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-item:hover {
  background: rgba(125, 95, 255, 0.05);
  color: #7d5fff;
}

.nav-item.active {
  background: #7d5fff;
  color: white;
  box-shadow: 0 4px 15px rgba(125, 95, 255, 0.3);
}
</style>