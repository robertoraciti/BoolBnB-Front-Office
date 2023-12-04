<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: "",
      },
    };
  },
  props: {
    apartment: Object,
  },
  methods: {
    async submit() {
      console.log(this.form);
      axios
        .post("where api", this.form)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          // this.$router.push({ name: "not-found" });
        });
    },
  },
};
</script>

<template>
  <div
    class="modal fade"
    :id="'messageModal-' + apartment.id"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="messageModalLabel">Send message</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form @submit.prevent="submit">
          <div class="modal-body">
            <div class="mb-3">
              <label for="name" class="form-label">Insert name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                name="name"
                v-model="form.name"
                required
                data-parsley-trigger="keyup"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"
                >Insert email address *</label
              >
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
                required
                v-model="form.email"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label"
                >Insert message *</label
              >
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                required
                v-model="form.message"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" class="btn btn-primary">submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
