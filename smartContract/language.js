"use strict";

var Language = function () {
    LocalContractStorage.defineMapProperty(this, "arrayMap");
    LocalContractStorage.defineMapProperty(this, "dataMap");
    LocalContractStorage.defineProperty(this, "size");
};

Language.prototype = {
    init: function () {
        this.size = 0;
    },

    set: function (key,value) {
        var from = Blockchain.transaction.from;
        var index = this.size;
        this.arrayMap.set(index, from+key);
        this.dataMap.set(from+key, value);
        this.size += 1;
    },

    get: function (key) {
        return this.dataMap.get(key);
    },
    len: function () {
        return this.size;
    },
    zan:function(key){
        var temp=JSON.parse(this.dataMap.get(key));
        temp.zan+=1;
        this.dataMap.set(key, JSON.stringify(temp));
    },
    forEach: function (limit, offset) {
        limit = parseInt(limit);
        offset = parseInt(offset);
        if (offset > this.size) {
            throw new Error("offset is not valid");
        }
        var number = offset + limit;
        if (number > this.size) {
            number = this.size;
        }
        var result = [];
        for (var i = offset; i < number; i++) {
            var key = this.arrayMap.get(i);
            var object = this.dataMap.get(key);
            var temp = {
                index: i,
                key: key,
                value: object
            }
            result.push(temp);
        }
        return JSON.stringify(result);
    }
};

module.exports = Language;