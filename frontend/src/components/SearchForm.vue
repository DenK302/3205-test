<template>
  <div class="search-form-container">
    <form @submit.prevent="onSubmit" class="search-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required class="form-control" />
      </div>
      <div class="form-group">
        <label for="number">Number:</label>
        <input type="text" v-model="number" @input="formatNumber" @keypress="onlyDigits" class="form-control" />
      </div>
      <button type="submit" class="btn">Submit</button>
    </form>
    <div v-if="users.length" class="results">
      <h3>Found Users:</h3>
      <ul>
        <li v-for="user in users" :key="user.email" class="result-item">{{ user.email }} - {{ formatDisplayNumber(user.number) }}</li>
      </ul>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { searchUsers } from '@/services/api';
  
export default defineComponent({
    data() {
      return {
        email: '',
        number: '',
        users: [] as Array<{ email: string; number: string }>,
      };
    },
    methods: {
        async onSubmit() {
            try {
              const formattedNumber = this.number.replace(/-/g, '');
              const results = await searchUsers(this.email, formattedNumber);
              this.users = results;
            } catch (error) {
                console.error(error);
            }
        },
        formatNumber() {
          this.number = this.formatDisplayNumber(this.number.replace(/[^0-9]/g, ''));
        },
        formatDisplayNumber(number: string) {
          return number.replace(/(\d{2})(?=\d)/g, '$1-');
        },
        onlyDigits(event: KeyboardEvent) {
        const charCode = event.charCode;
          if (charCode < 48 || charCode > 57) {
            event.preventDefault();
          }
        },
    },
});
</script>
  
<style scoped>
    .search-form-container {
    max-width: 500px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    }

    .search-form {
    display: flex;
    flex-direction: column;
    }

    .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    }

    label {
    margin-bottom: 5px;
    font-weight: bold;
    }

    .form-control {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
    }

    .btn {
    padding: 10px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    align-self: flex-end;
    width: 100%;
    }

    .btn:hover {
    background-color: #0056b3;
    }

    .results {
    margin-top: 20px;
    }

    .result-item {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    }

    .result-item:last-child {
    border-bottom: none;
    }
</style>