/*
A brief example to show blocking of the event 
loop. You should never actually do this.
*/

function wait() {
  console.log('Waiting...')
  setTimeout(wait, 1000);
}

wait();
