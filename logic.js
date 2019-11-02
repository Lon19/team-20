var done = false;

map.on('zoom', function(e){
    var sf = map.querySourceFeatures('composite', {sourceLayer:
            'Wards_December_2011_Boundarie-0cjrgb'});

    if (!done) {
        map.addLayer({
            id: 'some-new-layer',
            source: 'composite',
            'source-layer': 'Wards_December_2011_Boundarie-4lgzg3',
            type: 'fill',
            paint: { 'fill-color': '#ffffff' }
        });

        map.setFilter('some-new-layer', ['==', 'wd11nm', 'Gotham']);

        done = true;
    }

    // for (i = 0; i < sf.length; i++){
    //     sf[i]
    // }
});

function densityToColor(density){

    const densities = [860, 260, 145, 105, 50, 20]; // higher -> lower
    const colors = ['#ff0000', '#ffa600', '#ffff00', '#80ff00', '#00ff1e'];

    let ret;

    for (let i = 0; i < densities.length; i++){
        if (density <= densities[i]){
            ret = colors[i];
        }
    }

    return ret;
}