<template>
  <div>
    <div class="col-12 col-title">
      <div class="col-md-6 float-left margin-left">
        <p class="Text-tile">Danh sách sản phẩm</p>
        <p class="Text-tile-2">Trang chủ ● Sản phẩm</p>
      </div>
      <div class="col-md-6 float-right">
        <button type="button" class="btn btn-primary float-right btn-add" @click="CreateNewProduct()">
          <i class="cil-plus"></i>
          Thêm mới
        </button>
      </div>
    </div>
    <nav class="col-12 navbar justify-content-between">
      <a class="navbar-brand"></a>
      <form class="form-inline">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          style="box-shadow:none"
        />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          <i class="cil-magnifying-glass"></i>
        </button>
      </form>
    </nav>
    <table class="table">
      <thead>
        <tr>
          <th scope="col" class="Title-table">Mã sản phẩm</th>
          <th scope="col" class="Title-table td-action">Tên sản phẩm</th>
          <th scope="col" class="Title-table td-action">Hãng</th>
          <th scope="col" class="Title-table td-action">Tình trạng sản phẩm</th>
          <th class="Title-table"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" class="td-table">N3I5202W</th>
          <td class="td-table">Inspiron 7306</td>
          <td class="td-table td-action">
            <i class="cib-dell"></i>
          </td>
          <td class="td-table status-color-in td-action">Còn hàng</td>
          <td class="td-table td-action">
            <button type="button" class="btn btn-primary btn-size" @click="DetailProduct()">
              <i class="cil-folder-open"></i>
            </button>
            <button type="button" class="btn btn-danger btn-size">
              <i class="cil-trash"></i>
            </button>
          </td>
        </tr>
        <tr>
          <th scope="row" class="td-table">2K0B6PA</th>
          <td class="td-table">HP Envy 13-ba1030TU (GOLD)</td>
          <td class="td-table td-action"><i class="cib-hp"></i></td>
          <td class="td-table status-color-out td-action">Hết hàng</td>
          <td class="td-table td-action">
            <button type="button" class="btn btn-primary btn-size" @click="DetailProduct()">
              <i class="cil-folder-open"></i>
            </button>
            <button type="button" class="btn btn-danger btn-size">
              <i class="cil-trash"></i>
            </button>
          </td>
        </tr>
        <tr>
          <th scope="row" class="td-table">
            MYD82SA/A
          </th>
          <td class="td-table">Macbook Pro 13 – 2020 NEW</td>
          <td class="td-table td-action"><i class="cib-apple"></i></td>
          <td class="td-table status-color-out td-action">Hết hàng</td>
          <td class="td-table td-action">
            <button type="button" class="btn btn-primary btn-size">
              <i class="cil-folder-open"></i>
            </button>
            <button type="button" class="btn btn-danger btn-size">
              <i class="cil-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "QuanLySanPhamList",
  methods: {
    CreateNewProduct(){
      this.$router.push("/quanlysanphamcreate");
    },
    DetailProduct(){
      this.$router.push("/quanlysanphamdetail");
    }
  },
};
</script>

<style></style>
