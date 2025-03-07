import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import HomeView from '@/views/HomeView.vue';



import EventsView from '@/views/EventsView.vue';
import SingleEventView from '@/views/SingleEventView.vue';
import Register from '@/views/authentication/Register.vue';
import Login from '@/views/authentication/Login.vue';
import Profile from '@/views/Profile.vue';

// import GalleryView from '../views/GalleryView.vue'
// import ContactView from '../views/ContactView.vue'
// import Login from '../views/Authentication/Login.vue'

/**ADMIN DASHBOARD */
import AdminDashboard from '@/views/admin/AdminDashboard.vue';
import AdminDashboardHome from '@/views/admin/AdminDashboardHome.vue';
import CreateQuestionnaire from '@/views/admin/CreateQuestionnaire.vue';
import CreateEventView from '@/views/admin/CreateEventView.vue';
import EditEvent from '@/views/admin/EditEvent.vue';
import ShowQuestionnaire from '@/views/ShowQuestionnaire.vue';
// import AdminDashboardHome from '../views/Admin/AdminDashboardHome.vue'
// import AdminDashboardAbout from '../views/Admin/AdminDashboardAbout.vue'
// import ActionPanelView from '../views/Admin/ActionPanelView.vue'


const routes = [
    { path: '/', name: 'home', component: HomeView },
    { path: '/events', name: 'events', component: EventsView },
    { path: '/events/:id', name: 'event', component: SingleEventView },
    { path: '/events/edit/:id', name: 'edit-event', component: EditEvent },
    // { path: '/gallery', name: 'gallery', component: GalleryView },
    // { path: '/contact', name: 'contact', component: ContactView },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/show-q/:eventId', name: 'ShowQ', component: ShowQuestionnaire },
    {
        path: '/success',
        name: 'Success',
        component: () => import('../views/Success.vue'), // Créez un composant Success.vue
    },
    {
        path: '/cancel',
        name: 'Cancel',
        component: () => import('../views/Cancel.vue'), // Créez un composant Cancel.vue
    },

    
    // Admin dashboard
    {
        path: '/admin',
        component: AdminDashboard,
        meta: { hideHeaderFooter: true },
        children: [
            { path: '', name: 'adminDashboardHome', component: AdminDashboardHome },
            { path: 'home', component: AdminDashboardHome },
//             { path: 'about', name: 'adminDashboardAbout', component: AdminDashboardAbout},
            { path: 'create-event', name: 'CreateEventView', component: CreateEventView},
            { path: 'create-questionnaire', name: 'CreateQuestionnaire', component: CreateQuestionnaire},
            { path: 'edit-event', name: 'EditEvent', component: EditEvent},
//             { path: 'action-panel', name: 'ActionPanelView', component: ActionPanelView},
        ]
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition){
        if (savedPosition){
            return savedPosition
        }else{
            return { top: 0 }
        }
    }
})

router.beforeEach(async (to) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return { name: 'Login' };
    }
    if (to.meta.role && to.meta.role !== authStore.userRole) {
        return { name: 'home' };  // Redirect if role does not match
    }
});

export default router
