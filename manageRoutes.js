var Emitter = require('./emitter');
var eventEmitter = new Emitter();
var Controller;
var routerController = [];

eventEmitter.on('controllerNotFound', (route) => {
    console.log("Controller specified for the requested route not found. Please define your controller. Requested URL: " + route.url + " , Specified Controller: " + route.controller);
});

let addController = (controller) => {
    Controller =  controller;
};

let addRoutes = (routes) => {
    routes.forEach(route => {
        let routeUrl = route.url;
        let routeMethod = route.method;
        let controller = route.controller;
        
        if(typeof Controller[controller] !== "undefined" && typeof Controller[controller] === "function"){
            eventEmitter.on(controller, Controller[controller]);
            routerController.push({url: routeUrl, method: routeMethod, controller: controller});
        }
        else{
            eventEmitter.emit('controllerNotFound', ({url: routeUrl, controller: controller}));
        }
    });

    console.log(routerController);
};

let handler = (req, res) => {
    let controllerObj = routerController.find((controller) => {return (controller.url === req.url && controller.method === req.method)});    
    if(controllerObj)
    {
        let controller = controllerObj.controller;
        eventEmitter.emit(controller, {req: req, res: res})
    }
    else{
        eventEmitter.emit('controllerNotFound', ({url: req.url, controller: "unknown"}));
    }
};

module.exports = {
    addController,
    addRoutes,
    handler
}