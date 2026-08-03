export const RouteConstant = {
    auth: {
        login: {
            name: "Login",
            path: "/login",
        },
        signup: {
            name: "Signup",
            path: "/signup",
        }
    },

    dashboard: {
        landing: {
            name: 'Dashboard',
            path: '/',
        },
        bootcampList: {
            name: 'Bootcamp List',
            path: '/bootcamps',
        },
        bootcampDetail: {
            name: 'Bootcamp Detail',
            path: `/bootcamp/:id`,
        },
        user: {
            name: 'User',
            path: '/user',
        },
        adminUsers: {
            name: 'AdminUsers',
            path: '/admin/users',
        },
        adminBootcamps: {
            name: 'AdminBootcamps',
            path: '/admin/bootcamps',
        },
        adminBootcamp: {
            name: 'AdminBootcamp',
            path: '/admin/bootcamps/:id',
        },
        publisher: {
            name: 'Publisher',
            path: '/publisher',
        }
    }
}