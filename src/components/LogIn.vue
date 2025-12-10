<template>
  <div class="login-container">
    <div class="login-card">
      <!-- Logo -->
      <div class="logo">
        <img src="../assets/logo.png" alt="NCCP Logo" loading="lazy" />
        <h1>NCCP</h1>
        <p>National College of Chest Physicians</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="login" class="login-form">
        <div class="input-group">
          <input type="email" v-model="email" placeholder="Email address" required>
        </div>

        <div class="input-group">
          <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Password" required>
          <button type="button" class="password-toggle" @click="showPassword = !showPassword">
            <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
          </button>
        </div>

        <button type="submit" class="login-btn" :disabled="isLoading">
          <span v-if="!isLoading">Sign In</span>
          <div v-else class="spinner"></div>
        </button>
      </form>

      <!-- Error Message -->
      <div v-if="errorMessage" class="error">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import {API_BASE_URL} from '../utils/apis.js'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      showPassword: false,
      isLoading: false
    };
  },
  methods: {
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },

    async login() {
      if (!this.email || !this.password) {
        this.errorMessage = 'Please fill in all fields';
        return;
      }

      if (!this.validateEmail(this.email)) {
        this.errorMessage = 'Please enter a valid email';
        return;
      }

      this.isLoading = true;
      this.errorMessage = '';

      try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
          email: this.email,
          password: this.password,
        });

        if (response.data.token) {
          // Store authentication data with expiration
          const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour

          localStorage.setItem('token', `Bearer ${response.data.token}`);
          localStorage.setItem('tokenExpiration', expirationTime.toString());
          localStorage.setItem('userRole', response.data.role);
          localStorage.setItem('username', response.data.username);

          toast.success('Login successful');

          // Redirect based on role
          setTimeout(() => {
            if (response.data.role === 'admin') {
              this.$router.push('/admin_dashboard');
            } else {
              this.$router.push('/');
            }
          }, 1000);
        }
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Login failed';
        toast.error(this.errorMessage); // Show error toast
      } finally {
        this.isLoading = false;
      }
    }
  },
  mounted() {
    // Auto-redirect if already logged in
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const userRole = localStorage.getItem('userRole');

    if (token && tokenExpiration && new Date().getTime() < parseInt(tokenExpiration)) {
      if (userRole === 'admin') {
        this.$router.push('/admin_dashboard');
      } else {
        this.$router.push('/');
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  padding: 20px;
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  width: 100%;
  max-width: 400px;
}

.logo {
  text-align: center;
  margin-bottom: 2rem;
}

.logo img {
  width: 60px;
  height: 60px;
  margin-bottom: 1rem;
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.logo p {
  color: #64748b;
  font-size: 0.9rem;
}

.login-form {
  space-y: 1rem;
}

.input-group {
  position: relative;
  margin-bottom: 1rem;
}

.input-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px !important;
  font-size: 0.95rem;
  background: white;
  transition: border-color 0.2s;
}

.input-group input:focus {
  outline: none;
  border-color: #3b82f6;
}

.input-group input::placeholder {
  color: #9ca3af;
}

.password-toggle {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 0.5rem;
}

.login-btn:hover:not(:disabled) {
  background: #2563eb;
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.error {
  background: #fef2f2;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-top: 1rem;
  text-align: center;
  border: 1px solid #fecaca;
}

@media (max-width: 480px) {
  .login-card {
    padding: 1.5rem;
    margin: 1rem;
  }
}
</style>