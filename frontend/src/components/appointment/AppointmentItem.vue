<template>
    <div class="appointment-item">
        <router-link :to="{ name: 'appointmentById', params: { id: appointment.id } }">
            <div class="appointment-item-image d-none d-sm-block">
                <img v-if="appointment.imageUrl"
                    :src="appointment.imageUrl"
                    height="150" width="150" alt="appointment">
                <img v-else
                    src="@/assets/appointment.png"
                    height="150" width="150" alt="appointment">
            </div>
            <div class="appointment-item-info">
                <h2>{{ appointment.regarding }}</h2>
                <p>{{ appointment.description }}</p>
                <p>{{ appointment.day }}</p>
                <p>{{ appointment.time }}</p>
                <span class="appointment-item-patient">
                    <strong>Patient: </strong>{{ appointment.patient }}
                </span>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'AppointmentItem',
    props: ['appointment']
}
</script>

<style>
    .appointment-item {
        border-radius: 8px;
        margin-bottom: 20px;
        background-color: #FFF;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .appointment-item a {
        display: flex;
        align-items: flex-start;
        text-decoration: none;
        color: #000;
    }

    .appointment-item-info h2 {
        font-size: 1.7rem;
    }

    .appointment-item-image {
        padding-right: 20px;
        margin-right: 20px;
        border-right: 1px solid #AAA;
    }

    .appointment-item-image img {
        border-radius: 5px;
    }

    .appointment-item-info {
        display: flex;
        align-self: stretch;
        flex-direction: column;
    }

    .appointment-item-info p {
        flex: 1;
        color: #555;
        font-size: 1.1rem;
    }
</style>
