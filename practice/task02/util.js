// check whether arr is an array
function isArray(arr) {
	if (Object.prototype.toString.call(arr) === '[object Array]') {
		alert('Input argument is an Array!');
	}
	else {
		alert('Input argument is NOT an Array!');
	}
}

// check whether fn is an function
function isFunction(fn) {
	if (fn && Object.prototype.toString.call(fn) === '[object Function]') {
		alert('Input argument is a function!');
	}
	else {
		alert('Input argument is NOT an Function!');
	}
}

// deep copy
function cloneObject(src) {
	var to = null;
	
	if (src.constructor !== Object && src.constructor !== Array) return src;
	if (src.constructor === Date || src.constructor === String || 
		src.constructor === Number || src.constructor === Boolean || 
		src.constructor === RegExp || src.constructor === Function) {
		
		return new src.constructor(src);
	}
	
	to = to || new src.constructor();
	
	for (var name in src) {
		to[name] = typeof to[name] === 'undefined' ? cloneObject(src[name]) : to[name];
	}
	
	return to;
}

// remove repeated elements in an array
function uniqArray(arr) {
	var map = {};
	var out = [];
	
	for (var i = 0, len = arr.length; i < len; i++) {
		if (!map[arr[i]]) {
			out.push(arr[i]);
			
			// distinguish number and string, such as 1 and '1', they are not duplicate literally
			if (typeof map[arr[i]] === typeof arr[i]) {
				map[arr[i]] = true;
			}
			else {
				map[arr[i]] = false;
			}
		}
	}
	
	return out;
}

// remove empty space at the start and the end of a string
function simpleTrim(str) {
    
    function isEmpty(c) {
        return /\s/.test(c);
    }
    
    for (var i = 0, len = str.length; i < len; i++) {
        if (!isEmpty(str.charAt(i))) break;
    }
    
    for (var j = str.length - 1; j >= 0; j--) {
        if (!isEmpty(str.charAt(j))) break;       
    }
            
    if (i > j) return '';
            
    return str.substring(i, j);
            
}

// use regular expression
function trim(str) {
    var rex = new RegExp('^\s+|\s+$', 'g');
    //var rex = new RegExp('(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)', 'g');
    
    return str.replace('/^\s+|\s+$/g', '');
}

// check whether it's an email address and mobile phone numbers(CN)
function isEmail(emailStr) {
    if (typeof emailStr !== 'string') return false;
    
    var rex = /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/;
    return rex.test(emailStr);
}

function isMobilePhone(phoneNum) {
    if (typeof phoneNum !== 'string') return false;
    
    var rex = /^(0086)?1\d{10}$/;
    return rex.test(phoneNum);
}

function each(arr, fn) {
    for (var i = 0, l = arr.length; i < l; i++) {
        fn(arr[i], i);
    }
}

// add class name to an element
function addClass(element, newClassName) {
    element.className += ' ' + newClassName;
}

// remove a class name from an element
function removeClass(element, oldClassName) {
/*    var newClassName = '';
	var arr;
	var classes = element.className.split(' ');
	
	for (var i = 0, l = classes.length; i < l; i++) {
		if (classes[i] !== oldClassName) {
			mewClassName += classes[i] + ' ';
		}
	}
	
	element.className = newClassName;*/
    
    // or use regular expression, much simpler
    var rex = new RegExp('\\b' + oldClassName + '\\b');
    element.className = element.className.replace(rex, '');
}

// check element and siblingNode's hierarchy
function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}

// get the given element's position relative to the window
function getPosition(element) {
    var x = 0;
	var y = 0;
	
	var current = element;
	var pre = null;
	
	while (current !== null) {
		x += current.offsetLeft;
		y += current.offsetTop;
		pre = current;
		
		current = current.offsetParent;
	}
	
	return {x: x, y: y};
}

// implement a simple own "jQuery"
function $(selector) {
	var idReg = /^#([\w_\-]+)/;    // id regular expression pattern
	var tagReg = /^\w+$/i;   // tagName pattern
	var classReg = /^\.([\w_\-]+)/; // class pattern
	
	// attributes pattern
	var attReg = /^\[([\w_\-]+)(=(["|'])?([\w_\-]+)(["|']?))?\]/;
	
	//for test
    /* console.log(idReg.test(selector));
	console.log(tagReg.test(selector));
	console.log(classReg.test(selector));
	console.log(attReg.test(selector)); */
	
	var result = {};
	
	if (id = selector.match(idReg)) {
		result = document.getElementById(id[1]);
	}
	else if (className = selector.match(classReg)) {
		result = document.getElementsByClassName(className[1])[0];
	}
	else if (tag = selector.match(tagReg)) {
		result = document.getElementsByTagName(tag[0])[0];
	}
	else if (attReg.test(selector)) {
		result = document.querySelectorAll(selector)[0];
	}
	
	return result;
}