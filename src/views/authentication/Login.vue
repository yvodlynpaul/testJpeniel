<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import PageTitle from '@/components/layout/PageTitle.vue';

const authStore = useAuthStore();
const email = ref('');
const password = ref('');

const handleLogin = async () => {
    await authStore.login(email.value, password.value);
    password.value;
    
};

</script>

<template>
    <PageTitle title="Formulaire de connexion" subTitle="Évènements Jpeniel" />
    <!-- start section -->
    <section class="bg-gradient-very-light-gray">
        <div class="container">
            <div
                class="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-center box-shadow-extra-large border-radius-10px overflow-hidden">

                <div class="col contact-form-style-04">
                    <div class="p-13 md-p-10 bg-white">
                        <h3 class="d-inline-block fw-600 text-dark-gray mb-8 ls-minus-1px">Se connecter</h3>
                        <form @submit.prevent="handleLogin">
                            <!-- <label class="text-dark-gray mb-10px fw-500">Username<span class="text-red">*</span></label>
                            <input class="mb-20px bg-very-light-gray form-control required" type="text" name="name"
                                placeholder="Enter your username" /> -->
                            <!-- <label class="text-dark-gray mb-10px fw-500">Email address<span
                                    class="text-red">*</span></label> -->
                            <input class="mb-20px bg-very-light-gray form-control required" type="email" v-model="email" name="email"
                                placeholder="Entre votre email*" />
                            <!-- <label class="text-dark-gray mb-10px fw-500">Mot de passe<span class="text-red">*</span></label> -->
                            <input class="mb-20px bg-very-light-gray form-control required" type="password"
                                v-model="password" name="password" placeholder="Entrer votre mot de passe*" />
                            <!-- <div class="position-relative terms-condition-box text-start d-inline-block mb-20px">
                                <label>
                                    <input type="checkbox" name="terms_condition" id="terms_condition" value="1"
                                        class="terms-condition check-box align-middle required">
                                    <span class="box fs-14">I agree to the terms of service.</span>
                                </label>
                            </div> -->
                            <!-- <input type="hidden" name="redirect" value=""> -->
                            <button
                                class="btn btn-large btn-round-edge btn-dark-gray btn-box-shadow w-100 mb-20px"
                                type="submit">Se connecter</button>
                            <div class="mb-10px">Pas encore membre? <router-link to="/register" class="text-dark-gray text-decoration-line-bottom fw-500">S'enregistrer</router-link></div>
                            <span class="fs-13 lh-22 w-90 lg-w-100 md-w-90 sm-w-100 d-block mb-30px">Vos données
                                personnellesseront utilisées pour soutenir votre expérience sur ce site Web, pour gérer
                                l'accès à votre compte et à d'autres fins décrites dans notre <a href="#"
                                    class="text-dark-gray text-decoration-line-bottom fw-500">politique de
                                    confidentialité.</a></span>
                            <div class="form-results mt-20px d-none"></div>
                        </form>
                    </div>
                </div>
                <div class="col contact-form-style-04">
                    <div class="h-100 md-h-450px sm-h-350px w-100 position-relative overflow-hidden">
                        <img src="../../assets/images/custom/bg-login.jpeg" alt=""
                            class="h-100 w-100 object-cover object-center">
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- end section -->
</template>

<style scoped>
.object-cover {
    object-fit: cover;
}

.object-center {
    object-position: center;
}
</style>