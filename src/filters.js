import Vue from 'vue'

Vue.filter('toFixed', (value, digits = 1) => {
    return (
        !Number.isNaN(value) && Number.isFinite(value)
        ) ? Number.parseFloat(value).toFixed(digits) : ''
});

Vue.filter('ifEmpty', (value, alternative = '') => {
    return (value) ? value : alternative;
});