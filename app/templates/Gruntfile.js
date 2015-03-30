module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mustache-render');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    today: grunt.template.today("yyyy-mm-dd_HH-MM"),

    dirs: {
      build: 'public_html',
      src: 'src',
      data: '<%= dirs.src %>/data',
      templates: '<%= dirs.src %>/templates'
    },

////////////////////////////////////////

    concat: {
/*
      productsJSON: {
        src: '<%= products.data %>',
        dest: '<%= products.json %>',
        options: {
          banner: '{ "products": [',
          footer: ']}',
          separator: ','
        }
      },

      productsJS: {
        src: '<%= products.data %>',
        dest: '<%= products.js %>',
        options: {
          banner: 'var App = window.App || {};' + grunt.util.linefeed + 'App.products = [',
          footer: '];',
          separator: ',',
        }
      },
*/
    },

////////////////////////////////////////

    mustache_render: {
/*
      products: {
        options: {
          directory: '<%= dirs.data %>/templates/',
          data: '<%= products.json %>'
          //escape: false
        },
        files : {
          '<%= dirs.build %>/index.html': '<%= dirs.templates %>/index.mustache',
          '<%= dirs.build %>/debug.html' : '<%= dirs.templates %>/debug.mustache'
        }
      },
*/
    },

////////////////////////////////////////

    copy: {
/*
      offline: {
        files: [
          {
            expand: true,
            cwd: '<%= dirs.build %>/',
            src: [
              'js/**',
              'css/**',
              'video/**',
              'favicon-128x128.png',
              'favicon-160x160.png',
              'favicon-192x192.png'
            ],
            dest: '<%= dirs.offline %>'
          },
        ],
      },
*/
    },

////////////////////////////////////////

    watch: {
/*
      json: {
        files: ['<%= products.data %>'],
        tasks: ['concat','mustache_render']
      },
*/
    }

  });

  grunt.registerTask('default', [
    'concat',
    'mustache_render',
    'copy',
  ]);


};
