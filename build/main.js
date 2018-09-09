webpackJsonp([9],{

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductosProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the ProductosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ProductosProvider = /** @class */ (function () {
    function ProductosProvider(alertController, http) {
        this.alertController = alertController;
        this.http = http;
        this.pagina = 0;
        this.productos = [];
        this.lineas = [];
        this.porCategoria = [];
        this.resultados = [];
        /* Para muestra de detalles de ordenes */
        this.productoDetalle = [];
        this.totalOrdenDetalle = 0;
        this.cargarTodos();
        this.cargarLineas();
    }
    ProductosProvider.prototype.cargarLineas = function () {
        var _this = this;
        var promesa = new Promise(function (resolve, reject) {
            var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["b" /* URL_SERVICIOS */] + '/lineas';
            _this.http.get(url).subscribe(function (data) {
                if (data.error) {
                    // problema
                }
                else {
                    _this.lineas = data.lineas;
                }
                resolve();
            });
        });
        return promesa;
    };
    ProductosProvider.prototype.cargarPorCategoria = function (categoria) {
        var _this = this;
        var promesa = new Promise(function (resolve, reject) {
            var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["b" /* URL_SERVICIOS */] + '/productos?tipo=' + categoria;
            _this.http.get(url)
                .subscribe(function (data) {
                // console.log('De subscribe ',  data)
                if (data.error) {
                    // problema
                    _this.alertController.create({
                        title: "Error al cargar por categoría",
                        subTitle: "Probablemente el servidor esté fuera de servicio.",
                        buttons: ["Ok"]
                    }).present();
                }
                else {
                    // let nuevaData = this.agrupar(data.productos, 2);
                    _this.porCategoria = data.productos;
                }
                resolve();
            });
        });
        return promesa;
    };
    ProductosProvider.prototype.cargarTodos = function () {
        var _this = this;
        var promesa = new Promise(function (resolve, reject) {
            var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["b" /* URL_SERVICIOS */] + '/productos?pagina=' + _this.pagina;
            _this.http.get(url)
                .subscribe(function (data) {
                // console.log('De subscribe ',  data)
                if (data.error) {
                    // problema
                }
                else {
                    // agregar a arreglo de productos
                    var nuevaData = _this.agrupar(data.productos, 2);
                    (_a = _this.productos).push.apply(_a, nuevaData);
                    /*  el operador de tres puntos me ayuda a meter cada elemento del array
                        de data.productos dentro de this.productos, porque de lo contrario,
                        se meteria el array mismo de data.productos como 1 solo elemento del
                        array this.productos. Got it?
                    */
                    _this.pagina = _this.pagina + 1;
                }
                resolve();
                var _a;
            });
        });
        return promesa;
    };
    ProductosProvider.prototype.cargarProductosDetalle = function (ordenDetalles) {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Observable"](function (observer) {
            //  console.log(ordenDetalles);
            _this.productoDetalle = [];
            _this.totalOrdenDetalle = 0;
            for (var _i = 0, ordenDetalles_1 = ordenDetalles; _i < ordenDetalles_1.length; _i++) {
                var detalle = ordenDetalles_1[_i];
                var codigo = detalle.producto_id;
                _this.cargarProducto(codigo).then(function () {
                    observer.next(_this.productoDetalle);
                });
            }
        })
            .map(function (resp) { return console.log(resp); });
        return observable;
    };
    ProductosProvider.prototype.cargarProducto = function (codigo) {
        var _this = this;
        var promesa = new Promise(function (resolve, reject) {
            var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["b" /* URL_SERVICIOS */] + '/productos/codigo/' + codigo;
            _this.http.get(url).subscribe(function (data) {
                if (data.error) {
                    _this.alertController.create({
                        title: "Error al cargar detalle de producto",
                        subTitle: "Probablemente el servidor esté fuera de servicio.",
                        buttons: ["Ok"]
                    }).present();
                }
                else {
                    // console.log(data.producto);
                    _this.totalOrdenDetalle += data.producto.precio_compra;
                    _this.productoDetalle.push(data.producto);
                    return data.producto;
                }
            });
        });
        return promesa;
    };
    ProductosProvider.prototype.agrupar = function (arr, tamano) {
        var nuevoArreglo = [];
        for (var i = 0; i < arr.length; i += tamano) {
            nuevoArreglo.push(arr.slice(i, i + tamano));
        }
        // console.log(nuevoArreglo);
        return nuevoArreglo;
    };
    ProductosProvider.prototype.buscar_producto = function (termino) {
        var _this = this;
        var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["b" /* URL_SERVICIOS */] + '/productos/buscar/' + termino;
        if (termino.length > 0) {
            this.http.get(url).subscribe(function (data) {
                if (data.error) {
                    _this.alertController.create({
                        title: "Error al cargar detalle de producto",
                        subTitle: "Probablemente el servidor esté fuera de servicio.",
                        buttons: ["Ok"]
                    }).present();
                }
                else {
                    //console.log(data.productos);
                    _this.resultados = data.productos;
                    return data.productos;
                }
            });
        }
        else {
            this.resultados = [];
            return this.resultados;
        }
    };
    ProductosProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], ProductosProvider);
    return ProductosProvider;
}());

