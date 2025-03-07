<script setup>
</script>

<template>
    <div
        class="header-top-bar top-bar-light bg-black md-border-bottom border-color-transparent-dark-very-light">
        <div class="container-fluid">
            <div class="logo h-45px d-flex flex-row justify-content-center m-0">
                <a href="#"><img src="../../assets/images/custom/logo/quebecyouth.png" alt="quebec youth logo"></a>
                <a href="#"><img src="../../assets/images/custom/logo/flayme.png" alt="flayme logo"></a>
                <a href="#"><img src="../../assets/images/custom/logo/harvesters.png" alt="harvesters logo"></a>
                <a href="#"><img src="../../assets/images/custom/logo/visionnaires.png" alt="visionnaires logo"></a>
                <a href="#"><img src="../../assets/images/custom/logo/warriors.png" alt="warriors logo"></a>
            </div>
        </div>
    </div>
</template>

<style scoped>

.logo a:hover{
    background-color: var(--base-color);
}

.header-top-bar {
    /* padding: 10px 0; */
    font-family: Arial, sans-serif;
}

.top-bar-light {
    color: #ffffff;
}

.bg-black {
    background-color: #000000;
}

.md-border-bottom {
    border-bottom: 1px solid;
}

.border-color-transparent-dark-very-light {
    border-color: rgba(255, 255, 255, 0.1);
}

.container-fluid {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}

.row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
}

.h-45px {
    height: 45px;
}

.justify-content-end {
    justify-content: flex-end;
}

.m-0 {
    margin: 0;
}

.col-xl-6, .col-lg-4 {
    position: relative;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
}

.text-end {
    text-align: right;
}

.d-none {
    display: none;
}

.d-lg-flex {
    display: flex;
}

.widget {
    display: inline-block;
    margin-right: 15px;
}

.fs-15 {
    font-size: 15px;
}

.text-light {
    color: #ffffff;
}

.text-dark-gray-hover:hover {
    color: #a9a9a9;
}

.ms-30px {
    margin-left: 30px;
}

.d-xl-inline-block {
    display: inline-block;
}

.feather {
    margin-right: 5px;
}
</style>
