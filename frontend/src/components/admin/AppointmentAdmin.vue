<template>
    <div class="appointment-admin">
        <b-form>
            <input id="appointment-id" type="hidden" v-model="appointment.id" />
            <b-form-group label="Regarding:" label-for="appointment-regarding">
                <b-form-input id="appointment-regarding" type="text"
                    v-model="appointment.regarding" required
                    :readonly="mode === 'remove'"
                    placeholder="Provide a regarding for the appointment..." />
            </b-form-group>
            <b-form-group label="Description" label-for="appointment-description">
                <b-form-input id="appointment-description" type="text"
                    v-model="appointment.description" required
                    :readonly="mode === 'remove'"
                    placeholder="Discribe this appointment..." />
            </b-form-group>
            <b-form-group label="Day" label-for="appointment-day">
                <b-form-input id="appointment-day" type="text"
                    v-model="appointment.day" required
                    :readonly="mode === 'remove'"
                    placeholder="Schedule a day for this appointment..." />
            </b-form-group>
            <b-form-group label="Hour" label-for="appointment-time">
                <b-form-input id="appointment-time" type="text"
                    v-model="appointment.time" required
                    :readonly="mode === 'remove'"
                    placeholder="Schedule a time in this day for this appointment..." />
            </b-form-group>
            <b-form-group v-if="mode === 'save'" 
                label="Categoria:" label-for="appointment-categoryId">
                <b-form-select id="appointment-categoryId"
                    :options="categories" v-model="appointment.categoryId" />
            </b-form-group>
            <b-form-group v-if="mode === 'save'" 
                label="Patient:" label-for="appointment-userId">
                <b-form-select id="appointment-userId"
                    :options="users" v-model="appointment.userId" />
            </b-form-group>
            <b-button variant="primary" v-if="mode === 'save'"
                @click="save">Save</b-button>
            <b-button variant="danger" v-if="mode === 'remove'"
                @click="remove">Delete</b-button>
            <b-button class="ml-2" @click="reset">Cancel</b-button>
        </b-form>
        <hr>
        <b-table hover striped :items="appointments" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadAppointment(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadAppointment(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
        <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'AppointmentAdmin',
    data: function() {
        return {
            mode: 'save',
            appointment: {},
            appointments: [],
            categories: [],
            users: [],
            page: 1,
            limit: 0,
            count: 0,
            fields: [
                { key: 'id', label: 'Code', sortable: true },
                { key: 'regarding', label: 'Regarding', sortable: true },
                { key: 'description', label: 'Description', sortable: true },
                { key: 'day', label: 'Day', sortable: true },
                { key: 'hour', label: 'Hour', sortable: true },
                { key: 'name', label: 'Name', sortable: true },
                { key: 'actions', label: 'Actions' }
            ]
        }
    },
    methods: {
        loadAppointments() {
            const url = `${baseApiUrl}/appointments?page=${this.page}`
            axios.get(url).then(res => {
                this.appointments = res.data.data
                this.count = res.data.count
                this.limit = res.data.limit
            })
        },
        reset() {
            this.mode = 'save'
            this.appointment = {}
            this.loadAppointments()
        },
        save() {
            const method = this.appointment.id ? 'put' : 'post'
            const id = this.appointment.id ? `/${this.appointment.id}` : ''
            axios[method](`${baseApiUrl}/appointments${id}`, this.appointment)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.appointment.id
            axios.delete(`${baseApiUrl}/appointments/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadAppointment(appointment, mode = 'save') {
            this.mode = mode
            axios.get(`${baseApiUrl}/appointments/${appointment.id}`)
                .then(res => this.appointment = res.data)
        },
        loadCategories() {
            const url = `${baseApiUrl}/categories`
            axios.get(url).then(res => {
                this.categories = res.data.map(category => {
                    return { value: category.id, text: category.path }
                })
            })
        },
        loadUsers() {
            const url = `${baseApiUrl}/users`
            axios.get(url).then(res => {
                this.users = res.data.map(user => {
                    return { value: user.id, text: `${user.name} - ${user.email}` }
                })
            })
        }
    },
    watch: {
        page() {
            this.loadAppointments()
        }
    },
    mounted() {
        this.loadUsers()
        this.loadCategories()
        this.loadAppointments()
    }
}
</script>

<style>

</style>
