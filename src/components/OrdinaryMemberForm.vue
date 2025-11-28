<template>
    <div style="display: grid; place-items: center">
        <form class="ordinary_form" @submit.prevent="submitOrdinaryMembersData">
            <h3 class="text-center display-7">NCCP Ordinary Members Form</h3><br>

            <div>
                <label for="name">Name:</label><br>
                <input type="text" v-model="ordinaryMembersData.name" id="name" required>
            </div>

            <div>
                <label for="id">ID:</label><br>
                <input type="text" v-model="ordinaryMembersData.id" id="id" required>
            </div>

            <div>
                <label for="email">Email:</label><br>
                <input type="email" v-model="ordinaryMembersData.email" id="email">
            </div>

            <div>
                <label for="phone">Phone:</label><br>
                <input type="text" v-model="ordinaryMembersData.phone" id="phone">
            </div>

            <div>
                <label for="state">State:</label><br>
                <input type="text" v-model="ordinaryMembersData.state" id="state">
            </div>

            <div>
                <label for="address">Address:</label><br>
                <input type="text" v-model="ordinaryMembersData.address" id="address" required>
            </div>

            <div>
                <label for="status">Status:</label><br>
                <input type="text" v-model="ordinaryMembersData.status" id="status" required>
            </div>

            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            ordinaryMembersData: {
                id: '',
                name: '',
                email: '',
                phone: '',
                state: '',
                address: '',
                status: 'Active'
            }
        };
    },
    methods: {
        async submitOrdinaryMembersData() {
            try {
                const response = await axios.post(
                    'http://localhost:3000/ordinaryMember/createOrdinaryMember',
                    this.ordinaryMembersData
                );
                console.log(response)
                alert('Ordinary Member submitted successfully!');
                this.$emit('refreshOrdinaryMembers'); // optional, for parent refresh
                this.$emit('closeOrdinaryMemberForm')
                this.resetForm();
            } catch (error) {
                console.error('Error submitting ordinary member:', error);
                alert('Failed to submit. Check console for details.');
            }
        },
        resetForm() {
            this.ordinaryMembersData = {
                id: '',
                name: '',
                email: '',
                phone: '',
                state: '',
                address: '',
                status: 'Active'
            };
        }
    }
};
</script>

<style scoped>
input {
    width: 100% !important;
    border: none;
    border-bottom: 1px solid gray;
    outline: none;
}

button {
    width: 100%;
    border: none;
    outline: none;
    background-color: #0d6efd;
    padding: 5px 20px;
    color: #fff;
    font-weight: 600;
}

div {
    margin-bottom: 15px;
}
</style>
