import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        postIts: []
    },
    mutations: {
        fetchPostIt() {
            let requestOptions = {
                method: 'GET',
                headers: {
                "Content-Type": "application/json",
                "username": "val"
                },
                redirect: 'follow'
            };
            const response = await fetch('http://origin.sysroot.ovh:3000/notes', requestOptions)
            const data = await response.json();

            this.postIts = data.notes;
        }
    },
    getters: {
        getPostIts: state => state.postIts
    }
})