//# sourceMappingURL=productos.js.map

/***/ }),

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__usuario_usuario__ = __webpack_require__(65);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__usuario_usuario__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__productos_productos__ = __webpack_require__(118);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__productos_productos__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__carrito_carrito__ = __webpack_require__(64);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__carrito_carrito__["a"]; });



//# sourceMappingURL=index.providers.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdenesDetallePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_carrito_carrito__ = __webpack_require__(64);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// tslint:disable-next-line:import-blacklist
// import { Subscription } from 'rxjs/Rx';
var OrdenesDetallePage = /** @class */ (function () {
    // subscription: Subscription;
    function OrdenesDetallePage(navCtrl, alertCtrl, navParams, _carritoProvider) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this._carritoProvider = _carritoProvider;
        /* TODO: Esta seccion la voy a rehacer en otro proyecto, como viene de uno que implementa de un
                 backend en php y lo adapte a nodejs, eche muchas cosas de cabeza...  */
        this.orden = {};
        this.total_orden = 0;
        this.orden = navParams.get("orden");
        console.log("Recibiendo");
        console.log(this.orden.detalle); /*
        this.subscription = _productoProvider.cargarProductosDetalle(this.orden.detalle)
                                             .subscribe(resp => {
                                               console.log('Subs ', resp);
                                             },
                                             error => {
                                               console.log('Error en el obs ', error);
                                             },
                                             () => {
                                               console.log('El observador ha terminado');
                                             }
                                             );*/
    }
    OrdenesDetallePage.prototype.borrarOrden = function () {
        var _this = this;
        this._carritoProvider.borrarOrden(this.orden._id).subscribe((function (data) {
            if (data.error) {
                console.log("Error");
                _this.alertCtrl.create({
                    title: "Error",
                    subTitle: data.error.mensaje,
                    buttons: ["Ok"]
                }).present();
            }
            else {
                console.log(data.orden);
                _this.alertCtrl.create({
                    title: "Listo",
                    subTitle: data.orden._id + ' eliminado satisfactoriamente',
                    buttons: ["Ok"]
                }).present();
                // Me regreso a la pantalla anterior.
                _this.navCtrl.pop();
            }
        }));
    };
    OrdenesDetallePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-ordenes-detalle',template:/*ion-inline-start:"C:\wsIonic\tienda-mobile\src\pages\ordenes-detalle\ordenes-detalle.html"*/'<!--\n  Generated template for the OrdenesDetallePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>Orden {{orden._id}}</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-list>\n        <ion-item *ngFor="let item of orden.detalle">\n            <ion-thumbnail item-left>\n                <img [src]="item.codigo | imagen" />\n            </ion-thumbnail>\n            <h2>{{item.producto_id}}</h2>\n            <p>Aqui va el proveedor</p>\n            <p>Aqui va el precio de compra</p>\n        </ion-item>\n    </ion-list>\n    <hr>\n    <ion-grid>\n        <ion-row>\n            <ion-col>\n                <h3>\n                    <strong>Total:</strong> aqui va el total\n                </h3>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n    <button ion-button block color="danger" (click)="borrarOrden()">Borrar</button>\n</ion-content>'/*ion-inline-end:"C:\wsIonic\tienda-mobile\src\pages\ordenes-detalle\ordenes-detalle.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_carrito_carrito__["a" /* CarritoProvider */]])
    ], OrdenesDetallePage);
    return OrdenesDetallePage;
}());

//# sourceMappingURL=ordenes-detalle.js.map

/***/ }),

/***/ 168:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 168;

/***/ }),

