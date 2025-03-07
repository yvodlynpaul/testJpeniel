<script setup>
import PageTitle from '@/components/layout/PageTitle.vue'

import { ref } from 'vue'
import QuestionnaireAnswers from './QuestionnaireAnswers.vue'



const profileData = ref({
    name: 'John Doe',
    title: 'Software Developer',
    about: 'Passionate software developer with 5 years of experience in web development. Specialized in Vue.js and modern frontend technologies.',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    skills: ['Vue.js', 'JavaScript', 'HTML/CSS', 'Bootstrap', 'Git', 'REST APIs']
})

const editProfile = () => {
    // Implement edit profile logic
    console.log('Edit profile clicked')
}

const shareProfile = () => {
    // Implement share profile logic
    console.log('Share profile clicked')
}
</script>

<template>
    <!-- <PageTitle :title="Pofile" /> -->
     <QuestionnaireAnswers/>
    <section>
        <div class="container py-5">
            <!-- Profile Header -->
            <div class="row">
                <div class="col-lg-4">
                    <div class="card mb-4">
                        <div class="card-body text-center">
                            <img src="https://via.placeholder.com/150" alt="Profile picture"
                                class="rounded-circle img-fluid mb-3" style="width: 150px;">
                            <h5 class="mb-1">{{ profileData.name }}</h5>
                            <p class="text-muted mb-3">{{ profileData.title }}</p>
                            <div class="d-flex justify-content-center mb-2">
                                <button type="button" class="btn btn-primary me-2" @click="editProfile">Edit
                                    Profile</button>
                                <button type="button" class="btn btn-outline-primary" @click="shareProfile">Share
                                    Profile</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-8">
                    <!-- About Section -->
                    <div class="card mb-4">
                        <div class="card-body">
                            <h6 class="card-title">About</h6>
                            <p class="card-text">{{ profileData.about }}</p>
                        </div>
                    </div>

                    <!-- Contact Information -->
                    <div class="card mb-4">
                        <div class="card-body">
                            <h6 class="card-title">Contact Information</h6>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0">Email</p>
                                </div>
                                <div class="col-sm-9">
                                    <p class="text-muted mb-0">{{ profileData.email }}</p>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0">Phone</p>
                                </div>
                                <div class="col-sm-9">
                                    <p class="text-muted mb-0">{{ profileData.phone }}</p>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    <p class="mb-0">Location</p>
                                </div>
                                <div class="col-sm-9">
                                    <p class="text-muted mb-0">{{ profileData.location }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Skills Section -->
                    <div class="card">
                        <div class="card-body">
                            <h6 class="card-title">Skills</h6>
                            <div class="d-flex flex-wrap gap-2">
                                <span v-for="skill in profileData.skills" :key="skill" class="badge bg-primary">
                                    {{ skill }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
