 <template>
  <div>
    <div class="col-12 col-title">
      <div class="col-md-6 float-left margin-left">
        <p class="Text-tile">Danh sách thể loại</p>
        <p class="Text-tile-2">Trang chủ ● Thể loại</p>
      </div>
      <div class="col-md-6 float-right">
      </div>
    </div>
    <!-- <nav class="col-12 navbar justify-content-between">
      <a class="navbar-brand"></a>
      <form class="form-inline">
        <input
          @change="searchProduct()"
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          style="box-shadow: none"
          v-model="searchString"
        />
      </form>
    </nav> -->
    <table class="table" style="overflow-x: auto;display: inline-block;">
      <thead>
        <tr @click="detailCategory()">
          <th scope="col">STT</th>
          <!-- <th scope="col" class="Title-table">Tên sale</th> -->
          <th scope="col" class="Title-table td-action" style="text-align:center" >
             Tên
          </th>
          <th scope="col" class="Title-table td-action" >
            Loại
          </th>
          <th scope="col" class="Title-table td-action" >
           Trạng thái
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in getData" :key="index">
          <th>{{ index + 1 }}</th>
          <td scope="row" class="td-table" style="width: 35%;">
                  <a class="custom-a" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                   - {{ item.name }}
                  </a>  
                <div class="collapse" id="collapseExample">
                  <div class="">
                    <div v-for="items in item.categories" :key="items.id" style="margin-left: 15%">+ {{items.name}}</div>
                  </div>
                </div>
          </td>
          <td scope="row" class="td-table td-center">{{ item.type }}</td>
          <td scope="row" class="td-table td-center">
              <span class="badge rounded-pill bg-success" v-if="item.status == true">{{ item.status }}</span>
              <span class="badge rounded-pill bg-danger" v-else>{{ item.status }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <div class="pb-0 pt-3" style="text-align: center">
      <jw-pagination
        :maxPages="15"
        :items="getData"
        @changePage="onChangePage"
      ></jw-pagination>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "QuanLySanPhamList",
  data() {
    return {
      pageOfItems: [],
      getData: "",
      formData: {
       name: "",
        type: "",
        status: ""
      },
      searchString: "",
    };
  },
  created() {
    this.getAllCategory();

  },
  methods: {
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
    UpdateProduct() {
      this.$router.push("/admin/quanlysanphamcreatedetail");
    },
    DetailSale(id) {
      this.$router.push({
        name: "Thông tin chi tiết sản phẩm",
        params: { item: id },
      });
    },
    deleteCategory(item) {
      console.log(this.$store.state.tokenUser);
      axios
        .put(
          this.$store.state.MainLink + "/categories/delete/" + item.id,
          {
            headers: {
              Authorization: this.$store.state.tokenUser,
            },
          }
        )

        .then((response) => {
          if (response.data.object) {
            alert("Delete thành công.");
          } else {
            alert("Delete thất bại.");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  
    
    getAllCategory() {
      axios
        .get( this.$store.state.MainLink + "customer/categories?active=true",
         {
            headers: {
              Authorization: this.$store.state.userToken,
            },
          })
        .then((response) => {
          this.getData = response.data.object;
          console.log(this.getData)
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style>
.Title-table {
  text-align: center;
}
.td-center{
    text-align: center;
}
.custom-a{
  text-decoration: none;
    color: black;
}
</style>
