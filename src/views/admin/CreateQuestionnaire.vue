<script setup>
import QuestionBuilder from '@/components/builders/QuestionBuilder.vue';
import PageTitle from '@/components/layout/PageTitle.vue';
</script>

<template>
    <PageTitle />
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
                    <div class="p-13 md-p-10 bg-white">
                        <div class="row">
                            <QuestionBuilder />

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- </section> -->
        <!-- end section -->
    </section>
    <!-- end section -->
</template>