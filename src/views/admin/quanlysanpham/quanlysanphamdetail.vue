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
          <i class="cil-arrow-left"></i>
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
          Cập nhật
        </CButton>
        <CButton
          type="submit"
          size="sm"
          color="primary"
          class="btn btn-custom-size"
          @click="UpdateProduct()"
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
            <CCarousel arrows indicators animate height="auto">
              <div class="container">
                <div class="row row-cols-3">
                  <div
                    class="col"
                    v-for="itemPhoto in productPhoto"
                    :key="itemPhoto"
                  >
                  <!-- {{itemPhoto}} -->
                    <img :src="itemPhoto" class="d-block w-100" alt="..." />
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
                />
              </CListGroupItem>
              <CListGroupItem>
                <span class="Title-font-size">Giá : </span>
                <span v-if="checkUpdate == 0"
                  >{{ formatPrice(getData.price) }} đ</span
                >
                <input
                  type="number"
                  class="input-custom-border-none"
                  placeholder="Nhập giá máy"
                  v-model="getData.price"
                  style="width: 100%; border-bottom: 1px solid gray"
                  v-else-if="checkUpdate == 1"
                />
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
                />
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md="12" lg="12" v-if="checkUpdate == 1">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong> Thể loại sản phẩm </strong>
          </CCardHeader>
          <CCardBody height="auto">
            <CListGroup>
              <table class="table">
                <tbody>
                  <tr v-for="(item, index) in getDataCategory" :key="index">
                    <th>{{ item.name }}</th>
                    <td scope="row" class="td-table" style="width: 55%">
                      <div
                        v-for="items in item.categories"
                        :key="items.id"
                        style="margin-left: 15%"
                      >
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :value="items.id"
                          id="flexCheckDefault"
                          @click="saveCategory(items.id)"
                        />
                        <label
                          class="form-check-label"
                          for="flexCheckDefault"
                          style="margin-left: 15px"
                        >
                          {{ items.name }}
                        </label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md="12">
        <table class="table" style="background: white">
          <tbody v-if="checkUpdate == 0">
            <thead>
              <tr>
                <th scope="col" colspan="2">Màu và số lượng sản phẩm</th>
              </tr>
            </thead>
            <tr v-for="(item, index2) in getData.productColors" :key="index2">
              <td style="width: 35%">{{ item.color.colorName }}</td>
              <td>{{ item.quantity }}</td>
            </tr>
          </tbody>
          <tbody v-else-if="checkUpdate == 1">
            <thead>
              <tr>
                <th scope="col">Màu và số lượng sản phẩm</th>
              </tr>
            </thead>
            <tr v-for="(item, index) in productColor" :key="index">
              <td>
                <select
                  class="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  v-model="item.colorId"
                  style="
                    border: none;
                    border-bottom: 1px dashed;
                    box-shadow: none;
                  "
                >
                  <option selected disabled>Chọn màu ...</option>
                  <option
                    :value="color.id"
                    v-for="color in getDataColor"
                    :key="color.id"
                  >
                    {{ color.colorName }}
                  </option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  oninput="this.value = Math.abs(this.value)"
                  min="1"
                  v-model="item.quantity"
                  style="width: 100%; border: none; border-bottom: 1px dashed"
                />
              </td>
              <td class="text-center">
                <i
                  class="cil-trash"
                  style="color: red"
                  @click="deleteColor(index)"
                ></i>
              </td>
            </tr>
            <tr>
              <td class="text-center" colspan="3">
                <button
                  style="border: none; color: red; background-color: white"
                  @click="createNewColor()"
                >
                  <i class="cil-plus"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </CCol>
      <CCol md="12">
        <table class="table" style="background: white">
          <tbody v-if="checkUpdate == 1">
            <thead>
              <tr>
                <th scope="col">Ảnh sản phẩm</th>
              </tr>
            </thead>

            <tr v-for="(photo, index) in productPhoto" :key="index + 1000">
              <td>
                <!-- {{item}} -->
                <input
                  :value="photo"
                  type="text"
                  :v-model="photo"
                  style="width: 100%; border: none; border-bottom: 1px dashed"
                />
              </td>
              <td class="text-center">
                <i
                  class="cil-trash"
                  style="color: red"
                  @click="deletePhoto(index)"
                ></i>
              </td>
            </tr>
            <tr>
              <td class="text-center" colspan="3">
                <button
                  style="border: none; color: red; background-color: white"
                  @click="createNewPhoto()"
                >
                  <i class="cil-plus"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </CCol>
      <CCol md="12">
        <table class="table" style="background: white">
          <tbody v-if="checkUpdate == 0">
            <thead>
              <tr>
                <th scope="col">Thông tin cấu hình sản phẩm</th>
              </tr>
            </thead>
            <tr v-for="(item, index1) in getData.productDetails" :key="index1">
              <td>{{ item.propertyName }}</td>
              <td>{{ item.propertyValue }}</td>
            </tr>
          </tbody>
          <tbody v-else-if="checkUpdate == 1">
            <thead>
              <tr>
                <th scope="col">Thông tin cấu hình sản phẩm</th>
              </tr>
            </thead>
            <tr v-for="(item, index) in productProperties" :key="index">
              <td>
                <input
                  type="text"
                  v-model="item.propertyName"
                  style="width: 100%; border: none; border-bottom: 1px dashed"
                />
              </td>
              <td>
                <input
                  type="text"
                  v-model="item.propertyValue"
                  style="width: 100%; border: none; border-bottom: 1px dashed"
                />
              </td>
              <td class="text-center">
                <button
                  @click="deleteValue(index)"
                  style="border: none; color: red; background-color: white"
                >
                  <i class="cil-trash" style="color: red"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td class="text-center" colspan="3">
                <button
                  style="border: none; color: red; background-color: white"
                  @click="createNewValue()"
                >
                  <i class="cil-plus"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </CCol>
    </CRow>

    <CModal
      :show.sync="successModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Xác nhận hoàn hàng"
      size="lg"
      color="success">
      <template #header>
        <h6 class="modal-title">Xác nhận</h6>
        <CButtonClose @click="successModal = false" class="text-white"/>
      </template>
            <div class="text-center">
      <sweetalert-icon icon="success" />
            Cập nhật sản phẩm thành công !
      </div>
      <template #footer>
        <CButton @click="successModal = false" color="secondary">Hủy</CButton>
        <CButton @click="successModal = false, backList()" color="success" style="color: white">Trở về danh sách</CButton>
      </template>
    </CModal>

    <CModal
      :show.sync="failModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Xác nhận hoàn hàng"
      size="lg"
      color="danger">
      <template #header>
        <h6 class="modal-title">Xác nhận</h6>
        <CButtonClose @click="failModal = false" class="text-white"/>
      </template>
            <div class="text-center">
      <sweetalert-icon icon="error" />
            {{errorMessage}} !
      </div>
      <template #footer>
        <CButton @click="failModal = false" color="secondary">Hủy</CButton>
        <CButton @click="failModal = false" color="danger" style="color: white">OK</CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "QuanLySanPhamDetail",
  props: {
    item: Number,
  },
  data() {
    return {
      failModal: false,
      successModal: false,
      getData: "",
      checkUpdate: 0,
      formCollapsed: true,
      productProperties: [],
      productColor: [],
      productCategory: [],
      productPhoto: [],
      getDataCategory: "",
      getDataColor: "",
      errorMessage: "",
    };
  },
  created() {
    this.getDetailProduct();
    this.getColor();
    this.getAllCategory();
  },
  methods: {
    saveCategory(item) {
      let items = {
        categoryId: item,
      };

      let idx = -1;
      if (
        this.productCategory.filter((prc, i) => {
          if (item == prc.categoryId) idx = i;
          return item == prc.categoryId;
        }).length > 0
      ) {
        this.productCategory.splice(idx, 1);
      } else {
        this.productCategory.push(items);
      }

      // console.log(this.productCategory);
    },
    createNewColor() {
      let item = {
        colorId: "",
        quantity: 0,
      };
      this.productColor.push(item);
    },
    createNewPhoto() {
      let item = "";
      this.productPhoto.push(item);
      console.log(this.productPhoto)
    },
    createNewValue() {
      let item = {
        propertyName: "",
        propertyValue: "",
      };
      this.productProperties.push(item);
    },
    deleteValue(index) {
      this.productProperties.splice(index, 1);
    },
    deletePhoto(index) {
      this.productPhoto.splice(index, 1);
    },
    deleteColor(index) {
      this.productColor.splice(index, 1);
    },
    backList() {
      this.$router.push("/admin/quanlysanphamlist");
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
      this.productProperties.push(this.getData.photos)

      let item = {
        id: this.getData.id,
        photos: this.getData.photos,
        price: this.getData.price,
        name: this.getData.name,
        discount: this.getData.discount,
        blogs: this.getData.blogs,
        productColors: this.productColor,
        productDetails: this.productProperties,
        productCategories: this.productCategory,
        status: this.getData.status,
        warranty: this.getData.warranty,
      };

      console.log(item);
      // axios
      //   .put(this.$store.state.MainLink + "admin/products/update", item, {
      //     headers: {
      //       Authorization: this.$store.state.userToken,
      //     },
      //   })
      //   .then((response) => {
      //     this.getData = response.data.object;
      //     console.log(this.getData);
      //     this.productProperties = response.data.object.productDetails;
      //     this.productColor = response.data.object.productColors;
      //     this.successModal = true
      //   })
      //   .catch((e) => {
      //     console.log(e.response.data);
      //     this.errorMessage = e.response.data.errorMsg
      //     this.failModal = true
      //   });
    },
    getDetailProduct() {
      axios
        .get(this.$store.state.MainLink + "customer/products/" + this.item)
        .then((response) => {
          this.getData = response.data.object;
          console.log(this.getData);
          this.productProperties = response.data.object.productDetails;
          this.productColor = response.data.object.productColors;
          this.productPhoto = response.data.object.photos;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateProduct() {
      this.checkUpdate = 1;
    },
    cancelUpdate() {
      this.checkUpdate = 0;
    },
    getColor() {
      axios
        .get(this.$store.state.MainLink + "admin/color/get", {
          headers: {
            Authorization: this.$store.state.userToken,
          },
        })
        .then((response) => {
          this.getDataColor = response.data.object;
          console.log(this.getDataColor);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getAllCategory() {
      axios
        .get(this.$store.state.MainLink + "customer/categories?active=true", {
          headers: {
            Authorization: this.$store.state.userToken,
          },
        })
        .then((response) => {
          this.getDataCategory = response.data.object;
          console.log(this.getDataCategory);
        })
        .catch((e) => {
          console.log(e);
        });
    },
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
