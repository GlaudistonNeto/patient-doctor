<template>
    <div class="user-admin">
        <b-form>
            <input id="user-id" type="hidden" v-model="user.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Name:" label-for="user-name">
                        <b-form-input id="user-name" type="text"
                            v-model="user.name" required
                            :readonly="mode === 'remove'"
                            placeholder="Inform the name of the user..." />
                    </b-form-group>    
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Mobile:" label-for="user-mobileNo">
                        <masked-input id="user-mobileNo" type="tel"
                            v-model="user.mobileNo" required
                            :readonly="mode === 'remove'"
                            mask="\(11) 11111-1111"
                            placeholder="Mobile" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="AlternateNum:" label-for="user-alternateNum">
                        <masked-input id="user-alternateNum" type="tel"
                            v-model="user.alternateNum" required
                            :readonly="mode === 'remove'"
                            mask="\(11) 11111-1111"
                            placeholder="Alternate Mobile" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Landline:" label-for="user-landlineNo">
                        <b-form-input id="user-landlineNo" type="text"
                            v-model="user.landlineNo" required
                            :readonly="mode === 'remove'"
                            placeholder="Inform the landline of the user..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="E-mail:" label-for="user-email">
                        <b-form-input id="user-email" type="text"
                            v-model="user.email" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o E-mail do Usuário..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Address:" label-for="user-address">
                        <b-form-input id="user-address" type="text"
                            v-model="user.address" required
                            :readonly="mode === 'remove'"
                            placeholder="Inform the address of the user..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Gender:" label-for="user-gender">
                        <b-form-input id="user-gender" type="text"
                            v-model="user.gender" required
                            :readonly="mode === 'remove'"
                            placeholder="Inform the gender of the user..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Country:" label-for="user-country">
                        <b-form-input id="user-country" type="text"
                            v-model="user.country" required
                            :readonly="mode === 'remove'"
                            placeholder="Inform the country of the user..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Date of Birth:" label-for="user-dod">
                        <b-form-input id="user-dod" type="text"
                            v-model="user.dod" required
                            :readonly="mode === 'remove'"
                            placeholder="Inform the day of birth of the user..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="State:" label-for="user-state">
                        <b-form-input id="user-state" type="text"
                            v-model="user.state" required
                            :readonly="mode === 'remove'"
                            placeholder="Inform the state of the user..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Age:" label-for="user-age">
                        <b-form-input id="user-age" type="text"
                            v-model="user.age" required
                            :readonly="mode === 'remove'"
                            placeholder="Inform the age of the user..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="City:" label-for="user-city">
                        <b-form-input id="user-city" type="text"
                            v-model="user.city" required
                            :readonly="mode === 'remove'"
                            placeholder="Inform the city of the user..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Dentition:" label-for="user-dentition">
                        <b-form-input id="user-dentition" type="text"
                            v-model="user.dentition" required
                            :readonly="mode === 'remove'"
                            placeholder="Inform the dentition of the user..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Pincode:" label-for="user-pincode">
                        <b-form-input id="user-pincode" type="text"
                            v-model="user.pincode"
                            :readonly="mode === 'remove'"
                            placeholder="Provide a pincode for the user..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Blood Group:" label-for="user-bloodGroup">
                        <b-form-input id="user-bloodGroup" type="text"
                            v-model="user.bloodGroup" required
                            :readonly="mode === 'remove'"
                            placeholder="Inform the Blood Group of the user..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-col md="6" sm="12">
            <b-form-checkbox id="user-receptionist" v-show="mode === 'save'"
                v-model="user.receptionist" class="mt-3 mb-3">
                Receptionist?
            </b-form-checkbox>
            </b-col>
            <b-col md="6" sm="12">
            <b-form-checkbox id="user-doctor" v-show="mode === 'save'"
                v-model="user.doctor" class="mt-3 mb-3">
                Doctor?
            </b-form-checkbox>
            </b-col>
            <b-col md="6" sm="12">
            <b-form-checkbox id="user-admin" v-show="mode === 'save'"
                v-model="user.admin" class="mt-3 mb-3">
                Administrator?
            </b-form-checkbox>
            </b-col>
            <b-row v-show="mode === 'save'">
                <b-col md="6" sm="12">
                    <b-form-group label="Password:" label-for="user-password">
                        <b-form-input id="user-password" type="password"
                            v-model="user.password" required
                            placeholder="Inform User Password..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Password Confirmation:" 
                        label-for="user-confirm-password">
                        <b-form-input id="user-confirm-password" type="password"
                            v-model="user.confirmPassword" required
                            placeholder="Confirm User Passwprd..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" @click="save">Salvar</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'"
                        @click="remove">Delete</b-button>
                    <b-button class="ml-2" @click="reset">Cancel</b-button>
                </b-col>
            </b-row>
        </b-form>
        <hr>
        <b-table hover striped :items="users" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadUser(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import MaskedInput from 'vue-masked-input'

export default {
    name: 'UserAdmin',
    data: function() {
        return {
            mode: 'save',
            user: {},
            users: [],
            fields: [
                { key: 'id', label: 'Code', sortable: true },
                { key: 'name', label: 'Name', sortable: true },
                { key: 'AlternateNo', label: 'AlternateNo', sortable: true },
                { key: 'PatientRefNum', label: 'patientRefNum', sortable: true },
                { key: 'landlineNo', label: 'Landline', sortable: true },
                { key: 'mobileNo', label: 'Mobile', sortable: true },
                { key: 'email', label: 'Email', sortable: true },
                { key: 'address', label: 'Address', sortable: true },
                { key: 'gender', label: 'Gender', sortable: true },
                { key: 'country', label: 'Country', sortable: true },
                { key: 'dob', label: 'dateOfBirth', sortable: true },
                { key: 'state', label: 'State', sortable: true },
                { key: 'city', label: 'City', sortable: true },
                { key: 'age', label: 'Age', sortable: true },
                { key: 'dentition', label: 'Dentition', sortable: true },
                { key: 'pincode', label: 'Pincode', sortable: true },
                { key: 'bloodGroup', label: 'BloodGroup', sortable: true },
                { key: 'doctor', label: 'Doctor', sortable: true,
                    formatter: value => value ? 'Yes' : 'No' },
                { key: 'Admin', label: 'Admin', sortable: true,
                    formatter: value => value ? 'Yes' : 'No' },
                { key: 'receptionist', label: 'Receptionist', sortable: true,
                    formatter: value => value ? 'Yes' : 'No' },
                { key: 'actions', label: 'Ações' }
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
    },
    components: {
        MaskedInput
    }
}
</script>

<style>

</style>
