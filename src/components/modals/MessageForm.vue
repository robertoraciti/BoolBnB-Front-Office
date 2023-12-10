<script>
import axios from "axios";
import { store } from "../../data/store.js";
import authService from "../../auth.js";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        text: "",
        read: false,
        apartment_id: this.apartment.id,
      },
      user: null,
    };
  },
  props: {
    apartment: Object,
    // user: Object,
  },
  methods: {
    async submit() {
      // console.log(this.form);
      axios
        .post(store.api.baseUrl + "message", this.form)
        .then((response) => {
          console.log("sent");
        })
        .catch((error) => {
          // this.$router.push({ name: "not-found" });
        });
    },

    loadUserData() {
      // Ottieni i dati dell'utente dal servizio di autenticazione
      this.user = authService.getUser();
    },

    newUser() {
      if (this.user) {
        this.form.name = this.user.name;
        this.form.email = this.user.email;
      }
    },
  },
  mounted() {
    this.loadUserData();
    this.newUser();
  },
};
</script>

<template>
  <div
    class="modal fade"
    :id="'messageModal-' + apartment.id"
    tabindex="-1"
    aria-labelledby="messageModal"
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
              <label for="email" class="form-label"
                >Insert email address *</label
              >
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="name@example.com"
                required
                v-model="form.email"
              />
            </div>
            <div class="mb-3">
              <label for="text" class="form-label">Insert message *</label>
              <textarea
                class="form-control"
                id="text"
                rows="3"
                required
                v-model="form.text"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="button-2" data-bs-dismiss="modal">
              Close
            </button>
            <button type="submit" class="button" data-bs-dismiss="modal">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button {
  background-color: #a3c422;
  border: 1px solid black;
  padding: 5px 35px;
  border-radius: 20px;
  font-weight: 400;
}

.button:hover {
  background-color: rgba(0, 0, 0, 0.615);
  color: #a3c422;
}

.button-2 {
  background-color: #dcd2c3;
  border: 1px solid black;
  padding: 5px 35px;
  border-radius: 20px;
  font-weight: 400;
  color: black;
  text-decoration: none;

  &:hover {
    // background-color: rgba(0, 0, 0, 0.332);
    background-color: rgba(0, 0, 0, 0.673);
    color: #a3c422;
  }
}
</style>
