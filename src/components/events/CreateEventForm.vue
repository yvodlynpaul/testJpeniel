<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useAuthStore } from '../../stores/auth';  // Import the auth store for token access
import axios from 'axios';
// import QuestionnaireForm from './QuestionnaireForm.vue';
// import ImageUploader from '../ImageUploader.vue';

// Access the auth store
const authStore = useAuthStore();

const today = new Date().toISOString().split('T')[0];
const startDate = ref(today);
const endDate = ref('');

// Reactive form data
const formData = reactive({
    title: '',
    description: '',
    start_date: '',
    expiration_date: '',
    subscription_fees: 0,
    currency: 1,
    location: '',
    questionnaires: []
});

const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const currencies = ref([]);
const selectedImage = ref(null);

// Show or hide the questionnaire section
const showQuestionnaire = ref(false);

// Ajouter un questionnaire à l'événement
const addQuestionnaireToEvent = (questionnaire) => {
    formData.questionnaires.push(questionnaire);
};

const updateEndDate = () => {
    if (endDate.value < startDate.value){
        endDate.value = startDate.value;
    }
}

// Function to fetch available currencies
const fetchCurrencies = async () => {
    try {
        const response = await axios.get('https://jpenielevent.onrender.com/events/currency/', {
            headers: {
                Authorization: `Bearer ${authStore.token}` // Use the token from the store
            }
        });
        currencies.value = response.data; // Store available currencies
    } catch (error) {
        console.error('Erreur lors de la récupération des devises:', error.response ? error.response.data : error);
        errorMessage.value = 'Erreur lors de la récupération des devises.';
    }
};

// Fetch currencies on component mount
onMounted(() => {
    if (authStore.token) {  // Ensure the token is available
        fetchCurrencies();
    } else {
        errorMessage.value = "Vous devez être connecté pour créer un événement.";
    }
});

// Handle single image upload
const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Récupérer seulement le premier fichier
    if (!file) return;

    selectedImage.value = file; // Assigner le fichier sans vérification
    errorMessage.value = ''; // Réinitialiser le message d'erreur si nécessaire
};


