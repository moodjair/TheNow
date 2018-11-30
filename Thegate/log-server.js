    var cmd=require('node-cmd');
 
    cmd.get(
        'cd log && node-explorer -p 4001',
        function(err, data, stderr){
            console.log('the current working dir is : ',data)
        }
    );