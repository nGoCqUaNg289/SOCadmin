<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
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
            <CCard
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
            </CCard>
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
    // callFunction: function () {
    //   var v = this;
    //   setTimeout(function () {
    //     v.callFunctionTotal();
    //   }, 0);
    // },
    // callFunctionTotal: function () {
    //   var v = this;
    //   setTimeout(function () {
    //     if (localStorage.userToken != "") {
    //       v.getTotalCart();
    //     }
    //   }, 1000);
    // },
    LoginJWT() {
      console.log("username: " + this.username);
      console.log("password: " + this.password);
      axios
        .post("https://javamahtest.herokuapp.com/api/authentication/login", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          console.log("username: " + this.username);
          console.log("password: " + this.password);
          // localStorage.userToken =
          //   response.data.tokenType + " " + response.data.accessToken;
          // this.$store.state.tokenUser = localStorage.userToken;
          // this.$store.state.userName = response.data.username;

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
          } else if (response.data.roles[0] == "User") {
            console.log("Đăng nhập user");
          } else {
            console.log("Tài khoản hoặc mật khẩu không chính xác !");
          }
        })
        .catch((e) => {
          this.error.push(e);
          // console.log(e);
        });
    },

    getTotalCart() {
      axios
        .get("https://javamahtest.herokuapp.com/api/customer/cart/get", {
          headers: {
            Authorization: this.$store.state.tokenUser,
          },
        })
        .then((response) => {
          // this.$store.state.totalCart = response.data.object.length;
          localStorage.sumCart = response.data.object.length;
          this.$store.state.totalCart = localStorage.sumCart;

          // this.$store.state.StoreCart = response.data.object;
          // localStorage.detailCart = response.data.object;

          var detailCart = JSON.parse(localStorage.getItem("detailCart")) || [];
          detailCart.push(response.data.object);
          localStorage.setItem("detailCart", JSON.stringify(detailCart));

          this.$store.state.StoreCart = JSON.parse(localStorage.detailCart)[0];
          // console.log(this.$store.state.test);
          // console.log(response.data.object);
          // console.log(JSON.parse(localStorage.detailCart)[0]);

          this.$store.state.StoreCartUser = localStorage;

          // console.log(localStorage.detailCart);
          // console.log(this.$store.state.StoreCartUser);
          // console.log(response.data.object);
        })
        .catch((e) => {
          this.error.push(e);
          console.log(e);
        });
    },
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
