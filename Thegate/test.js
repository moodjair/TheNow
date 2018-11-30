var vakey = require('./config/config-universitas.json');

function getkey(inst) {
  return vakey.filter(
    function(vakey) {
      return vakey.inst == inst
    }
  );
}

var found = getkey('bbb');
console.log(found[0].name)