/***/ 212:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/busqueda/busqueda.module": [
		693,
		8
	],
	"../pages/carrito/carrito.module": [
		694,
		7
	],
	"../pages/categorias/categorias.module": [
		695,
		6
	],
	"../pages/login/login.module": [
		696,
		5
	],
	"../pages/ordenes-detalle/ordenes-detalle.module": [
		697,
		4
	],
	"../pages/ordenes/ordenes.module": [
		698,
		3
	],
	"../pages/por-categorias/por-categorias.module": [
		699,
		2
	],
	"../pages/productos/productos.module": [
		700,
		1
	],
	"../pages/tabs/tabs.module": [
		701,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 212;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BusquedaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_paginas__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_index_providers__ = __webpack_require__(134);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BusquedaPage = /** @class */ (function () {
    function BusquedaPage(navCtrl, navParams, _productoProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._productoProvider = _productoProvider;
    }
    BusquedaPage.prototype.buscarProductos = function (ev) {
        // set val to the value of the searchbar
        var val = ev.target.value;
        this._productoProvider.buscar_producto(val);
    };
    BusquedaPage.prototype.irAPaginaProducto = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__index_paginas__["i" /* ProductosPage */], { 'producto': item });
    };
    BusquedaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-busqueda',template:/*ion-inline-start:"C:\wsIonic\tienda-mobile\src\pages\busqueda\busqueda.html"*/'<!--\n  Generated template for the BusquedaPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>Buscar producto</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n    <ion-searchbar (ionInput)="buscarProductos($event)"></ion-searchbar>\n    <ion-list>\n        <ion-item *ngFor="let item of _productoProvider.resultados" (click)="irAPaginaProducto( item )">\n            {{ item.producto }}\n        </ion-item>\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"C:\wsIonic\tienda-mobile\src\pages\busqueda\busqueda.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_index_providers__["b" /* ProductosProvider */]])
    ], BusquedaPage);
    return BusquedaPage;
}());

//# sourceMappingURL=busqueda.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PorCategoriasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_paginas__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_productos_productos__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the PorCategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PorCategoriasPage = /** @class */ (function () {
    function PorCategoriasPage(navCtrl, navParams, _productoProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._productoProvider = _productoProvider;
        this.categoria = {};
        this.productoPage = __WEBPACK_IMPORTED_MODULE_0__index_paginas__["i" /* ProductosPage */];
        console.log(this.navParams.get('categoria'));
        this.categoria = this.navParams.get('categoria');
        this._productoProvider.cargarPorCategoria(this.categoria._id);
    }
    PorCategoriasPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-por-categorias',template:/*ion-inline-start:"C:\wsIonic\tienda-mobile\src\pages\por-categorias\por-categorias.html"*/'<!--\n  Generated template for the PorCategoriasPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>{{categoria.linea}}</ion-title>\n    </ion-navbar>\n\n</ion-header>\n<ion-content padding>\n    <ion-list>\n        <ion-item *ngFor="let item of _productoProvider.porCategoria">\n            <ion-thumbnail item-left>\n                <img [src]="item.codigo | imagen" />\n            </ion-thumbnail>\n            <h2>{{item.producto}}</h2>\n            <p>{{item.proveedor}}</p>\n            <button ion-button clear item-right [navPush]="productoPage" [navParams]="{ producto: item}">Ver\n            </button>\n        </ion-item>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"C:\wsIonic\tienda-mobile\src\pages\por-categorias\por-categorias.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1__providers_productos_productos__["a" /* ProductosProvider */]])
    ], PorCategoriasPage);
    return PorCategoriasPage;
}());

//# sourceMappingURL=por-categorias.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarritoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_carrito_carrito__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CarritoPage = /** @class */ (function () {
    function CarritoPage(navCtrl, navParams, _carritoProvider, viewController) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._carritoProvider = _carritoProvider;
        this.viewController = viewController;
    }
    CarritoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-carrito',template:/*ion-inline-start:"C:\wsIonic\tienda-mobile\src\pages\carrito\carrito.html"*/'<!--\n  Generated template for the CarritoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-buttons>\n            <button ion-button (click)="viewController.dismiss()">\nCerrar\n            </button>\n        </ion-buttons>\n        <ion-title>Carrito de compras</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n    <div *ngIf="_carritoProvider.items.length === 0" text-center class="carrito_vacio">\n        <ion-icon name="ios-cart-outline" class="icon-5x"></ion-icon>\n        <br/>\n        <h3>Su carrito está vacío.</h3>\n    </div>\n\n    <div *ngIf="_carritoProvider.items.length > 0" text-center>\n\n        <ion-grid>\n            <ion-row *ngFor="let item of _carritoProvider.items; let i = index;">\n                <ion-col>\n                    <img [src]="item.codigo | imagen">\n                </ion-col>\n                <ion-col>\n                    <p>{{item.producto}}</p>\n                    <p>{{item.precio_compra | currency:\'MXN\'}}</p>\n                    <button ion-button color="danger" outline block (click)="_carritoProvider.removerItem(i)" small>\n                        Eliminar\n                    </button>\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n        <hr>\n        <ion-grid>\n            <ion-row>\n                <ion-col>\n                    <h3>\n                        <strong>Total:</strong> {{_carritoProvider.total_carrito| currency:\'MXN\'}}\n                    </h3>\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n        <button ion-button block (click)="_carritoProvider.realizarPedido()"> Realizar pedido </button>\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\wsIonic\tienda-mobile\src\pages\carrito\carrito.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__providers_carrito_carrito__["a" /* CarritoProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* ViewController */]])
    ], CarritoPage);
    return CarritoPage;
}());

