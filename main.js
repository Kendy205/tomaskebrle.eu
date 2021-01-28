// Zkopírování emailu
function copyMail(){
    const el = document.createElement('textarea');
    el.value = 'tomaskebrle@protonmail.com';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el)
    M.toast({html: 'Email zkopírovan do schránky', classes: 'nord0'})
}

// Zkopírování Discord
function copyDiscord(){
    const el = document.createElement('textarea');
    el.value = 'Kendy205 #1645';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el)
    M.toast({html: 'Jméno zkopírované do schránky', classes: 'nord0'})
}