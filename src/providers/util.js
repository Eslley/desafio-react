export default {
    maskCell(v) {
        v = v.replace(/\D+/g, ''); //Remove tudo o que não é dígito
        v = v.replace(/(\d{1,2})(\d)/, '($1)$2'); //Coloca parenteses nos primeiros 2 digitos
        v = v.replace(/(\d{1,5})(\d{1,4})$/, '$1-$2'); //Coloca um hífen entre o sétimo e o oitavo dígitos
        if (v.length == 14) v = v.replace(/(\d{2})(\d{5})(\d{1,4})$/, '($1)$2-$3');    
        if (v.length > 14) v = v.substr(0, 14);
        return v;
    },
    
    maskCPF(v) {
        v = v.replace(/\D+/g, ''); //Remove tudo o que não é dígito
        v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
        v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
        //de novo (para o segundo bloco de números)
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Coloca um hífen entre o terceiro e o quarto dígitos
        if (v.length > 14) v = v.substr(0, 14);
        return v;
      }
}