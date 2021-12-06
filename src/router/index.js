import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () =>
    import ('@/containers/TheContainer')

// Views
const Dashboard = () =>
    import ('@/views/Dashboard')

const Colors = () =>
    import ('@/views/theme/Colors')
const Typography = () =>
    import ('@/views/theme/Typography')

const Charts = () =>
    import ('@/views/charts/Charts')
const Widgets = () =>
    import ('@/views/widgets/Widgets')

// Views - Components
const Cards = () =>
    import ('@/views/base/Cards')
const Forms = () =>
    import ('@/views/base/Forms')
const Switches = () =>
    import ('@/views/base/Switches')
const Tables = () =>
    import ('@/views/base/Tables')
const Tabs = () =>
    import ('@/views/base/Tabs')
const Breadcrumbs = () =>
    import ('@/views/base/Breadcrumbs')
const Carousels = () =>
    import ('@/views/base/Carousels')
const Collapses = () =>
    import ('@/views/base/Collapses')
const Jumbotrons = () =>
    import ('@/views/base/Jumbotrons')
const ListGroups = () =>
    import ('@/views/base/ListGroups')
const Navs = () =>
    import ('@/views/base/Navs')
const Navbars = () =>
    import ('@/views/base/Navbars')
const Paginations = () =>
    import ('@/views/base/Paginations')
const Popovers = () =>
    import ('@/views/base/Popovers')
const ProgressBars = () =>
    import ('@/views/base/ProgressBars')
