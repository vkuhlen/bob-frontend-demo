<template>
    <div>
        <h1>Scale</h1>
        <ConfigForm v-model="hx711_config"
                    config_url="/api/config/sensors/hx711"
                    :buttons_visible=false
                    ref="configform">
            <div v-if="step===0"
                 class="flex-form">
                <p>
                    We propose that you first put 1 kg on your scale, and then entirele remove all the weight in the next step.
                    If you want, you can also specify some other weight. When the weight is on your scale, click on "Continue".
                </p>
                <p>
                    <label for="weight">Weight (kg)</label>
                    <input type="number" 
                           name="cal_weight"
                           min="0"
                           step="0.1"
                           v-model.number="cal_weight">
                </p>
                <p class="submit">
                        <button @click="load_weight(do_step_1)">Continue</button>
                        <button @click="$router.go(-1)">Back</button>
                </p>
            </div>

            <div v-if="step===1"
                 class="flex-form">
                <p>
                    We propose that you now remove all the weight from your scale.
                    If you want, you can also specify some remaining weight. Once you removed the weight, click on "Continue".
                </p>
                <p>
                    <label for="weight">Weight (kg)</label>
                    <input type="number"
                        name="cal_no_weight"
                        min="0"
                        step="0.1"
                        v-model.number="cal_no_weight">
                </p>
                <p class="submit">
                    <button @click="load_weight(do_step_2)">Continue</button>
                    <button @click="step=0">Back</button>
                </p>
            </div>
        </ConfigForm>
    </div>
</template>

<script>

import axios from 'axios'
import ConfigForm from '@/components/ConfigForm'

export default {
    name: 'hx711',
    data() {
        return {
            hx711_config: {
                enabled: true,
                pin_dout: "",
                pin_pdsck: "",
                tare_offset : 0.0,
                calibration_factor : 1.0
            },
            cal_weight: 1.0,
            cal_no_weight: 0.0,
            step: 0,
            measured_weight: 0
        }
    },

    methods:{
        load_weight(f) {
            axios.get([
                process.env.VUE_APP_FIPY_URL,
                '/api/sensors/hx711'
            ].join('')).then(response => {
                f(response.data['weight']);
            }).catch(e => {
                console.error(e);
            })
        },

        do_step_1(weight) {
            this.step = 1;
            this.measured_weight = weight;
        },

        do_step_2(weight) {
            this.$set(
                this.hx711_config,
                'calibration_factor',
                (Number.parseFloat(this.measured_weight) - Number.parseFloat(weight))
                / (Number.parseFloat(this.cal_weight) - Number.parseFloat(this.cal_no_weight))
            );
            
            this.$set(
                this.hx711_config,
                'tare_offset',
                Number.parseFloat(this.measured_weight)
                - this.hx711_config.calibration_factor * Number.parseFloat(this.cal_weight)
            );
            this.step = 0;

            this.$refs.configform.save_config();
            this.$router.push('/sensors/hx711');
        }
    },
    components: {
        ConfigForm
    }
}

</script>

<style>

.flex-form p {
    justify-content: space-around !important;
}

</style>
