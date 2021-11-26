<template>
  <div>
    <CRow>
      <CCol md="12">
        
        <CButton type="reset" size="sm" color="danger" class="btn btn-custom-size">
          <i class="cil-x"></i>
          Huỷ 
        </CButton>
        <CButton type="submit" 
        size="sm" color="primary" 
        class="btn btn-custom-size"
        @click="createProduct()"
        >
          <i class="cil-plus"></i>
          Lưu sản phẩm
          </CButton>
      </CCol>
      <br/>
      <br/>
      <CCol md="12" lg="5">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong> Thông tin của sản phẩm </strong>
          </CCardHeader>
          <CCardBody height="auto">
            <CListGroup>
              <CListGroupItem
                >Tên máy: <input 
                type="text" 
                class="input-custom-border-none" 
                placeholder="Nhập tên máy"
                v-model="formData.name"
                >
              </CListGroupItem>
              <CListGroupItem>Giá: 
                <input 
                type="text" 
                class="input-custom-border-none" 
                placeholder="Giá máy"
                v-model="formData.price"
                ></CListGroupItem>
              <CListGroupItem>Trạng thái: 
                <input 
                type="text" 
                class="input-custom-border-none" 
                placeholder="Trạng thái máy"
                v-model="formData.status"
                ></CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "QuanLySanPhamCreate",
  data() {
    return {
      formData: {
        name: "",
        price: "",
        status: "",
        warranty: 24
      },
      selected: [],
      show: true,
      horizontal: { label: "col-3", input: "col-9" },
      options: [
        "Dell",
        "HP",
        "LG",
        "Apple",
        "Asus",
        "Lenovo",
        "VAIO",
        "Acer",
        "Samsung",
        "Toshiba",
        "MSI",
      ],
      selectOptions: [
        "Dell",
        "HP",
        "LG",
        "Apple",
        "Asus",
        "Lenovo",
        "VAIO",
        "Acer",
        "Samsung",
        "Toshiba",
        "MSI",
        {
          value: "some value",
          label: "Selected option",
        },
      ],
      selectedOption: "some value",

      formCollapsed: true,
    };
  },
  methods: {
    validator(val) {
      return val ? val.length >= 4 : false;
    },
    createProduct(){
      console.log("abc")
      const formData = new FormData();
      for (let index in this.formData) {
        formData.append(index, this.formData.index);
      }
      console.log(this.formData);
      axios
        .post(
          "http://150.95.105.29:8800/api/admin/products/newproduct",
          this.formData,{
            headers: {
              Authorization: this.$store.state.userToken,
            },
          }
        )
        .then((response) => {
        console.log(response)
        this.$router.push(`/admin/quanlysanphamcreatedetail/${response.data.object.id}`);
        })
        .catch(function(error) {
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
.btn-custom-size{
  width: 130px;
  margin-left: 15px;
  float: right
}
.input-custom-border-none{
  border: none;
  box-shadow: none;
  box-sizing: border-box;
}
.title-td{
  width: 35%;
}
</style>
