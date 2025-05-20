<template>
    <div class="rounded w-fit mb-4 p-4 text-red-600 font-bold border border-red-600">
        <font-awesome-icon :icon="['fas', 'circle-xmark']" class="me-1" /> <slot />
    </div>
</template>