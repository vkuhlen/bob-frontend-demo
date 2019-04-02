<template>
    <div id="config-form" class="flex-form">
        <slot></slot>
        <p class="submit"
           v-if="buttons_visible">
            <button @click="save_config()">{{ save_button_text }}</button>
            <button @click="load_config()">Reset</button>
        </p>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ConfigForm',
    model: {
        prop: 'config',
        event: 'change'
    },
    props: {
        buttons_visible: {
            default: true,
            type: Boolean
        },
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

.submit {
    padding-left: 25%;
    flex: 1;
    justify-content: space-between !important;
}

.flex-form {
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: flex-start;
    flex-flow: column wrap;
}

.flex-form p {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: baseline;
}

.flex-form input,
.flex-form select,
.flex-form span {
    flex: 1 1 40%;
    max-width: 50%;
}

.flex-form span {
    display: flex;
    justify-content: space-evenly;
    flex: 1 1 50%;
    align-items: baseline;
}

.flex-form label {
    flex: 0 0 20%;
    min-width: 90px;
}

.flex-form input[type="checkbox"],
.flex-form input[type="radio"] {
    position: relative;
    top: 2px;
}

</style>
