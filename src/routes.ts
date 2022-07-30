const dashboardRoutes = [

  {
    path: '/dashboard',
    name: 'Dashboard',
    // icon: Person,
    fontAwesome:"bi bi-send-fill",
    component: Event,
    layout: '/admin',
    perm :"perm_b_event",

    hide: false,

  }
];

export default dashboardRoutes;
