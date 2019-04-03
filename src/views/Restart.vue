<template>
    <div>
        <h1>Restart</h1>
        The FiPy will now restart. If you've configured a WLan connection the system will try to connect. If everything is fine the LED should be green and you should start seeing data in BEEP.<br>
        If the connection fails the LED will be yellow and you can reconnect to this access point.<br>
        <b>You can close this window now!</b>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'Restart',
    created() {
        axios.get([
            process.env.VUE_APP_FIPY_URL,
            '/restart'
        ].join(''))
    }
}
</script>
