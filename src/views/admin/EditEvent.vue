<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import PageTitle from '@/components/layout/PageTitle.vue';

const route = useRoute();
const router = useRouter();
const eventId = route.params.id;
const authStore = useAuthStore();

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

// For image handling
const currentImage = ref('');
const selectedImage = ref(null);
const imagePreviewUrl = ref('');

const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const currencies = ref([]);

// Fetch existing event data
const fetchEventData = async () => {
    try {
        const response = await axios.get(`https://jpenielevent.onrender.com/events/${eventId}`, {
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
        });
        
        // Format the data
        const data = response.data;
        
        // Handle the image path
        if (data.image) {
            // Convert relative path to full URL if needed
            currentImage.value = data.image.startsWith('http') 
                ? data.image 
                : `https://jpenielevent.onrender.com${data.image}`;
        }

        // Handle currency
        formData.currency = data.currency?.id || data.currency;
        
        // Copy other fields
        Object.assign(formData, {
            title: data.title,
            description: data.description,
            start_date: data.start_date?.split('T')[0],
            expiration_date: data.expiration_date?.split('T')[0],
            subscription_fees: data.subscription_fees,
            location: data.location,
            questionnaires: data.questionnaires
        });

    } catch (error) {
        console.error('Error fetching event data:', error);
        errorMessage.value = 'Failed to fetch event data';
    }
};

const fetchCurrencies = async () => {
    try {
        const response = await axios.get('https://jpenielevent.onrender.com/events/currency/', {
            headers: {
                Authorization: `Bearer ${authStore.token}`,
            },
        });
        currencies.value = response.data;
    } catch (error) {
        console.error('Error fetching currencies:', error);
        errorMessage.value = 'Failed to fetch currencies.';
    }
};

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
        errorMessage.value = 'Only JPEG and PNG images are allowed.';
        return;
    }
    if (file.size > 5 * 1024 * 1024) {
        errorMessage.value = 'File size must be under 5 MB.';
        return;
    }

    selectedImage.value = file;
    imagePreviewUrl.value = URL.createObjectURL(file);
    errorMessage.value = '';
    
    // Log for debugging
    console.log('New image selected:', {
        name: file.name,
        type: file.type,
        size: file.size
    });
};
const submitEvent = async () => {
    loading.value = true;
    errorMessage.value = '';
    successMessage.value = '';

    try {
        const eventFormData = new FormData();

        // Add basic fields
        eventFormData.append('title', formData.title);
        eventFormData.append('description', formData.description);
        eventFormData.append('location', formData.location);
        eventFormData.append('subscription_fees', Number(formData.subscription_fees));
        eventFormData.append('currency', Number(formData.currency));

        // Format dates
        if (formData.start_date) {
            eventFormData.append('start_date', formData.start_date);
        }
        if (formData.expiration_date) {
            eventFormData.append('expiration_date', formData.expiration_date);
        }

        // Explicitly handle the image field
        if (selectedImage.value) {
            eventFormData.append('image', selectedImage.value, selectedImage.value.name);

            // Log image details for debugging
            console.log('Image being sent:', {
                name: selectedImage.value.name,
                type: selectedImage.value.type,
                size: selectedImage.value.size
            });
        }

        // Debug log all form data
        for (let [key, value] of eventFormData.entries()) {
            console.log(`${key}: ${value}`);
        }

        const response = await axios.put(
            `https://jpenielevent.onrender.com/events/update/${eventId}`,
            eventFormData,
            {
                headers: {
                    'Authorization': `Bearer ${authStore.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        if (response.status === 200) {
            successMessage.value = 'Event updated successfully!';
            await fetchEventData(); // Refresh the data to show updated image
            router.push('/events');
        }

    } catch (error) {
        console.error('Error updating event:', error);
        if (error.response?.data) {
            console.error('Server error response:', error.response.data);
        }
        errorMessage.value = error.response?.data?.message || 'Failed to update event';
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    if (authStore.token) {
        fetchCurrencies();
        fetchEventData();
    } else {
        errorMessage.value = 'You must be logged in to edit an event.';
    }
});
</script>

<template>
    <PageTitle title="dasdds" sub-title="single events edit" />

    <section
        class="extra-big-section background-position-center-bottom background-size-contain background-no-repeat position-relative pt-30px"
        style="background-image:url('./src/assets/images/demo-travel-agency-home-bg-02.png');">
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
                        <h3 class="d-inline-block fw-600 text-dark-gray mb-8 ls-minus-1px">Modifier l'évènement</h3>
                        <form @submit.prevent="submitEvent">
                            <!-- ... other form fields remain the same ... -->
                            <div class="row">
                                <div class="col-md-6">
                                    <input id="title" v-model="formData.title"
                                        class="mb-20px bg-very-light-gray form-control required" type="text"
                                        placeholder="Titre de l'évènement" />
                                </div>
                                <div class="col-md-6">
                                    <input id="location" v-model="formData.location"
                                        class="mb-20px bg-very-light-gray form-control required" type="text"
                                        placeholder="Lieux de l'évènement" />
                                </div>
                                <div class="col-md-6">
                                    <input id="subscription_fees" v-model="formData.subscription_fees"
                                        class="mb-20px bg-very-light-gray form-control required" type="number"
                                        placeholder="Frais" />
                                </div>
                                <div class="col-md-6">
                                    <select id="currency" v-model="formData.currency"
                                        class="mb-20px bg-very-light-gray form-control">
                                        <option :value="currency.id" v-for="currency in currencies" :key="currency.id">
                                            {{ currency.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <input id="start_date" v-model="formData.start_date"
                                        class="mb-20px bg-very-light-gray form-control required" type="date" />
                                </div>
                                <div class="col-md-6">
                                    <input id="expiration_date" v-model="formData.expiration_date"
                                        class="mb-20px bg-very-light-gray form-control required" type="date" />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <textarea id="description" v-model="formData.description"
                                        class="mb-20px bg-very-light-gray form-control required" cols="40" rows="4"
                                        placeholder="Entrer la description de l'évènement" />
                                </div>


                                <!-- Image preview section -->
                                <div class="col-md-12 mb-4">
                                    <label class="text-dark-gray mb-2 fw-500">Image actuelle</label>
                                    <div v-if="imagePreviewUrl || currentImage" class="mb-3">
                                        <img :src="imagePreviewUrl || currentImage" alt="Event Image"
                                            class="img-fluid rounded" style="max-height: 200px; object-fit: cover;" />
                                    </div>
                                </div>

                                <!-- Upload new image -->
                                <div class="col-md-12 mb-4">
                                    <label for="newImage" class="text-dark-gray mb-2 fw-500">Upload New Image</label>
                                    <input id="newImage" type="file" class="form-control bg-very-light-gray"
                                        accept="image/*" @change="handleImageUpload" />
                                </div>

                                <div class="d-flex justify-content-center align-middle">
                                    <button class="btn btn-round-edge btn-dark-gray btn-box-shadow w-90 mb-20px"
                                        type="submit" :disabled="loading">
                                        {{ loading ? 'Updating...' : 'Modifier l\'événement' }}
                                    </button>
                                </div>
                            </div>

                            <!-- Error and Success Messages -->
                            <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
                            <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>