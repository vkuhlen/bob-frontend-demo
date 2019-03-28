<template>
    <div>
        <h1>WLan configuration</h1>

        <div class="form">
            <p>
                <label for="enabled">Enabled:</label>
                <input type="checkbox"
                    name="enabled"
                    v-model="wlan_config.enabled">
            </p>
            <p>
                <label for="ssid">SSID:</label>
                <select name="ssid"
                        v-model="wlan_config.ssid"
                        @change="update_sec()">
                    <option disabled
                            value="">
                        Please select an SSID
                    </option>
                    <option v-for="ap in wlan_config.available"
                            :value="ap.ssid"
                            :key="ap.bssid">
                        {{ ap.ssid }}
                    </option>
                </select>
            </p>
            <p>
                <label for="encryption">Encryption:</label>
                <select name="encryption"
                        v-model="wlan_config.encryption">
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
                       v-model="wlan_config.password">
            </p>
            <p>
                <input type="radio"
                       name="ifconfig"
                       value="dhcp"
                       v-model="wlan_config.ifconfig"> DHCP
                <input type="radio"
                       name="ifconfig"
                       value="static"
                       v-model="wlan_config.ifconfig"> Static
            </p>
            <div id="ipv4_static"
                v-if="wlan_config.ifconfig === 'static'">
                <p>
                    <label for="ipaddress">Address:</label>
                    <input type="text" 
                           name="ipaddress"
                           v-model="wlan_config.ipaddress">
                </p>
                <p>
                    <label for="subnet">Subnet:</label>
                    <input type="text" 
                           name="subnet"
                           v-model="wlan_config.subnet">
                </p>
                <p>
                    <label for="gateway">Gateway:</label>
                    <input type="text" 
                           name="gateway"
                           v-model="wlan_config.gateway">
                </p>
                <p>
                    <label for="dns">DNS Server:</label>
                    <input type="text"
                           name="dns"
                           v-model="wlan_config.dns">
                </p>
            </div>
        </div>
        <button @click="save_config()">{{ save_button_text }}</button>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    data() {
        return {
            wlan_config: {
                available: [],
                ssid: '',
                encryption: '',
                password: '',
                ifconfig: 'dhcp',
                ipaddress: '',
                subnet: '',
                gateway: '',
                dns: ''
            },
            save_button_text: ''
        }
    },
    methods: {
        load_config() {
            axios.get([
                process.env.VUE_APP_FIPY_URL,
                '/api/config/networking/wlan'
            ].join('')).then(response => {
                this.wlan_config = response.data;
            }).catch(e => {
                console.log(e);
            })
        },

        save_config() {
            this.save_button_text = 'saving...';
            axios.post([
                process.env.VUE_APP_FIPY_URL,
                '/api/config/networking/wlan'
            ].join(''), this.wlan_config).then(response => {
                if (response.status == 200) {
                    this.save_button_text = 'saved';
                }
            }).catch(e => {
                console.log(e);
            })
        },

        update_sec() {
            let ap = this.wlan_config.available.filter(ap => {
                return ap.ssid === this.wlan_config.ssid;
            });
            if (ap.length > 0) {
                this.wlan_config.sec = ap[0].sec;
            }
        }
    },
    created() {
        this.load_config();
    },

    watch: {
        wlan_config: {
            handler() {
                this.save_button_text = 'Save configuration';
            },
            deep: true
        }
    }
}

</script>
