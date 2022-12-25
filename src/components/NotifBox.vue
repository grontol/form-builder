<template>
    <div class="vertical-flex">

        <div class="title-text title horizontal-flex flex-center">
            <div>{{ title }}</div>
            <img v-if="type !== 'none'" :src="`/images/${type}.png`"/>
        </div>

        <div class="darkBlur main-container">
            <div class="content">
                <slot></slot>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "NotifBox",

    props: {
        type: String,
        title: String,
        text: String,
    }
}
</script>

<style scoped lang="scss">

.title {
    font-size: 20px;
    font-weight: 900;
    padding: 12px 30px 12px 18px;
    align-self: start;
    background: rgba(9, 15, 28, 0.9);
    text-transform: uppercase;

    img {
        height: 30px;
        margin-left: 10px;
    }
}

.main-container {
    padding: 18px;
    font-weight: 700;
    font-size: 17px;
}

.content {
    text-align: center;
}

</style>