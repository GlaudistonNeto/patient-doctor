<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="App Settings"
            sub="Settings & Registers" />
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Appointments" active>
                        <AppointmentAdmin />
                    </b-tab>
                    <b-tab title="Categories">
                        <CategoryAdmin />
                    </b-tab>
                    <b-tab title="Users">
                        <UserAdmin />
                    </b-tab>
                    <b-tab title="Doctors">
                        <DocAdmin />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import AppointmentAdmin from './AppointmentAdmin'
import CategoryAdmin from './CategoryAdmin'
import UserAdmin from './UserAdmin'
import DocAdmin from './DocAdmin'

export default {
    name: 'AdminPages',
    components: { PageTitle, AppointmentAdmin, CategoryAdmin, UserAdmin, DocAdmin }
}
</script>

<style>

</style>
