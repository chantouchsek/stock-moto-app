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
import SaleAdd from 'pages/sales/create'

// Authentication page
import Login from 'pages/auth/login'

// Categories Page
import CategoryIndex from 'pages/categories/index'
import CategoryCreate from 'pages/categories/create'
import CategoryEdit from 'pages/categories/edit'

// Roles Pages
import RoleIndex from 'pages/roles/index'

// Supplier page
import SupplierIndex from 'pages/suppliers/index'
import SupplierCreate from 'pages/suppliers/create'
import SupplierEdit from 'pages/suppliers/edit'

// Makes page
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
        path: '/sales/add/',
        component: SaleAdd,
        name: 'sales.create'
      },
      {
        path: '/sales/:id/',
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
      }
    ]
  }
]
