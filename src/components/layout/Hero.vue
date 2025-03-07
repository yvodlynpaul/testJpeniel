<script setup>
import ShapeDivider1Vue from "../partials/ShapeDivider1.vue";

import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../../stores/auth'; 

// const router = useRouter();
// const route = useRoute();
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
    <!-- start section -->
    <section class="p-0 full-screen md-h-700px bg-dark-gray sm-h-600px ipad-top-space-margin cover-background"
        data-parallax-background-ratio="0.8" style="background-image: url('./src/assets/images/custom/bg-hero-2.png')">
        <div class="opacity-light bg-dark-gray"></div>
        <div class="container h-100">
            <div class="row align-items-center h-100 justify-content-center">
                <div class="col-12 position-relative text-center">
                    <h2 class="fs-140 lg-fs-110 md-fs-90 xs-fs-55 fw-900 mb-0 text-white ls-minus-3px appear text-uppercase"
                        data-fancy-text="{ &quot;opacity&quot;: [0, 1], &quot;translateY&quot;: [50, 0], &quot;filter&quot;: [&quot;blur(20px)&quot;, &quot;blur(0px)&quot;], &quot;string&quot;: [&quot;Animated headings&quot;], &quot;duration&quot;: 400, &quot;delay&quot;: 0, &quot;speed&quot;: 50, &quot;easing&quot;: &quot;easeOutQuad&quot; }">
                        Nos évènements</h2>
                        <div class="pt-60px">

                            <router-link v-if="!isAuthenticated" to="/login"
                                class="btn btn-large btn-round-edge btn-base-color btn-hover-animation btn-box-shadow me-25px">
                                <span>
                                    <span class="btn-text">Se connecter</span><span class="btn-icon"><i
                                            class="feather icon-feather-log-in"></i></span>
                                </span>
                            </router-link>
                            <router-link v-if="!isAuthenticated" to="/register"
                                class="btn btn-large btn-round-edge btn-base-color btn-hover-animation btn-box-shadow me-25px">
                                <span>
                                    <span class="btn-text">S'enregistrer</span><span class="btn-icon"><i
                                            class="feather icon-feather-user"></i></span>
                                </span>
                            </router-link>
                            <router-link v-if="isAuthenticated" @click="logout"
                                class="btn btn-large btn-round-edge btn-base-color btn-hover-animation btn-box-shadow me-25px">
                                <span>
                                    <span class="btn-text">Se déconnecter</span><span class="btn-icon"><i
                                            class="feather icon-feather-log-out"></i></span>
                                </span>
                            </router-link>
                        </div>
                </div>

            </div>

        </div>

    </section>
    <!-- end section -->
    <!-- <section class="position-relative pb-0 xs-pt-30px">
        <div class="w-100 h-70px position-absolute top-minus-70px md-top-minus-50px left-0px"
            style="background-image:url('./src/assets/images/demo-travel-agency-slider-07.png');"></div>
    </section> -->
    <ShapeDivider1Vue />
</template>