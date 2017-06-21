if(document.getElementById('lettering2')) {
    // var filepath = '/assets/owd-bob/feb27.svg';
    // var filepath = '/assets/owd-bob/apr12.svg';
    var filepath = '/assets/work/owd-bob/june16.svg';
    new Vivus('lettering2', {
        duration: 250, 
        file: filepath,
        type: 'delayed',
        animTimingFunction: Vivus.EASE_OUT,
    });
}