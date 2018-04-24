
function start() {
    let result1 = Math.round(Math.random() * 1);
    let result2 = Math.round(Math.random() * 1);
    let result3 = Math.round(Math.random() * 1);

    document.getElementById('output1').src = (result1 === 0) ? './images/cherry.png' : './images/lemon.jpg';
    document.getElementById('output2').src = (result2 === 0) ? './images/cherry.png' : './images/lemon.jpg';
    document.getElementById('output3').src = (result3 === 0) ? './images/cherry.png' : './images/lemon.jpg';

    setTimeout(function() {
        if((result1 === 0 && result2 === 0 && result3 === 0) || (result1 === 1 && result2 === 1 && result3 === 1)) {
            alert('JACKPOT!!!')
        } else {
            alert('try again')
        }
    }, 1500)
}