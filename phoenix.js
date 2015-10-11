#! /usr/bin/env node 

if(process.argv[2]){
	const fs 			= require('fs');
	const file 			= process.argv[2];
	var childProcess 	= require('child_process');
	var js 				= childProcess.fork(file);

	console.log('===== Phoenix Daemon Watcher =====\n');
	console.log('Watching ' + file + ' - this file will reload every time a change is made to it automatically');
	console.log('~~~ Change log: ~~~ \n');
	fs.watchFile(file.toString(), function(prev, curr){

		js.kill();
	    console.log('*** '+ file +' killed ***');
	    js = childProcess.fork(file);
	    console.log('*** '+ file +' restarted ***');

		var timeStamp = new Date();
		console.log('*** Updated ' + file + ' at ' + timeStamp + ' ***');
		console.log('---------------------------------------');
	});

	process.on('SIGINT', function () {
	    js.kill();
	    fs.unwatchFile(file);
	    process.exit();
	});	

}
else{
	throw new Error('No arguments provided, provide a .js file to run');
}