<template>
    <fieldset class="ds1820-unassigned">
        <legend>Unassigned sensors:</legend>
        <div v-for="sensor in unassigned_ds1820" :key="sensor">
            <button class="round"
                    :name="sensor"
                    :key="sensor"
                    :class="[selected === sensor ? 'selected' : 'unselected']"
                    @click="$emit('change', sensor)">
                    {{ temperatures[sensor] | toFixed(1) }}</button>
        </div>
    </fieldset>
</template>

<script>

export default {
    model: {
        prop: 'selected',
        event: 'change'
    },
    props: {
        selected: String,
        unassigned_ds1820: Array,
        temperatures: Object
    },
    methods: {
        max_unassigned_temp() {
            const min_temp_diff = 2;

            if (this.unassigned_ds1820.length > 1) {
                let unassigned_ds1820_sorted = this.unassigned_ds1820.sort(
                    (a, b) => this.temperatures[b] - this.temperatures[a]
                );

                let temp_diff = this.temperatures[unassigned_ds1820_sorted[0]]
                              - this.temperatures[unassigned_ds1820_sorted[1]]

                if (temp_diff >= min_temp_diff) {
                    return unassigned_ds1820_sorted[0]
                }
            }
        }
    },
    watch: {
        // temperatures: {
        //     handler() {
        //         let sensor = this.max_unassigned_temp();
        //         if (sensor) {
        //             this.$emit('change', sensor);
        //         }
        //     },
        //     deep: true
        // },
        unassigned_ds1820: {
            handler() {
                console.log(this.unassigned_ds1820.length);
                this.$emit('change', this.unassigned_ds1820[0]);
            }
        }
    }
}

</script>

<style>

.ds1820-unassigned {
    padding: 2vh 0;
    display: flex;
    justify-content: space-around;
}

.ds1820-unassigned button {
    border: 1px solid #444444;
}

.unselected {
    background-color: #EEEEEE;
}

.selected {
    background-color: #CCCCCC;
}

</style>
