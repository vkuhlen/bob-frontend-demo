<template>
    <div class="home">
        <h1>Welcome!</h1>


        <h3>Networking</h3>
        <ul>
            <li>
                <router-link to="/config/ap">
                    Access Point
                </router-link>
            </li>
            <li>
                <router-link to="/config/wlan">
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
