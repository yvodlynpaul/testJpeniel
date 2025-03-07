import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../router/index';



export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
        loginEmail: localStorage.getItem('loginEmail') || null,
        // loginEmail: null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
        userRole: (state) => state.user?.role,
    },
    actions: {
        async login(email, password) {
            try {
                const response = await axios.post('https://jpenielevent.onrender.com/users/api/token/', {
                    email,
                    password,
                });
                this.token = response.data.access;
                this.loginEmail = email;

                // Store the token in localStorage
                localStorage.setItem('token', this.token);
                localStorage.setItem('loginEmail', email);
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                
                await this.getUser();  // Fetch user details after login
                router.push({ name: 'home' });
            } catch (error) {
                console.error("Login failed:", error);
            }
        },
        async getUser() {
            try {
                const response = await axios.get('https://jpenielevent.onrender.com/users/');
                console.log("All users data fetched", response.data);

                const loggedInUser = response.data.find(user => user.email === this.loginEmail);

                if (loggedInUser) {
                    this.user = loggedInUser;

                    // Store the user in localStorage
                    localStorage.setItem('user', JSON.stringify(this.user));
                } else {
                    console.error("Logged-in user not found in the fetched user list");
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        },
        async fetchChurches() {
            try {
                const response = await axios.get('https://jpenielevent.onrender.com/users/church/', {
                    headers: { Authorization: `Bearer ${this.token}` }  // Pass the token for authorization
                });
                return response.data;  // Assuming this returns an array of church objects with "id" and "name" fields
            } catch (error) {
                console.error("Failed to fetch churches:", error);
                return [];  // Return an empty array on error
            }
        },
        logout() {
            this.token = null;
            this.user = null;
            this.loginEmail = null;

            // Remove token and user from localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('loginEmail');
            delete axios.defaults.headers.common['Authorization'];
            router.push({ name: 'Login' });
        },
        async register(userData) {
            try {
                await axios.post('https://jpenielevent.onrender.com/users/register', userData);
                router.push({ name: 'Login' });
            } catch (error) {
                console.error("Registration failed:", error);
            }
        },
        
        initializeAuth() {
            //If a token exists in localStorage, set it as the default for axios
            if (this.token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
            }
        }
    },
});

// export const useAuthStore = defineStore('auth', {
//     state: () => ({
//         token: localStorage.getItem('token') || null,
//         userRole: null,
//         isAuthenticated: !!localStorage.getItem('token')
//     }),
//     actions: {
//         initializeAuth() {
//             this.token = localStorage.getItem('token');
//             this.isAuthenticated = !!this.token;
//         },
//         setToken(token) {
//             this.token = token;
//             localStorage.setItem('token', token);
//             this.isAuthenticated = true;
//         },
//         async login(username, password) {
//             try {
//                 const response = await axios.post('https://jpenielevent.onrender.com/users/api/token/', {
//                     username,
//                     password
//                 });
//                 // Store the token received
//                 this.setToken(response.data.token);
//                 // Optionally, fetch user details right after login
//                 this.getUser();
//             } catch (error) {
//                 console.error('Login failed:', error);
//             }
//         },
//         logout() {
//             this.token = null;
//             this.isAuthenticated = false;
//             this.userRole = null;
//             localStorage.removeItem('token');
//         },
//         async getUser() {
//             if (!this.token) return;

//             try {
//                 const response = await axios.get('https://jpenielevent.onrender.com/users/', {
//                     headers: { Authorization: `Bearer ${this.token}` }
//                 });
//                 this.userRole = response.data.role;
//             } catch (error) {
//                 console.error('Failed to fetch user:', error);
//                 if (error.response && error.response.status === 401) {
//                     this.logout();
//                 }
//             }
//         }
//     }
// });

// In your main.js or store initialization file, call initializeAuth when the app starts
// const authStore = useAuthStore();
// authStore.initializeAuth();



// // src/stores/auth.js
// import { defineStore } from 'pinia';
// import axios from 'axios';
// import router from '../router/index';

// export const useAuthStore = defineStore('auth', {
//     state: () => ({
//         user: null,
//         token: null,
//         loginEmail: null,  // Store the login email to find the user later
//     }),
//     getters: {
//         isAuthenticated: (state) => !!state.token,
//         userRole: (state) => state.user?.role,
//     },
//     actions: {
//         async login(email, password) {
//             try {
//                 const response = await axios.post('https://jpenielevent.onrender.com/users/api/token/', {
//                     email,
//                     password,
//                 });
//                 this.token = response.data.access;  // Save JWT token
//                 this.loginEmail = email;  // Store the email used during login
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
//                 await this.getUser();  // Fetch user details after login
//                 router.push({ name: 'home' });
//             } catch (error) {
//                 console.error("Login failed:", error);
//             }
//         },
//         async getUser() {
//             try {
//                 const response = await axios.get('https://jpenielevent.onrender.com/users/');  // Fetch all users
//                 console.log("All users data fetched", response.data);

//                 // Find the user by matching the stored login email
//                 const loggedInUser = response.data.find(user => user.email === this.loginEmail);
                
//                 if (loggedInUser) {
//                     this.user = loggedInUser;  // Store the specific logged-in user's data
//                 } else {
//                     console.error("Logged-in user not found in the fetched user list");
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch user:", error);
//             }
//         },
//         async register(userData) {
//             try {
//                 await axios.post('https://jpenielevent.onrender.com/users/register', userData);
//                 router.push({ name: 'Login' });
//             } catch (error) {
//                 console.error("Registration failed:", error);
//             }
//         },
//         logout() {
//             this.token = null;
//             this.user = null;
//             this.loginEmail = null;  // Clear the stored email
//             delete axios.defaults.headers.common['Authorization'];
//             router.push({ name: 'Login' });
//         },
//     },
// });
