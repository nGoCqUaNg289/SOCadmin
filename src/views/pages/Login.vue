<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="5">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Đăng nhập</h1>
                  <p class="text-muted">Đăng nhập vào tài khoản quản trị</p>
                  <CInput
                    placeholder="Tài khoản"
                    autocomplete="username email"
                    v-model="username"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-user"
                    /></template>
                  </CInput>
                  <CInput
                    placeholder="Mật khẩu"
                    type="password"
                    autocomplete="curent-password"
                    v-model="password"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-lock-locked"
                    /></template>
                  </CInput>
                  <CRow style="margin: 10px 10px 10px 10px">
                    <CCol col="6" class="text-left">
                      <CButton
                        color="primary"
                        class="px-4"
                        style="margin: 10px 10px 10px 10px"
                        @click="LoginJWT()"
                        >Đăng nhập</CButton
                      >
                    </CCol>
                    <CCol col="6" class="text-right">
                      <CButton color="link" class="px-0">Quên mật khẩu</CButton>
                      <!-- <CButton color="link" class="d-lg-none"
                        >Register now!</CButton
                      > -->
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <!-- <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h2>Sign up</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <CButton color="light" variant="outline" size="lg">
                  Register Now!
                </CButton>
              </CCardBody>
            </CCard> -->
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    LoginJWT() {
      console.log("username: " + this.username);
      console.log("password: " + this.password);
      axios
        .post("http://socstore.club:8800/api/authentication/login", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          console.log("username: " + this.username);
          console.log("password: " + this.password);

          this.$store.state.userToken =
            response.data.tokenType + " " + response.data.accessToken;

          console.log(this.$store.state.userToken);

          if (response.data.roles[0] == "Director") {
            this.$router.push({
              path: "/",
            });
            console.log("Chuyển trang admin");
          } else if (response.data.roles[0] == "Staff") {
            this.$router.push({
              path: "/",
            });
            console.log("Chuyển trang admin");
          } else {
            console.log("Tài khoản hoặc mật khẩu không chính xác !");
          }
        })
        .catch((e) => {
          this.error.push(e);
        });
    },

    getDataUser() {},
    direcToDash() {
      this.$router.push({
        path: "/",
      });
    },
  },
};
</script>
<style scoped>
.form-group {
  margin: 10px;
}
</style>