//# sourceMappingURL=carrito.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoriasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_paginas__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_productos_productos__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CategoriasPage = /** @class */ (function () {
    function CategoriasPage(navCtrl, navParams, _pp) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._pp = _pp;
        this.porCategoria = __WEBPACK_IMPORTED_MODULE_0__index_paginas__["h" /* PorCategoriasPage */];
    }
    CategoriasPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-categorias',template:/*ion-inline-start:"C:\wsIonic\tienda-mobile\src\pages\categorias\categorias.html"*/'<!--\n  Generated template for the CategoriasPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>Categorías</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n    <ion-list>\n        <button ion-item *ngFor="let categoria of _pp.lineas" [navPush]="porCategoria" [navParams]="{ categoria: categoria}">\n          \n          <ion-icon [name]="categoria.icono" item-left></ion-icon>\n          {{categoria.linea}}\n\n        </button>\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"C:\wsIonic\tienda-mobile\src\pages\categorias\categorias.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1__providers_productos_productos__["a" /* ProductosProvider */]])
    ], CategoriasPage);
    return CategoriasPage;
}());

//# sourceMappingURL=categorias.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_usuario_usuario__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, viewController, _usuarioProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewController = viewController;
        this._usuarioProvider = _usuarioProvider;
        this.correo = "";
        this.contrasena = "";
    }
    LoginPage.prototype.ingresar = function () {
        var _this = this;
        this._usuarioProvider.ingresar(this.correo, this.contrasena)
            .subscribe(function () {
            if (_this._usuarioProvider.activo()) {
                _this.viewController.dismiss(true);
            }
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\wsIonic\tienda-mobile\src\pages\login\login.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-buttons>\n            <button ion-button (click)="viewController.dismiss(false)">                \n                Cerrar\n              </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding class="animated fadeIn login auth-page">\n    <div class="login-content">\n\n        <!-- Logo -->\n        <div padding-horizontal text-center class="animated fadeInDown">\n            <div class="logo"></div>\n            <h2 ion-text class="text-primary">\n                <strong>Tiendita</strong> App\n            </h2>\n        </div>\n\n        <!-- Login form -->\n\n        <ion-item>\n            <ion-label floating>\n                <ion-icon name="mail" item-start class="text-primary"></ion-icon>\n                Correo Electrónico\n            </ion-label>\n            <ion-input type="email" [(ngModel)]="correo"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label floating>\n                <ion-icon name="lock" item-start class="text-primary"></ion-icon>\n                Contraseña\n            </ion-label>\n            <ion-input type="password" [(ngModel)]="contrasena"></ion-input>\n        </ion-item>\n\n\n        <div>\n            <button ion-button [disabled]="correo.length < 5 || contrasena.length < 5" icon-start block color="primary" tappable (click)="ingresar()">\n          <ion-icon name="log-in"></ion-icon>\n          Ingresar\n        </button>\n\n\n            <p text-center ion-text color="secondary">Or Sign in with:</p>\n\n            <ion-grid>\n                <ion-row>\n                    <ion-col col-6>\n                        <button ion-button icon-only block class="btn-facebook">\n                <ion-icon name="logo-facebook"></ion-icon>\n              </button>\n                    </ion-col>\n                    <ion-col col-6>\n                        <button ion-button icon-only block class="btn-gplus">\n                <ion-icon name="logo-googleplus"></ion-icon>\n              </button>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n\n        </div>\n\n    </div>\n</ion-content>'/*ion-inline-end:"C:\wsIonic\tienda-mobile\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_0__providers_usuario_usuario__["a" /* UsuarioProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdenesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_carrito_carrito__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ordenes_detalle_ordenes_detalle__ = __webpack_require__(157);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var OrdenesPage = /** @class */ (function () {
    function OrdenesPage(navCtrl, navParams, _carritoProvider, _usuarioProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._carritoProvider = _carritoProvider;
        this._usuarioProvider = _usuarioProvider;
        this.ordenesDetalle = __WEBPACK_IMPORTED_MODULE_4__ordenes_detalle_ordenes_detalle__["a" /* OrdenesDetallePage */];
    }
    OrdenesPage.prototype.ionViewWillEnter = function () {
        this._carritoProvider.cargarOrdenes();
    };
    OrdenesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-ordenes',template:/*ion-inline-start:"C:\wsIonic\tienda-mobile\src\pages\ordenes\ordenes.html"*/'<!--\n  Generated template for the OrdenesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>Ordenes</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n    <ion-list *ngIf="_usuarioProvider.activo()">\n        <button ion-item *ngFor="let orden of _carritoProvider.ordenes" [navPush]="ordenesDetalle" [navParams]="{ orden: orden}">\n            <strong>Orden ID: {{orden._id}}</strong> <br/> ({{orden.detalle.length}}) productos.\n        </button>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"C:\wsIonic\tienda-mobile\src\pages\ordenes\ordenes.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_carrito_carrito__["a" /* CarritoProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__["a" /* UsuarioProvider */]])
    ], OrdenesPage);
    return OrdenesPage;
}());

