<template>
    <div id="config-form">
        <slot></slot>
        <div class="submit">
            <button @click="save_config()">{{ save_button_text }}</button>
            <button @click="load_config()">Reset</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'config',
    model: {
        prop: 'config',
        event: 'change'
    },
    props: {
        config: Object,
        config_url: String
    },
    data() {
        return {
            save_button_text: ''
        }
    },
    methods: {

        load_config() {
            axios.get([
                process.env.VUE_APP_FIPY_URL,
                this.config_url
            ].join('')).then(response => {
                this.$emit('change', response.data);
                this.save_button_text = 'Save configuration';
            }).catch(e => {
                console.error(e);
            })
        },

        save_config() {
            this.save_button_text = 'saving...';
            axios.post([
                process.env.VUE_APP_FIPY_URL,
                this.config_url
            ].join(''), this.config).then(response => {
                if (response.status == 200) {
                    this.save_button_text = 'saved';
                }
            }).catch(e => {
                console.error(e);
            })
        },
    },

    created() {
        this.load_config();
    },

    watch: {
        config: {
            handler() {
                this.save_button_text = 'Save configuration';
            },
            deep: true
        }
    }
}
</script>

<style>

.submit button {
    margin: 1em 1em;
}

</style>
