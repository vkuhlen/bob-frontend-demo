<template>
  <div class="ds1820">
    <h1>Configure DS1820</h1>
    <div class="description">
    Please assign each temperature sensor to a position.<br>
    Below you see a list of circles, each represents the position of one sensor.<br>
    Follow these steps for each sensor:
    <ol>
        <li>Grab the metal part of a sensor and hold it in your hand for at least 5 seconds.</li>
        <li>Click on the circle representing the position of the sensor you hold.</li>
        <li>Now the circle should be colored green and show the temperature.</li>
    </ol>
    Tip: By clicking a circle with an assigned sensor the assignment can be undone.
    </div>
    <div class="ds1820-positions">
        <div v-for="(item, key, idx) in ds1820_positions" :key="key">
            <button :name="key"
                    :key="key"
                    :value="item"
                    :class="[item === '' ? 'notassigned' : 'assigned']"
                    @click="assign_position(key)">
                    {{ temperatures[item] | toFixed(1) | ifEmpty(idx+1) }}</button>
        </div>
    </div>
        <button @click="save_config($event.target)">Save configuration</button>

    <div class="unassigned" v-if="unassigned_ds1820.length > 0">
        <b>Not yet assigned sensors: {{ unassigned_ds1820.length }}</b>
    </div>
    <div class="ds1820-list">
        <span v-for="key in unassigned_ds1820" :key="key">
            ({{ temperatures[key] | toFixed(1) }})
        </span>
    </div>
  </div>
</template>


<script>

import axios from 'axios'

export default {
    name: 'ds1820',
    data() {
        return {
            temperatures: {},
            ds1820_positions: {
                t_i_1: '',
                t_i_2: '',
                t_i_3: '',
                t_i_4: '',
                t_i_5: '',
                t_i_6: ''
            },
            ds1820_config: {
                pin: 0,
                positions: {}
            },
            save_button_text: ''
        }
    },
    computed: {
        ds1820() {
            return Object.keys(this.temperatures);
        },
        unassigned_ds1820() {
            return this.ds1820.filter(
                key => !Object.values(this.ds1820_positions).includes(key)
            );
        }
    },
    methods: {
        load_config() {
            axios.get([
                process.env.VUE_APP_FIPY_URL,
                '/api/config/sensors/ds1820'
            ].join('')).then(response => {
                this.ds1820_config = response.data;
                if (this.ds1820_config.hasOwnProperty('positions')) {
                    Object.keys(this.ds1820_config.positions).forEach(key => {
                            if (this.ds1820_positions.hasOwnProperty(key)) {
                                this.$set(
                                    this.ds1820_positions, 
                                    key, 
                                    this.ds1820_config.positions[key]
                                );
                            }
                    });
                }
                else {
                    this.$set(this.ds1820_config, 'positions', {});
                }
                this.save_button_text = 'Save configuration';
            }).catch(e => {
                console.error(e);
            })
        },
        save_config() {
            this.save_button_text = 'saving...';
            Object.keys(this.ds1820_positions).forEach(key => {
                this.$set(this.ds1820_config.positions, key, this.ds1820_positions[key]);
            });
            axios.post([
                process.env.VUE_APP_FIPY_URL,
                '/api/config/sensors/ds1820'
            ].join(''), this.ds1820_config).then(response => {
                if (response.status == 200) {
                    this.save_button_text = 'saved';
                }
            }).catch(e => {
                console.error(e);
            })
        },
        load_temperatures() {
            axios.get([
                process.env.VUE_APP_FIPY_URL,
                '/api/sensors/ds1820'
            ].join('')).then(response => {
                this.temperatures = response.data;
            }).catch(e => {
                console.error(e);
            })
        },
        max_unassigned_temp() {
            const min_temp_diff = 2;

            if (this.unassigned_ds1820.length == 0) {
                return undefined;
            }
            else if (this.unassigned_ds1820.length == 1) {
                return this.unassigned_ds1820[0];
            }
            else {
                let unassigned_ds1820_sorted = this.unassigned_ds1820.sort(
                    (a, b) => this.temperatures[b] - this.temperatures[a]
                );
                let temp_diff = this.temperatures[unassigned_ds1820_sorted[0]]
                              - this.temperatures[unassigned_ds1820_sorted[1]]

                if (temp_diff >= min_temp_diff) {
                    return unassigned_ds1820_sorted[0]
                }
            }
        },
        assign_position(key) {
            if (this.ds1820.includes(this.ds1820_positions[key])) {
                 this.$set(this.ds1820_positions, key, '');
            }
            else {
                let max_temp_key = this.max_unassigned_temp();
                if (max_temp_key) {
                     this.$set(this.ds1820_positions, key, max_temp_key);
                }
            }
        }
    },
    created() {
        this.load_config();
        this.load_temperatures();

        setInterval( () => {
            this.load_temperatures();
        }, 2000); 
    },
    watch: {
        ds1820_config: {
            handler() {
                this.save_button_text = 'Save configuration';
            },
            deep: true
        }
    }
}

</script>

<style>

.description {
    text-align: left;
}

.ds1820-positions {
    padding: 3vh 0;
    display: flex;
    justify-content: space-around;
}

@media (max-width: 500px) {
    .ds1820-positions button {
        width: 14vw;
        height: 14vw;
        border-radius: 7vw;
    }
}

@media (min-width: 500px) {
    .ds1820-positions button {
        width: 70px;
        height: 70px;
        border-radius: 7vw;
    }
}

.ds1820-positions button {
	display:inline-block;
	cursor:pointer;
	color:#000;
	padding:2px 2px;
	text-decoration:none;
}



div button.notassigned {
    background-color:#ffaaaa;
    border:1px solid #aa3939;
}

div button.assigned {
    background-color: #88cc88;
    border:1px solid #2e882e;
}

</style>