new Promise(function(good, bad) {
  good('argument')
})
  // what is returned in the above promise becomes "o"
  .then( o => do_some_work_get_a_number(o))

  // what is returned in above promise becomes "i"
  .then( i => do_some_work_return_another_promise(i))

  // this then won't run until the above promise resolves
  .then( ... )
  .catch();
