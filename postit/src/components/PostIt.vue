<template>
  <div id="postItZone">
    <PostItSingle
      v-for="(postIt, index) in postIts"
      :key="`postit-${index}`"
      :id="postIt.id"
      :title="postIt.title"
      :content="postIt.content"
    @delPostIt="removePostItById"
    :class="[
      `postItId-${postIt.id}`,
    ]"
    />

    <div class="container">
    <button 
      @click="newPostit()"
      class="btn btn-success newPost" 
      id="newPost">
        New Post <Input:t></Input:t>
    </button>
      <Moveable
        className="moveable"
        :target="[`.newPost`]"
        :draggable="true"
        @drag="onDrag"
      />
    </div>

    <div class="container">
      <button
        @click="sort"
        class="btn btn-dark sort">
        SORT
      </button>
      <Moveable
        className="moveable"
        :target="[`.sort`]"
        :draggable="true"
        @drag="onDrag"
  />
    </div>
  </div>
  <div></div>
</template>

<script>
  import PostItSingle from "./PostItSingle.vue";
  import Moveable from "vue3-moveable";


  export default {
    components: {
      PostItSingle,
      Moveable
    },
    data(){
      return {
        postIts: [],
      }
    },
    async created(){
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
      this.$emit('create');
    },
     methods: {
      onDrag({ target, transform }) {
        target.style.transform = transform;
        this.$emit('dragPostIt', this.id, transform);
      },
      
      newPostit() {

        let newPostIt = {"title": "New post It", "content": ["click on show to edit"]};

        let requestOptions = {
          method: 'POST',
          headers: {
              "Content-Type": "application/json",
              "username": "val"
          },
          body: JSON.stringify(newPostIt),
          redirect: 'follow'
        };

        fetch("http://origin.sysroot.ovh:3000/notes", requestOptions)
          .then(async (response) => {
            try {
              const { note_id } = await response.json();
              
              const noteResponse = await fetch('http://origin.sysroot.ovh:3000/notes/'+ note_id, {
                method: 'GET',
                headers: {
                  "Content-Type": "application/json",
                  "username": "val"
                },
                redirect: 'follow',
              })
    
              const { note } = await noteResponse.json();

              this.postIts.push({
                'id': note.id,
                'title': note.title,
                'content': note.content,
              });
            } catch(error) {
              console.error(error);
            }
          });
      },
      removePostItById(postItID = '') {
        if (!postItID) {
          return;
        }

        const elem = document.querySelector(`.postItId-${postItID}`);
        elem.parentNode.removeChild(elem);
      },

      sort(){
        console.log('coucou')
        let post =[]
        for(let x = 0 ; x < this.postIts.length ; x++){
          let query = document.getElementsByClassName('postIt')
          post.push(query[x])
        }
        for (let i = 0 ; i < 4 ; i++){
          post[i].style.top = `${100 + i * 185}px`
          post[i].style.left = `${130 + 185 * 0}px`

        }
        for (let i = 4 ; i < 8 ; i++){
          post[i].style.top = `${100 + (i - 4) * 185}px`
          post[i].style.left = `${130 + 185 * 1}px`
        }
        for (let i = 8 ; i < 12 ; i++){
          post[i].style.top = `${100 + (i - 8) * 185}px`
          post[i].style.left = `${130 + 185 * 2}px`
        }
        for (let i = 12 ; i < 16 ; i++){
          post[i].style.top = `${100 + (i - 12) * 185}px`
          post[i].style.left = `${130 + 185 * 3}px`
        }
        for (let i = 16 ; i < 20 ; i++){
          post[i].style.top = `${100 + (i - 16) * 185}px`
          post[i].style.left = `${130 + 185 * 4}px`
        }
        for (let i = 20 ; i < 24 ; i++){
          post[i].style.top = `${100 + (i - 20) * 185}px`
          post[i].style.left = `${130 + 185 * 5}px`
        }
        for (let i = 24 ; i < 28 ; i++){
          post[i].style.top = `${100 + (i - 24) * 185}px`
          post[i].style.left = `${130 + 185 * 6}px`
        }
        for (let i = 28 ; i < 32 ; i++){
          post[i].style.top = `${100 + (i - 28) * 185}px`
          post[i].style.left = `${130 + 185 * 7}px`
        }
        for (let i = 32 ; i < 36 ; i++){
          post[i].style.top = `${100 + (i - 32) * 185}px`
          post[i].style.left = `${130 + 185 * 8}px`
        }
      }
    }
  }

</script>

<style>
.postIt{
  background-color: yellow;
  width: 175px;
  height: 175px;
  padding: 5px;
  position: absolute;
}
.postIt:hover{
  z-index: 2;
}
.postItDel{
  position: absolute;
  top:5px;
  right: 5px;
}
#show{
  position: absolute;
  bottom: 5px;
  right: 5px;
}
</style>