// Function to submit event data
const submitEvent = async () => {
    loading.value = true;
    errorMessage.value = '';
    successMessage.value = '';

    const eventFormData = new FormData();
    eventFormData.append('title', formData.title);
    eventFormData.append('description', formData.description);
    eventFormData.append('start_date', new Date(formData.start_date).toISOString());
    eventFormData.append('expiration_date', new Date(formData.expiration_date).toISOString());
    eventFormData.append('subscription_fees', formData.subscription_fees);
    eventFormData.append('currency', formData.currency);
    eventFormData.append('location', formData.location);

    // Ajouter l'image au formulaire si elle est sélectionnée
    if (selectedImage.value) {
        eventFormData.append('image', selectedImage.value); // Nom du champ attendu par l'API
    }

    try {
        const response = await axios.post(
            'https://jpenielevent.onrender.com/events/create/',
            eventFormData,
            {
                headers: {
                    'Authorization': `Bearer ${authStore.token}`,
                    // 'Content-Type': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        successMessage.value = 'Événement créé avec succès !';
        console.log('Response:', response.data);
    } catch (error) {
        errorMessage.value = error.response?.data || 'Erreur lors de la création de l\'événement.';
        console.error('Error creating event:', error.response?.data || error);
    } finally {
        loading.value = false;
    }
};


</script>

<template>
    <!-- start section -->
    <section
        class="extra-big-section background-position-center-bottom background-size-contain background-no-repeat position-relative pt-30px"
        style="background-image:url('./src/assets/images/demo-travel-agency-home-bg-02.png');">
        <!-- start section -->
        <!-- <section class="bg-gradient-very-light-gray"> -->
        <div class="container pt-15px">
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
                        <h3 class="d-inline-block fw-600 text-dark-gray mb-8 ls-minus-1px">Créer un évènement</h3>
                        <!-- <div class="row">
                            <div class="col-md-6 ">
                                <select class="mb-20px bg-very-light-gray form-control">
                                    <option value="" disabled selected hidden>Choisi un évènement &nbsp; v</option>
                                    <option value="event 1">Évènement 1</option>
                                    <option value="event 2">Évènement 2</option>
                                </select>
                            </div>
                        </div> -->
                        <form @submit.prevent="submitEvent">
                            <div class="row">
                                <div class="col-md-6">
                                    <!-- <label class="text-dark-gray mb-10px fw-500">Vontre prénom<span
                                            class="text-red">*</span></label> -->
                                    <input id="title" v-model="formData.title"
                                        class="mb-20px bg-very-light-gray form-control required" type="text"
                                        name="title" placeholder="Titre de l'évènement" />
                                </div>
                                <div class="col-md-6">
                                    <!-- <label class="text-dark-gray mb-10px fw-500">Votre nom<span
                                            class="text-red">*</span></label> -->
                                    <input id="location" v-model="formData.location"
                                        class="mb-20px bg-very-light-gray form-control required" type="text" name="last"
                                        placeholder="Lieux de l'évènement" />
                                </div>
                                <div class="col-md-6">
                                    <!-- <label class="text-dark-gray mb-10px fw-500">Adresse email<span
                                            class="text-red">*</span></label> -->
                                    <input id="subscription_fees" v-model="formData.subscription_fees"
                                        class="mb-20px bg-very-light-gray form-control required" type="number"
                                        name="fees" placeholder="Frais" />
                                </div>
                                <div class="col-md-6">
                                    <select id="currency" v-model="formData.currency"
                                        class="mb-20px bg-very-light-gray form-control">
                                        <option value="" disabled selected>Selectionner devis</option>
                                        <!-- <option value="CAD">CAD</option>
                                        <option value="USD">USD</option> -->
                                        <option :value="currency.id" v-for="currency in currencies" :key="currency.id" place_>
                                            {{ currency.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <!-- <label class="text-dark-gray mb-10px fw-500">Vontre prénom<span
                                            class="text-red">*</span></label> -->
                                    <input id="start_date" v-model="formData.start_date"
                                        class="mb-20px bg-very-light-gray form-control required" type="date"
                                        name="start_date" :min="today"/>
                                </div>
                                <div class="col-md-6">
                                    <!-- <label class="text-dark-gray mb-10px fw-500">Votre nom<span
                                            class="text-red">*</span></label> -->
                                    <input id="expiration_date" v-model="formData.expiration_date"
                                        class="mb-20px bg-very-light-gray form-control required" type="date"
                                        name="expiration_date" :min="formData.start_date"/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <textarea id="description" v-model="formData.description"
                                        class="mb-20px bg-very-light-gray form-control required" cols="40" rows="4"
                                        name="description" placeholder="Entrer la description de l'évènement" maxlength="1000"/>
                                </div>

                                <!-- IMAGE -->
                                <div class="col-md-12">
                                    <label for="eventImages" class="text-dark-gray mb-10px fw-500">Images de
                                        l'événement</label>
                                    <input id="eventImages" type="file" class="mb-20px bg-very-light-gray form-control"
                                        accept="image/*" @change="handleImageUpload" />
                                </div>
                                <!-- <div class="position-relative terms-condition-box text-start d-inline-block mb-20px">
                                <label>
                                    <input type="checkbox" name="terms_condition" id="terms_condition" value="1"
                                        class="terms-condition check-box align-middle required">
                                    <span class="box fs-14">I agree to the terms of service.</span>
                                </label>
                                </div> -->
                                <!-- Inclusion du composant Questionnaire -->
                                <!-- <QuestionnaireForm @addQuestionnaire="addQuestionnaireToEvent" /> -->
                                <input type="hidden" name="redirect" value="">
                                <div class="d-flex justify-content-center align-middle">
                                    <button class="btn  btn-round-edge btn-dark-gray btn-box-shadow w-90 mb-20px "
                                        type="submit" :disabled="loading">Créer l'événement</button>
                                </div>
                            </div>
                            <!-- Error and Success Messages -->
                            <div v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</div>
                            <div v-if="successMessage" class="text-green-500 mt-2">{{ successMessage }}</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- </section> -->
        <!-- end section -->
    </section>
    <!-- end section -->
</template>