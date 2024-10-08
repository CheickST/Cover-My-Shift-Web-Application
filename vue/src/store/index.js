import { createStore as _createStore } from 'vuex';
import axios from 'axios';

export function createStore(currentToken, currentUser) {
  let store = _createStore({
    state: {
      token: currentToken || '',
      user: currentUser || {},
      newTimeOffRequest: [
       {
        fullName: '',
        startDate: '',
        endDate: '',
       }
      ],
      name: ''
    },
    mutations: {
      SET_AUTH_TOKEN(state, token) {
        state.token = token;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      },
      SET_USER(state, user) {
        state.user = user;
        localStorage.setItem('user', JSON.stringify(user));
      },
      LOGOUT(state) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        state.token = '';
        state.user = {};
        axios.defaults.headers.common = {};
      },
      ADD_REQUEST(state,newRequest){

          state.newTimeOffRequest.push(newRequest);

      },
      ADD_NAME(state,fullName){

        state.name = fullName;
      }
    },

    
    // getters: {
    //   isAuthenticated(state) {
    //     return !!state.token;
    //   },
    //   userRole(state) {
    //     return state.user.role || ''; 
    //   },
    //   userName(state) {
    //     return state.user.name || ''; 
    //   }
    // }

  });
  return store;
}
