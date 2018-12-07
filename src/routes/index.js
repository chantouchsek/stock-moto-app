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
import StaffAdd from 'pages/staffs/create'
import StaffInfo from 'pages/staffs/show'

// Sells Page
import SellIndex from 'pages/sales/index'
import SellShow from 'pages/sales/show'
import SellAdd from 'pages/sales/create'

// Authentication page
import Login from 'pages/auth/login'

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
        component: AboutPage
      },
      {
        path: '/form/',
        component: FormPage
      },
      {
        path: '/dynamic-route/blog/:blogId/post/:postId/',
        component: DynamicRoutePage
      },
      {
        path: '/panel-left/',
        component: PanelLeftPage
      },
      {
        path: '/color-themes/',
        component: ColorThemes
      },
      {
        path: '/chat/',
        component: Chat
      },
      {
        path: '/vuex/',
        component: Vuex
      },
      {
        path: '/login/',
        component: Login
      },
      {
        path: '/staffs/',
        component: StaffIndex
      },
      {
        path: '/add-staff/',
        component: StaffAdd
      },
      {
        path: '/staffs/:id',
        component: StaffInfo
      },
      {
        path: '/sales/',
        component: SellIndex
      },
      {
        path: '/sales/add/',
        component: SellAdd
      },
      {
        path: '/sales/:id/',
        component: SellShow
      }
    ]
  }
]
