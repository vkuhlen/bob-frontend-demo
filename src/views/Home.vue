<template>
    <div class="home">
        <h1>Welcome!</h1>


        <h3>Networking</h3>
        <ul>
            <li>
                <router-link to="/networking/ap">
                    Access Point
                </router-link>
            </li>
            <li>
                <router-link to="/networking/wlan">
                    WLan
                </router-link>
            </li>
        </ul>
        <h3>Sensors</h3>
        <ul>
            <li>
                <router-link to="/sensors/ds1820">
                    DS1820
                </router-link>
            </li>
            <li>
                <router-link to="/sensors/hx711">
                    HX711
                </router-link>
            </li>
            <li>
                <router-link to="/sensors/bme280">
                    BME280
                </router-link>
            </li>
        </ul>

        <h3>Telemetry</h3>
        <ul>
            <li>
                <router-link to="/telemetry/beep">
                    BEEP
                </router-link>
            </li>
        </ul>

        <h3>System</h3>
        <ul>
            <li>
                <router-link to="/restart">
                    Restart
                </router-link>
            </li>
        </ul>
    </div>
</template>

<style>

.home ul {
    padding: 0;
    margin: auto;
}

.home li {
    list-style-type: none;
    padding: 2vmin;
    display: block;

}
</style>
