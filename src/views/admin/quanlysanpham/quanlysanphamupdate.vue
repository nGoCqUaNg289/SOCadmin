<template>
  <div>
    <div class="col-12 col-title">
      <div class="col-md-6 float-left margin-left">
        <p class="Text-tile">Chỉnh sửa nội dung sản phẩm</p>
        <p class="Text-tile-2">Trang chủ ● Sản phẩm</p>
      </div>
      <div class="col-md-6 float-right">
        <button type="button" class="btn btn-danger float-right btn-add" @click="CancelCreate()">
          <i class="cil-x-circle"></i>
          Hủy
        </button>
        <button type="button" class="btn btn-primary float-right btn-add">
          <i class="cil-check-circle"></i>
          Lưu
        </button>
      </div>
    </div>
    <!-- <div class="col-12 ">
        <i class="cil-barcode"></i>
        <input class="input-code-product" type="text" placeholder="Mã sản phẩm">
    </div> -->
    <CRow class="row-width">
      <CCol lg="12">
        <CCard id="background-color" class="c">
          <CCardBody>
            <CRow class="">
              <CCol class="border-col">
                <i class="cil-barcode"></i>
                <CInput
                  id="input-full-size"
                  class=""
                  :placeholder="`Mã sản phẩm`"
                />
              </CCol>
            </CRow>
            <CRow class="form-group">
              <CCol class="border-col">
                <i class="cil-justify-center"></i>
                <CInput
                  id="input-full-size"
                  class="mb-6"
                  :placeholder="`Tên sản phẩm`"
                />
              </CCol>
              <CCol class="border-col">
                <i class="cil-color-palette"></i>
                <CInput
                  id="input-full-size"
                  class="mb-6"
                  :placeholder="`Màu sắc`"
                />
              </CCol>
            </CRow>
            <CRow class="form-group">
              <CCol class="border-col">
                <i class="cil-tag"></i>
                <CSelect
                  id="input-full-size"
                  :options="options"
                  :placeholder="`Hãng sản xuất`"
                />
              </CCol>
              <CCol class="border-col">
                <i class="cib-statuspage"></i>
                <CInput
                  id="input-full-size"
                  class="mb-6"
                  :placeholder="`Trạng thái`"
                />
              </CCol>
            </CRow>
            <CRow class="form-group">
              <CCol class="border-col">
                <i class="cil-money"></i>
                <CInput
                  id="input-full-size"
                  class="mb-6"
                  :placeholder="`Giá sản phẩm`"
                />
              </CCol>
              <CCol class="border-col">
                <i class="cil-money"></i>
                <CInput
                  id="input-full-size"
                  class="mb-6"
                  :placeholder="`Giá sale`"
                />
              </CCol>
            </CRow>
            <CRow class="form-group">
              <CCol class="border-col">
                <i class="cil-calendar"></i>
                <CInput
                  placeholder="Thời gian bắt đầu sale"
                  class="textbox-n"
                  type="text"
                  onfocus="(this.type='date')"
                  id="date"
                />
              </CCol>
              <CCol class="border-col">
                <i class="cil-calendar"></i>
                <CInput
                  placeholder="Thời gian kết thúc sale"
                  class="textbox-n"
                  type="text"
                  onfocus="(this.type='date')"
                  id="date"
 
                />
              </CCol>
            </CRow>
            <CRow class="form-group">
              <CCol>
                <i class="cil-image"></i> 
                <input class="image-upload" type="file" name="files[]" placeholder="Ảnh sản phẩm" display="none"/>
              </CCol>
            </CRow>
          </CCardBody>
          <!-- <CCardFooter>
            <CButton size="sm" color="primary">Action</CButton>
            <CButton size="sm" color="danger">Action</CButton>
            <CButton size="sm" color="warning">Action</CButton>
            <CButton size="sm" color="info">Action</CButton>
            <CButton size="sm" color="success">Action</CButton>
          </CCardFooter> -->
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
export default {
  name: "QuanLySanPhamUpdate",

  data() {
    return {
      selected: [], // Must be an array reference!
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
    CancelCreate() {
      this.$router.push("/quanlysanphamlist");
    }
  },
};
</script>

<style></style>
