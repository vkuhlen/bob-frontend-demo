<template>
    <div>
        <h1>Access point configuration</h1>

        <ConfigForm v-model="ap_config"
                    config_url="/api/config/networking/accesspoint">
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
                <label for="channel">Channel:</label>
                <select name="channel"
                        v-model="ap_config.channel">
                    <option v-for="n in 6"
                            :key="n"
                            :value="n">
                        {{ n }}
                    </option>
                </select>
            </p>
        </ConfigForm>
    </div>
</template>

<script>

import ConfigForm from '@/components/ConfigForm'

export default {
    data() {
        return {
            ap_config: {
                ssid: '',
                encryption: '',
                password: '',
                channel: 1
            }
        }
    },
    components: {
        ConfigForm
    }
}

</script>
