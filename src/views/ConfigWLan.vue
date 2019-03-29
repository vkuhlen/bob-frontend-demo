<template>
    <div>
        <h1>WLan configuration</h1>

        <ConfigForm v-model="wlan_config"
                    config_url="/api/config/networking/wlan">
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
                        @change="update_encryption()">
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
                <label for="ifconfig">IP Address:</label>
                <span>
                    <input type="radio"
                        name="ifconfig"
                        value="dhcp"
                        v-model="wlan_config.ifconfig"> DHCP
                    <input type="radio"
                        name="ifconfig"
                        value="static"
                        v-model="wlan_config.ifconfig"> Static
                </span>
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
        </ConfigForm>
    </div>
</template>

<script>

import ConfigForm from '@/components/ConfigForm'

export default {
    name: 'ConfigWLan',
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
            }
        }
    },
    methods: {
        update_encryption() {
            let ap = this.wlan_config.available.filter(ap => {
                return ap.ssid === this.wlan_config.ssid;
            });
            if (ap.length > 0) {
                this.$set(this.wlan_config, 'encryption', ap[0].sec);
            }
        }
    },
    components: {
        ConfigForm
    }
}

</script>
