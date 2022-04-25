<template>
   
    <div class="container">
    
        <div
            :class="[
                'postIt',
                `target-${id}`,
            ]">
            <br/>
            <h5>
                {{ title }}
            </h5>
            <br/>
            <p class="postItContent">
                {{ formatedContent }}
            </p>
            <button
                class="btn-sm btn-danger postItDel" 
                @click="suprimer(id)">
                X
            </button>
            <router-link
                :to="'/show/' + id"
                id="show"
                class="btn-sm btn-primary">
                show
            </router-link>
        </div>
        <Moveable
            className="moveable"
            :target="[
                `.target-${id}`
            ]"
            :draggable="true"
            @drag="onDrag"
            />
    </div>


</template>

<script>
    import Moveable from "vue3-moveable";

    export default {
        components: {
            Moveable,
        },
        props: {
            id: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            content: {
                type: Array,
                default: ()=> {
                    return [];
                }
            }
        },
        computed: {
            formatedContent() {
                if (!this.content.length) {
                    return '';
                }

                return this.content[0];
            }
        },
        methods: {
            onDrag({ target, transform }) {
                target.style.transform = transform;
                this.$emit('dragPostIt', this.id, transform);
            },
            suprimer(id) {
                const requestOptions = {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                        "username": "val"
                    },
                    redirect: 'follow',
                };

                fetch('http://origin.sysroot.ovh:3000/notes/'+ id, requestOptions)
                    .then((request, response) => {
                        console.log(request);
                        console.log(response);
                        // location.reload();
                        this.$emit('delPostIt', id);
                    });


            },
        },
    }
</script>

<style>
    .moveable-control-box {
        visibility: hidden !important;
    }

    .moveable-control {
        visibility: hidden !important;
    }
    .postItContent{
    /* text-overflow: ellipsis;
     */
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    display: block;
    overflow: hidden;
    }
</style>