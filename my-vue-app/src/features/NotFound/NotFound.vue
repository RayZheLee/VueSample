```vue
<template>
    <v-container
        class="fill-height d-flex align-center justify-center"
    >
        <div class="text-center">

            <!-- 飛機 Icon -->
            <v-icon
                icon="mdi-airplane"
                size="100"
                color="primary-base"
                class="airplane-icon mb-4"
            />

            <div class="text-h1 font-weight-bold text-primary-base">
                404
            </div>

            <div class="text-h5 font-weight-bold mb-3">
                咦？飛錯地方了 !
            </div>

            <div class="text-body-1 text-medium-emphasis mb-6">
                您要找的頁面好像不存在，<br>
                要不要搭飛機回首頁看看？
            </div>

            <v-btn
                color="primary-base"
                prepend-icon="mdi-home-outline"
                rounded="lg"
                @click="$router.push('/')"
            >
                飛回首頁
            </v-btn>

        </div>
    </v-container>
</template>

<style scoped>
.airplane-icon {
    animation: fly 2.5s ease-in-out infinite;
}

/* 飛機飛行動畫 */
@keyframes fly {
    0% {
        transform: translateX(-10px) translateY(0) rotate(-3deg);
    }

    50% {
        transform: translateX(10px) translateY(-8px) rotate(3deg);
    }

    100% {
        transform: translateX(-10px) translateY(0) rotate(-3deg);
    }
}
</style>
```