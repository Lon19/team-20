const densities = [860, 260, 145, 105, 50, 20]; // higher -> lower
const colors = ['#ff0000', '#ffa600', '#fcbe03', '#ffff00', '#80ff00', '#00ff1e'];

const simpleOne = 'Wards_December_2015_Full_Clip-bxp05f';
const detailedOne = 'Wards_December_2015_Full_Clip-41pq8l';

let data;
let oldZoom;

window.onload = function(){

    fetch('data.json').then(resp => {
        resp.json().then(d => {
            data = d;
        });
    });

};

map.on('load', function(e){

    for (let i = 0; i < densities.length; i++){
        map.addLayer({
            id: 'density' + densities[i],
            source: 'composite',
            'source-layer': simpleOne,
            type: 'fill',
            paint: {
                'fill-color': colors[i]
            }
        });
    }

    oldZoom = map.getZoom();
});

map.on('zoom', function(e){
    console.log("did zoom. oldZoom was " + oldZoom + " and now is " + map.getZoom());
    if (map.getZoom() < 7 && oldZoom >= 7){
        update(simpleOne);
    } else if (map.getZoom > 7 && oldZoom <= 7) {
        update(detailedOne);
    }

    oldZoom = map.getZoom();
});

map.on('load', function(e){


    // for (let j = 0; j < sf.length; j++){
    //     let name = sf[j].properties.wd11nm;
    //
    //     if (!data[name]){
    //         continue;
    //     }
    //
    //
    //     if (!sf[j].properties.density){
    //         // sf[j].properties.density = getMatchingDensity(data[name]);
    //
    //         // map.setFeatureState({
    //         //     id: sf[j].id,
    //         //     source: 'composite',
    //         //     sourceLayer: 'Wards_December_2011_Boundarie-4lgzg3'
    //         // }, {
    //         //     properties: {
    //         //         density: getMatchingDensity(data[name])
    //         //     }
    //         // });
    //
    //         //Draw.setFeatureProperty(sf[j].id, 'density', getMatchingDensity(data[name]));
    //
    //         // map.setFilter('density' + getMatchingDensity(data[name]), ['==', 'density', getMatchingDensity(data[name])]);
    //     }
    // }

    // if (!done) {
    //     map.addLayer({
    //         id: 'some-new-layer',
    //         source: 'composite',
    //         'source-layer': 'Wards_December_2011_Boundarie-4lgzg3',
    //         type: 'fill',
    //         paint: { 'fill-color': '#ffffff' }
    //     });
    //
    //     map.setFilter('some-new-layer', ['==', 'wd11nm', 'Gotham']);
    //
    //     done = true;
    // }

    // for (i = 0; i < sf.length; i++){
    //     sf[i]
    // }
});

function update(type){
    var sf = map.querySourceFeatures('composite', {sourceLayer:
        type});

    if (data == null){
        return;
    }

    for (let d = 0; d < densities.length; d++){
        map.setFilter('density' + densities[d], null); // clear filters

        var filters = ["any"];

        inner: for (let w = 0; w < sf.length; w++){
            let name = sf[w].properties.wd15nm;

            if (!data[name] && data[name] !== 0){
                continue inner;
            }

            if (getMatchingDensity(data[name]) === densities[d]){
                filters.push(['==', 'wd15nm', name]);
            }
        }

        map.setFilter('density' + densities[d], filters)
    }
}

function getMatchingDensity(density){

    let ret;

    for (let i = 0; i < densities.length; i++){
        if (density <= densities[i]){
            ret = densities[i];
        }
    }

    return ret;
}