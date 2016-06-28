if(document.getElementById('lettering')) {
    // var filepath = '/assets/owd-bob/feb27.svg';
    var filepath = '/assets/owd-bob/apr12.svg';
    new Vivus('lettering', {
        duration: 500, 
        file: filepath,
        type: 'delayed',
        animTimingFunction: Vivus.EASE_OUT,
    });
}