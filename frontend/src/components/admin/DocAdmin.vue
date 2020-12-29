<template>
    <div class="doc-admin">
        <b-form>
            <input id="user-id" type="hidden" v-model="user.id" />
            <b-form-group label="Qualification:" label-for="dic-qualification">
                <b-form-input id="user-qualifications" type="text"
                    v-model="user.qualification" required
                    :randonly="mode === 'remove'"
                    placeholder="Informe the doctor's qualifications" />
            </b-form-group>
            <b-form-group label="imageUrl" label-for="user-qualification">
                <b-form-input id="user-imageUrl" type="text"
                v-model="user.imageUrl" required
                :randonly="mode === 'remove'"
                placeholder="Inform the doctor's photo Url" />
            </b-form-group>
        </b-form>
        <hr>
        <b-table hover striped :items="articles" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadArticle(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadArticle(data.item, 'remove')">
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
    name: 'DocAdmin',
    data: function() {
        return {
            mode: 'save',
            user: {},
            users: [],
            fields: [
                { key: 'id', label: 'Code', sortable: true },
                { key: 'qualification', label: 'Qualification', sortable: true },
                { key: 'imageUrl', label: 'Photo', sortable: true,
                    formatter: value => value ? 'Yes' : 'No' },
                { key: 'actions', label: 'Actions' }
            ]
        }
    },
    methods: {
        loadUsers() {
            const url = `${baseApiUrl}/users`
            axios.get(url).then(res => {
                this.users = res.data
            })
        },
        reset() {
            this.mode = 'save'
            this.user = {}
            this.loadUsers()
        },
        save() {
            const method = this.user.id ? 'put' : 'post'
            const id = this.user.id ? `/${this.user.id}` : ''
            axios[method](`${baseApiUrl}/users${id}`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.user.id
            axios.delete(`${baseApiUrl}/users/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadUser(user, mode = 'save') {
            this.mode = mode
            this.user = { ...user }
        }
    },
    mounted() {
        this.loadUsers()
    }
}
</script>

<style>

</style>
