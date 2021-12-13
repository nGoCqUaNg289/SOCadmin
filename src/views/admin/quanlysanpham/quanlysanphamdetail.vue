<template>
  <div>
    <CRow>
      <CCol md="12">
        <CButton
          type="reset"
          size="sm"
          color="danger"
          class="btn btn-custom-size"
          @click="backList()"
          v-if="checkUpdate == 0"
        >
          <!-- <i class="cil-x"></i> -->
          Trở lại
        </CButton>
        <CButton
          type="reset"
          size="sm"
          color="danger"
          class="btn btn-custom-size"
          @click="cancelUpdate()"
          v-else-if="checkUpdate == 1"
        >
          <!-- <i class="cil-x"></i> -->
          Huỷ
        </CButton>
        <CButton
          type="submit"
          size="sm"
          color="primary"
          class="btn btn-custom-size"
          @click="updateProduct()"
          v-if="checkUpdate == 0"
        >
          <!-- <i class="cil-plus"></i> -->
          Cập nhật
        </CButton>
        <CButton
          type="submit"
          size="sm"
          color="primary"
          class="btn btn-custom-size"
          @click="updateProduct()"
          v-else-if="checkUpdate == 1"
        >
          <i class="cil-sync"></i>
          Cập nhật
        </CButton>
      </CCol>
      <br />
      <br />

      <CCol md="12" lg="6">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong> Ảnh sản phẩm</strong>
          </CCardHeader>
          <CCardBody>
            <CCarousel arrows indicators animate height="auto" > 

              <div class="container">
                <div class="row row-cols-3">
                  <div class="col" v-for="itemPhoto in getData.photos" :key="itemPhoto">
                    <img :src="itemPhoto" class="d-block w-100" alt="...">
                  </div>
                </div>
              </div>

            </CCarousel>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md="12" lg="6">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong> Thông tin của sản phẩm </strong>
          </CCardHeader>
          <CCardBody height="auto">
            <CListGroup>
              <CListGroupItem>
                <span class="Title-font-size">Mã số máy : </span>
                <span>{{ getData.id }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Tên máy : </span>
                <span v-if="checkUpdate == 0">{{ getData.name }}</span>
                <input 
                type="text" 
                class="input-custom-border-none" 
                placeholder="Nhập tên máy"
                v-model="getData.name"
                style="width: 100%; border-bottom: 1px solid gray"
                v-else-if="checkUpdate == 1"
                >
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Thương hiệu : </span>
                <span>{{ getData.id }}</span>
                <!-- <input 
                type="text" 
                class="input-custom-border-none" 
                placeholder="Nhập tên máy"
                v-model="getData.name"
                style="width: 60%; border-bottom: 1px solid gray"
                v-else-if="checkUpdate == 1"
                > -->
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Giá : </span>
                <span v-if="checkUpdate == 0">{{ formatPrice(getData.price) }} đ</span>
                <input 
                type="number" 
                class="input-custom-border-none" 
                placeholder="Nhập giá máy"
                v-model="getData.price"
                style="width: 100%; border-bottom: 1px solid gray"
                v-else-if="checkUpdate == 1"
                >
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Giảm giá : </span>
                <span v-if="checkUpdate == 0">{{ getData.discount }}</span>
                <input 
                type="number" 
                class="input-custom-border-none" 
                placeholder="Nhập giảm giá"
                v-model="getData.discount"
                style="width: 100%; border-bottom: 1px solid gray"
                v-else-if="checkUpdate == 1"
                >
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Trạng thái : </span>
                <span>{{ getData.status }}</span>
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Thời gian bảo hành: : </span>
                <span v-if="checkUpdate == 0">{{ getData.warranty }}</span>
                <input 
                type="number" 
                class="input-custom-border-none" 
                placeholder="Nhập giá máy"
                v-model="getData.warranty"
                style="width: 100%; border-bottom: 1px solid gray"
                v-else-if="checkUpdate == 1"
                >
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md="12">
        <!-- <strong> Thông tin cấu hình sản phẩm </strong> -->
        <table class="table" style="background: white">
          <tbody v-if="checkUpdate == 0">
            <thead>
              <tr>
                <th scope="col">Thông tin cấu hình sản phẩm</th>
              </tr>
            </thead>
            <tr v-for="(item, index1) in getData.productDetails" :key="index1">
              <td>{{item.propertyName}}</td>
              <td>{{item.propertyValue}}</td>
            </tr>      
          </tbody>
          <tbody v-else-if="checkUpdate == 1">
            <thead>
              <tr>
                <th scope="col">Thông tin cấu hình sản phẩm</th>
              </tr>
            </thead>
                <tr v-for="(item, index) in productProperties" :key="index">
                    <!-- <th scope="row">{{ index + 1 }}</th> -->
                    <td>
                      <input type="text" v-model="item.propertyName" style="width: 100%;border: none;border-bottom: 1px dashed;"/>
                    </td>
                    <td><input type="text" v-model="item.propertyValue" style="width: 100%;border: none;border-bottom: 1px dashed;"/></td>
                    <td class="text-center">
                      <button @click="deleteValue(index)" style="border: none; color: red; background-color: white">
                        <i class="cil-trash" style="color: red"></i>
                      </button>
                      
                    </td>
                </tr>  
                <tr>
                  <td class="text-center" colspan="3">
                    <button style="border: none; color: red; background-color: white" @click="createNewValue()">
                      <i class="cil-plus"></i>
                    </button>
                  </td>
                </tr>       
          </tbody>
        </table>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "QuanLySanPhamDetail",
  props: {
    item: Number
  },
  data() {
    return {
      getData: "",
      selected: [], // Must be an array reference!
      show: true,
      horizontal: { label: "col-3", input: "col-9" },
      selectedOption: "some value",
      checkUpdate: 0,
      formCollapsed: true,
      productProperties: []
    };
  },
  created() {
    this.getDetailProduct();
  },
  methods: {
    createNewValue(){
      let item = {
        propertyName: "",
        propertyValue: ""
      }
      this.productProperties.push(item);
    },
    deleteValue(index){
      this.productProperties.splice(index, 1);
    },
    backList(){
      this.$router.push("/admin/quanlysanphamlist")
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    validator(val) {
      return val ? val.length >= 4 : false;
    },
    CancelCreate() {
      this.$router.push("/quanlysanphamlist");
    },
    UpdateProduct() {
      this.$router.push("/quanlysanphamupdate");
    },
    getDetailProduct() {
      axios
        .get(this.$store.state.MainLink + "customer/products/" + this.item)
        .then((response) => {
          this.getData = response.data.object;
          console.log(this.getData);
          this.productProperties = response.data.object.productDetails
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateProduct(){
      this.checkUpdate = 1
    },
    cancelUpdate(){
      this.checkUpdate = 0
    }
  },
};
</script>

<style scoped>
.Title-font-size {
  font-weight: 600;
}
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
