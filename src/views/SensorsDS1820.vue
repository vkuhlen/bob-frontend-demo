<template>
  <div class="ds1820">
    <h1>Configure DS1820</h1>
    <ConfigForm v-model="ds1820_config"
                config_url="/api/config/sensors/ds1820"
                buttons_visible="false">
        <p>
            <label for="enabled">Enabled:</label>
            <input type="checkbox"
                   name="enabled"
                   v-model="ds1820_config.enabled">
        </p>
        <p>
            <label for="pin">Select Pin</label>
            <ConfigPinSelect v-model="ds1820_config.pin" />
        </p>
        <div class="description">
            Please assign each temperature sensor to a position.<br>
            Below you see two sets of circles. The red/green circles represent the positions of your sensors, the grey circles below are the connected DS1820.<br>
            Follow these steps for each sensor:
            <ol>
                <li>
                    Grab the metal part of a sensor. Select the grey circle with the rising temperature.
                </li>
                <li>
                    Click on the circle representing the position of the sensor you hold.
                </li>
                <li>
                    Now the circle should be colored green and show the temperature.
                </li>
            </ol>
            Tip: By clicking a circle with an assigned sensor the assignment can be undone.
        </div>
        <SensorsDS1820Positions :ds1820_positions="ds1820_config.positions"
                                :temperatures="temperatures_by_position"
                                @assign="assign_position" />
        <keep-alive>
        <SensorsDS1820Available v-if="unassigned_ds1820.length > 0"
                                :unassigned_ds1820="unassigned_ds1820"
                                :temperatures="temperatures"
                                v-model="selected_ds1820"/>
        </keep-alive>
    </ConfigForm>

  </div>
</template>


<script>

import axios from 'axios'
import ConfigForm from '@/components/ConfigForm'
import ConfigPinSelect from '@/components/ConfigPinSelect'
import SensorsDS1820Available from '@/components/SensorsDS1820Available'
import SensorsDS1820Positions from '@/components/SensorsDS1820Positions'

export default {
    name: 'ds1820',

    data() {
        return {
            selected_ds1820: '',
            temperatures: {},
            ds1820_config: {
                enabled: true,
                pin: 'P1',
                positions: {}
            },
        }
    },

    computed: {
        unassigned_ds1820() {
            return Object.keys(this.temperatures).filter(
                key => !Object.values(this.ds1820_config.positions).includes(key)
            );
        },

        assigned_ds1820() {
            return Object.keys(this.temperatures).filter(
                key => Object.values(this.ds1820_config.positions).includes(key)
            );
        },

        temperatures_by_position() {
            let positions = this.ds1820_config.positions;
            return Object.keys(positions).filter(key => {
                return positions[key] !== "";
            }).reduce((obj, key) => {
                obj[key] = this.temperatures[positions[key]];
                return obj;
            }, {});
        }

    },

    methods: {
        load_temperatures() {
            axios.get([
                process.env.VUE_APP_FIPY_URL,
                '/api/sensors/ds1820'
            ].join('')).then(response => {
                Object.keys(response.data).forEach((key) => {
                    this.$set(this.temperatures, key, response.data[key]);
                });
            }).catch(e => {
                console.error(e);
            })
        },

        assign_position(position) {
            if (this.ds1820_config.positions[position] !== '') {
                this.$set(this.ds1820_config.positions, position, '');
            }
            else {
                if (this.selected_ds1820) {
                    this.$set(
                        this.ds1820_config.positions,
                        position,
                        this.selected_ds1820);
                    this.selected_ds1820 = '';
                }
            }
        },
    },

    created() {
        this.load_temperatures();

        setInterval( () => {
            this.load_temperatures();
        }, 2000); 
    },

    components: {
        ConfigForm,
        ConfigPinSelect,
        SensorsDS1820Available,
        SensorsDS1820Positions
    }
}

</script>

<style>

.description {
    text-align: left;
}

@media (max-width: 500px) {
    .round {
        width: 14vw;
        height: 14vw;
        border-radius: 7vw;
        min-width: 3em;
        min-height: 3em;
    }
}

@media (min-width: 500px) {
    .round {
        width: 70px;
        height: 70px;
        border-radius: 35px;
    }
}

.ds1820 button {
	display:inline-block;
	cursor:pointer;
	color:#000;
	padding:2px 2px;
	text-decoration:none;
}

</style>