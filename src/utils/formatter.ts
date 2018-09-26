import jsMatcher from './languages/javascript';
function format(languageId: string) {
    function matcher(type, params) {
        const formatter = type.find(item => item.reg.test(params) === true);
        return formatter ? params.replace(formatter.reg, formatter.content) : params;
    }
    switch(languageId)
    {
        case 'javascript':
            return function(params) {
                return matcher(jsMatcher, params);
            };

        case 'javascriptreact':
            return function(params) {
                return matcher(jsMatcher, params);
            };
        
        case 'typescript':
            return function(params) {
                return matcher(jsMatcher, params);
            };

        default:
            return function(params) {
                return params;
            };
    }
    
}

export { format };