//# sourceMappingURL=ordenes.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_carrito_carrito__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProductosPage = /** @class */ (function () {
    function ProductosPage(navCtrl, navParams, _carritoProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._carritoProvider = _carritoProvider;
        this.producto = {};
        this.producto = this.navParams.get('producto');
    }
    ProductosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-productos',template:/*ion-inline-start:"C:\wsIonic\tienda-mobile\src\pages\productos\productos.html"*/'<!--\n  Generated template for the ProductosPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>{{producto.producto}}</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n    <img [src]="producto.codigo | imagen">\n    <div padding>\n        <h5>{{producto.producto}}</h5>\n        <p>\n            <strong>Precio:</strong> {{producto.precio_compra | currency:\'MXN\'}}\n        </p>\n        <p>\n            {{producto.descripcion}}\n            <br/>\n            <strong>\n            {{ producto.proveedor }}\n          </strong>\n        </p>\n        <button ion-button block icon-left (click)="_carritoProvider.agregarCarrito(producto)">\n          <ion-icon name="cart"></ion-icon> Agregar al carrito\n        </button>\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\wsIonic\tienda-mobile\src\pages\productos\productos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__providers_carrito_carrito__["a" /* CarritoProvider */]])
    ], ProductosPage);
    return ProductosPage;
}());

