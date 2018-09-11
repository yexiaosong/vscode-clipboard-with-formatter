const funReg = /^\s*function\s*(\S+)+\s*\(\s*(\w+)*\s*\)\s*\{[\s\S]*}*\s*$/g;
const callerReg = /^\s*(\S+)+\s*\([\s\S]*\)\s*$/g;
const classReg = /^\s*class\s*(\S+){1}[\s\S]*\{[\s\S]*\}\s*$/g;
const objReg = /^\s*\{\s*(\S+)+[\s\S]*\}\s*$/g;
const arrReg = /^\s*\[\s*(\S+)+[\s\S]*\]\s*$/g;

const matchFunction = {
    reg: funReg,
    content: 'Function: $1'
};
const matchCaller = {
    reg: callerReg,
    content: 'Caller: $1'
};
const matchClass = {
    reg: classReg,
    content: 'Class: $1'
};
const matchObject = {
    reg: objReg,
    content: 'Object: ...$1...'
};
const matchArray = {
    reg: arrReg,
    content: 'Array: ...$1...'
};

const matcher = [matchFunction, matchCaller, matchClass, matchObject, matchArray];

export default matcher;