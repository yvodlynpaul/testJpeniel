<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../../stores/auth'; 

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const userRole = computed(() => authStore.userRole);
console.log(userRole.value);


// Handle logout
const logout = () => {
    authStore.logout();
    router.push('/login');
};
</script>

<template>
    <nav
        class="navbar navbar-expand-lg bg-white top">
        <div class="container-fluid">
            <div class="col-auto col-lg-2 me-auto">
                <router-link class="navbar-brand" to="/">
                    <img src="@/assets/images/custom/jpeniel_logo.png"
                        data-at2x="@/assets/images/custom/jpeniel_logo.png" alt="" class="default-logo">
                    <img src="@/assets/images/custom/jpeniel_logo.png"
                        data-at2x="@/assets/images/custom/jpeniel_logo.png" alt="" class="alt-logo">
                    <img src="@/assets/images/custom/jpeniel_logo.png"
                        data-at2x="@/assets/images/custom/jpeniel_logo.png" alt="" class="mobile-logo">
                </router-link>
            </div>
            <div class="col-auto col-lg-8 menu-order position-static">
                <button class="navbar-toggler float-start" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNav" aria-controls="navbarNav" aria-label="Toggle navigation">
                    <span class="navbar-toggler-line"></span>
                    <span class="navbar-toggler-line"></span>
                    <span class="navbar-toggler-line"></span>
                    <span class="navbar-toggler-line"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul class="navbar-nav alt-font text-uppercase">
                        <li class="nav-item "><router-link to="/" class="nav-link text-dark fs-6">Accueil</router-link></li>
                        <li class="nav-item"><router-link to="/events" class="nav-link  text-dark fs-6">Évènements</router-link></li>
                        <!-- <li v-if="isAuthenticated" class="nav-item"><router-link to="/show-q" class="nav-link  text-dark fs-6">Show Questionnaire</router-link></li> -->
                        <li v-if="isAuthenticated" class="nav-item"><router-link to="/profile" class="nav-link  text-dark fs-6">Profile</router-link></li>
                        <li v-if="userRole === 'ADMIN'" class="nav-item"><router-link to="/admin" class="nav-link  text-dark fs-6">Admin Dashboard</router-link></li>
                        <li v-if="isAuthenticated" class="nav-item">
                                <a @click="logout" class="nav-link  text-dark fs-6" style="cursor: pointer;">Logout</a>
                            </li>
                        <!-- <li v-if="!isAuthenticated" class="nav-item"><router-link to="/login" class="nav-link">Se connecter</router-link></li>
                        <li v-if="!isAuthenticated" class="nav-item"><router-link to="/register" class="nav-link">S'enregistrer</router-link></li> -->
                    </ul>
                </div>
            </div>
            <div class="col-auto col-lg-2 text-end">
                <!-- <div class="header-icon">
                    <div class="header-search-icon icon">
                        <a href="#" class="search-form-icon header-search-form"><i
                                class="feather icon-feather-search"></i></a>
                        <div class="search-form-wrapper">
                            <button title="Close" type="button" class="search-close alt-font">×</button>
                            <form id="search-form" role="search" method="get" class="search-form text-left"
                                action="search-result.html">
                                <div class="search-form-box">
                                    <h2 class="text-dark-gray text-center mb-5 ls-minus-2px fw-600">What are you looking
                                        for?</h2>
                                    <input class="search-input" id="search-form-input5e219ef164995"
                                        placeholder="Enter your keywords..." name="s" value="" type="text"
                                        autocomplete="off">
                                    <button type="submit" class="search-button">
                                        <i class="feather icon-feather-search" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="header-push-button icon">
                        <div class="push-button">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </nav>
</template>

<style scoped>
.top{
    top: 0 !important
}
</style>