<template>
    <section
        class="page-title-button-style cover-background position-relative ipad-top-space-margin top-space-padding md-pt-20px"
        :style="{ backgroundImage: `url(${imageUrl})` }">
        <div class="opacity-light bg-bay-of-many-blue"></div>
        <div class="container">
            <div class="row align-items-center justify-content-center extra-small-screen">
                <div class="col-lg col-md-8 position-relative text-center page-title-extra-large">
                    <h2 class="text-uppercase mb-10px alt-font text-white fw-500 border-radius-4px">{{ subTitle }}</h2>
                    <h1 class="mb-0 text-white alt-font ls-minus-2px text-uppercase fw-600 text-shadow-double-large">
                        {{ title }}</h1>
                </div>
            </div>
        </div>
    </section>
</template>

<!-- <script>
export default {
    props: {
        title: String,
        subTitle: String,
    },
    data() {
        return {
            imageUrl: require('../../assets/images/custom/bg-hero-2.png'),
        };
    },
};
</script> -->

<script setup>
import { ref, defineProps, onMounted } from 'vue';

const props = defineProps({
  title: String,
  subTitle: String,
});

const imageUrl = ref('');

onMounted(() => {
  import('@/assets/images/custom/bg-hero-2.png').then((module) => {
    imageUrl.value = module.default;
  });
});
</script>