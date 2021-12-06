<template>
  <CRow>
    <CCol sm="6" lg="3">
      <CWidgetDropdown color="primary" :header="countOrder" text="Tổng hóa đơn">
        <!-- <template #default>
          <CDropdown color="transparent p-0" placement="bottom-end">
            <template #toggler-content>
              <CIcon name="cil-settings" />
            </template>
            <CDropdownItem>Action {{ countOrder }}</CDropdownItem>
            <CDropdownItem>Another action</CDropdownItem>
            <CDropdownItem>Something else here...</CDropdownItem>
            <CDropdownItem disabled>Disabled action</CDropdownItem>
          </CDropdown>
        </template> -->
        <template #footer>
          <CChartLineSimple
            pointed
            class="mt-3 mx-3"
            style="height: 70px"
            :data-points="[65, 59, 84, 84, 51, 55, 40]"
            point-hover-background-color="primary"
            label="Members"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown
        color="info"
        :header="ComfimCountOrder"
        text="Tổng số đơn hoàn thành"
      >
        <!-- <template #default>
          <CDropdown
            color="transparent p-0"
            placement="bottom-end"
            :caret="false"
          >
            <template #toggler-content>
              <CIcon name="cil-location-pin" />
            </template>
            <CDropdownItem>Action</CDropdownItem>
            <CDropdownItem>Another action</CDropdownItem>
            <CDropdownItem>Something else here...</CDropdownItem>
            <CDropdownItem disabled>Disabled action</CDropdownItem>
          </CDropdown>
        </template> -->
        <template #footer>
          <CChartLineSimple
            pointed
            class="mt-3 mx-3"
            style="height: 70px"
            :data-points="[1, 18, 9, 17, 34, 22, 11]"
            point-hover-background-color="info"
            :options="{ elements: { line: { tension: 0.00001 } } }"
            label="Members"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown color="warning" :header="CancerCountOrder" text="Số đơn bị hủy">
        <!-- <template #default>
          <CDropdown color="transparent p-0" placement="bottom-end">
            <template #toggler-content>
              <CIcon name="cil-settings" />
            </template>
            <CDropdownItem>Action</CDropdownItem>
            <CDropdownItem>Another action</CDropdownItem>
            <CDropdownItem>Something else here...</CDropdownItem>
            <CDropdownItem disabled>Disabled action</CDropdownItem>
          </CDropdown>
        </template> -->
        <template #footer>
          <CChartLineSimple
            class="mt-3"
            style="height: 70px"
            background-color="rgba(255,255,255,.2)"
            :data-points="[78, 81, 80, 45, 34, 12, 40]"
            :options="{ elements: { line: { borderWidth: 2.5 } } }"
            point-hover-background-color="warning"
            label="Members"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="3">
      <CWidgetDropdown color="danger" :header="unconfirm.length" text="Số đơn chưa hoàn thành">
        <!-- <template #default>
          <CDropdown color="transparent p-0" placement="bottom-end">
            <template #toggler-content>
              <CIcon name="cil-settings" />
            </template>
            <CDropdownItem>Action</CDropdownItem>
            <CDropdownItem>Another action</CDropdownItem>
            <CDropdownItem>Something else here...</CDropdownItem>
            <CDropdownItem disabled>Disabled action</CDropdownItem>
          </CDropdown>
        </template> -->
        <template #footer>
          <CChartBarSimple
            class="mt-3 mx-3"
            style="height: 70px"
            background-color="rgb(250, 152, 152)"
            label="Members"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>
  </CRow>
</template>

<script>
import { CChartLineSimple, CChartBarSimple } from "../charts/index.js";
import axios from "axios";
export default {
  name: "WidgetsDropdown",
  components: { CChartLineSimple, CChartBarSimple },
  data() {
    return {
      ComfimCountOrder: "",
      countOrder: "",
      CancerCountOrder:"",
      unconfirm:"",
    };
  },
  mounted() {
    axios
      .get("http://150.95.105.29:8800/api/admin/report/getComfimCountOrder", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYW5oIiwiaWF0IjoxNjM4ODAzMDExLCJleHAiOjE2Mzg4ODk0MTF9.m5sAvi8Y66YQ_0GcaeMBChBukRUWKgcK-Nj4nKxh6gXkgKjVE9qYqjD-805vrKhpYnZWnK22fVQfYKmWIp3D6Q",
        },
      })
      .then((response) => {
        console.log(this);
        this.ComfimCountOrder = response.data.object.toString();
        console.log(this.ComfimCountOrder);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get("http://150.95.105.29:8800/api/admin/report/getCountOrder", {
        headers: {
          Authorization: this.$store.state.userToken,
        },
      })
      .then((response) => {
        this.getData = response.data.object;
        this.countOrder = response.data.object.toString();
        console.log(this.countOrder);
      })
      .catch((e) => {
        console.log(e);
      });
     axios
      .get("http://150.95.105.29:8800/api/admin/report/getCancerCountOrder", {
        headers: {
          Authorization: this.$store.state.userToken,
        },
      })
      .then((response) => {
        this.getData = response.data.object;
        this.CancerCountOrder = response.data.object.toString();
        console.log(this.CancerCountOrder);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get("http://150.95.105.29:8800/api/admin/report/unconfirm", {
        headers: {
          Authorization: this.$store.state.userToken,
        },
      })
      .then((response) => {
        this.getData = response.data.object;
        this.unconfirm = response.data.object;
        console.log(this.unconfirm);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    getCancerCountOrder() {
      axios
        .get(this.$store.state.MainLink + "admin/report/getCancerCountOrder", {
          headers: {
            Authorization: this.$store.state.userToken,
          },
        })
        .then((response) => {
          this.getData = response.data.object;
          console.log(this.getData);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getComfimCountOrder() {
      axios
        .get(this.$store.state.MainLink + "admin/report/getComfimCountOrder", {
          headers: {
            Authorization: this.$store.state.userToken,
          },
        })
        .then((response) => {
          this.getData = response.data.object;
          console.log(this.getData);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getCountOrder() {
      axios
        .get(this.$store.state.MainLink + "api/admin/report/getCountOrder", {
          headers: {
            Authorization: this.$store.state.userToken,
          },
        })
        .then((response) => {
          this.getData = response.data.object;
          this.countOrder = response.data.object;
          console.log(this.getData);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getListUnConfirmOrders() {
      axios
        .get(this.$store.state.MainLink + "admin/report/unconfirm", {
          headers: {
            Authorization: this.$store.state.userToken,
          },
        })
        .then((response) => {
          this.getData = response.data.object;
          console.log(this.getData);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
