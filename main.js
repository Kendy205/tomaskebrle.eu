function copyMail(){
    const el = document.createElement('textarea');
    el.value = 'tomaskebrle@protonmail.com';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el)
    M.toast({html: 'Adresa zkopírovaná do schránky', classes: 'rounded, nord0'})
}