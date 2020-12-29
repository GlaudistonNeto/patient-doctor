<template>
    <div class="appointments-by-category">
        <PageTitle icon="fa fa-folder-o"
            :main="category.name" sub="Cidade" />
        <ul>
            <li v-for="appointment in appointments" :key="appointment.id">
                <appointmentItem :appointment="appointment" />
            </li>
        </ul>
        <div class="load-more">
            <button v-if="loadMore"
                class="btn btn-lg btn-outline-primary"
                @click="getAppointments">Load more Appointments</button>
        </div>
    </div>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'
import AppointmentItem from './AppointmentItem'

export default {
    name: 'AppointmentsByCategory',
    components: { PageTitle, AppointmentItem },
    data: function() {
        return {
            category: {},
            appointments: [],
            page: 1,
            loadMore: true
        }
    },
    methods: {
        getCategory() {
            const url = `${baseApiUrl}/categories/${this.category.id}`
            axios(url).then(res => this.category = res.data)
        },
        getAppointments() {
            const url = `${baseApiUrl}/categories/${this.category.id}/appointments?page=${this.page}`
            axios(url).then(res => {
                this.appointments = this.appointments.concat(res.data)
                this.page++

                if(res.data.length === 0) this.loadMore = false
            })
        }
    },
    watch: {
        $route(to) {
            this.category.id = to.params.id
            this.appointments = []
            this.page = 1
            this.loadMore = true

            this.getCategory()
            this.getAppointments()
        }
    },
    mounted() {
        this.category.id = this.$route.params.id
        this.getCategory()
        this.getAppointments()
    }
}
</script>

<style>
    .appointments-by-category ul {
        list-style-type: none;
        padding: 0px;
    }

    .appointments-by-category .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
    }
</style>
