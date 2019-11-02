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



}