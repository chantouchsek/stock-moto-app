/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file.
 */

import store from '@/assets/vuex'

import Home from 'pages/home'
import AboutPage from 'pages/about'
import FormPage from 'pages/form.vue'
import DynamicRoutePage from 'pages/dynamic-route'

import PanelLeftPage from 'pages/panel-left'
import ColorThemes from 'pages/color-themes'
import Chat from 'pages/chat'
import Vuex from 'pages/vuex'
import auth from '@/middleware/auth'

// Staffs Page
import StaffIndex from 'pages/staffs/index'
import StaffCreate from 'pages/staffs/create'
import StaffEdit from 'pages/staffs/edit'
import StaffInfo from 'pages/staffs/show'

// Sales Page
import SaleIndex from 'pages/sales/index'
import SaleShow from 'pages/sales/show'
import SaleCreate from 'pages/sales/create'

// Authentication Page
import Login from 'pages/auth/login'
import Account from 'pages/auth/account'

// Categories Page
import CategoryIndex from 'pages/categories/index'
import CategoryCreate from 'pages/categories/create'
import CategoryEdit from 'pages/categories/edit'

// Roles Page
import RoleIndex from 'pages/roles/index'

// Supplier Page
import SupplierIndex from 'pages/suppliers/index'
import SupplierCreate from 'pages/suppliers/create'
import SupplierEdit from 'pages/suppliers/edit'

// Makes Page
import MakeIndex from 'pages/makes/index'
import MakeCreate from 'pages/makes/create'
import MakeEdit from 'pages/makes/edit'

// Models page
import ModelIndex from 'pages/models/index'
import ModelCreate from 'pages/models/create'
import ModelEdit from 'pages/models/edit'

// Customers Page
import CustomerIndex from 'pages/customers/index'
import CustomerCreate from 'pages/customers/create'
import CustomerEdit from 'pages/customers/edit'

// Products Page
import ProductIndex from 'pages/products/index'
import ProductCreate from 'pages/products/create'
import ProductShow from 'pages/products/show'
import ProductEdit from 'pages/products/edit'

// Colors Page
import ColorIndex from 'pages/colors/index'
import ColorCreate from 'pages/colors/create'
import ColorEdit from 'pages/colors/edit'

// Expense
import ExpenseIndex from 'pages/expenses/index'
import ExpenseCreate from 'pages/expenses/create'

/**
 * The routes
 *
 * @type {object} The routes
 */
export default [
  {
    path: '/',
    async (routeTo, routeFrom, resolve, reject) {
      if (store.state.auth.authenticated) {
        resolve({
          component: Home
        })
      } else {
        resolve({
          component: Login
        })
      }
    },
    routes: [
      {
        path: '/about/',
        component: AboutPage,
        name: 'about'
      },
      {
        path: '/form/',
        component: FormPage,
        name: 'form'
      },
      {
        path: '/dynamic-route/blog/:blogId/post/:postId/',
        component: DynamicRoutePage,
        name: 'dynamic'
      },
      {
        path: '/panel-left/',
        component: PanelLeftPage,
        name: 'panel-left'
      },
      {
        path: '/color-themes/',
        component: ColorThemes,
        name: 'color-theme'
      },
      {
        path: '/chat/',
        component: Chat,
        name: 'chat'
      },
      {
        path: '/vuex/',
        component: Vuex,
        name: 'vuex'
      },
      {
        path: '/login/',
        component: Login,
        name: 'login'
      },
      {
        path: '/account/',
        component: Account,
        name: 'account'
      },
      {
        path: '/staffs/',
        component: StaffIndex,
        name: 'staffs.index'
      },
      {
        path: '/staff-create',
        component: StaffCreate,
        name: 'staffs.create'
      },
      {
        path: '/staffs/:uuid',
        component: StaffInfo,
        name: 'staffs.show'
      },
      {
        path: '/staffs/:uuid/edit',
        component: StaffEdit,
        name: 'staffs.edit'
      },
      {
        path: '/sales/',
        component: SaleIndex,
        name: 'sales.index'
      },
      {
        path: '/sales-create',
        component: SaleCreate,
        name: 'sales.create'
      },
      {
        path: '/sales/:uuid',
        component: SaleShow,
        name: 'sales.show'
      },
      {
        path: '/categories/',
        name: 'categories.index',
        component: CategoryIndex
      },
      {
        path: '/categories/create',
        name: 'categories.create',
        component: CategoryCreate
      },
      {
        path: '/categories/:uuid/edit',
        name: 'categories.edit',
        component: CategoryEdit
      },
      {
        path: '/roles/',
        name: 'roles.index',
        component: RoleIndex
      },
      {
        path: '/suppliers/',
        name: 'suppliers.index',
        component: SupplierIndex
      },
      {
        path: '/suppliers-create/',
        name: 'suppliers.create',
        component: SupplierCreate
      },
      {
        path: '/suppliers/:uuid/edit',
        name: 'suppliers.edit',
        component: SupplierEdit
      },
      {
        path: '/makes/',
        name: 'makes.index',
        component: MakeIndex
      },
      {
        path: '/makes-create/',
        name: 'makes.create',
        component: MakeCreate
      },
      {
        path: '/makes/:uuid/edit/',
        name: 'makes.edit',
        component: MakeEdit
      },
      {
        path: '/models/',
        name: 'models.index',
        component: ModelIndex
      },
      {
        path: '/models-create/',
        name: 'models.create',
        component: ModelCreate
      },
      {
        path: '/models/:uuid/edit/',
        name: 'models.edit',
        component: ModelEdit
      },
      {
        path: '/customers/',
        name: 'customers.index',
        component: CustomerIndex
      },
      {
        path: '/customers-create/',
        name: 'customers.create',
        component: CustomerCreate
      },
      {
        path: '/customers/:uuid/edit/',
        name: 'customers.edit',
        component: CustomerEdit
      },
      {
        path: '/products/',
        name: 'products.index',
        component: ProductIndex
      },
      {
        path: '/products-create/',
        name: 'products.create',
        component: ProductCreate
      },
      {
        path: '/products/:uuid/show/',
        name: 'products.show',
        component: ProductShow
      },
      {
        path: '/products/:uuid/edit/',
        name: 'products.edit',
        component: ProductEdit
      },
      {
        path: '/colors/',
        name: 'colors.index',
        component: ColorIndex
      },
      {
        path: '/colors-create/',
        name: 'colors.create',
        component: ColorCreate
      },
      {
        path: '/colors/:uuid/edit/',
        name: 'colors.edit',
        component: ColorEdit
      },
      {
        path: '/expenses',
        name: 'expenses.index',
        component: ExpenseIndex
      },
      {
        path: '/expenses/create',
        name: 'expenses.create',
        component: ExpenseCreate
      }
    ]
  }
]
