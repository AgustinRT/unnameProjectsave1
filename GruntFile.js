module.exports = function(grunt) {

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

		// Project configuration.
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),

		express: {
			options: {
			// Override defaults here
			},
			web: {
				options: {
				  script: 'server.js',
				}
			}
		}, 

		watch: {
			options: {
				livereload: true
			},
			mainls: {
				files: ['<%= pkg.dirs.srcCtrl %>/**/*.js',
				'<%= pkg.dirs.srcFT %>/**/*.js',
				'<%= pkg.dirs.srcTpl %>/**/*.html'],
				tasks: ['concatMainls', 'express:web']
			},
			web: {
				files: [
				  'server.js'
				],
				tasks: [
				  'express:web'
				],
				options: {
				  nospawn: true, //Without this option specified express won't be reloaded
				  atBegin: true,
				}
			}

		},

		connect: {
			options: {
				port: 3001,
				hostname: '*',// This way can access from anywere your ip:300 for mobile and tablets, or localhost:300 in your local desktop
				livereload: 35729
			},
			livereload: {
				options: {
					base:['<%= pkg.dirs.src %>']
				}
			}
		},

		clean: {
			server: '.tmp'
		},

		concat : {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %> */',
			},
			mainls : {
				src : '<%= pkg.dirs.mainFiles %>',
				dest : '<%= pkg.dirs.dest %>/mainls.js',
			},
			libsls : {
				src : ['node_modules/angular/angular.min.js'],
				dest : '<%= pkg.dirs.dest %>/extLibs.js',
			}
		},
		devUpdate: {
			main: {
				options: {
					updateType: 'prompt', //just report outdated packages
					reportUpdated: true, //report already updated packages
					semver: true, //use package.json semver rules when updating
					packages: { //what packages to check
						devDependencies: true, //only devDependencies
						dependencies: false
					},
					packageJson: null //find package.json automatically
				}
			}
		}
	});

	// Lets create a task to concat all the ext Lib.
	grunt.registerTask('concatMainls', ['concat:mainls', 'concat:libsls']);
	// Lets create a task to watch.
	grunt.registerTask('watchMainls', ['watch:mainls']);

	// Run server
	// grunt.registerTask('serve', ['clean:server', 'express:web','connect:livereload', 'watch:mainls']);
	grunt.registerTask('serve2', ['clean:server', 'express:web', 'watch:mainls']);

	// Update grunt dev
	grunt.registerTask('updateGrunt', ['devUpdate']);

	grunt.registerTask('default', function(arg) {
		grunt.log.writeln('');
		grunt.log.writeln('');
		grunt.log.subhead('.....:::::Options:::::.....');
		grunt.log.writeln('grunt watchMainls');
		grunt.log.writeln('');
		grunt.log.subhead('Extras');
		grunt.log.writeln('grunt concatMainls');
		// grunt.log.writeln('grunt serve');
		grunt.log.writeln('grunt serve2');
		grunt.log.writeln('grunt updateGrunt');
		grunt.log.writeln('');
	});
};