const Tooltips = () =>
    import ('@/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () =>
    import ('@/views/buttons/StandardButtons')
const ButtonGroups = () =>
    import ('@/views/buttons/ButtonGroups')
const Dropdowns = () =>
    import ('@/views/buttons/Dropdowns')
const BrandButtons = () =>
    import ('@/views/buttons/BrandButtons')

// Views - Icons
const CoreUIIcons = () =>
    import ('@/views/icons/CoreUIIcons')
const Brands = () =>
    import ('@/views/icons/Brands')
const Flags = () =>
    import ('@/views/icons/Flags')

// Views - Notifications
const Alerts = () =>
    import ('@/views/notifications/Alerts')
const Badges = () =>
    import ('@/views/notifications/Badges')
const Modals = () =>
    import ('@/views/notifications/Modals')

// Views - Pages
const Page404 = () =>
    import ('@/views/pages/Page404')
const Page500 = () =>
    import ('@/views/pages/Page500')
const Login = () =>
    import ('@/views/pages/Login')
const Register = () =>
    import ('@/views/pages/Register')

// Users
const Users = () =>
    import ('@/views/users/Users')
const User = () =>
    import ('@/views/users/User')

//Admin
const quanlysanphamlist = () =>
    import ('@/views/admin/quanlysanpham/quanlysanphamlist')
const quanlysanphamcreate = () =>
    import ('@/views/admin/quanlysanpham/quanlysanphamcreate')
const quanlysanphamcreatedetail = () =>
    import ('@/views/admin/quanlysanpham/quanlysanphamcreatedetail')

const quanlysanphamdetail = () =>
    import ('@/views/admin/quanlysanpham/quanlysanphamdetail')

//Blog
const quanLyBlogList = () =>
    import ('@/views/admin/quanlyblog/quanLyBlogList')
const quanLyBlogCreate = () =>
    import ('@/views/admin/quanlyblog/quanLyBlogCreate')
const quanLyBlogUpdate = () =>
    import ('@/views/admin/quanlyblog/quanLyBlogUpdate')
const quanLyBlogDetail = () =>
    import ('@/views/admin/quanlyblog/quanLyBlogDetail')

//HoaDon
const quanlyhoadoncreate = () =>
    import ('@/views/admin/quanlyhoadon/quanlyhoadoncreate')
const quanlyhoadondetail = () =>
    import ('@/views/admin/quanlyhoadon/quanlyhoadondetail')
const quanlyhoadonupdate = () =>
    import ('@/views/admin/quanlyhoadon/quanlyhoadonupdate')
const quanlyhoadonlist = () =>
    import ('@/views/admin/quanlyhoadon/quanlyhoadonlist')
    //SALE
const quanlykhuyenmailist = () =>
    import ('@/views/admin/quanlykhuyenmai/quanlykhuyenmailist')
const quanlykhuyenmaidaketthuc = () =>
    import ('@/views/admin/quanlykhuyenmai/quanlykhuyenmaidaketthuc')
const quanlykhuyenmaidangdienra = () =>
    import ('@/views/admin/quanlykhuyenmai/quanlykhuyenmaidangdienra')

//account

const quanlytaikhoanlist = () =>
    import ('@/views/admin/quanlytaikhoan/quanlytaikhoanlist')
const quanlytaikhoandetail = () =>
    import ('@/views/admin/quanlytaikhoan/quanlytaikhoandetail')
const quanlytaikhoanupdate = () =>
    import ('@/views/admin/quanlytaikhoan/quanlytaikhoanupdate')
const quanlytaikhoancreate = () =>
    import ('@/views/admin/quanlytaikhoan/quanlytaikhoancreate')

Vue.use(Router)

export default new Router({
    mode: 'history', // https://router.vuejs.org/api/#mode
    linkActiveClass: 'active',
    scrollBehavior: () => ({ y: 0 }),
    routes: configRoutes()
})

function configRoutes() {
    return [{
            path: '/',
            redirect: '/pages/login',
            name: 'Login',
            component: TheContainer,
            children: [{
                    path: 'dashboard',
                    name: 'Dashboard',
                    component: Dashboard
                },

                {
                    path: 'admin',
                    redirect: '/admin/quanlysanphamlist',
                    name: 'admin',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: 'quanlysanphamlist',
                            name: 'Danh sách sản phẩm',
                            component: quanlysanphamlist
                        },
                        {
                            path: 'quanlysanphamdetail',
                            name: 'Thông tin chi tiết sản phẩm',
                            component: quanlysanphamdetail,
                            props: true,
                        },
                        {
                            path: 'quanlysanphamcreate',
                            name: 'Thêm mới sản phẩm',
                            component: quanlysanphamcreate
                        },
                        {
                            path: 'quanlysanphamcreatedetail',
                            name: 'Thêm mới sản phẩm',
                            component: quanlysanphamcreatedetail
                        },
                    ]
                },

                {
                    path: 'blog',
                    redirect: '/blog/quanlyblog',
                    name: 'blog',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: 'quanlyblog',
                            name: 'Danh sách Blog',
                            component: quanLyBlogList
                        },
                        {
                            path: 'quanlyblogupdate',
                            name: 'Chỉnh sửa nội dung Blog',
                            component: quanLyBlogUpdate
                        },
                        {
                            path: 'quanlyblogdetail',
                            name: 'Thông tin chi tiết Blog',
                            component: quanLyBlogDetail,
                            props: true,
                        },
                        {
                            path: 'quanlyblogcreate',
                            name: 'Thêm mới Blog',
                            component: quanLyBlogCreate
                        }
                    ]
                },
                {
                    path: 'sale',
                    redirect: '/sale/quanlysale',
                    name: 'sale',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: 'quanlysale',
                            name: 'Danh sách sale',
                            component: quanlykhuyenmailist
                        },
                        {
                            path: 'quanlysaleEnd',
                            name: 'Sale đã kết thúc',
                            component: quanlykhuyenmaidaketthuc
                        },
                        {
                            path: 'quanlysaleNow',
                            name: 'Sale đang diễn ra',
                            component: quanlykhuyenmaidangdienra
                        },
                    ]
                },

                {
                    path: 'account',
                    redirect: '/account/quanlyaccount',
                    name: 'sale',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: 'quanlyaccount',
                            name: 'Danh sách tài khoản',
                            component: quanlytaikhoanlist
                        },
                        {
                            path: 'quanlytaikhoandetail',
                            name: 'Chi tiết tài khoản',
                            component: quanlytaikhoandetail,
                            props: true
                        },
                        {
                            path: 'quanlyaccountupdate',
                            name: 'Cập nhật thông tin tài khoản',
                            component: quanlytaikhoanupdate
                        },
                        {
                            path: 'quanlytaikhoancreate',
                            name: 'Tạo mới tài khoản',
                            component: quanlytaikhoancreate
                        },
                    ]
                },

                {
                    path: 'bill',
                    redirect: '/bill/quanlyhoadonlist',
                    name: 'bill',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: 'quanlyhoadonlist',
                            name: 'Danh sách hóa đơn',
                            component: quanlyhoadonlist
                        },
                        {
                            path: 'quanlyhoadonupdate',
                            name: 'Chỉnh sửa nội dung hóa đơn',
                            component: quanlyhoadonupdate
                        },
                        {
                            path: 'quanlyhoadondetail',
                            name: 'Thông tin chi tiết hóa đơn',
                            component: quanlyhoadondetail,
                            props: true,
                        },
                        {
                            path: 'quanlyhoadoncreate',
                            name: 'Thêm mới hóa đơn',
                            component: quanlyhoadoncreate
                        }
                    ]
                },

                {
                    path: 'theme',
                    redirect: '/theme/colors',
                    name: 'Theme',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: 'colors',
                            name: 'Colors',
                            component: Colors
                        },
                        {
                            path: 'typography',
                            name: 'Typography',
                            component: Typography
                        }
                    ]
                },
                {
                    path: 'charts',
                    name: 'Charts',
                    component: Charts
                },
                {
                    path: 'widgets',
                    name: 'Widgets',
                    component: Widgets
                },
                {
                    path: 'users',
                    meta: {
                        label: 'Users'
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [{
                            path: '',
                            name: 'Users',
                            component: Users
                        },
                        {
                            path: ':id',
                            meta: {
                                label: 'User Details'
                            },
                            name: 'User',
                            component: User
                        }
                    ]
                },
                {
                    path: 'base',
                    redirect: '/base/cards',
                    name: 'Base',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: 'cards',
                            name: 'Cards',
                            component: Cards
                        },
                        {
                            path: 'forms',
                            name: 'Forms',
                            component: Forms
                        },
                        {
                            path: 'switches',
                            name: 'Switches',
                            component: Switches
                        },
                        {
                            path: 'tables',
                            name: 'Tables',
                            component: Tables
                        },
                        {
                            path: 'tabs',
                            name: 'Tabs',
                            component: Tabs
                        },
                        {
                            path: 'breadcrumbs',
                            name: 'Breadcrumbs',
                            component: Breadcrumbs
                        },
                        {
                            path: 'carousels',
                            name: 'Carousels',
                            component: Carousels
                        },
                        {
                            path: 'collapses',
                            name: 'Collapses',
                            component: Collapses
                        },
                        {
                            path: 'jumbotrons',
                            name: 'Jumbotrons',
                            component: Jumbotrons
                        },
                        {
                            path: 'list-groups',
                            name: 'List Groups',
                            component: ListGroups
                        },
                        {
                            path: 'navs',
                            name: 'Navs',
                            component: Navs
                        },
                        {
                            path: 'navbars',
                            name: 'Navbars',
                            component: Navbars
                        },
                        {
                            path: 'paginations',
                            name: 'Paginations',
                            component: Paginations
                        },
                        {
                            path: 'popovers',
                            name: 'Popovers',
                            component: Popovers
                        },
                        {
                            path: 'progress-bars',
                            name: 'Progress Bars',
                            component: ProgressBars
                        },
                        {
                            path: 'tooltips',
                            name: 'Tooltips',
                            component: Tooltips
                        }
                    ]
                },
                {
                    path: 'buttons',
                    redirect: '/buttons/standard-buttons',
                    name: 'Buttons',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: 'standard-buttons',
                            name: 'Standard Buttons',
                            component: StandardButtons
                        },
                        {
                            path: 'button-groups',
                            name: 'Button Groups',
                            component: ButtonGroups
                        },
                        {
                            path: 'dropdowns',
                            name: 'Dropdowns',
                            component: Dropdowns
                        },
                        {
                            path: 'brand-buttons',
                            name: 'Brand Buttons',
                            component: BrandButtons
                        }
                    ]
                },
                {
                    path: 'icons',
                    redirect: '/icons/coreui-icons',
                    name: 'CoreUI Icons',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: 'coreui-icons',
                            name: 'Icons library',
                            component: CoreUIIcons
                        },
                        {
                            path: 'brands',
                            name: 'Brands',
                            component: Brands
                        },
                        {
                            path: 'flags',
                            name: 'Flags',
                            component: Flags
                        }
                    ]
                },
                {
                    path: 'notifications',
                    redirect: '/notifications/alerts',
                    name: 'Notifications',
                    component: {
                        render(c) { return c('router-view') }
                    },
                    children: [{
                            path: 'alerts',
                            name: 'Alerts',
                            component: Alerts
                        },
                        {
                            path: 'badges',
                            name: 'Badges',
                            component: Badges
                        },
                        {
                            path: 'modals',
                            name: 'Modals',
                            component: Modals
                        }
                    ]
                },
            ]
        },
        {
            path: '/pages',
            redirect: '/pages/404',
            name: 'Pages',
            component: {
                render(c) { return c('router-view') }
            },
            children: [{
                    path: '404',
                    name: 'Page404',
                    component: Page404
                },
                {
                    path: '500',
                    name: 'Page500',
                    component: Page500
                },
                {
                    path: 'login',
                    name: 'Login',
                    component: Login
                },
                {
                    path: 'register',
                    name: 'Register',
                    component: Register
                }
            ]
        }
    ]
}