const { exec } = require('child_process');
const io = require('socket.io-client')('http://localhost:8002');

let addresses = [];
let users = [];

let connected = false;

function update() {

    if (!connected) {
        console.log('Cancelling update: Not connected to remote server.');
        return null;
    }
    console.log('Updating: Connected to server.');

    // Ping the network looking for devices.
    console.log('Scanning network...');
    var ping = exec("ping 192.168.2.255",{async:true});
    setTimeout(() => {
        // After 10 seconds kill the connection and run afterPing.
        ping.kill("SIGINT");
        this.afterPing();
    }, 10000);


    this.afterPing = () => {
        exec('arp -a', (err, stdout, stderr) => {
            if (err) {
                // node couldn't execute the command
                console.log('node couldnt execute the command');
                return;
            }

            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            // console.log(`stderr: ${stderr}`);

            let output = stdout;

            let _output = output.split('at ');

            let newAddresses = [];
            _output.map(each => {
              if (each.indexOf('on') !== -1) {
                newAddresses.push(each.split(' on')[0]);
              }
            })

            console.log('newAddresses', newAddresses);
            io.emit('update', { macList: newAddresses });
        });
    };
}

io.on('connect', function(){
    console.log('connected to remote server');
    connected = true;
});

setInterval(update, 30000);



