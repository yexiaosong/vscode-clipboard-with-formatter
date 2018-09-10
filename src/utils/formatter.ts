import { funReg } from './languages/javascript';
function format(languageId: string) {
    let _funReg: RegExp;
    return function (params: string) {
        switch(languageId)
        {
            case 'javascript':
                _funReg = funReg;
                break;
            default:
                _funReg = funReg;
        }
        return params.replace(_funReg, 'function $1');
    };
    
}

export { format };