import { createStore } from 'vuex'
import router from '../router'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'


export default createStore({
    state: {
        user: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        clearUser(state) {
            state.user = null
        }
    },
    actions: {
        async login({ commit }, details) {
            const { email, password } = details

            try {
                signInWithEmailAndPassword(auth, email, password)
            } catch (error) {
                switch (error.code) {
                    case 'auth/user-not-found':
                        alert('User not found')
                        break
                    case 'auth/wrong-password':
                        alert('Wrong password')
                        break
                    default:
                        alert(error.message)
                }

                return
            }

            commit('setUser', auth.currentUser)
            router.push('/')
        },
        async register({ commit }, details) {
            const { email, password } = details

            try {
                createUserWithEmailAndPassword(auth, email, password)
            } catch (error) {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        alert('Email already in use')
                        break
                    case 'auth/invalid-email':
                        alert('Invalid email')
                        break
                    case 'auth/operation-not-allowed':
                        alert('Operation not allowed')
                        break
                    case 'auth/weak-password':
                        alert('Weak password')
                        break
                    default:
                        alert(error.message)
                }

                return
            }

            commit('setUser', auth.currentUser)
            router.push('/')
        },
        async logout({ commit }) {
            await signOut(auth)
            commit('clearUser')
            router.push('/login')
        },

        fetchUser({ commit }) {
            auth.onAuthStateChanged(async user => {
                if (user === null) {
                    commit('clearUser')
                } else {
                    commit('setUser', user)

                    if (router.isReady() && router.currentRoute.value.path === '/login') {
                        router.push('/')
                    }
                }
            })
        }
    }

})