//# sourceMappingURL=productos.js.map

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_paginas__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.tab1 = __WEBPACK_IMPORTED_MODULE_0__index_paginas__["d" /* HomePage */];
        this.tab2 = __WEBPACK_IMPORTED_MODULE_0__index_paginas__["c" /* CategoriasPage */];
        this.tab3 = __WEBPACK_IMPORTED_MODULE_0__index_paginas__["g" /* OrdenesPage */];
        this.tab4 = __WEBPACK_IMPORTED_MODULE_0__index_paginas__["a" /* BusquedaPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-tabs',template:/*ion-inline-start:"C:\wsIonic\tienda-mobile\src\pages\tabs\tabs.html"*/'<ion-tabs color="primary" selectedIndex="0">\n    <ion-tab tabIcon="home" tabTitle="Principal" [root]="tab1"></ion-tab>\n    <ion-tab tabIcon="star" tabTitle="Categorías" [root]="tab2"></ion-tab>\n    <ion-tab tabIcon="list" tabTitle="Ordenes" [root]="tab3"></ion-tab>\n    <ion-tab tabIcon="search" tabTitle="Buscar" [root]="tab4"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"C:\wsIonic\tienda-mobile\src\pages\tabs\tabs.html"*/,
        })
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(364);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(690);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_index_providers__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common_http__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pipes_pipes_module__ = __webpack_require__(691);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["h" /* PorCategoriasPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["f" /* OrdenesDetallePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["d" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["b" /* CarritoPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["c" /* CategoriasPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["e" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["g" /* OrdenesPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["i" /* ProductosPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["j" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["a" /* BusquedaPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_9__angular_common_http__["b" /* HttpClientModule */], __WEBPACK_IMPORTED_MODULE_10__pipes_pipes_module__["a" /* PipesModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/busqueda/busqueda.module#BusquedaPageModule', name: 'BusquedaPage', segment: 'busqueda', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/carrito/carrito.module#CarritoPageModule', name: 'CarritoPage', segment: 'carrito', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/categorias/categorias.module#CategoriasPageModule', name: 'CategoriasPage', segment: 'categorias', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/ordenes-detalle/ordenes-detalle.module#OrdenesDetallePageModule', name: 'OrdenesDetallePage', segment: 'ordenes-detalle', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/ordenes/ordenes.module#OrdenesPageModule', name: 'OrdenesPage', segment: 'ordenes', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/por-categorias/por-categorias.module#PorCategoriasPageModule', name: 'PorCategoriasPage', segment: 'por-categorias', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/productos/productos.module#ProductosPageModule', name: 'ProductosPage', segment: 'productos', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tabs/tabs.module#TabsPageModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["h" /* PorCategoriasPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["f" /* OrdenesDetallePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["d" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["b" /* CarritoPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["c" /* CategoriasPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["e" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["g" /* OrdenesPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["i" /* ProductosPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["j" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_index_paginas__["a" /* BusquedaPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_8__providers_index_providers__["a" /* CarritoProvider */],
                __WEBPACK_IMPORTED_MODULE_8__providers_index_providers__["b" /* ProductosProvider */],
                __WEBPACK_IMPORTED_MODULE_8__providers_index_providers__["c" /* UsuarioProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__busqueda_busqueda__ = __webpack_require__(351);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__busqueda_busqueda__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__por_categorias_por_categorias__ = __webpack_require__(352);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_1__por_categorias_por_categorias__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ordenes_detalle_ordenes_detalle__ = __webpack_require__(157);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_2__ordenes_detalle_ordenes_detalle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(669);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__home_home__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__carrito_carrito__ = __webpack_require__(353);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__carrito_carrito__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__categorias_categorias__ = __webpack_require__(354);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_5__categorias_categorias__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(355);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_6__login_login__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ordenes_ordenes__ = __webpack_require__(356);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_7__ordenes_ordenes__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__productos_productos__ = __webpack_require__(357);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_8__productos_productos__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__tabs_tabs__ = __webpack_require__(358);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_9__tabs_tabs__["a"]; });










//# sourceMappingURL=index.paginas.js.map

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarritoProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_url_servicios__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__usuario_usuario__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_index_paginas__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CarritoProvider = /** @class */ (function () {
    function CarritoProvider(http, alertCtrl, platform, storage, modalCtrl, _up) {
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this._up = _up;
        this.items = [];
        this.total_carrito = 0;
        this.ordenes = [];
        this.cargarStorage();
        this.actualizarTotal();
    }
    CarritoProvider.prototype.realizarPedido = function () {
        var _this = this;
        var codigos = [];
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            codigos.push(item.codigo);
        }
        var params = { items: codigos.join(",") };
        // console.log(params);
        var url = __WEBPACK_IMPORTED_MODULE_0__config_url_servicios__["b" /* URL_SERVICIOS */] + '/ordenes?token=' + this._up.token
            + '&usuario_id=' + this._up.id_usuario;
        this.http.post(url, params)
            .subscribe(function (resp) {
            // recibo resp.orden
            _this.items = [];
            if (resp.error === true) {
                console.log(resp);
                _this.alertCtrl.create({
                    title: "Error al realizar la orden",
                    subTitle: "Avise al administrador.",
                    buttons: ["Ok"]
                }).present();
            }
            else {
                _this.alertCtrl.create({
                    title: "Orden realizada!",
                    subTitle: "Nos contactaremos con usted próximamente.",
                    buttons: ["Ok"]
                }).present();
            }
        }, function (err) {
            console.log(err);
            _this.alertCtrl.create({
                title: "Error al realizar la orden",
                subTitle: "Disculpe el inconveniente",
                buttons: ["Ok"]
            }).present();
        });
    };
    CarritoProvider.prototype.removerItem = function (idx) {
        this.items.splice(idx, 1);
        this.guardarStorage();
    };
    CarritoProvider.prototype.ver_carrito = function () {
        var _this = this;
        var modal;
        if (this._up.token && this._up.token.length > 0) {
            // mostrar pagina de carrito
            modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__pages_index_paginas__["b" /* CarritoPage */]);
        }
        else {
            // mostrar modal         
            modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__pages_index_paginas__["e" /* LoginPage */]);
        }
        modal.present();
        modal.onDidDismiss(function (abrirCarrito) {
            if (abrirCarrito) {
                _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__pages_index_paginas__["b" /* CarritoPage */]).present();
            }
        });
    };
    CarritoProvider.prototype.agregarCarrito = function (item_parametro) {
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.codigo == item_parametro.codigo) {
                this.alertCtrl.create({
                    title: "Item existe",
                    subTitle: item_parametro.producto + ", ya se encuentra en su carrito de compras.",
                    buttons: ["OK"]
                }).present();
                return;
            }
        }
        this.items.push(item_parametro);
        this.guardarStorage();
        this.actualizarTotal();
        /*
        No olvidar plugin
         > cordova plugin add cordova-sqlite-storage --save
         > npm install --save @ionic/storage
        */
    };
    CarritoProvider.prototype.actualizarTotal = function () {
        this.total_carrito = 0;
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            this.total_carrito += Number(item.precio_compra);
        }
    };
    CarritoProvider.prototype.guardarStorage = function () {
        if (this.platform.is("cordova")) {
            // dispositivo
            this.storage.set('items', this.items);
        }
        else {
            // compu
            localStorage.setItem('items', JSON.stringify(this.items));
        }
    };
    CarritoProvider.prototype.cargarStorage = function () {
        var _this = this;
        var promesa = new Promise(function (resolve, reject) {
            if (_this.platform.is("cordova")) {
                _this.storage.ready().then(function () {
                    _this.storage.get("items")
                        .then(function (items) {
                        if (items) {
                            _this.items = items;
                        }
                        resolve();
                    });
                });
            }
            else {
                // compu
                if (localStorage.getItem("items")) {
                    _this.items = JSON.parse(localStorage.getItem("items"));
                }
                resolve();
            }
        });
        return promesa;
    };
    CarritoProvider.prototype.cargarOrdenes = function () {
        var _this = this;
        var url = __WEBPACK_IMPORTED_MODULE_0__config_url_servicios__["b" /* URL_SERVICIOS */] + '/ordenes?id=' + this._up.id_usuario;
        this.http.get(url).subscribe(function (resp) {
            // recibo resp.orden
            _this.items = [];
            if (resp.error === true) {
                console.log(resp);
                _this.alertCtrl.create({
                    title: "Error al cargar ordenes",
                    subTitle: "Avise al administrador.",
                    buttons: ["Ok"]
                }).present();
            }
            else {
                _this.ordenes = resp.ordenes;
            }
        }, function (err) {
            console.log(err);
            _this.alertCtrl.create({
                title: "Error al cargar ordenes",
                subTitle: "Disculpe el inconveniente",
                buttons: ["Ok"]
            }).present();
        });
    };
    CarritoProvider.prototype.borrarOrden = function (orden_id) {
        var url = __WEBPACK_IMPORTED_MODULE_0__config_url_servicios__["b" /* URL_SERVICIOS */] + '/ordenes/' + orden_id + '?token=' + this._up.token;
        return this.http.delete(url).map(function (resp) { return resp; });
    };
    CarritoProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_5__usuario_usuario__["a" /* UsuarioProvider */]])
    ], CarritoProvider);
    return CarritoProvider;
}());

