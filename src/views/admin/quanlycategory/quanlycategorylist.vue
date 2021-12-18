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
    <table class="table">
      <thead>
        <tr @click="detailCategory()">
          <th scope="col">STT</th>
          <th scope="col" class="Title-table td-action" style="text-align:center" >
            Thể loại
          </th>
          <th scope="col" class="Title-table td-action" >
           Trạng thái
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>1</th>
          <td scope="row" class="td-table" style="width: 35%;">
                <a class="custom-a" data-bs-toggle="collapse" href="#collapseExample1" role="button" aria-expanded="false" aria-controls="collapseExample1">
                    Loại máy
                </a>  
                <div class="collapse" id="collapseExample1">
                  <div v-for="(item, index) in typeProduct.categories" :key="index">
                    <a style="margin-left: 15%" @click="detailCate(item.id)">
                      - {{item.name}}
                    </a>
                  </div>
                </div>
          </td>
          <td scope="row" class="td-table td-center">
               <span class="badge rounded-pill bg-success" v-if="typeProduct.status == true">{{typeProduct.status}}</span>
              <span class="badge rounded-pill bg-danger" v-else>{{typeProduct.status}}</span>
          </td>
        </tr>
        <tr>
          <th>2</th>
          <td scope="row" class="td-table" style="width: 35%;">
                <a class="custom-a" data-bs-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample">
                    Thương hiệu
                </a>  
                <div class="collapse" id="collapseExample2">
                  <div v-for="(item, index) in brands.categories" :key="index">
                    <a style="margin-left: 15%" @click="detailCate(item.id)">
                      - {{item.name}}
                    </a>
                  </div>
                </div>
          </td>
          <td scope="row" class="td-table td-center">
              <span class="badge rounded-pill bg-success" v-if="brands.status == true">{{brands.status}}</span>
              <span class="badge rounded-pill bg-danger" v-else>{{brands.status}}</span>
          </td>
        </tr>
        <tr>
          <th>3</th>
          <td scope="row" class="td-table" style="width: 35%;">
                <a class="custom-a" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                    Nhu cầu
                </a>  
                <div class="collapse" id="collapseExample">
                  <div v-for="(item, index) in demand.categories" :key="index">
                    <a style="margin-left: 15%" @click="detailCate(item.id)">
                      - {{item.name}}
                    </a>
                  </div>
                </div>
          </td>
          <td scope="row" class="td-table td-center">
               <span class="badge rounded-pill bg-success" v-if="demand.status == true">{{demand.status}}</span>
              <span class="badge rounded-pill bg-danger" v-else>{{demand.status}}</span>
          </td>
        </tr>
      </tbody>
    </table>
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
      typeProduct:"",
      brands: "",
      demand: "",
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
          this.typeProduct = response.data.object[0]
          this.brands = response.data.object[1]
          this.demand = response.data.object[2]
          console.log(this.typeProduct)
          // console.log(this.typeProduct, this.brands, this.demand)
          // console.log(this.getData)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    detailCate(id){
      console.log(id)
    }
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
