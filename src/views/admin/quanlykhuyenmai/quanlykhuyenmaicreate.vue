<template>
  <div>
    <CRow>
      <br />
      <br />
      <CCol md="12" lg="12">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong>Thông tin khuyến mại</strong>
          </CCardHeader>
          <CCardBody height="auto">
            <CListGroup>
              <div class="form-group">
                <label for="">Tên chương trình khuyến mại:</label>
                <input
                  type="text"
                  class="form-control"
                  name=""
                  id=""
                  aria-describedby="helpId"
                  placeholder=""
                  v-model="formData.name"
                />
              </div>
              <div class="form-group">
                <label for="">Thời gian bắt đầu:</label>
                <input
                  type="datetime-local"
                  class="form-control"
                  name=""
                  id=""
                  aria-describedby="helpId"
                  placeholder=""
                  v-model="formData.startTime"
                  step="1"
                />
                <!-- <input type="datetime-local"> -->
              </div>
              <div class="form-group">
                <label for="">Thời gian kết thúc:</label>
                <input
                  type="datetime-local"
                  class="form-control"
                  name=""
                  id=""
                  aria-describedby="helpId"
                  placeholder=""
                  v-model="formData.endTime"
                  step="1"
                />
              
              </div>
              <div class="form-group">
                <label for="">Trạng thái:</label>
                <input
                  type="text"
                  class="form-control"
                  name=""
                  id=""
                  aria-describedby="helpId"
                  placeholder=""
                  v-model="formData.status"
                />
              
              </div>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md="12">
        <CButton
          type="reset"
          size="sm"
          color="danger"
          class="btn btn-custom-size"
          @click="cancelCreate()"
        >
          <i class="cil-x"></i>
          Huỷ
        </CButton>
        <CButton
          type="submit"
          size="sm"
          color="primary"
          class="btn btn-custom-size"
          @click="creatSale()"
        >
          <i class="cil-plus"></i>
          Lưu
        </CButton>
      </CCol>
    </CRow>
    <!-- </form> -->
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "quanlysalecreate",

  data() {
    return {
      valueoption: 0,
      formCollapsed: true,
      getData: "",
      formData: {
        name: "",
        startTime: "",
        endTime: "",
        statusL:""
      },
      searchP: ""
    };
  },
  created(){
    this.getAllProduct()
  },
  methods: {
    cancelCreate(){
      this.$router.push("/sale/quanlysale");
    },
    creatSale() {
      // console.log("abc");
      const formData = new FormData();
      for (let index in this.formData) {
        formData.append(index, this.formData.index);
      }
      console.log(this.formData);
      axios
        .post("http://150.95.105.29:8800/api/admin/sale/newSale",
          this.formData,
          {
            headers: {
              Authorization: this.$store.state.userToken,
            },
          }
        )
        .then((response) => {
          console.log(response);
          console.log("Thêm mới thành công!");
        })
        .catch(function (error) {
          console.log("Thêm mới thất bại!");
          alert(error);
        });
    },
    searchProduct(){
      // console.log(this.searchP)
      axios
        .get(
          this.$store.state.MainLink + "customer/products?find=" + this.searchP
        )
        .then((response) => {
          this.getData = response.data.object;
          // console.log(response.data.object);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getAllProduct() {
      axios
        .get(this.$store.state.MainLink + "customer/products")
        .then((response) => {
          this.getData = response.data.object;
          // console.log(this.getData);
        })
        .catch((e) => {
          console.log(e);
        });
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
