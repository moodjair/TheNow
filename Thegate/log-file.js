    var cmd=require('node-cmd');
 
    cmd.get(
        'node-explorer -p 1000',
        function(err, data, stderr){
            console.log('the current working dir is : ',data)
        }
    );