//# sourceMappingURL=carrito.js.map

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsuarioProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var UsuarioProvider = /** @class */ (function () {
    function UsuarioProvider(alertController, http, platform, storage) {
        this.alertController = alertController;
        this.http = http;
        this.platform = platform;
        this.storage = storage;
        this.token = "";
        this.id_usuario = "";
        this.cargarStorage();
    }
    UsuarioProvider.prototype.activo = function () {
        return !(this.token === "");
    };
    UsuarioProvider.prototype.ingresar = function (correo, contrasena) {
        var _this = this;
        var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["b" /* URL_SERVICIOS */] + "/login";
        return this.http.post(url, { correo: correo, contrasena: contrasena })
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (resp) {
            //console.log(resp);              
            var datos = resp; //.json();
            _this.token = datos.token;
            _this.id_usuario = datos.login._id;
            // Guardar storage   
            // console.log(datos.login);
            _this.guardarStorage();
            return datos.login;
        }), Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["catchError"])(function (error) {
            console.log(error);
            if (error.error.error) {
                //console.log("Entrando a if de error");
                //console.log(error.error);
                _this.alertController.create({
                    title: "Error al iniciar",
                    subTitle: error.error.mensaje || "Server Error",
                    buttons: ["Ok"]
                }).present();
            }
            // maseflores79@gmail.com
            var obsArray = [];
            obsArray.push(JSON.parse('{"error": false,"login":{"_id": "-","correo": "-","contrasena": "=)","token": "-"}}'));
            return obsArray;
        }));
    };
    UsuarioProvider.prototype.cerrarSesion = function () {
        this.token = null;
        this.id_usuario = null;
        // guardar storage de nuevo
        this.guardarStorage();
    };
    UsuarioProvider.prototype.guardarStorage = function () {
        if (this.platform.is("cordova")) {
            // dispositivo
            this.storage.set('token', this.token);
            this.storage.set('id_usuario', this.id_usuario);
        }
        else {
            // compu      
            if (this.token) {
                localStorage.setItem('token', this.token);
                localStorage.setItem('id_usuario', this.id_usuario);
            }
            else {
                localStorage.removeItem('token');
                localStorage.removeItem('id_usuario');
                this.token = "";
                this.id_usuario = "";
            }
        }
    };
    UsuarioProvider.prototype.cargarStorage = function () {
        var _this = this;
        var promesa = new Promise(function (resolve, reject) {
            if (_this.platform.is("cordova")) {
                _this.storage.ready().then(function () {
                    _this.storage.get("token")
                        .then(function (token) {
                        if (token) {
                            _this.token = token;
                        }
                        resolve();
                    });
                    _this.storage.get("id_usuario")
                        .then(function (id_usuario) {
                        if (id_usuario) {
                            _this.id_usuario = id_usuario;
                        }
                        resolve();
                    });
                });
            }
            else {
                // compu
                if (localStorage.getItem("token")) {
                    _this.token = localStorage.getItem("token");
                    _this.id_usuario = localStorage.getItem("id_usuario");
                }
                resolve();
            }
        });
        return promesa;
    };
    UsuarioProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
    ], UsuarioProvider);
    return UsuarioProvider;
}());

