module.exports = {
  pages: {
    index: {
      // entry for the page
      entry: 'src/pages/home/main.js',
      // the source template
      template: 'public/index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }, 'terms_and_conditions': {
      // entry for the page
      entry: 'src/pages/terms_and_conditions/main.js',
      // the source template
      template: 'public/index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Terms and conditions',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'terms_and_conditions']
    },'about': {
      // entry for the page
      entry: 'src/pages/about/main.js',
      // the source template
      template: 'public/index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'About',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'about']
    },
    'applications': {
      // entry for the page
      entry: 'src/pages/applications/main.js',
      // the source template
      template: 'public/index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Applications ',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'applications']
    },
    'explore': {
      // entry for the page
      entry: 'src/pages/explore/main.js',
      // the source template
      template: 'public/index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'About',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'explore']
    },
    'mail': {
      // entry for the page
      entry: 'src/pages/mail/main.js',
      // the source template
      template: 'public/index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Received Messages',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'mail']
    },'my_cv': {
      // entry for the page
      entry: 'src/pages/cv/main.js',
      // the source template
      template: 'public/index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'My Curriculum',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'my_cv']
    },
    'login': {
      // entry for the page
      entry: 'src/pages/login/main.js',
      // the source template
      template: 'public/index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Log in',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'login']
    },
    'companies': {
      // entry for the page
      entry: 'src/pages/companies/main.js',
      // the source template
      template: 'public/index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Companies',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'companies']
    },
    'ds_profile': {
      // entry for the page
      entry: 'src/pages/ds_profile/main.js',
      // the source template
      template: 'public/index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Companies',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'ds_profile']
    },
      'register': {
      // entry for the page
      entry: 'src/pages/register/main.js',
      // the source template
      template: 'public/index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Register',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'register']
    },
    'review': {
      // entry for the page
      entry: 'src/pages/review/main.js',
      // the source template
      template: 'public/index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Reviews',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'review']
    },
    'admin_offers': {
    // entry for the page
    entry: 'src/pages/admin_offers/main.js',
    // the source template
    template: 'public/index.html',
    // when using title option,
    // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
    title: 'Manage offers',
    // chunks to include on this page, by default includes
    // extracted common chunks and vendor chunks.
    chunks: ['chunk-vendors', 'chunk-common', 'admin_offers']
  },
  'dashboard': {
    // entry for the page
    entry: 'src/pages/dashboard/main.js',
    // the source template
    template: 'public/index.html',
    // when using title option,
    // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
    title: 'Dashboard',
    // chunks to include on this page, by default includes
    // extracted common chunks and vendor chunks.
    chunks: ['chunk-vendors', 'chunk-common', 'dashboard']
  },
  'submition': {
    // entry for the page
    entry: 'src/pages/submition/main.js',
    // the source template
    template: 'public/index.html',
    // when using title option,
    // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
    title: 'My submitions',
    // chunks to include on this page, by default includes
    // extracted common chunks and vendor chunks.
    chunks: ['chunk-vendors', 'chunk-common', 'submition']
  },
  'offer_paypal_accepted': {
    // entry for the page
    entry: 'src/pages/explore/main.js',
    // the source template
    template: 'public/index.html',
    // when using title option,
    // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
    title: 'About',
    // chunks to include on this page, by default includes
    // extracted common chunks and vendor chunks.
    chunks: ['chunk-vendors', 'chunk-common', 'explore']
  },
  'user_plan': {
    // entry for the page
    entry: 'src/pages/user_plan/main.js',
    // the source template
    template: 'public/index.html',
    // when using title option,
    // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
    title: 'My User Plan',
    // chunks to include on this page, by default includes
    // extracted common chunks and vendor chunks.
    chunks: ['chunk-vendors', 'chunk-common', 'user_plan']
  },
  'accept_userplan_payment': {
    // entry for the page
    entry: 'src/pages/user_plan/main.js',
    // the source template
    template: 'public/index.html',
    // when using title option,
    // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
    title: 'Accept UserPlan Payment',
    // chunks to include on this page, by default includes
    // extracted common chunks and vendor chunks.
    chunks: ['chunk-vendors', 'chunk-common', 'user_plan']
  },
  'cancel_userplan_payment': {
    // entry for the page
    entry: 'src/pages/user_plan/main.js',
    // the source template
    template: 'public/index.html',
    // when using title option,
    // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
    title: 'Cancel UserPlan Payment',
    // chunks to include on this page, by default includes
    // extracted common chunks and vendor chunks.
    chunks: ['chunk-vendors', 'chunk-common', 'user_plan']
  },
  'manage_users': {
    // entry for the page
    entry: 'src/pages/manage_users/main.js',
    // the source template
    template: 'public/index.html',
    // when using title option,
    // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
    title: 'Cancel UserPlan Payment',
    // chunks to include on this page, by default includes
    // extracted common chunks and vendor chunks.
    chunks: ['chunk-vendors', 'chunk-common', 'manage_users']
  },
  'ranking': {
    // entry for the page
    entry: 'src/pages/ranking/main.js',
    // the source template
    template: 'public/index.html',
    // when using title option,
    // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
    title: 'Ranking',
    // chunks to include on this page, by default includes
    // extracted common chunks and vendor chunks.
    chunks: ['chunk-vendors', 'chunk-common', 'ranking']
  },
},

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
