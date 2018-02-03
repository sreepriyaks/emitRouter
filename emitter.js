function Emitter () {
    this.events = {}
}

Emitter.prototype.on = function(type, listener){
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
}

Emitter.prototype.emit = function(type, str){
    this.events[type].forEach((listener) => {
        listener(str);
    })
}

module.exports = Emitter;

   

