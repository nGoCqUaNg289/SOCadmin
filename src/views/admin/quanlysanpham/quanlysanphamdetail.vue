<template>
  <div>
    <CRow>
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
              <CListGroupItem>Mã số máy: <span>N3I5202W</span></CListGroupItem>
              <CListGroupItem
                >Tên máy: <span>Inspiron 7306</span></CListGroupItem
              >
              <CListGroupItem>Thương hiệu: <span>Dell</span></CListGroupItem>
              <CListGroupItem>Giá: <span>27.069.000</span></CListGroupItem>
              <CListGroupItem
                >Ngày đăng: <span>30/09/2021</span></CListGroupItem
              >
              <CListGroupItem>Trạng thái: <span>Còn hàng</span></CListGroupItem>
              <CListGroupItem
                >Thời gian bảo hành: <span>1 năm</span></CListGroupItem
              >
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
              <td>
                Processor
              </td>
              <td>Intel Core i7 Quad-Core</td>
            </tr>
            <tr>
              <td>Base Clock Speed</td>
              <td>2.8 GHz</td>
            </tr>
            <tr>
              <td>Maximum Boost Speed</td>
              <td>3.8 GHz</td>
            </tr>
            <tr>
              <td>Total Installed Memory</td>
              <td>16 GB</td>
            </tr>
            <tr>
              <td>Memory Type</td>
              <td>LPDDR3 SDRAM</td>
            </tr>
            <tr>
              <td>Onboard Memory</td>
              <td>2133 MHz</td>
            </tr>
            <tr>
              <td>Maximum Boost Speed</td>
              <td>16 GB</td>
            </tr>
            <tr>
              <td>Available Memory Slots</td>
              <td>—</td>
            </tr>
            <tr>
              <td>Graphics Type</td>
              <td>Hybrid</td>
            </tr>
            <tr>
              <td>GPU</td>
              <td>
                AMD Radeon Pro 555 with 2 GB GDDR5 VRAM, Intel HD Graphics 630
              </td>
            </tr>
            <thead>
              <tr>
                <th scope="col">Display</th>
              </tr>
            </thead>
            <tr>
              <td>Panel Type</td>
              <td>IPS</td>
            </tr>
            <tr>
              <td>Size</td>
              <td>15.4"</td>
            </tr>
            <tr>
              <td>Aspect Ratio</td>
              <td>16:10</td>
            </tr>
            <tr>
              <td>Native Resolution</td>
              <td>2880×1800</td>
            </tr>
            <tr>
              <td>Touchscreen</td>
              <td>—</td>
            </tr>
            <tr>
              <td>Finish</td>
              <td>Glossy</td>
            </tr>
            <tr>
              <td>Brightness</td>
              <td>500 cd/m2</td>
            </tr>
            <thead>
              <tr>
                <th scope="col">Drivers</th>
              </tr>
            </thead>
            <tr>
              <td>Available Slots</td>
              <td>—</td>
            </tr>
            <tr>
              <td>Total Capacity</td>
              <td>256 GB</td>
            </tr>
            <tr>
              <td>Solid State Storage</td>
              <td>1 × 256 GB Integrated PCIe</td>
            </tr>
            <tr>
              <td>Optical Drive</td>
              <td>—</td>
            </tr>
            <thead>
              <tr>
                <th scope="col">Input/ Output Connectors</th>
              </tr>
            </thead>
            <tr>
              <td>Ports</td>
              <td>4 × Thunderbolt 3 via USB Type-C</td>
            </tr>
            <tr>
              <td>Display</td>
              <td>4 × DisplayPort via Type-C</td>
            </tr>
            <tr>
              <td>Audio</td>
              <td>
                1 × 1/8" (3.5 mm) Headphone Output,
                <br />
                2 × Integrated Speaker, <br />
                3 × Integrated Microphone
              </td>
            </tr>
            <tr>
              <td>Expansion Slots</td>
              <td>—</td>
            </tr>
            <tr>
              <td>Media Card Slots</td>
              <td>—</td>
            </tr>
            <thead>
              <tr>
                <th scope="col">Communications</th>
              </tr>
            </thead>
            <tr>
              <td>Ports</td>
              <td>4 × Thunderbolt 3 via USB Type-C</td>
            </tr>
            <tr>
              <td>Network</td>
              <td>—</td>
            </tr>
            <tr>
              <td>Modem</td>
              <td>
                —
              </td>
            </tr>
            <tr>
              <td>Wi-Fi</td>
              <td>802.11ac; Dual-Band</td>
            </tr>
            <tr>
              <td>Bluetooth</td>
              <td>Bluetooth 4.2</td>
            </tr>
            <thead>
              <tr>
                <th scope="col">Battery</th>
              </tr>
            </thead>
            <tr>
              <td>Battery Chemistry</td>
              <td>Lithium-Ion Polymer</td>
            </tr>
            <tr>
              <td>Watt Hours / Type</td>
              <td>76 Wh Non-Removable</td>
            </tr>
            <tr>
              <td>Maximum Runtime</td>
              <td>10 Hours</td>
            </tr>
            <tr>
              <td>Power Requirements</td>
              <td>100-240 VAC, 50-60 Hz</td>
            </tr>
            <tr>
              <td>Power Supply</td>
              <td>1 × 87 W</td>
            </tr>
            <thead>
              <tr>
                <th scope="col">General</th>
              </tr>
            </thead>
            <tr>
              <td>Operating System</td>
              <td>macOS High Sierra</td>
            </tr>
            <tr>
              <td>Security</td>
              <td>Not specified</td>
            </tr>
            <tr>
              <td>Keyboard</td>
              <td>
                Keys: 64,
                <br />
                Type: Standard Notebook Keyboard, <br />
                Features: Backlight
              </td>
            </tr>

            <tr>
              <td>Pointing Device</td>
              <td>Force Touch Trackpad</td>
            </tr>
            <tr>
              <td>Weight</td>
              <td>4.02 lb / 1.82 kg</td>
            </tr>
            <thead>
              <tr>
                <th scope="col">Packaging Info</th>
              </tr>
            </thead>
            <tr>
              <td>Package Weight</td>
              <td>7.55 lb</td>
            </tr>
            <tr>
              <td>Box Dimensions (L × W × H)</td>
              <td>16.2 × 11.6 × 3.7"</td>
            </tr>
          </tbody>
        </table>
      </CCol>
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
  },
};
</script>

<style></style>
