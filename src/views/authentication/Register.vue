<script setup>
import PageTitle from '@/components/layout/PageTitle.vue';
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();
const email = ref('');
const firstName = ref('');
const lastName = ref('');
const password = ref('');
const churchName = ref('');
const role = ref('ATTENDEE');

const handleRegister = async () => {
    // Fetch churches using authStore's fetchChurches method
    const churches = await authStore.fetchChurches();
    const church = churches.find(c => c.name === churchName.value);  // Find church by name
    const churchId = church ? church.id : null;  // Use the church ID or null if not found

    await authStore.register({
        email: email.value,
        first_name: firstName.value,
        last_name: lastName.value,
        role: role.value,
        church: churchId || "",
        password: password.value,
    });
};
</script>

<template>
    <PageTitle title="Formulaire d'enregistrement" subTitle="Évènements Jpeniel" />
    <!-- start section -->
    <section class="bg-gradient-very-light-gray">
        <div class="container">
            <div
                class="row row-cols-1 row-cols-lg-2 row-cols-md-1 g-0 justify-content-center box-shadow-extra-large border-radius-10px overflow-hidden">
                <div class="col contact-form-style-04">
                    <div class="h-100 md-h-450px sm-h-350px w-100 position-relative overflow-hidden">
                        <img src="../../assets/images/custom/bg-register.png" alt=""
                            class="h-100 w-100 object-cover object-center">
                    </div>
                </div>
                <div class="col contact-form-style-04">
                    <div class="p-13 md-p-10 bg-white">
                        <h3 class="d-inline-block fw-600 text-dark-gray mb-8 ls-minus-1px">S'enregistrer?</h3>
                        <form @submit.prevent="handleRegister">
                            <div class="row">
                                <div class="col-md-6">
                                    <!-- <label class="text-dark-gray mb-10px fw-500">Vontre prénom<span
                                            class="text-red">*</span></label> -->
                                    <input v-model="firstName" class="mb-20px bg-very-light-gray form-control required"
                                        type="text" name="first" placeholder="Entrer votre prénom" />
                                </div>
                                <div class="col-md-6">
                                    <!-- <label class="text-dark-gray mb-10px fw-500">Votre nom<span
                                            class="text-red">*</span></label> -->
                                    <input v-model="lastName" class="mb-20px bg-very-light-gray form-control required"
                                        type="text" name="last" placeholder="Entrer votre nom" />
                                </div>
                                <div class="col-md-6">
                                    <!-- <label class="text-dark-gray mb-10px fw-500">Adresse email<span
                                            class="text-red">*</span></label> -->
                                    <input v-model="email" class="mb-20px bg-very-light-gray form-control required"
                                        type="email" name="email" placeholder="Entre votre email*" />
                                </div>
                                <div class="col-md-6">
                                    <!-- <label class="text-dark-gray mb-10px fw-500">Mot de passe<span
                                            class="text-red">*</span></label> -->
                                    <input v-model="password" class="mb-20px bg-very-light-gray form-control required"
                                        type="password" name="password" placeholder="Entrer un mot de passe*" />
                                </div>
                                <div class="col-md-12">
                                    <input v-model="churchName" class="mb-20px bg-very-light-gray form-control required"
                                        type="text" name="church" placeholder="Vous êtes de quelle église?*" />
                                </div>
                                <div class="col-md-12">
                                    <select v-model="role">
                                        <option value="ADMIN">Admin</option>
                                        <option value="ATTENDEE">Attendee</option>
                                    </select>
                                </div>
                                <!-- <div class="position-relative terms-condition-box text-start d-inline-block mb-20px">
                                <label>
                                    <input type="checkbox" name="terms_condition" id="terms_condition" value="1"
                                        class="terms-condition check-box align-middle required">
                                    <span class="box fs-14">I agree to the terms of service.</span>
                                </label>
                            </div> -->
                                <input type="hidden" name="redirect" value="">
                                <button class="btn btn-large btn-round-edge btn-dark-gray btn-box-shadow w-100 mb-20px"
                                    type="submit">S'enregistrer</button>
                                <div class="mb-10px">Déjà membre? <router-link to="/login"
                                        class="text-dark-gray text-decoration-line-bottom fw-500">Se connecter</router-link></div>
                                <span class="fs-13 lh-22 w-90 lg-w-100 md-w-90 sm-w-100 d-block mb-30px">Vos données
                                    personnellesseront utilisées pour soutenir votre expérience sur ce site Web, pour
                                    gérer l'accès à votre compte et à d'autres fins décrites dans notre <a href="#"
                                        class="text-dark-gray text-decoration-line-bottom fw-500">politique de
                                        confidentialité.</a></span>
                                <div class="form-results mt-20px d-none"></div>
                            </div>
                        </form>
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