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
        >
          <i class="cil-plus"></i>
          Lưu sản phẩm
        </CButton>
      </CCol>
      <br />
      <br />
      <CCol md="12" lg="7">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <!-- <i class="cil-image"></i>  -->
            <strong> Ảnh sản phẩm</strong>
          </CCardHeader>
          <CCardBody>
            <CCarousel arrows indicators animate height="auto">
              <CCarouselItem
                image="https://lh3.googleusercontent.com/tO5ZIikKnOZe-58SYLdSQ_vcftONB7rqAaZuuXs98IU1zdtXouuJBX3dNW9E3uoBpImjMx95HRgjoLxfAZPI5ffsJi-n9Ro1FgWxOWDb-zQ3mT_DqBX7IUQ6F5zxuo_cIrMENOX0ma8R_Aj-BVwc-suDPDI8b553TJjUj6xo5Cg-LysIhb7wRVokHZCKMkejNPuB_FZECCp55GJ6-vohJVMknIkMpAs9LbY_v4N6t3NO-F8VjvgVR44xUnDRuO3BCkKTKJ4Oq220Rvt4aT0OJdgskhfY2WjVZW-5I8hcU8W43fmejEtVAkWr8rB4qS5BOyOUzsX6nq4JfqiEIJ-RsAqjizf8QtHT5Ra1N-JJzRBvYNCCs2P_zGBvoo6kmUikhEGBoFk6XtF9hbXAtzPvER_vhWHla1MqxPptFcbQPgNeLrd6vWOaVm2AUuv6oFlnIysohZho_e8uGxb4SMqZnKCCGj1TkxjGPGD6gQskAs3pNIkuM19uJwJnbXk56VNRGkVtInb9F4oObjGSaRlyLdhtl9V2U4m-vuGk7pL83_vqP-hKibnup4m_TCLpf0OSKkKZHmpPs58P_KTOW5zATS2ugAiU0qGy5j6NrrbjH_N5LeGqv6L_Ss5IxFzkM2Piz-l6fmgoHnlwwOBf7fmQRlovSbZX0r4aN-g7MBLi8FdRNwpDedIvEvKjalzEZ-MjDkrnAqrzKHH9EMddYx9Yd81U=w708-h450-no?authuser=0"
              />
              <CCarouselItem
                image="https://lh3.googleusercontent.com/tO5ZIikKnOZe-58SYLdSQ_vcftONB7rqAaZuuXs98IU1zdtXouuJBX3dNW9E3uoBpImjMx95HRgjoLxfAZPI5ffsJi-n9Ro1FgWxOWDb-zQ3mT_DqBX7IUQ6F5zxuo_cIrMENOX0ma8R_Aj-BVwc-suDPDI8b553TJjUj6xo5Cg-LysIhb7wRVokHZCKMkejNPuB_FZECCp55GJ6-vohJVMknIkMpAs9LbY_v4N6t3NO-F8VjvgVR44xUnDRuO3BCkKTKJ4Oq220Rvt4aT0OJdgskhfY2WjVZW-5I8hcU8W43fmejEtVAkWr8rB4qS5BOyOUzsX6nq4JfqiEIJ-RsAqjizf8QtHT5Ra1N-JJzRBvYNCCs2P_zGBvoo6kmUikhEGBoFk6XtF9hbXAtzPvER_vhWHla1MqxPptFcbQPgNeLrd6vWOaVm2AUuv6oFlnIysohZho_e8uGxb4SMqZnKCCGj1TkxjGPGD6gQskAs3pNIkuM19uJwJnbXk56VNRGkVtInb9F4oObjGSaRlyLdhtl9V2U4m-vuGk7pL83_vqP-hKibnup4m_TCLpf0OSKkKZHmpPs58P_KTOW5zATS2ugAiU0qGy5j6NrrbjH_N5LeGqv6L_Ss5IxFzkM2Piz-l6fmgoHnlwwOBf7fmQRlovSbZX0r4aN-g7MBLi8FdRNwpDedIvEvKjalzEZ-MjDkrnAqrzKHH9EMddYx9Yd81U=w708-h450-no?authuser=0"
              />
              <CCarouselItem
                image="https://lh3.googleusercontent.com/L1o1d5GfaP7VVc_0Sa0fJe5T9vslLmptk2MK9AqAvckLCSuTfbGG-wFWauRtPqNnfca9Aw674QKdszmkRQKP_J8QJCZNRwquHaBwkPY6veSst8-fTtoDdn0KH9UflSss4aBdgIbhmecIYNWNXbsdc5aN31K1Ot2-LF1tWqzHsrtasiv16wPe2HesKZR6E4ftDeEgPqnXBUsQfEW6cja5vGJvTZeZFbBPAoFhpAlUgeCHkarf-yo0Sxy3Zhcy8NDCIDPy79Hh6rj3c4IYQMXV_UejgPfecMLVaGzqYIZtnygEr2FHLbJx9vGPnHuwYBXyr6J6PrLRop1hFqfDP4J3A35j7ZW_7eDPt_xQEckMSH0S2LVy0soaUzPXcZ_lBM8VaDNuAJHTPJFgccVHaB6BVQ9PBvZHRZ5CDs9ru7hYF1CQ_nFuQ95gLU849XXAWMtaqKVGOfrbY32X94s0H4N0bJPkY-gz9nDXFeYHteWYD1ePPd-aUB_yWM6-ndLCzdqjxXWahgIu8qJZIgVczol--GklYJpGMSRsui5W4mrTaZBPQ1mWVdJM6ViS1cETs798iPLJYcm4SVlpwxt0o9l6JBc3xLd7kx4zHysh90yC0_wltXout93LB5YyCnLvTFTiUZK-LpKUsrgQ5RU057Ze4v0KA8xoKN1Kqe5DLLvDLYhAYJPT9RlnIZ0OhV9YinhOgZwI48XAGS3aItSofhrlTck8=w772-h450-no?authuser=0"
              />
            </CCarousel>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md="12" lg="5">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong> Thông tin của sản phẩm </strong>
          </CCardHeader>
          <CCardBody height="auto">
            <CListGroup>
              <CListGroupItem
                >Mã số máy:
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Nhập mã số máy"
                />
              </CListGroupItem>
              <CListGroupItem
                >Tên máy:
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Nhập tên máy"
                />
              </CListGroupItem>
              <CListGroupItem
                >Thương hiệu:
                <!-- <CSelect
                horizontal
                :options="options"
                placeholder="Chọn thương hiệu"
                class="input-custom-border-none"
              /> -->
                <select
                  class="custom-select input-custom-border-none"
                  id="inputGroupSelect01"
                  style="width: 60%"
                >
                  <option selected disabled>Chọn thương hiệu</option>
                  <option value="Dell">Dell</option>
                  <option value="HP">HP</option>
                  <option value="LG">LG</option>
                  <option value="Dell">Apple</option>
                  <option value="HP">Asus</option>
                  <option value="LG">Lenovo</option>
                  <option value="Dell">VAIO</option>
                  <option value="HP">Acer</option>
                  <option value="LG">Samsung</option>
                  <option value="HP">Toshiba</option>
                  <option value="LG">MSI</option>
                </select>
                <!-- <input type="text" class="input-custom-border-none" placeholder="Nhập thương hiệu"> -->
              </CListGroupItem>
              <CListGroupItem
                >Giá:
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Giá máy"
              /></CListGroupItem>
              <CListGroupItem
                >Ngày đăng:

                <input
                  class="input-custom-border-none"
                  type="date"
                  horizontal
                  placeholder=""
                />
                <!-- <input type="text" class="input-custom-border-none" placeholder="Ngày đăng"> -->
              </CListGroupItem>
              <CListGroupItem
                >Trạng thái:
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Trạng thái máy"
              /></CListGroupItem>
              <CListGroupItem
                >Thời gian bảo hành:
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md="12">
        <strong> Thông tin cấu hình sản phẩm </strong>
        <table class="table" style="background: white">
          <tbody>
            <thead>
              <tr>
                <th scope="col">Performance</th>
              </tr>
            </thead>
            <tr>
              <td class="title-td">Processor</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Base Clock Speed</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Maximum Boost Speed</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Total Installed Memory</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Memory Type</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Onboard Memory</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Maximum Boost Speed</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Available Memory Slots</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Graphics Type</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>GPU</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <thead>
              <tr>
                <th scope="col">Display</th>
              </tr>
            </thead>
            <tr>
              <td>Panel Type</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Size</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Aspect Ratio</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Native Resolution</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Touchscreen</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Finish</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Brightness</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <thead>
              <tr>
                <th scope="col">Drivers</th>
              </tr>
            </thead>
            <tr>
              <td>Available Slots</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Total Capacity</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Solid State Storage</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Optical Drive</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <thead>
              <tr>
                <th scope="col">Input/ Output Connectors</th>
              </tr>
            </thead>
            <tr>
              <td>Ports</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Display</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Audio</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Expansion Slots</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Media Card Slots</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <thead>
              <tr>
                <th scope="col">Communications</th>
              </tr>
            </thead>
            <tr>
              <td>Ports</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Network</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Modem</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Wi-Fi</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Bluetooth</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <thead>
              <tr>
                <th scope="col">Battery</th>
              </tr>
            </thead>
            <tr>
              <td>Battery Chemistry</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Watt Hours / Type</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Maximum Runtime</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Power Requirements</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Power Supply</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <thead>
              <tr>
                <th scope="col">General</th>
              </tr>
            </thead>
            <tr>
              <td>Operating System</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Security</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Keyboard</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>

            <tr>
              <td>Pointing Device</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Weight</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <thead>
              <tr>
                <th scope="col">Packaging Info</th>
              </tr>
            </thead>
            <tr>
              <td>Package Weight</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
            <tr>
              <td>Box Dimensions (L × W × H)</td>
              <td>
                <input
                  type="text"
                  class="input-custom-border-none"
                  placeholder="Thời gian"
                  style="width: 50%"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </CCol>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">
              <button @click="createNewValue()">Thêm mới</button>
            </th>
            <th scope="col" class="Title-table" colspan="1">Tên sản phẩm</th>
            <th scope="col" class="Title-table td-action">
              Tình trạng sản phẩm
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in newObject" :key="index">
            <th scope="row" class="td-table">{{ index + 1 }}</th>
            <td class="td-table status-color-out td-action"><input /></td>
            <td class="td-table status-color-in td-action"><input /></td>
          </tr>
        </tbody>
      </table>
    </CRow>
  </div>
</template>

<script>
export default {
  name: "QuanLySanPhamDetail",

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

      newObject: [],

      formCollapsed: true,
    };
  },
  methods: {
    validator(val) {
      return val ? val.length >= 4 : false;
    },
    CancelCreate() {
      this.$router.push("/quanlysanphamlist");
    },
    UpdateProduct() {
      this.$router.push("/quanlysanphamupdate");
    },
    createNewValue() {
      let item = {
        propertyName: "",
        propertyValue: "",
      };
      this.newObject.push(item);
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
