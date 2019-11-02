const densities = [860, 260, 145, 105, 50, 20]; // higher -> lower
// const colors = ['#ff0000', '#ffa600', '#fcbe03', '#ffff00', '#80ff00', '#00ff1e'];
const colors = ['#f24343', '#f27171', '#f2a371', '#f2d671', '#dcf271', '#85f271'];

const simpleOne = 'Wards_December_2015_Full_Clip-bxp05f';
const detailedOne = 'Wards_December_2015_Full_Clip-41pq8l';
// const detailedOne = 'Wards_December_2015_Full_Clip-bxp05f';

let data;
let oldZoom;

let detailedLayer = false;

window.onload = function(){

    fetch('data_processed_added.json').then(resp => {
        resp.json().then(d => {
            data = d;
        });
    });

};

var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

map.on('mouseenter', 'simpleone', function(f){
    map.getCanvas().style.cursor = 'pointer';

    popup.setLngLat([f.lngLat.lng, f.lngLat.lat]).setHTML('pop').addTo(map);
});

map.on('mouseleave', 'simpleone', function(f){
    map.getCanvas().style.cursor = '';
    popup.remove();
});

map.on('load', function(e){

    for (let i = 0; i < densities.length; i++){
        map.addLayer({
            id: 'density' + densities[i] + 's',
            source: 'composite',
            'source-layer': simpleOne,
            type: 'fill',
            paint: {
                'fill-color': colors[i],
                'fill-outline-color': '#ffffff'
            }
        });

        // map.on('mouseenter', 'density' + densities[i], function(f){
        //     map.getCanvas().style.cursor = 'pointer';
        //
        //     popup.setLngLat([f.lngLat.lng, f.lngLat.lat]).setHTML('pop').addTo(map);
        // });
        //
        // map.on('mouseleave', 'density' + densities[i], function(f){
        //     map.getCanvas().style.cursor = '';
        //     popup.remove();
        // });
    }

    update(simpleOne, 's');

    oldZoom = map.getZoom();
});

map.on('zoom', function(e){
    if (map.getZoom() < 7 && oldZoom >= 7){
        update(simpleOne, 's');
        console.log("switching to simple");
    } else if (map.getZoom() > 7 && oldZoom <= 7) {
        update(detailedOne, 'd');
        console.log("switching to detailed");
    }

    oldZoom = map.getZoom();
});

function update(type, character){
    if (!detailedLayer){
        for (let i = 0; i < densities.length; i++){
            map.addLayer({
                id: 'density' + densities[i] + 'd',
                source: 'composite',
                'source-layer': detailedOne,
                type: 'fill',
                paint: {
                    'fill-color': colors[i],
                    'fill-outline-color': '#ffffff'
                }
            });
        }

        detailedLayer = true;
    }

    var sf = map.querySourceFeatures('composite', {sourceLayer:
        type});

    if (data == null){
        return;
    }

    for (let d = 0; d < densities.length; d++){
        map.setFilter('density' + densities[d] + character, null); // clear filters

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

        map.setFilter('density' + densities[d] + character, filters);
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