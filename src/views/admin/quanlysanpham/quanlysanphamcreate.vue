<template>
  <div>
    <CRow>
      <CCol md="12">
        <CButton
          type="reset"
          size="sm"
          color="danger"
          class="btn btn-custom-size"
        >
          <i class="cil-x"></i>
          Huỷ
        </CButton>
        <CButton
          type="submit"
          size="sm"
          color="primary"
          class="btn btn-custom-size"
          @click="createProduct()"
          v-if="checkProduct == 1"
        >
          <i class="cil-plus"></i>
          Lưu sản phẩm
        </CButton>
      </CCol>
      <br />
      <br />
      <CCol md="12" lg="12">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong> Thông tin của sản phẩm </strong>
            <CButton
              type="submit"
              size="sm"
              color="primary"
              class="btn btn-custom-size"
              @click="createProduct()"
            >
              <i class="cil-plus"></i>
              Lưu sản phẩm
            </CButton>
          </CCardHeader>
          <CCardBody height="auto">
            <CListGroup>
              <CListGroupItem
                >Tên máy:
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Nhập tên máy"
                  v-model="formData.name"
                  style="width: 80%"
                />
              </CListGroupItem>
              <CListGroupItem
                >Giá:
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Giá máy"
                  v-model="formData.price"
                  style="width: 80%"
              /></CListGroupItem>
              <CListGroupItem
                >Thời gian bảo hành:
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Trạng thái máy"
                  v-model="formData.warranty"
                  style="width: 5%"
                />
                <span>tháng</span></CListGroupItem
              >
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md="12" lg="12">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong> Thông tin chi tiết sản phẩm </strong>
          </CCardHeader>
          <CCardBody height="auto">
            <CListGroup>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">
                      <button @click="createNewValue()" style="border: none">
                        +
                      </button>
                    </th>
                    <th scope="col">Sản phẩm</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in orderDetails" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td><input type="text" v-model="item.quantity" /></td>
                    <td><input type="text" v-model="item.discount" /></td>
                    <td>
                      <i
                        class="cil-trash"
                        style="color: red"
                        @click="deleteProduct(index)"
                      ></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "QuanLySanPhamCreate",
  data() {
    return {
      formData: {
        name: "",
        price: "",
        warranty: 0,
      },
      checkProduct: 0
    };
  },
  methods: {
    validator(val) {
      return val ? val.length >= 4 : false;
    },
    createProduct() {
      console.log("abc");
      const formData = new FormData();
      for (let index in this.formData) {
        formData.append(index, this.formData.index);
      }
      console.log(this.formData);
      axios
        .post(
          "http://150.95.105.29:8800/api/admin/products/newproduct",
          this.formData,
          {
            headers: {
              // Authorization: this.$store.state.userToken,
              Authorization: localStorage.usertoken,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.$router.push(
            `/admin/quanlysanphamcreatedetail/${response.data.object.id}`
          );
        })
        .catch(function (error) {
          alert(error);
        });
    },
    CancelCreate() {
      this.$router.push("/quanlysanphamlist");
    },
    UpdateProduct() {
      this.$router.push("/quanlysanphamupdate");
    },
  },
};
</script>
<style scope>
.btn-custom-size {
  width: 130px;
  margin-left: 15px;
  float: right;
}
.input-custom-border-none {
  border: none;
  box-shadow: none;
  box-sizing: border-box;
}
.title-td {
  width: 35%;
}
</style>
