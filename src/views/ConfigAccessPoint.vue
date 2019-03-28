<template>
    <div>
        <h1>Access point configuration</h1>

        <div class="form">
            <p>
                <label for="enabled">Enabled:</label>
                <input type="checkbox"
                    name="enabled"
                    v-model="ap_config.enabled">
            </p>
            <p>
                <label for="ssid">SSID:</label>
                <input type="text"
                       name="ssid"
                       v-model="ap_config.ssid">
            </p>
            <p>
                <label for="encryption">Encryption:</label>
                <select name="encryption"
                        v-model="ap_config.encryption">
                    <option value="">None</option>
                    <option value="1">WEP</option>
                    <option value="2">WPA</option>
                    <option value="3">WPA2</option>
                    <option value="5">WPA2 ENT</option>
                </select>
            </p>
            <p>
                <label for="password">Password:</label>
                <input type="password"
                       name="password" 
                       v-model="ap_config.password">
            </p>
            <p>
                <select name="channel"
                        v-model="ap_config.channel">
                    <option v-for="n in 6"
                            :key="n"
                            :value="n">
                        n
                    </option>
                </select>
            </p>
        </div>
        <button @click="save_config()">{{ save_button_text }}</button>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    data() {
        return {
            ap_config: {
                ssid: '',
                encryption: '',
                password: '',
                channel: 1
            },
            save_button_text: ''
        }
    },
    methods: {
        load_config() {
            axios.get([
                process.env.VUE_APP_FIPY_URL,
                '/api/config/networking/accesspoint'
            ].join('')).then(response => {
                this.ap_config = response.data;
            }).catch(e => {
                console.error(e);
            })
        },

        save_config() {
            this.save_button_text = 'saving...';
            axios.post([
                process.env.VUE_APP_FIPY_URL,
                '/api/config/networking/accesspoint'
            ].join(''), this.ap_config).then(response => {
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
        ap_config: {
            handler() {
                this.save_button_text = 'Save configuration';
            },
            deep: true
        }
    }
}

</script>