//# sourceMappingURL=usuario.js.map

/***/ }),

/***/ 669:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_index_providers__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index_paginas__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_usuario_usuario__ = __webpack_require__(65);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, _productoProvider, _carritoProvider, _usuarioProvider) {
        this.navCtrl = navCtrl;
        this._productoProvider = _productoProvider;
        this._carritoProvider = _carritoProvider;
        this._usuarioProvider = _usuarioProvider;
    }
    HomePage.prototype.siguientePagina = function (infiniteScroll) {
        // console.log('Begin async operation');
        this._productoProvider.cargarTodos()
            .then(function () { infiniteScroll.complete(); });
    };
    HomePage.prototype.irAPaginaProducto = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__index_paginas__["i" /* ProductosPage */], { 'producto': item });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\wsIonic\tienda-mobile\src\pages\home\home.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-buttons start *ngIf="_usuarioProvider && _usuarioProvider.activo()">\n            <button ion-button (click)="_usuarioProvider.cerrarSesion()">\n                    <ion-icon name="log-out"></ion-icon> Salir            \n            </button>\n        </ion-buttons>\n        <ion-title>\n            Mi tiendita\n        </ion-title>\n\n        <ion-buttons end padding-right>\n            <button ion-button icon-only (click)="_carritoProvider.ver_carrito()">\n                    <ion-icon name="cart"></ion-icon>\n                    <ion-badge *ngIf="_carritoProvider.items.length>0"\n                               color="danger" \n                               class="carrito-numero">{{_carritoProvider.items.length}}</ion-badge>\n            </button>\n        </ion-buttons>\n\n\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n    <ion-grid>\n        <ion-row *ngFor="let par of _productoProvider.productos">\n            <ion-col *ngFor="let item of par" (click)="irAPaginaProducto( item )">\n                <img [src]="item.codigo | imagen" alt="test">\n                <p>\n                    {{item.producto}} <br/> {{item.precio_compra | currency:\'MXN\'}}\n                </p>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n    <ion-infinite-scroll (ionInfinite)="siguientePagina($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"C:\wsIonic\tienda-mobile\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_index_providers__["b" /* ProductosProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_index_providers__["a" /* CarritoProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_usuario_usuario__["a" /* UsuarioProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 690:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_index_paginas__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(347);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_0__pages_index_paginas__["j" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\wsIonic\tienda-mobile\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\wsIonic\tienda-mobile\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 691:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__imagen_imagen__ = __webpack_require__(692);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var PipesModule = /** @class */ (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__imagen_imagen__["a" /* ImagenPipe */]],
            imports: [],
            exports: [__WEBPACK_IMPORTED_MODULE_1__imagen_imagen__["a" /* ImagenPipe */]]
        })
    ], PipesModule);
    return PipesModule;
}());

//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 692:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImagenPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_url_servicios__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ImagenPipe = /** @class */ (function () {
    function ImagenPipe() {
    }
    ImagenPipe.prototype.transform = function (value) {
        return __WEBPACK_IMPORTED_MODULE_1__config_url_servicios__["a" /* URL_IMAGENES */] + value; // + ".jpg";
    };
    ImagenPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'imagen',
        })
    ], ImagenPipe);
    return ImagenPipe;
}());

//# sourceMappingURL=imagen.js.map

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return URL_SERVICIOS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return URL_IMAGENES; });
/*
// PHP CodeIgniter
export const URL_SERVICIOS = 'http://localhost/rest/index.php';
export const URL_IMAGENES = 'http://localhost/rest/public/img/productos/';
*/
// Nodejs en heroku
var URL_SERVICIOS = 'https://tienda-demo-backend.herokuapp.com';
var URL_IMAGENES = 'https://tienda-demo-backend.herokuapp.com/imagen/';
// NodeJs local
/*
export const URL_SERVICIOS = 'http://localhost:3000';
export const URL_IMAGENES = 'http://localhost:3000/imagen/';
*/ 
//# sourceMappingURL=url.servicios.js.map

/***/ })

},[359]);
//# sourceMappingURL=main.js.map