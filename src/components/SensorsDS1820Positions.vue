<template>
    <fieldset class="ds1820-positions">
        <legend>Positions:</legend>
        <div v-for="(position, idx) in allowed_positions" :key="position">
            <button class="round"
                    :name="position"
                    :class="[ds1820_positions[position] ? 'assigned' : 'unassigned']"
                    @click="$emit('assign', position)">
                    {{ temperatures[position] | toFixed(1) | ifEmpty(idx+1) }}</button>
        </div>
    </fieldset>
</template>

<script>

export default {
    props: {
        ds1820_positions: Object,
        temperatures: Object
    },
    data() {
        return {
            allowed_positions: [
                't_i_1',
                't_i_2',
                't_i_3',
                't_i_4',
                't_i_5',
                't_i_6'
            ]
        }
    }
}

</script>

<style>

.ds1820-positions {
    padding: 3vh 0;
    display: flex;
    justify-content: space-around;
    flex-flow: row wrap;
}

button.unassigned {
    background-color:#ffaaaa;
    border:1px solid #aa3939;
}

button.assigned {
    background-color: #88cc88;
    border:1px solid #2e882e;
}

</style>
