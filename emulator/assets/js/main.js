$('#start-requests').click(() => {
    alert("clicked")
})

let main = angular.module('main', [])
    .controller('mainController', function ($http, $scope) {
        $scope.startSequence = () => {
            console.log("sequence started")
            let address = $('#address').val();
            let sensorId = $('#sensor-id').val()
            let token = $('#sensor-token').val()
            let sendMode = $('#sendmode').val();
            let dataset = createDataset(sendMode);
            let num = 0;


            let a = () => {
                setInterval(
                    () => {
                        if (num < dataset.length) {
                            $http.post(address + "/" + sensorId + '/' + token, dataset[num++]).then(
                                (data) => {
                                    console.info("successful " + data)
                                }
                            )
                            chek(num);
                        }
                    }, 2000
                )
            }

            let chek = (i) => {
                if (i >= dataset.length) {
                    clearInterval(a);
                    alert("sequence ended")
                }
            }
            a();
        }
    })

function createDataset(mode) {
    let num = 30
    let dataset = []
    if (mode === "1") {
        for (let i = 0; i < num; i++) {
            let dat = new data();
            dat.p = Math.round(60 + Math.random() * 100) % 200
            dat.h = Math.round(40 + Math.random() * 100) % 200
            dat.t = Math.round(30 + Math.random() * 10) % 40
            dat.lat = -37.9850832
            dat.lng = 144.7870647
            dataset.push(dat)
        }
    } else if (mode === "2") {
        for (let i = 0; i < num; i++) {
            let dat = new data();
            dat.p = Math.round(80 + Math.random() * 100) % 200
            dat.h = Math.round(50 + Math.random() * 100) % 200
            dat.t = Math.round(35 + Math.random() * 10) % 40
            dat.lat = -37.9850832
            dat.lng = 144.7870647
            dataset.push(dat)
        }
    } else if (mode === "3") {
        for (let i = 0; i < num; i++) {
            let dat = new data();
            dat.p = Math.round(90 + Math.random() * 100) % 200
            dat.h = Math.round(60 + Math.random() * 100) % 200
            dat.t = Math.round(38 + Math.random() * 10) % 40
            dat.lat = -37.9850832
            dat.lng = 144.7870647
            dataset.push(dat)
        }
    }
    return dataset
}

class data {
    t;
    p;
    h;
    lat;
    lng;
}