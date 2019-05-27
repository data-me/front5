<template>
    <div>
        <b-table :items="items">
        <span slot="FREE" slot-scope="data" v-html="data.value"></span>
        <span slot="PRO" slot-scope="data" v-html="data.value"></span>
        </b-table>
    </div>
</template>

<script>
export default {
    name: 'UserPlanInformation',
    data(){
        return{
            items: [
            {
                features: 'Ad free',
                FREE: '<font-awesome-icon icon="coffee" />',
                PRO: '<i class="fa fa-check"></i>'
            },
            {
                features: 'Price',
                FREE: 'FREE',
                PRO: '5 EUR/month'
            }
            ]
        }
    },
}
</script>

<style>

</style>