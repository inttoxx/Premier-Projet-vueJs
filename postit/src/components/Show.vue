<template>
  <router-link to="/" class="btn btn-primary back">Back to my post it</router-link>

  <div id="divShow">

    <div class="show">

      <input type="text" v-model="contenu.title" autofocus>
      
      <br/>

      <br/>
      
      <textarea cols="50" rows="10" v-model="contenu.content"></textarea>

      <button id="save" @click="update()" class="btn btn-success">
        SAVE
      </button>

    </div>

  </div>
  

<div></div>
  
</template>

<script>
export default {
  name: 'ShowPostIt',
  data(){
    return{
      contenu: null
    }
  },
  async created (){
    let id = this.$route.params.id;
    let requestOptions = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "username": "val"
        },
        redirect: 'follow'
      };
      const response = await fetch('http://origin.sysroot.ovh:3000/notes/'+ id, requestOptions)
      const data = await response.json();
      this.contenu = data.note;

  },
  methods:{
    update(){
      let id = this.$route.params.id;
      let update = {"title": this.contenu.title, "content": [this.contenu.content]};
      let requestOptions = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "username": "val"
        },
        body: JSON.stringify(update),
      };
      fetch('http://origin.sysroot.ovh:3000/notes/'+ id, requestOptions)
        .then(async (request, response) => {
          console.log(request);
          console.log(response);
        });
      alert('your post it has been saved');
    }
  }
}

</script>

<style>
#divShow{
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
.show{
  background-color: yellow;
  width: 700px;
  height: 400px;
  padding: 50px;
  position: relative;
  box-shadow: 10px 15px 15px black;
}
textarea, input{
  background-color: yellow;
  border: none;
}
input{
  text-align: center;
}
#save{
  position: absolute;
  bottom: 5px;
  right: 5px;
}
</style>
