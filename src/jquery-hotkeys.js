jQuery.fn.hotkey = function(keys, func) {
    var element = $(this[0]);
    var specialKeyCodes = {
        8 : 'backspace',
        9 : 'tab',
        13 : 'enter',
        16 : 'shift',
        17 : 'ctrl',
        18 : 'alt',
        19 : 'break',
        20 : 'caps lock',
        27 : 'escape',
        33 : 'page up',
        34 : 'page down',
        35 : 'end',
        36 : 'home',
        37 : 'left',
        38 : 'up',
        39 : 'right',
        40 : 'down',
        45 : 'insert',
        46 : 'delete',
        96 : 'numpad 0',
        97 : 'numpad 1',
        98 : 'numpad 2',
        99 : 'numpad 3',
        100 : 'numpad 4',
        101 : 'numpad 5',
        102 : 'numpad 6',
        103 : 'numpad 7',
        104 : 'numpad 8',
        105 : 'numpad 9',
        112 : 'f1',
        113 : 'f2',
        114 : 'f3',
        115 : 'f4',
        116 : 'f5',
        117 : 'f6',
        118 : 'f7',
        119 : 'f8',
        120 : 'f9',
        121 : 'f10',
        122 : 'f11',
        123 : 'f12'
    };

    keys = $.trim(keys);

    if (typeof keys !== 'string') {
        throw 'Keys parameter must be a string for jquery hotkeys';
    }

    if (keys === '') {
        throw 'Keys parameter cannot be empty';
    }

    if (keys.indexOf('+') == -1) {
        var arr = [];
        arr.push(keys);
        keys = arr;
    } else {
        keys = keys.split('+');
    }

    var keysCount = keys.length;

    if (keysCount > 2) {
        throw 'jQuery hotkey supports only maximal combination with two keys like ctrl+c';
    }

    var validateFirstKey = false;

    element.keydown(function(event) {
        var keyCode = event.keyCode;
        var char = '';

        if (typeof specialKeyCodes[keyCode] !== 'undefined') {
            char = specialKeyCodes[keyCode];
        } else {
            char = String.fromCharCode(keyCode).toLowerCase();
        }

        if (keysCount === 1 && char === keys[0]) {
            func();
        }

        if (keysCount === 2 && char === keys[0]) {
            validateFirstKey = true;
        }
    }).keyup(function(event) {
        if (validateFirstKey) {
            var keyCode = event.keyCode;
            var char = '';

            if (typeof specialKeyCodes[keyCode] !== 'undefined') {
                char = specialKeyCodes[keyCode];
            } else {
                char = String.fromCharCode(keyCode).toLowerCase();
            }

            if (char === keys[1]) {
                func();
            }
        }
    });
};