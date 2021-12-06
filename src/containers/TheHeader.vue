<template>
  <CHeader fixed with-subheader light>
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.commit('toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.commit('toggleSidebarDesktop')"
    />
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <CIcon
        height="48"
        alt="Logo"
        src="https://lh3.googleusercontent.com/SBfXioEtYc_23K2GE_fmQkdqmH9zFx-r1LtNj8bqhsM7jPEj9Nh6Zupnig1ulC9rmfNkJ4ya9Oxj9D2_bwnl2FsXScoNUVcTjetya4fpXaxgL_LgI7J6pTxzsthBRqtGoXePByBd-6JYtHaL9xG5iHaIwiU-SWhYIei7U8a2_50_5MPer4l31qHlfEJEJUSvuoUhYv4qFoownTyFnDS57_oHPysURTHgyWB9rKLN9bD0Sw3qMohJh3yR4UHxHfRfPiWfZsU2Xpha9d-ckxUYTRD0Ek9I1Zdr5IQHrBOnz-IaSQkRbUM2qne_opLHh-ENNgW9meQHIUykpm8rOF7fEAF4czttgEZc_rimYR5j6fqldKpIswgmYlzOKrCA-G99IJ-paA1jHpNw4eVZIkcajzk4NdanSse9PbgsP-0a4fTtBX27TD12tIz4Xxv7D76a-osZr1sfgHcT8teqigyaY-8JQUCpXFKgr_s7Gz2rHiB20SqbJd5-kOT4XgcAc-TnYJRK23GGE8IpJsoFc5PkB5wXo-VieUyB-bz0mAFgPyjcvwLqujD9NW87cTAh33KQImUpWPaUrH1Qnwc8Qfer3oY9GZCvX5cD8bTc5b5-pdKuD-bKm1gEg1tfWfhMXzZBkL8ObqE3kbOtZbBibcB2DA4LTBNLivkdb9z3FSRVGUsWNhcv4CHtD5BhMBaXA4HsTD8gGh6hIqC9Wn7DPXm616pi=w77-h126-no?authuser=0"
      />
    </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto">
      <!-- <CBreadcrumbRouter class="border-0 mb-0" /> -->
    </CHeaderNav>
    <CHeaderNav class="mr-4">
      <TheHeaderDropdownAccnt />
    </CHeaderNav>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from "./TheHeaderDropdownAccnt";

export default {
  name: "TheHeader",
  components: {
    TheHeaderDropdownAccnt,
  },
};
</script>
