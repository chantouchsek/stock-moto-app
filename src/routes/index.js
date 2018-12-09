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

// Sells Page
import SellIndex from 'pages/sales/index'
import SellShow from 'pages/sales/show'
import SellAdd from 'pages/sales/create'

// Authentication page
import Login from 'pages/auth/login'

// Categories Page
import CategoryIndex from 'pages/categories/index'
import CategoryCreate from 'pages/categories/create'
import CategoryEdit from 'pages/categories/edit'

// Roles Pages
import RoleIndex from 'pages/roles/index'

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
        component: SellIndex,
        name: 'sales.index'
      },
      {
        path: '/sales/add/',
        component: SellAdd,
        name: 'sales.create'
      },
      {
        path: '/sales/:id/',
        component: SellShow,
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
      }
    ]
  }
]
