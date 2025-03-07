<script setup>
import AdminSidebar from '@/components/admin/AdminSidebar.vue';
import AdminDashboardHome from './AdminDashboardHome.vue';
import Footer from '@/components/layout/Footer.vue';

</script>

<template>
    <div class="left-sidebar-wrapper" data-sticky_parent>
        <AdminSidebar />
        <RouterView />
        <Footer />
    </div>
</template>