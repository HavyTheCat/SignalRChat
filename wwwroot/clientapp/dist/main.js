(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./ClientApp/$$_lazy_route_resource lazy recursive":
/*!****************************************************************!*\
  !*** ./ClientApp/$$_lazy_route_resource lazy namespace object ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./ClientApp/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./ClientApp/app/Shared/Services/alert.service.ts":
/*!********************************************************!*\
  !*** ./ClientApp/app/Shared/Services/alert.service.ts ***!
  \********************************************************/
/*! exports provided: AlertService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlertService", function() { return AlertService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");



var AlertService = /** @class */ (function () {
    function AlertService() {
        this.alerts = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    AlertService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [])
    ], AlertService);
    return AlertService;
}());



/***/ }),

/***/ "./ClientApp/app/Shared/Services/auth.service.ts":
/*!*******************************************************!*\
  !*** ./ClientApp/app/Shared/Services/auth.service.ts ***!
  \*******************************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _alert_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./alert.service */ "./ClientApp/app/Shared/Services/alert.service.ts");
/* harmony import */ var _classes_alert__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../classes/alert */ "./ClientApp/classes/alert.ts");
/* harmony import */ var _classes_SignUpVM__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../classes/SignUpVM */ "./ClientApp/classes/SignUpVM.ts");
/* harmony import */ var _enums_alert_type_enum__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../enums/alert-type.enum */ "./ClientApp/enums/alert-type.enum.ts");
/* harmony import */ var _classes_loginvm__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../classes/loginvm */ "./ClientApp/classes/loginvm.ts");











var AuthService = /** @class */ (function () {
    function AuthService(httpClient, router, alertService) {
        this.httpClient = httpClient;
        this.router = router;
        this.alertService = alertService;
        this.isLoginSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](this.isAuth());
        this.currentUserSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](null);
    }
    AuthService.prototype.isLoggedIn = function () {
        if (this.isExpirationDateValid) {
            this.isLoginSubject.next(true);
        }
        return this.isLoginSubject.asObservable();
    };
    AuthService.prototype.currentUser = function () {
        return this.currentUserSubject.asObservable();
    };
    AuthService.prototype.login = function (email, password) {
        var _this = this;
        var loginvm = new _classes_loginvm__WEBPACK_IMPORTED_MODULE_10__["Loginvm"](email, password);
        return this.httpClient.post("/api/account/login", loginvm).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (resp) {
            if (resp.success) {
                _this.isLoginSubject.next(true);
                _this.currentUserSubject.next(resp.user);
                _this.SetUserStateResponse(resp);
                return true;
            }
            else {
                _this.alertService.alerts.next(new _classes_alert__WEBPACK_IMPORTED_MODULE_7__["Alert"](resp.message, _enums_alert_type_enum__WEBPACK_IMPORTED_MODULE_9__["AlertType"].Danger));
                return false;
            }
        }));
    };
    AuthService.prototype.isAuth = function () {
        if (localStorage.getItem('userState') === null) {
            return false;
        }
        else {
            var state = JSON.parse(localStorage.getItem('userState'));
            if (state.success && state.tokenExpiration > new Date()) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    AuthService.prototype.signup = function (firstName, lastName, email, password) {
        var _this = this;
        var vm = new _classes_SignUpVM__WEBPACK_IMPORTED_MODULE_8__["SignUpVM"](firstName, lastName, email, password);
        return this.httpClient.post("/api/account/signup", vm)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (resp) {
            if (resp.success) {
                _this.isLoginSubject.next(true);
                _this.currentUserSubject.next(resp.user);
                _this.SetUserStateResponse(resp);
                return true;
            }
            else {
                _this.alertService.alerts.next(new _classes_alert__WEBPACK_IMPORTED_MODULE_7__["Alert"](resp.message, _enums_alert_type_enum__WEBPACK_IMPORTED_MODULE_9__["AlertType"].Danger));
                return false;
            }
        }));
    };
    AuthService.prototype.updateProfile = function (user) {
        var _this = this;
        return this.httpClient.post("/api/account/updateProfile", user)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (resp) {
            if (resp.success) {
                _this.currentUserSubject.next(resp.user);
                _this.SetUserStateResponse(resp);
                return true;
            }
            else {
                _this.alertService.alerts.next(new _classes_alert__WEBPACK_IMPORTED_MODULE_7__["Alert"](resp.message, _enums_alert_type_enum__WEBPACK_IMPORTED_MODULE_9__["AlertType"].Danger));
                return false;
            }
        }));
    };
    AuthService.prototype.SetUserStateResponse = function (resp) {
        localStorage.setItem('userState', JSON.stringify(resp));
    };
    AuthService.prototype.isExpirationDateValid = function () {
        if (localStorage.getItem('userState') === null) {
            return false;
        }
        else {
            var state = JSON.parse(localStorage.getItem('userState'));
            if (new Date(state.tokenExpiration) > new Date) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    AuthService.prototype.getToken = function () {
        if (localStorage.getItem('userState') === null) {
            return null;
        }
        else {
            var state = JSON.parse(localStorage.getItem('userState'));
            if (state.tokenExpiration < new Date()) {
                localStorage.removeItem('userState');
                this.router.navigate(['/login']);
            }
            return state.token;
        }
    };
    AuthService.prototype.getCurrentUser = function () {
        var _this = this;
        return this.isLoginSubject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function (islogin) {
            if (islogin || _this.isExpirationDateValid()) {
                return _this.httpClient.get("/api/account/currentuser");
            }
            else {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(null);
            }
        }));
    };
    AuthService.prototype.getUser = function (id) {
        return this.httpClient.get("/api/account/user/" + id);
    };
    AuthService.prototype.logout = function () {
        this.httpClient.get("/api/account/logout");
        this.router.navigate(['/login']);
        this.alertService.alerts.next(new _classes_alert__WEBPACK_IMPORTED_MODULE_7__["Alert"]('Signed out'));
        this.currentUserSubject.next(null);
        this.isLoginSubject.next(false);
        localStorage.removeItem('userState');
    };
    AuthService.prototype.loginProviders = function () {
        return this.httpClient.get("/api/account/providers");
    };
    AuthService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"] }
    ]; };
    AuthService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./ClientApp/app/Shared/Services/chat-service.service.ts":
/*!***************************************************************!*\
  !*** ./ClientApp/app/Shared/Services/chat-service.service.ts ***!
  \***************************************************************/
/*! exports provided: ChatService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatService", function() { return ChatService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _aspnet_signalr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @aspnet/signalr */ "./node_modules/@aspnet/signalr/dist/esm/index.js");



var ChatService = /** @class */ (function () {
    function ChatService() {
        this.messageReceived = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.connectionEstablished = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.connectionIsEstablished = false;
        this.createConnection();
        this.registerOnServerEvents();
        this.startConnection();
    }
    ChatService.prototype.sendMessage = function (message) {
        this._hubConnection.invoke('NewMessage', message);
    };
    ChatService.prototype.createConnection = function () {
        this._hubConnection = new _aspnet_signalr__WEBPACK_IMPORTED_MODULE_2__["HubConnectionBuilder"]()
            .withUrl(window.location.href + 'MessageHub')
            .build();
    };
    ChatService.prototype.startConnection = function () {
        var _this = this;
        this._hubConnection
            .start()
            .then(function () {
            _this.connectionIsEstablished = true;
            console.log('Hub connection started');
            _this.connectionEstablished.emit(true);
        })
            .catch(function (err) {
            console.log('Error while establishing connection, retrying...');
            setTimeout(function () { this.startConnection(); }, 5000);
        });
    };
    ChatService.prototype.registerOnServerEvents = function () {
        var _this = this;
        this._hubConnection.on('MessageReceived', function (data) {
            _this.messageReceived.emit(data);
        });
    };
    ChatService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [])
    ], ChatService);
    return ChatService;
}());



/***/ }),

/***/ "./ClientApp/app/Shared/Services/chatroom-service.ts":
/*!***********************************************************!*\
  !*** ./ClientApp/app/Shared/Services/chatroom-service.ts ***!
  \***********************************************************/
/*! exports provided: ChatRoomService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatRoomService", function() { return ChatRoomService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _aspnet_signalr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @aspnet/signalr */ "./node_modules/@aspnet/signalr/dist/esm/index.js");
/* harmony import */ var _classes_alert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../classes/alert */ "./ClientApp/classes/alert.ts");
/* harmony import */ var _enums_alert_type_enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../enums/alert-type.enum */ "./ClientApp/enums/alert-type.enum.ts");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./auth.service */ "./ClientApp/app/Shared/Services/auth.service.ts");
/* harmony import */ var _alert_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./alert.service */ "./ClientApp/app/Shared/Services/alert.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");










var ChatRoomService = /** @class */ (function () {
    function ChatRoomService(auth, alertService, httpClient) {
        var _this = this;
        this.auth = auth;
        this.alertService = alertService;
        this.httpClient = httpClient;
        this.connectionEstablished = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.connectionIsEstablished = false;
        this.changeChatrooms = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](null);
        this.selectedChatroom = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](null);
        this.selectedMessages = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](null);
        this.rooms = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"](null);
        this.message = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"](null);
        this.createConnection();
        this.selectedChatroom = this.changeChatrooms.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])(function (room) {
            _this.currentRoom = room;
            if (room) {
                return _this.httpClient.get("/api/room/" + room);
            }
            else {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(null);
            }
        }));
        this.selectedMessages = this.changeChatrooms.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["switchMap"])(function (room) {
            if (room) {
                return _this.httpClient.get("/api/room/" + room + "/messages");
            }
            else {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(null);
            }
        }));
    }
    ChatRoomService.prototype.chatrooms = function () {
        return this.rooms.asObservable();
    };
    ChatRoomService.prototype.newmessage = function () {
        return this.message.asObservable();
    };
    ChatRoomService.prototype.createConnection = function () {
        var _this = this;
        this._hubConnection = new _aspnet_signalr__WEBPACK_IMPORTED_MODULE_3__["HubConnectionBuilder"]()
            .withUrl('/RoomHub', {
            accessTokenFactory: function () { return _this.auth.getToken(); } // Return access token
        })
            .build();
    };
    ChatRoomService.prototype.InvokeRooms = function () {
        var _this = this;
        if (this.connectionIsEstablished) {
            this._hubConnection.invoke('GetRooms').catch(function (err) {
                _this.alertService.alerts.next(new _classes_alert__WEBPACK_IMPORTED_MODULE_4__["Alert"]('Error while establishing connection', _enums_alert_type_enum__WEBPACK_IMPORTED_MODULE_5__["AlertType"].Danger));
                console.log(err);
            });
        }
        else {
            this.startConnection().then(function () {
                _this._hubConnection.invoke('GetRooms').catch(function (err) {
                    _this.alertService.alerts.next(new _classes_alert__WEBPACK_IMPORTED_MODULE_4__["Alert"]('Error while establishing connection', _enums_alert_type_enum__WEBPACK_IMPORTED_MODULE_5__["AlertType"].Danger));
                    console.log(err);
                });
            });
        }
    };
    ChatRoomService.prototype.invokeSandMsg = function (msg) {
        var _this = this;
        if (this.currentRoom) {
            if (this.connectionIsEstablished) {
                this._hubConnection.invoke('Send', this.currentRoom, msg).catch(function (err) {
                    _this.alertService.alerts.next(new _classes_alert__WEBPACK_IMPORTED_MODULE_4__["Alert"]('Error while establishing connection', _enums_alert_type_enum__WEBPACK_IMPORTED_MODULE_5__["AlertType"].Danger));
                    console.log(err);
                });
            }
            else {
                this.startConnection().then(function () {
                    _this._hubConnection.invoke('Send', _this.currentRoom, msg).catch(function (err) {
                        _this.alertService.alerts.next(new _classes_alert__WEBPACK_IMPORTED_MODULE_4__["Alert"]('Error while establishing connection', _enums_alert_type_enum__WEBPACK_IMPORTED_MODULE_5__["AlertType"].Danger));
                        console.log(err);
                    });
                });
            }
        }
    };
    ChatRoomService.prototype.InvokeJoinGroup = function (room) {
        var _this = this;
        if (!!room) {
            if (this.connectionIsEstablished) {
                this._hubConnection.invoke('JoinGroup', room).catch(function (err) {
                    _this.alertService.alerts.next(new _classes_alert__WEBPACK_IMPORTED_MODULE_4__["Alert"]('Error while establishing connection', _enums_alert_type_enum__WEBPACK_IMPORTED_MODULE_5__["AlertType"].Danger));
                    console.log(err);
                });
            }
            else {
                this.startConnection().then(function () {
                    _this._hubConnection.invoke('JoinGroup', room).catch(function (err) {
                        _this.alertService.alerts.next(new _classes_alert__WEBPACK_IMPORTED_MODULE_4__["Alert"]('Error while establishing connection', _enums_alert_type_enum__WEBPACK_IMPORTED_MODULE_5__["AlertType"].Danger));
                        console.log(err);
                    });
                });
            }
        }
    };
    ChatRoomService.prototype.invokeCreateChatRoom = function (room) {
        var _this = this;
        if (!!room) {
            if (this.connectionIsEstablished) {
                this._hubConnection.invoke('CreateRoom', room).catch(function (err) {
                    _this.alertService.alerts.next(new _classes_alert__WEBPACK_IMPORTED_MODULE_4__["Alert"]('Error while establishing connection', _enums_alert_type_enum__WEBPACK_IMPORTED_MODULE_5__["AlertType"].Danger));
                    console.log(err);
                });
            }
            else {
                this.startConnection().then(function () {
                    _this._hubConnection.invoke('CreateRoom', room).catch(function (err) {
                        _this.alertService.alerts.next(new _classes_alert__WEBPACK_IMPORTED_MODULE_4__["Alert"]('Error while establishing connection', _enums_alert_type_enum__WEBPACK_IMPORTED_MODULE_5__["AlertType"].Danger));
                        console.log(err);
                    });
                });
            }
        }
    };
    ChatRoomService.prototype.startConnection = function () {
        var _this = this;
        return this._hubConnection
            .start()
            .then(function () {
            _this.connectionIsEstablished = true;
            _this.connectionEstablished.emit(true);
            _this.registerOnServerEvents();
            _this.registerOnNewMesageEvents();
        })
            .catch(function (err) {
            _this.alertService.alerts.next(new _classes_alert__WEBPACK_IMPORTED_MODULE_4__["Alert"]('Error while establishing connection, retrying...', _enums_alert_type_enum__WEBPACK_IMPORTED_MODULE_5__["AlertType"].Danger));
            console.log(err);
            setTimeout(function () { this.startConnection(); }, 5000);
        });
    };
    ChatRoomService.prototype.registerOnNewMesageEvents = function () {
        var _this = this;
        this._hubConnection.on('message', function (data) {
            _this.message.emit(data);
        });
    };
    ChatRoomService.prototype.registerOnServerEvents = function () {
        var _this = this;
        this._hubConnection.on('room', function (data) {
            _this.rooms.emit(data);
        });
    };
    ChatRoomService.ctorParameters = function () { return [
        { type: _auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"] },
        { type: _alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"] },
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"] }
    ]; };
    ChatRoomService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"],
            _alert_service__WEBPACK_IMPORTED_MODULE_7__["AlertService"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"]])
    ], ChatRoomService);
    return ChatRoomService;
}());



/***/ }),

/***/ "./ClientApp/app/Shared/Services/loading.service.ts":
/*!**********************************************************!*\
  !*** ./ClientApp/app/Shared/Services/loading.service.ts ***!
  \**********************************************************/
/*! exports provided: LoadingService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadingService", function() { return LoadingService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");



var LoadingService = /** @class */ (function () {
    function LoadingService() {
        this.isLoading = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    LoadingService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [])
    ], LoadingService);
    return LoadingService;
}());



/***/ }),

/***/ "./ClientApp/app/Shared/Services/up-loading.service.ts":
/*!*************************************************************!*\
  !*** ./ClientApp/app/Shared/Services/up-loading.service.ts ***!
  \*************************************************************/
/*! exports provided: UpLoadingService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpLoadingService", function() { return UpLoadingService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");




var UpLoadingService = /** @class */ (function () {
    function UpLoadingService(httpClient) {
        this.httpClient = httpClient;
        this.progress = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](0);
        this.url = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"]('');
    }
    UpLoadingService.prototype.UploadImage = function (data) {
        var _this = this;
        this.httpClient.post("/api/image", data, { reportProgress: true, observe: 'events' })
            .subscribe(function (event) {
            switch (event.type) {
                case _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpEventType"].UploadProgress:
                    _this.progress.next(Math.round(event.loaded / event.total * 100));
                    break;
                case _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpEventType"].Response:
                    _this.url.next(event.body.value);
            }
        });
    };
    UpLoadingService.prototype.GetProgress = function () {
        return this.progress.asObservable();
    };
    UpLoadingService.prototype.GetUrl = function () {
        return this.url.asObservable();
    };
    UpLoadingService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    UpLoadingService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], UpLoadingService);
    return UpLoadingService;
}());



/***/ }),

/***/ "./ClientApp/app/app-routing.module.ts":
/*!*********************************************!*\
  !*** ./ClientApp/app/app-routing.module.ts ***!
  \*********************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login/login.component */ "./ClientApp/app/login/login.component.ts");
/* harmony import */ var _signup_signup_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./signup/signup.component */ "./ClientApp/app/signup/signup.component.ts");
/* harmony import */ var _chat_chat_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./chat/chat.component */ "./ClientApp/app/chat/chat.component.ts");
/* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./guards/auth.guard */ "./ClientApp/app/guards/auth.guard.ts");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./profile/profile.component */ "./ClientApp/app/profile/profile.component.ts");
/* harmony import */ var _edit_profile_edit_profile_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./edit-profile/edit-profile.component */ "./ClientApp/app/edit-profile/edit-profile.component.ts");
/* harmony import */ var _guards_is_owner_guard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./guards/is-owner.guard */ "./ClientApp/app/guards/is-owner.guard.ts");










var routes = [
    { path: '', pathMatch: 'full', redirectTo: '/login' },
    { path: 'login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"] },
    { path: 'signup', component: _signup_signup_component__WEBPACK_IMPORTED_MODULE_4__["SignupComponent"] },
    { path: 'chat', canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_6__["AuthGuard"]],
        children: [
            { path: '', component: _chat_chat_component__WEBPACK_IMPORTED_MODULE_5__["ChatComponent"] },
            { path: ':chatroomId', component: _chat_chat_component__WEBPACK_IMPORTED_MODULE_5__["ChatComponent"] }
        ] },
    { path: 'profile/:userId', component: _profile_profile_component__WEBPACK_IMPORTED_MODULE_7__["ProfileComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_6__["AuthGuard"]] },
    { path: 'profile/:userId/edit', component: _edit_profile_edit_profile_component__WEBPACK_IMPORTED_MODULE_8__["EditProfileComponent"], canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_6__["AuthGuard"], _guards_is_owner_guard__WEBPACK_IMPORTED_MODULE_9__["IsOwnerGuard"]] },
    { path: '**', redirectTo: '/login' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./ClientApp/app/app.component.scss":
/*!******************************************!*\
  !*** ./ClientApp/app/app.component.scss ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".alert-wrapper {\n  position: relative;\n}\n.alert-wrapper alert {\n  position: absolute;\n  top: 80px;\n  width: 100%;\n  z-index: 100;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9DOlxcUHJvamVjdFxcU2lnbmFsUkNoYXRcXENsaWVudEFwcC9hcHBcXGFwcC5jb21wb25lbnQuc2NzcyIsImFwcC9hcHAuY29tcG9uZW50LnNjc3MiLCJhcHAvQzpcXFByb2plY3RcXFNpZ25hbFJDaGF0XFxDbGllbnRBcHAvc3R5bGVzXFx2YXJpYWJsZXMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNJLGtCQUFBO0FDREo7QURFSTtFQUNJLGtCQUFBO0VBQ0EsU0VFTztFRkRQLFdBQUE7RUFDQSxZQUFBO0FDQVIiLCJmaWxlIjoiYXBwL2FwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgJy4uL3N0eWxlcy92YXJpYWJsZXMuc2Nzcyc7XHJcblxyXG4uYWxlcnQtd3JhcHBlcntcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGFsZXJ0e1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICB0b3A6ICRuYXZiYXItaGVpZ2h0O1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIHotaW5kZXg6IDEwMDtcclxuICAgIH1cclxufSIsIi5hbGVydC13cmFwcGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLmFsZXJ0LXdyYXBwZXIgYWxlcnQge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogODBweDtcbiAgd2lkdGg6IDEwMCU7XG4gIHotaW5kZXg6IDEwMDtcbn0iLCIvLyBjb2xvcnNcclxuJHByaW1hcnk6IzMyOGNjMTtcclxuJHNlY29uZGFyeTojMEIzQzVEO1xyXG4kZ29sZDojRDlCMzEwO1xyXG4kbGlnaHQtZ3JleTojZWZlZmVmO1xyXG4kZ3JheTogZGFya2VuKCRsaWdodC1ncmV5LCAzMCUpO1xyXG4kYmxhY2s6IzFkMjczMTtcclxuXHJcbiRuYXZiYXItaGVpZ2h0OjgwcHg7XHJcbiJdfQ== */");

/***/ }),

/***/ "./ClientApp/app/app.component.ts":
/*!****************************************!*\
  !*** ./ClientApp/app/app.component.ts ***!
  \****************************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _Shared_Services_alert_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Shared/Services/alert.service */ "./ClientApp/app/Shared/Services/alert.service.ts");
/* harmony import */ var _Shared_Services_loading_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Shared/Services/loading.service */ "./ClientApp/app/Shared/Services/loading.service.ts");




var AppComponent = /** @class */ (function () {
    function AppComponent(alertService, loadingService) {
        this.alertService = alertService;
        this.loadingService = loadingService;
        this.subscriptions = [];
        this.alerts = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscriptions.push(this.alertService.alerts.subscribe(function (alert) {
            _this.alerts.push(alert);
        }));
        this.subscriptions.push(this.loadingService.isLoading.subscribe(function (isLoading) {
            _this.loading = isLoading;
        }));
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    AppComponent.ctorParameters = function () { return [
        { type: _Shared_Services_alert_service__WEBPACK_IMPORTED_MODULE_2__["AlertService"] },
        { type: _Shared_Services_loading_service__WEBPACK_IMPORTED_MODULE_3__["LoadingService"] }
    ]; };
    AppComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/app.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./app.component.scss */ "./ClientApp/app/app.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_Shared_Services_alert_service__WEBPACK_IMPORTED_MODULE_2__["AlertService"],
            _Shared_Services_loading_service__WEBPACK_IMPORTED_MODULE_3__["LoadingService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./ClientApp/app/app.module.ts":
/*!*************************************!*\
  !*** ./ClientApp/app/app.module.ts ***!
  \*************************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm5/animations.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/__ivy_ngcc__/esm5/ngx-bootstrap.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app-routing.module */ "./ClientApp/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app.component */ "./ClientApp/app/app.component.ts");
/* harmony import */ var _message_message_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./message/message.component */ "./ClientApp/app/message/message.component.ts");
/* harmony import */ var ngx_loading__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-loading */ "./node_modules/ngx-loading/__ivy_ngcc__/fesm5/ngx-loading.js");
/* harmony import */ var _Shared_Services_chat_service_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Shared/Services/chat-service.service */ "./ClientApp/app/Shared/Services/chat-service.service.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./login/login.component */ "./ClientApp/app/login/login.component.ts");
/* harmony import */ var _signup_signup_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./signup/signup.component */ "./ClientApp/app/signup/signup.component.ts");
/* harmony import */ var _chat_chat_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./chat/chat.component */ "./ClientApp/app/chat/chat.component.ts");
/* harmony import */ var _components_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/navbar/navbar.component */ "./ClientApp/app/components/navbar/navbar.component.ts");
/* harmony import */ var _chat_components_chat_input_chat_input_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./chat/components/chat-input/chat-input.component */ "./ClientApp/app/chat/components/chat-input/chat-input.component.ts");
/* harmony import */ var _chat_components_chatroom_list_chatroom_list_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./chat/components/chatroom-list/chatroom-list.component */ "./ClientApp/app/chat/components/chatroom-list/chatroom-list.component.ts");
/* harmony import */ var _chat_components_chatroom_title_bar_chatroom_title_bar_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./chat/components/chatroom-title-bar/chatroom-title-bar.component */ "./ClientApp/app/chat/components/chatroom-title-bar/chatroom-title-bar.component.ts");
/* harmony import */ var _chat_components_chat_message_chat_message_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./chat/components/chat-message/chat-message.component */ "./ClientApp/app/chat/components/chat-message/chat-message.component.ts");
/* harmony import */ var _chat_components_chatroom_window_chatroom_window_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./chat/components/chatroom-window/chatroom-window.component */ "./ClientApp/app/chat/components/chatroom-window/chatroom-window.component.ts");
/* harmony import */ var _Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./Shared/Services/auth.service */ "./ClientApp/app/Shared/Services/auth.service.ts");
/* harmony import */ var _Shared_Services_alert_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./Shared/Services/alert.service */ "./ClientApp/app/Shared/Services/alert.service.ts");
/* harmony import */ var _Shared_Services_loading_service__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./Shared/Services/loading.service */ "./ClientApp/app/Shared/Services/loading.service.ts");
/* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./guards/auth.guard */ "./ClientApp/app/guards/auth.guard.ts");
/* harmony import */ var _interceptor__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./interceptor */ "./ClientApp/app/interceptor.ts");
/* harmony import */ var _Shared_Services_chatroom_service__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./Shared/Services/chatroom-service */ "./ClientApp/app/Shared/Services/chatroom-service.ts");
/* harmony import */ var _chat_components_room_input_room_input_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./chat/components/room-input/room-input.component */ "./ClientApp/app/chat/components/room-input/room-input.component.ts");
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./profile/profile.component */ "./ClientApp/app/profile/profile.component.ts");
/* harmony import */ var _edit_profile_edit_profile_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./edit-profile/edit-profile.component */ "./ClientApp/app/edit-profile/edit-profile.component.ts");
/* harmony import */ var _guards_is_owner_guard__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./guards/is-owner.guard */ "./ClientApp/app/guards/is-owner.guard.ts");































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"],
                _message_message_component__WEBPACK_IMPORTED_MODULE_9__["MessageComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_12__["LoginComponent"],
                _signup_signup_component__WEBPACK_IMPORTED_MODULE_13__["SignupComponent"],
                _chat_chat_component__WEBPACK_IMPORTED_MODULE_14__["ChatComponent"],
                _components_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_15__["NavbarComponent"],
                _chat_components_chat_input_chat_input_component__WEBPACK_IMPORTED_MODULE_16__["ChatInputComponent"],
                _chat_components_chatroom_list_chatroom_list_component__WEBPACK_IMPORTED_MODULE_17__["ChatroomListComponent"],
                _chat_components_chatroom_title_bar_chatroom_title_bar_component__WEBPACK_IMPORTED_MODULE_18__["ChatroomTitleBarComponent"],
                _chat_components_chat_message_chat_message_component__WEBPACK_IMPORTED_MODULE_19__["ChatMessageComponent"],
                _chat_components_chatroom_window_chatroom_window_component__WEBPACK_IMPORTED_MODULE_20__["ChatroomWindowComponent"],
                _chat_components_room_input_room_input_component__WEBPACK_IMPORTED_MODULE_27__["RoomInputComponent"],
                _profile_profile_component__WEBPACK_IMPORTED_MODULE_28__["ProfileComponent"],
                _edit_profile_edit_profile_component__WEBPACK_IMPORTED_MODULE_29__["EditProfileComponent"]
            ],
            imports: [
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_6__["AlertModule"].forRoot(),
                ngx_loading__WEBPACK_IMPORTED_MODULE_10__["NgxLoadingModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_7__["AppRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"]
            ],
            providers: [
                _Shared_Services_chat_service_service__WEBPACK_IMPORTED_MODULE_11__["ChatService"],
                _Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_21__["AuthService"],
                _Shared_Services_alert_service__WEBPACK_IMPORTED_MODULE_22__["AlertService"],
                _Shared_Services_loading_service__WEBPACK_IMPORTED_MODULE_23__["LoadingService"],
                _guards_auth_guard__WEBPACK_IMPORTED_MODULE_24__["AuthGuard"],
                _guards_is_owner_guard__WEBPACK_IMPORTED_MODULE_30__["IsOwnerGuard"],
                {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HTTP_INTERCEPTORS"],
                    useClass: _interceptor__WEBPACK_IMPORTED_MODULE_25__["HttpErrorInterceptor"],
                    multi: true
                },
                _Shared_Services_chatroom_service__WEBPACK_IMPORTED_MODULE_26__["ChatRoomService"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./ClientApp/app/chat/chat.component.css":
/*!***********************************************!*\
  !*** ./ClientApp/app/chat/chat.component.css ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAvY2hhdC9jaGF0LmNvbXBvbmVudC5jc3MifQ== */");

/***/ }),

/***/ "./ClientApp/app/chat/chat.component.ts":
/*!**********************************************!*\
  !*** ./ClientApp/app/chat/chat.component.ts ***!
  \**********************************************/
/*! exports provided: ChatComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatComponent", function() { return ChatComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");


var ChatComponent = /** @class */ (function () {
    function ChatComponent() {
    }
    ChatComponent.prototype.ngOnInit = function () {
    };
    ChatComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-chat',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./chat.component.html */ "./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/chat/chat.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./chat.component.css */ "./ClientApp/app/chat/chat.component.css")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [])
    ], ChatComponent);
    return ChatComponent;
}());



/***/ }),

/***/ "./ClientApp/app/chat/components/chat-input/chat-Input.component.scss":
/*!****************************************************************************!*\
  !*** ./ClientApp/app/chat/components/chat-input/chat-Input.component.scss ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".new-message-wrapper .input-group {\n  align-self: flex-end;\n}\n.new-message-wrapper .input-group .form-control {\n  border-radius: 0;\n  border: 0;\n  background-color: #efefef;\n}\n.new-message-wrapper .input-group .form-control:focus {\n  outline: 0;\n  box-shadow: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jaGF0L2NvbXBvbmVudHMvY2hhdC1pbnB1dC9DOlxcUHJvamVjdFxcU2lnbmFsUkNoYXRcXENsaWVudEFwcC9hcHBcXGNoYXRcXGNvbXBvbmVudHNcXGNoYXQtaW5wdXRcXGNoYXQtSW5wdXQuY29tcG9uZW50LnNjc3MiLCJhcHAvY2hhdC9jb21wb25lbnRzL2NoYXQtaW5wdXQvY2hhdC1JbnB1dC5jb21wb25lbnQuc2NzcyIsImFwcC9jaGF0L2NvbXBvbmVudHMvY2hhdC1pbnB1dC9DOlxcUHJvamVjdFxcU2lnbmFsUkNoYXRcXENsaWVudEFwcC9zdHlsZXNcXHZhcmlhYmxlcy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdJO0VBQ0ksb0JBQUE7QUNGUjtBREdRO0VBQ0ksZ0JBQUE7RUFDQSxTQUFBO0VBQ0EseUJFSkE7QURHWjtBREdZO0VBQ0ksVUFBQTtFQUNBLGdCQUFBO0FDRGhCIiwiZmlsZSI6ImFwcC9jaGF0L2NvbXBvbmVudHMvY2hhdC1pbnB1dC9jaGF0LUlucHV0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIi4uLy4uLy4uLy4uL3N0eWxlcy92YXJpYWJsZXMuc2Nzc1wiO1xyXG5cclxuLm5ldy1tZXNzYWdlLXdyYXBwZXJ7XHJcbiAgICAuaW5wdXQtZ3JvdXB7XHJcbiAgICAgICAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XHJcbiAgICAgICAgLmZvcm0tY29udHJvbHtcclxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMDtcclxuICAgICAgICAgICAgYm9yZGVyOiAwO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiRsaWdodC1ncmV5O1xyXG5cclxuICAgICAgICAgICAgJjpmb2N1c3tcclxuICAgICAgICAgICAgICAgIG91dGxpbmU6IDA7XHJcbiAgICAgICAgICAgICAgICBib3gtc2hhZG93OiBub25lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIi5uZXctbWVzc2FnZS13cmFwcGVyIC5pbnB1dC1ncm91cCB7XG4gIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xufVxuLm5ldy1tZXNzYWdlLXdyYXBwZXIgLmlucHV0LWdyb3VwIC5mb3JtLWNvbnRyb2wge1xuICBib3JkZXItcmFkaXVzOiAwO1xuICBib3JkZXI6IDA7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZmVmZWY7XG59XG4ubmV3LW1lc3NhZ2Utd3JhcHBlciAuaW5wdXQtZ3JvdXAgLmZvcm0tY29udHJvbDpmb2N1cyB7XG4gIG91dGxpbmU6IDA7XG4gIGJveC1zaGFkb3c6IG5vbmU7XG59IiwiLy8gY29sb3JzXHJcbiRwcmltYXJ5OiMzMjhjYzE7XHJcbiRzZWNvbmRhcnk6IzBCM0M1RDtcclxuJGdvbGQ6I0Q5QjMxMDtcclxuJGxpZ2h0LWdyZXk6I2VmZWZlZjtcclxuJGdyYXk6IGRhcmtlbigkbGlnaHQtZ3JleSwgMzAlKTtcclxuJGJsYWNrOiMxZDI3MzE7XHJcblxyXG4kbmF2YmFyLWhlaWdodDo4MHB4O1xyXG4iXX0= */");

/***/ }),

/***/ "./ClientApp/app/chat/components/chat-input/chat-input.component.ts":
/*!**************************************************************************!*\
  !*** ./ClientApp/app/chat/components/chat-input/chat-input.component.ts ***!
  \**************************************************************************/
/*! exports provided: ChatInputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatInputComponent", function() { return ChatInputComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _Shared_Services_chatroom_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Shared/Services/chatroom-service */ "./ClientApp/app/Shared/Services/chatroom-service.ts");
/* harmony import */ var _Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Shared/Services/auth.service */ "./ClientApp/app/Shared/Services/auth.service.ts");




var ChatInputComponent = /** @class */ (function () {
    function ChatInputComponent(crs, auth) {
        var _this = this;
        this.crs = crs;
        this.auth = auth;
        this.newMessagetext = '';
        this.auth.getCurrentUser().subscribe(function (user) {
            _this.currentUser = user;
        });
    }
    ChatInputComponent.prototype.ngOnInit = function () {
    };
    ChatInputComponent.prototype.submit = function (message) {
        var newMesage = {
            message: message,
            createAt: new Date(),
            sender: this.currentUser
        };
        this.crs.invokeSandMsg(newMesage);
        this.newMessagetext = '';
    };
    ChatInputComponent.ctorParameters = function () { return [
        { type: _Shared_Services_chatroom_service__WEBPACK_IMPORTED_MODULE_2__["ChatRoomService"] },
        { type: _Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"] }
    ]; };
    ChatInputComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-chat-input',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./chat-Input.component.html */ "./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/chat/components/chat-input/chat-Input.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./chat-Input.component.scss */ "./ClientApp/app/chat/components/chat-input/chat-Input.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_Shared_Services_chatroom_service__WEBPACK_IMPORTED_MODULE_2__["ChatRoomService"],
            _Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]])
    ], ChatInputComponent);
    return ChatInputComponent;
}());



/***/ }),

/***/ "./ClientApp/app/chat/components/chat-message/chat-message.component.scss":
/*!********************************************************************************!*\
  !*** ./ClientApp/app/chat/components/chat-message/chat-message.component.scss ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".chat-message {\n  padding: 0.75em 1.5em;\n}\n.chat-message .image-wrapper {\n  margin-right: 1em;\n  height: 50px;\n  width: 50px;\n}\n.chat-message .image-wrapper img {\n  height: 50px;\n  width: 50px;\n}\n.chat-message .name {\n  font-weight: 600;\n  margin-right: 1em;\n  font-size: 0.7em;\n}\n.chat-message .timestamp {\n  color: #c9c9c9;\n  font-weight: 200;\n  font-size: 0.6em;\n}\n.chat-message .message {\n  font-size: 0.8em;\n  color: #636363;\n  font-weight: 200;\n  margin-top: 0.2em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jaGF0L2NvbXBvbmVudHMvY2hhdC1tZXNzYWdlL0M6XFxQcm9qZWN0XFxTaWduYWxSQ2hhdFxcQ2xpZW50QXBwL2FwcFxcY2hhdFxcY29tcG9uZW50c1xcY2hhdC1tZXNzYWdlXFxjaGF0LW1lc3NhZ2UuY29tcG9uZW50LnNjc3MiLCJhcHAvY2hhdC9jb21wb25lbnRzL2NoYXQtbWVzc2FnZS9jaGF0LW1lc3NhZ2UuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDSSxxQkFBQTtBQ0RKO0FER0k7RUFDSSxpQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0FDRFI7QURHUTtFQUNJLFlBQUE7RUFDQSxXQUFBO0FDRFo7QURJSTtFQUNJLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtBQ0ZSO0FESUk7RUFDSSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtBQ0ZSO0FESUk7RUFDSSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0FDRlIiLCJmaWxlIjoiYXBwL2NoYXQvY29tcG9uZW50cy9jaGF0LW1lc3NhZ2UvY2hhdC1tZXNzYWdlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIi4uLy4uLy4uLy4uL3N0eWxlcy92YXJpYWJsZXMuc2Nzc1wiO1xyXG5cclxuLmNoYXQtbWVzc2FnZSB7XHJcbiAgICBwYWRkaW5nOiAwLjc1ZW0gMS41ZW07XHJcblxyXG4gICAgLmltYWdlLXdyYXBwZXIge1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogMWVtO1xyXG4gICAgICAgIGhlaWdodDogNTBweDtcclxuICAgICAgICB3aWR0aDogNTBweDtcclxuXHJcbiAgICAgICAgaW1nIHtcclxuICAgICAgICAgICAgaGVpZ2h0OiA1MHB4O1xyXG4gICAgICAgICAgICB3aWR0aDogNTBweDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAubmFtZSB7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDFlbTtcclxuICAgICAgICBmb250LXNpemU6IDAuN2VtO1xyXG4gICAgfVxyXG4gICAgLnRpbWVzdGFtcCB7XHJcbiAgICAgICAgY29sb3I6IGRhcmtlbigkbGlnaHQtZ3JleSwgMTUlKTtcclxuICAgICAgICBmb250LXdlaWdodDogMjAwO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMC42ZW07XHJcbiAgICB9XHJcbiAgICAubWVzc2FnZSB7XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjhlbTtcclxuICAgICAgICBjb2xvcjogZGFya2VuKCRncmF5LCAyNSUpO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAyMDA7XHJcbiAgICAgICAgbWFyZ2luLXRvcDogMC4yZW07XHJcbiAgICB9XHJcbn0iLCIuY2hhdC1tZXNzYWdlIHtcbiAgcGFkZGluZzogMC43NWVtIDEuNWVtO1xufVxuLmNoYXQtbWVzc2FnZSAuaW1hZ2Utd3JhcHBlciB7XG4gIG1hcmdpbi1yaWdodDogMWVtO1xuICBoZWlnaHQ6IDUwcHg7XG4gIHdpZHRoOiA1MHB4O1xufVxuLmNoYXQtbWVzc2FnZSAuaW1hZ2Utd3JhcHBlciBpbWcge1xuICBoZWlnaHQ6IDUwcHg7XG4gIHdpZHRoOiA1MHB4O1xufVxuLmNoYXQtbWVzc2FnZSAubmFtZSB7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIG1hcmdpbi1yaWdodDogMWVtO1xuICBmb250LXNpemU6IDAuN2VtO1xufVxuLmNoYXQtbWVzc2FnZSAudGltZXN0YW1wIHtcbiAgY29sb3I6ICNjOWM5Yzk7XG4gIGZvbnQtd2VpZ2h0OiAyMDA7XG4gIGZvbnQtc2l6ZTogMC42ZW07XG59XG4uY2hhdC1tZXNzYWdlIC5tZXNzYWdlIHtcbiAgZm9udC1zaXplOiAwLjhlbTtcbiAgY29sb3I6ICM2MzYzNjM7XG4gIGZvbnQtd2VpZ2h0OiAyMDA7XG4gIG1hcmdpbi10b3A6IDAuMmVtO1xufSJdfQ== */");

/***/ }),

/***/ "./ClientApp/app/chat/components/chat-message/chat-message.component.ts":
/*!******************************************************************************!*\
  !*** ./ClientApp/app/chat/components/chat-message/chat-message.component.ts ***!
  \******************************************************************************/
/*! exports provided: ChatMessageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatMessageComponent", function() { return ChatMessageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _classes_message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../classes/message */ "./ClientApp/classes/message.ts");



var ChatMessageComponent = /** @class */ (function () {
    function ChatMessageComponent() {
    }
    ChatMessageComponent.prototype.ngOnInit = function () {
    };
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", _classes_message__WEBPACK_IMPORTED_MODULE_2__["Message"])
    ], ChatMessageComponent.prototype, "message", void 0);
    ChatMessageComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-chat-message',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./chat-message.component.html */ "./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/chat/components/chat-message/chat-message.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./chat-message.component.scss */ "./ClientApp/app/chat/components/chat-message/chat-message.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [])
    ], ChatMessageComponent);
    return ChatMessageComponent;
}());



/***/ }),

/***/ "./ClientApp/app/chat/components/chatroom-list/chatroom-list.component.scss":
/*!**********************************************************************************!*\
  !*** ./ClientApp/app/chat/components/chatroom-list/chatroom-list.component.scss ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".chatroom-list {\n  border-right: 2px solid #efefef;\n  overflow: scroll;\n}\n.chatroom-list .chatroom-list-item {\n  border-bottom: 1px solid #efefef;\n  padding: 1em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jaGF0L2NvbXBvbmVudHMvY2hhdHJvb20tbGlzdC9DOlxcUHJvamVjdFxcU2lnbmFsUkNoYXRcXENsaWVudEFwcC9hcHBcXGNoYXRcXGNvbXBvbmVudHNcXGNoYXRyb29tLWxpc3RcXGNoYXRyb29tLWxpc3QuY29tcG9uZW50LnNjc3MiLCJhcHAvY2hhdC9jb21wb25lbnRzL2NoYXRyb29tLWxpc3QvY2hhdHJvb20tbGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNJLCtCQUFBO0VBQ0EsZ0JBQUE7QUNESjtBREVJO0VBQ0ksZ0NBQUE7RUFDQSxZQUFBO0FDQVIiLCJmaWxlIjoiYXBwL2NoYXQvY29tcG9uZW50cy9jaGF0cm9vbS1saXN0L2NoYXRyb29tLWxpc3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IFwiLi4vLi4vLi4vLi4vc3R5bGVzL3ZhcmlhYmxlcy5zY3NzXCI7XHJcblxyXG4uY2hhdHJvb20tbGlzdHtcclxuICAgIGJvcmRlci1yaWdodDogMnB4IHNvbGlkICRsaWdodC1ncmV5O1xyXG4gICAgb3ZlcmZsb3c6IHNjcm9sbDtcclxuICAgIC5jaGF0cm9vbS1saXN0LWl0ZW17XHJcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICRsaWdodC1ncmV5O1xyXG4gICAgICAgIHBhZGRpbmc6IDFlbTtcclxuICAgIH1cclxufSIsIi5jaGF0cm9vbS1saXN0IHtcbiAgYm9yZGVyLXJpZ2h0OiAycHggc29saWQgI2VmZWZlZjtcbiAgb3ZlcmZsb3c6IHNjcm9sbDtcbn1cbi5jaGF0cm9vbS1saXN0IC5jaGF0cm9vbS1saXN0LWl0ZW0ge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VmZWZlZjtcbiAgcGFkZGluZzogMWVtO1xufSJdfQ== */");

/***/ }),

/***/ "./ClientApp/app/chat/components/chatroom-list/chatroom-list.component.ts":
/*!********************************************************************************!*\
  !*** ./ClientApp/app/chat/components/chatroom-list/chatroom-list.component.ts ***!
  \********************************************************************************/
/*! exports provided: ChatroomListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatroomListComponent", function() { return ChatroomListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _Shared_Services_chatroom_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Shared/Services/chatroom-service */ "./ClientApp/app/Shared/Services/chatroom-service.ts");



var ChatroomListComponent = /** @class */ (function () {
    function ChatroomListComponent(chatroomserv) {
        this.chatroomserv = chatroomserv;
        this.rooms = [];
    }
    ChatroomListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.chatroomserv.InvokeRooms();
        this.chatroomserv.chatrooms().subscribe(function (room) { _this.rooms.push(room); });
    };
    ChatroomListComponent.ctorParameters = function () { return [
        { type: _Shared_Services_chatroom_service__WEBPACK_IMPORTED_MODULE_2__["ChatRoomService"] }
    ]; };
    ChatroomListComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-chatroom-list',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./chatroom-list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/chat/components/chatroom-list/chatroom-list.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./chatroom-list.component.scss */ "./ClientApp/app/chat/components/chatroom-list/chatroom-list.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_Shared_Services_chatroom_service__WEBPACK_IMPORTED_MODULE_2__["ChatRoomService"]])
    ], ChatroomListComponent);
    return ChatroomListComponent;
}());



/***/ }),

/***/ "./ClientApp/app/chat/components/chatroom-title-bar/chatroom-title-bar.component.scss":
/*!********************************************************************************************!*\
  !*** ./ClientApp/app/chat/components/chatroom-title-bar/chatroom-title-bar.component.scss ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".room-title {\n  padding: 1em 1em 1em 2em;\n  border-bottom: 2px solid #a3a3a3;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jaGF0L2NvbXBvbmVudHMvY2hhdHJvb20tdGl0bGUtYmFyL0M6XFxQcm9qZWN0XFxTaWduYWxSQ2hhdFxcQ2xpZW50QXBwL2FwcFxcY2hhdFxcY29tcG9uZW50c1xcY2hhdHJvb20tdGl0bGUtYmFyXFxjaGF0cm9vbS10aXRsZS1iYXIuY29tcG9uZW50LnNjc3MiLCJhcHAvY2hhdC9jb21wb25lbnRzL2NoYXRyb29tLXRpdGxlLWJhci9jaGF0cm9vbS10aXRsZS1iYXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDSSx3QkFBQTtFQUNBLGdDQUFBO0FDREoiLCJmaWxlIjoiYXBwL2NoYXQvY29tcG9uZW50cy9jaGF0cm9vbS10aXRsZS1iYXIvY2hhdHJvb20tdGl0bGUtYmFyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIi4uLy4uLy4uLy4uL3N0eWxlcy92YXJpYWJsZXMuc2Nzc1wiO1xyXG5cclxuLnJvb20tdGl0bGV7XHJcbiAgICBwYWRkaW5nOiAxZW0gMWVtIDFlbSAyZW07XHJcbiAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgJGdyYXk7XHJcbn0iLCIucm9vbS10aXRsZSB7XG4gIHBhZGRpbmc6IDFlbSAxZW0gMWVtIDJlbTtcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNhM2EzYTM7XG59Il19 */");

/***/ }),

/***/ "./ClientApp/app/chat/components/chatroom-title-bar/chatroom-title-bar.component.ts":
/*!******************************************************************************************!*\
  !*** ./ClientApp/app/chat/components/chatroom-title-bar/chatroom-title-bar.component.ts ***!
  \******************************************************************************************/
/*! exports provided: ChatroomTitleBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatroomTitleBarComponent", function() { return ChatroomTitleBarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");


var ChatroomTitleBarComponent = /** @class */ (function () {
    function ChatroomTitleBarComponent() {
    }
    ChatroomTitleBarComponent.prototype.ngOnInit = function () {
    };
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
    ], ChatroomTitleBarComponent.prototype, "title", void 0);
    ChatroomTitleBarComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-chatroom-title-bar',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./chatroom-title-bar.component.html */ "./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/chat/components/chatroom-title-bar/chatroom-title-bar.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./chatroom-title-bar.component.scss */ "./ClientApp/app/chat/components/chatroom-title-bar/chatroom-title-bar.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [])
    ], ChatroomTitleBarComponent);
    return ChatroomTitleBarComponent;
}());



/***/ }),

/***/ "./ClientApp/app/chat/components/chatroom-window/chatroom-window.component.scss":
/*!**************************************************************************************!*\
  !*** ./ClientApp/app/chat/components/chatroom-window/chatroom-window.component.scss ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".message-wrapper {\n  overflow: scroll;\n}\n\n.select-room .select-room-message {\n  width: 30%;\n  height: 7%;\n  margin-bottom: 10%;\n  border: 2px solid #efefef;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n          align-items: center;\n  font-size: 1.2em;\n  box-shadow: 0 5px 10px #efefef;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jaGF0L2NvbXBvbmVudHMvY2hhdHJvb20td2luZG93L0M6XFxQcm9qZWN0XFxTaWduYWxSQ2hhdFxcQ2xpZW50QXBwL2FwcFxcY2hhdFxcY29tcG9uZW50c1xcY2hhdHJvb20td2luZG93XFxjaGF0cm9vbS13aW5kb3cuY29tcG9uZW50LnNjc3MiLCJhcHAvY2hhdC9jb21wb25lbnRzL2NoYXRyb29tLXdpbmRvdy9jaGF0cm9vbS13aW5kb3cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDSSxnQkFBQTtBQ0RKOztBRElJO0VBQ0ksVUFBQTtFQUNBLFVBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0Esd0JBQUE7VUFBQSx1QkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLDhCQUFBO0FDRFIiLCJmaWxlIjoiYXBwL2NoYXQvY29tcG9uZW50cy9jaGF0cm9vbS13aW5kb3cvY2hhdHJvb20td2luZG93LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCAnLi4vLi4vLi4vLi4vc3R5bGVzL3ZhcmlhYmxlcy5zY3NzJztcclxuXHJcbi5tZXNzYWdlLXdyYXBwZXJ7XHJcbiAgICBvdmVyZmxvdzogc2Nyb2xsO1xyXG59XHJcbi5zZWxlY3Qtcm9vbXtcclxuICAgIC5zZWxlY3Qtcm9vbS1tZXNzYWdle1xyXG4gICAgICAgIHdpZHRoOiAzMCU7XHJcbiAgICAgICAgaGVpZ2h0OiA3JTtcclxuICAgICAgICBtYXJnaW4tYm90dG9tOiAxMCU7XHJcbiAgICAgICAgYm9yZGVyOiAycHggc29saWQgJGxpZ2h0LWdyZXk7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMS4yZW07XHJcbiAgICAgICAgYm94LXNoYWRvdzogMCA1cHggMTBweCAkbGlnaHQtZ3JleTtcclxuICAgIH1cclxufSIsIi5tZXNzYWdlLXdyYXBwZXIge1xuICBvdmVyZmxvdzogc2Nyb2xsO1xufVxuXG4uc2VsZWN0LXJvb20gLnNlbGVjdC1yb29tLW1lc3NhZ2Uge1xuICB3aWR0aDogMzAlO1xuICBoZWlnaHQ6IDclO1xuICBtYXJnaW4tYm90dG9tOiAxMCU7XG4gIGJvcmRlcjogMnB4IHNvbGlkICNlZmVmZWY7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmb250LXNpemU6IDEuMmVtO1xuICBib3gtc2hhZG93OiAwIDVweCAxMHB4ICNlZmVmZWY7XG59Il19 */");

/***/ }),

/***/ "./ClientApp/app/chat/components/chatroom-window/chatroom-window.component.ts":
/*!************************************************************************************!*\
  !*** ./ClientApp/app/chat/components/chatroom-window/chatroom-window.component.ts ***!
  \************************************************************************************/
/*! exports provided: ChatroomWindowComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatroomWindowComponent", function() { return ChatroomWindowComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _Shared_Services_chatroom_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Shared/Services/chatroom-service */ "./ClientApp/app/Shared/Services/chatroom-service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");




var ChatroomWindowComponent = /** @class */ (function () {
    function ChatroomWindowComponent(chatRoomserv, route) {
        var _this = this;
        this.chatRoomserv = chatRoomserv;
        this.route = route;
        this.subs = [];
        this.messages = [];
        this.subs.push(this.chatRoomserv.selectedChatroom.subscribe(function (chatRoom) {
            _this.chatroom = chatRoom;
        }));
        this.subs.push(this.chatRoomserv.selectedMessages.subscribe(function (chatRoom) {
            if (chatRoom) {
                _this.messages = chatRoom;
            }
            _this.sortArr();
        }));
        this.subs.push(this.chatRoomserv.newmessage().subscribe(function (msg) {
            _this.messages.push(msg);
            _this.sortArr();
        }));
    }
    ChatroomWindowComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.scrollToBottom();
        this.subs.push(this.route.paramMap.subscribe(function (params) {
            var chatroomId = params.get('chatroomId');
            _this.chatRoomserv.InvokeJoinGroup(chatroomId);
            _this.chatRoomserv.changeChatrooms.next(chatroomId);
        }));
    };
    ChatroomWindowComponent.prototype.ngAfterViewChecked = function () {
        this.scrollToBottom();
    };
    ChatroomWindowComponent.prototype.sortArr = function () {
        if (this.messages) {
            this.messages.sort(function (n1, n2) {
                if (n1.createAt > n2.createAt) {
                    return 1;
                }
                if (n1.createAt < n2.createAt) {
                    return -1;
                }
                return 0;
            });
        }
    };
    ChatroomWindowComponent.prototype.ngOnDestroy = function () {
        this.subs.forEach(function (sub) { return sub.unsubscribe(); });
    };
    ChatroomWindowComponent.prototype.scrollToBottom = function () {
        try {
            this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
        }
        catch (err) { }
    };
    ChatroomWindowComponent.ctorParameters = function () { return [
        { type: _Shared_Services_chatroom_service__WEBPACK_IMPORTED_MODULE_2__["ChatRoomService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] }
    ]; };
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('scrollContainer', { static: false }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], ChatroomWindowComponent.prototype, "scrollContainer", void 0);
    ChatroomWindowComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-chatroom-window',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./chatroom-window.component.html */ "./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/chat/components/chatroom-window/chatroom-window.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./chatroom-window.component.scss */ "./ClientApp/app/chat/components/chatroom-window/chatroom-window.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_Shared_Services_chatroom_service__WEBPACK_IMPORTED_MODULE_2__["ChatRoomService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], ChatroomWindowComponent);
    return ChatroomWindowComponent;
}());



/***/ }),

/***/ "./ClientApp/app/chat/components/room-input/room-input.component.scss":
/*!****************************************************************************!*\
  !*** ./ClientApp/app/chat/components/room-input/room-input.component.scss ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".new-room-wraper {\n  padding-right: 0.2em;\n}\n.new-room-wraper .input-group {\n  align-self: flex-end;\n}\n.new-room-wraper .input-group .form-control {\n  border-radius: 0;\n  border: 0;\n  background-color: #efefef;\n}\n.new-room-wraper .input-group .form-control:focus {\n  outline: 0;\n  box-shadow: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jaGF0L2NvbXBvbmVudHMvcm9vbS1pbnB1dC9DOlxcUHJvamVjdFxcU2lnbmFsUkNoYXRcXENsaWVudEFwcC9hcHBcXGNoYXRcXGNvbXBvbmVudHNcXHJvb20taW5wdXRcXHJvb20taW5wdXQuY29tcG9uZW50LnNjc3MiLCJhcHAvY2hhdC9jb21wb25lbnRzL3Jvb20taW5wdXQvcm9vbS1pbnB1dC5jb21wb25lbnQuc2NzcyIsImFwcC9jaGF0L2NvbXBvbmVudHMvcm9vbS1pbnB1dC9DOlxcUHJvamVjdFxcU2lnbmFsUkNoYXRcXENsaWVudEFwcC9zdHlsZXNcXHZhcmlhYmxlcy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0ksb0JBQUE7QUNESjtBREVJO0VBQ0ksb0JBQUE7QUNBUjtBRENRO0VBQ0ksZ0JBQUE7RUFDQSxTQUFBO0VBQ0EseUJFTEE7QURNWjtBRENZO0VBQ0ksVUFBQTtFQUNBLGdCQUFBO0FDQ2hCIiwiZmlsZSI6ImFwcC9jaGF0L2NvbXBvbmVudHMvcm9vbS1pbnB1dC9yb29tLWlucHV0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIi4uLy4uLy4uLy4uL3N0eWxlcy92YXJpYWJsZXMuc2Nzc1wiO1xyXG5cclxuLm5ldy1yb29tLXdyYXBlcntcclxuICAgIHBhZGRpbmctcmlnaHQ6IDAuMmVtO1xyXG4gICAgLmlucHV0LWdyb3Vwe1xyXG4gICAgICAgIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xyXG4gICAgICAgIC5mb3JtLWNvbnRyb2x7XHJcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDA7XHJcbiAgICAgICAgICAgIGJvcmRlcjogMDtcclxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjokbGlnaHQtZ3JleTtcclxuXHJcbiAgICAgICAgICAgICY6Zm9jdXN7XHJcbiAgICAgICAgICAgICAgICBvdXRsaW5lOiAwO1xyXG4gICAgICAgICAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCIubmV3LXJvb20td3JhcGVyIHtcbiAgcGFkZGluZy1yaWdodDogMC4yZW07XG59XG4ubmV3LXJvb20td3JhcGVyIC5pbnB1dC1ncm91cCB7XG4gIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xufVxuLm5ldy1yb29tLXdyYXBlciAuaW5wdXQtZ3JvdXAgLmZvcm0tY29udHJvbCB7XG4gIGJvcmRlci1yYWRpdXM6IDA7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VmZWZlZjtcbn1cbi5uZXctcm9vbS13cmFwZXIgLmlucHV0LWdyb3VwIC5mb3JtLWNvbnRyb2w6Zm9jdXMge1xuICBvdXRsaW5lOiAwO1xuICBib3gtc2hhZG93OiBub25lO1xufSIsIi8vIGNvbG9yc1xyXG4kcHJpbWFyeTojMzI4Y2MxO1xyXG4kc2Vjb25kYXJ5OiMwQjNDNUQ7XHJcbiRnb2xkOiNEOUIzMTA7XHJcbiRsaWdodC1ncmV5OiNlZmVmZWY7XHJcbiRncmF5OiBkYXJrZW4oJGxpZ2h0LWdyZXksIDMwJSk7XHJcbiRibGFjazojMWQyNzMxO1xyXG5cclxuJG5hdmJhci1oZWlnaHQ6ODBweDtcclxuIl19 */");

/***/ }),

/***/ "./ClientApp/app/chat/components/room-input/room-input.component.ts":
/*!**************************************************************************!*\
  !*** ./ClientApp/app/chat/components/room-input/room-input.component.ts ***!
  \**************************************************************************/
/*! exports provided: RoomInputComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoomInputComponent", function() { return RoomInputComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _Shared_Services_chatroom_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Shared/Services/chatroom-service */ "./ClientApp/app/Shared/Services/chatroom-service.ts");



var RoomInputComponent = /** @class */ (function () {
    function RoomInputComponent(crs) {
        this.crs = crs;
        this.newMessageText = '';
    }
    RoomInputComponent.prototype.ngOnInit = function () {
    };
    RoomInputComponent.prototype.submit = function (newroom) {
        this.crs.invokeCreateChatRoom(newroom);
        this.newMessageText = '';
    };
    RoomInputComponent.ctorParameters = function () { return [
        { type: _Shared_Services_chatroom_service__WEBPACK_IMPORTED_MODULE_2__["ChatRoomService"] }
    ]; };
    RoomInputComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-room-input',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./room-input.component.html */ "./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/chat/components/room-input/room-input.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./room-input.component.scss */ "./ClientApp/app/chat/components/room-input/room-input.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_Shared_Services_chatroom_service__WEBPACK_IMPORTED_MODULE_2__["ChatRoomService"]])
    ], RoomInputComponent);
    return RoomInputComponent;
}());



/***/ }),

/***/ "./ClientApp/app/components/navbar/navbar.component.scss":
/*!***************************************************************!*\
  !*** ./ClientApp/app/components/navbar/navbar.component.scss ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("span {\n  color: #ffffff;\n}\n\n.nav-item {\n  color: #efefef;\n}\n\na {\n  color: #efefef;\n  margin-left: 3em;\n}\n\na.active {\n  border-bottom: 3px solid #D9B310;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9jb21wb25lbnRzL25hdmJhci9DOlxcUHJvamVjdFxcU2lnbmFsUkNoYXRcXENsaWVudEFwcC9hcHBcXGNvbXBvbmVudHNcXG5hdmJhclxcbmF2YmFyLmNvbXBvbmVudC5zY3NzIiwiYXBwL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5jb21wb25lbnQuc2NzcyIsImFwcC9jb21wb25lbnRzL25hdmJhci9DOlxcUHJvamVjdFxcU2lnbmFsUkNoYXRcXENsaWVudEFwcC9zdHlsZXNcXHZhcmlhYmxlcy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0ksY0FBQTtBQ0RKOztBRElBO0VBQ0ksY0VIUTtBREVaOztBRElBO0VBQ0ksY0VQUTtFRlFSLGdCQUFBO0FDREo7O0FERUk7RUFDSSxnQ0FBQTtBQ0FSIiwiZmlsZSI6ImFwcC9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICcuLi8uLi8uLi9zdHlsZXMvdmFyaWFibGVzLnNjc3MnO1xyXG5cclxuc3BhbntcclxuICAgIGNvbG9yOiNmZmZmZmY7XHJcbn1cclxuXHJcbi5uYXYtaXRlbSB7XHJcbiAgICBjb2xvcjogJGxpZ2h0LWdyZXk7O1xyXG59XHJcblxyXG5he1xyXG4gICAgY29sb3I6ICRsaWdodC1ncmV5O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDNlbTtcclxuICAgICYuYWN0aXZle1xyXG4gICAgICAgIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCAkZ29sZDtcclxuICAgIH1cclxufSIsInNwYW4ge1xuICBjb2xvcjogI2ZmZmZmZjtcbn1cblxuLm5hdi1pdGVtIHtcbiAgY29sb3I6ICNlZmVmZWY7XG59XG5cbmEge1xuICBjb2xvcjogI2VmZWZlZjtcbiAgbWFyZ2luLWxlZnQ6IDNlbTtcbn1cbmEuYWN0aXZlIHtcbiAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkICNEOUIzMTA7XG59IiwiLy8gY29sb3JzXHJcbiRwcmltYXJ5OiMzMjhjYzE7XHJcbiRzZWNvbmRhcnk6IzBCM0M1RDtcclxuJGdvbGQ6I0Q5QjMxMDtcclxuJGxpZ2h0LWdyZXk6I2VmZWZlZjtcclxuJGdyYXk6IGRhcmtlbigkbGlnaHQtZ3JleSwgMzAlKTtcclxuJGJsYWNrOiMxZDI3MzE7XHJcblxyXG4kbmF2YmFyLWhlaWdodDo4MHB4O1xyXG4iXX0= */");

/***/ }),

/***/ "./ClientApp/app/components/navbar/navbar.component.ts":
/*!*************************************************************!*\
  !*** ./ClientApp/app/components/navbar/navbar.component.ts ***!
  \*************************************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Shared/Services/auth.service */ "./ClientApp/app/Shared/Services/auth.service.ts");



var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(auth) {
        this.auth = auth;
        this.currentUser = null;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.auth.getCurrentUser().subscribe(function (user) { _this.currentUser = user; });
    };
    NavbarComponent.ctorParameters = function () { return [
        { type: _Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] }
    ]; };
    NavbarComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-navbar',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./navbar.component.html */ "./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/components/navbar/navbar.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./navbar.component.scss */ "./ClientApp/app/components/navbar/navbar.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./ClientApp/app/edit-profile/edit-profile.component.scss":
/*!****************************************************************!*\
  !*** ./ClientApp/app/edit-profile/edit-profile.component.scss ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".no-photo {\n  height: 150px;\n  width: 150px;\n  background: #a3a3a3;\n  margin: 1em 0;\n  color: #ffffff;\n  border-radius: 50%;\n}\n\n.profile-pic {\n  height: 150px;\n  width: 150px;\n  margin: 1em 0;\n}\n\ninput, textarea {\n  border: 2px solid #efefef;\n  border-radius: 5px;\n  padding: 0.25em 0.5em;\n  margin-bottom: 1em;\n  width: 100%;\n  font-weight: 200;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9lZGl0LXByb2ZpbGUvQzpcXFByb2plY3RcXFNpZ25hbFJDaGF0XFxDbGllbnRBcHAvYXBwXFxlZGl0LXByb2ZpbGVcXGVkaXQtcHJvZmlsZS5jb21wb25lbnQuc2NzcyIsImFwcC9lZGl0LXByb2ZpbGUvZWRpdC1wcm9maWxlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0ksYUFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7QUNESjs7QURHQTtFQUNJLGFBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtBQ0FKOztBREdBO0VBQ0kseUJBQUE7RUFDQSxrQkFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7QUNBSiIsImZpbGUiOiJhcHAvZWRpdC1wcm9maWxlL2VkaXQtcHJvZmlsZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgJy4uLy4uL3N0eWxlcy92YXJpYWJsZXMuc2Nzcyc7XHJcblxyXG4ubm8tcGhvdG8ge1xyXG4gICAgaGVpZ2h0OiAxNTBweDtcclxuICAgIHdpZHRoOiAxNTBweDtcclxuICAgIGJhY2tncm91bmQ6ICRncmF5O1xyXG4gICAgbWFyZ2luOiAxZW0gMDtcclxuICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG59XHJcbi5wcm9maWxlLXBpYyB7XHJcbiAgICBoZWlnaHQ6IDE1MHB4O1xyXG4gICAgd2lkdGg6IDE1MHB4O1xyXG4gICAgbWFyZ2luOiAxZW0gMDtcclxufVxyXG5cclxuaW5wdXQsIHRleHRhcmVhIHtcclxuICAgIGJvcmRlcjogMnB4IHNvbGlkICRsaWdodC1ncmV5O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgcGFkZGluZzogLjI1ZW0gLjVlbTtcclxuICAgIG1hcmdpbi1ib3R0b206IDFlbTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgZm9udC13ZWlnaHQ6IDIwMDtcclxufSIsIi5uby1waG90byB7XG4gIGhlaWdodDogMTUwcHg7XG4gIHdpZHRoOiAxNTBweDtcbiAgYmFja2dyb3VuZDogI2EzYTNhMztcbiAgbWFyZ2luOiAxZW0gMDtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbn1cblxuLnByb2ZpbGUtcGljIHtcbiAgaGVpZ2h0OiAxNTBweDtcbiAgd2lkdGg6IDE1MHB4O1xuICBtYXJnaW46IDFlbSAwO1xufVxuXG5pbnB1dCwgdGV4dGFyZWEge1xuICBib3JkZXI6IDJweCBzb2xpZCAjZWZlZmVmO1xuICBib3JkZXItcmFkaXVzOiA1cHg7XG4gIHBhZGRpbmc6IDAuMjVlbSAwLjVlbTtcbiAgbWFyZ2luLWJvdHRvbTogMWVtO1xuICB3aWR0aDogMTAwJTtcbiAgZm9udC13ZWlnaHQ6IDIwMDtcbn0iXX0= */");

/***/ }),

/***/ "./ClientApp/app/edit-profile/edit-profile.component.ts":
/*!**************************************************************!*\
  !*** ./ClientApp/app/edit-profile/edit-profile.component.ts ***!
  \**************************************************************/
/*! exports provided: EditProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditProfileComponent", function() { return EditProfileComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _Shared_Services_loading_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Shared/Services/loading.service */ "./ClientApp/app/Shared/Services/loading.service.ts");
/* harmony import */ var _Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Shared/Services/auth.service */ "./ClientApp/app/Shared/Services/auth.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/common.js");
/* harmony import */ var _Shared_Services_up_loading_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Shared/Services/up-loading.service */ "./ClientApp/app/Shared/Services/up-loading.service.ts");







var EditProfileComponent = /** @class */ (function () {
    function EditProfileComponent(auth, loading, route, location, uploadserv, router) {
        this.auth = auth;
        this.loading = loading;
        this.route = route;
        this.location = location;
        this.uploadserv = uploadserv;
        this.router = router;
        this.subs = [];
        this.uploadPercent = 0;
        this.downloadUrl = null;
        this.loading.isLoading.next(true);
    }
    EditProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subs.push(this.auth.getCurrentUser().subscribe(function (user) {
            _this.currentUser = user;
            _this.loading.isLoading.next(false);
        }));
        this.subs.push(this.route.paramMap.subscribe(function (params) {
            _this.userId = params.get('userId');
        }));
    };
    EditProfileComponent.prototype.uploadFile = function (event) {
        var _this = this;
        var file = event.target.files[0];
        var formData = new FormData();
        formData.append('file', file, file.name);
        this.uploadserv.UploadImage(formData);
        this.subs.push(this.uploadserv.GetUrl().subscribe(function (url) {
            _this.downloadUrl = url;
            console.log(_this.downloadUrl);
        }));
        this.subs.push(this.uploadserv.GetProgress().subscribe(function (perc) {
            if (perc < 100) {
                _this.loading.isLoading.next(true);
            }
            else {
                _this.loading.isLoading.next(false);
                _this.auth.getCurrentUser();
            }
            _this.uploadPercent = perc;
        }));
    };
    EditProfileComponent.prototype.save = function () {
        var _this = this;
        this.currentUser.photoUrl = this.downloadUrl;
        this.subs.push(this.auth.updateProfile(this.currentUser).subscribe(function (success) {
            if (success) {
                _this.router.navigate(['/chat']);
            }
        }));
    };
    EditProfileComponent.prototype.ngOnDestroy = function () {
        this.subs.forEach(function (sub) { return sub.unsubscribe(); });
    };
    EditProfileComponent.ctorParameters = function () { return [
        { type: _Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"] },
        { type: _Shared_Services_loading_service__WEBPACK_IMPORTED_MODULE_3__["LoadingService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_5__["Location"] },
        { type: _Shared_Services_up_loading_service__WEBPACK_IMPORTED_MODULE_6__["UpLoadingService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
    ]; };
    EditProfileComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-edit-profile',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./edit-profile.component.html */ "./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/edit-profile/edit-profile.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./edit-profile.component.scss */ "./ClientApp/app/edit-profile/edit-profile.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"],
            _Shared_Services_loading_service__WEBPACK_IMPORTED_MODULE_3__["LoadingService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_common__WEBPACK_IMPORTED_MODULE_5__["Location"],
            _Shared_Services_up_loading_service__WEBPACK_IMPORTED_MODULE_6__["UpLoadingService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], EditProfileComponent);
    return EditProfileComponent;
}());



/***/ }),

/***/ "./ClientApp/app/guards/auth.guard.ts":
/*!********************************************!*\
  !*** ./ClientApp/app/guards/auth.guard.ts ***!
  \********************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Shared/Services/auth.service */ "./ClientApp/app/Shared/Services/auth.service.ts");
/* harmony import */ var _Shared_Services_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Shared/Services/alert.service */ "./ClientApp/app/Shared/Services/alert.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _classes_alert__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../classes/alert */ "./ClientApp/classes/alert.ts");
/* harmony import */ var _enums_alert_type_enum__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../enums/alert-type.enum */ "./ClientApp/enums/alert-type.enum.ts");








var AuthGuard = /** @class */ (function () {
    function AuthGuard(auth, router, alertService) {
        this.auth = auth;
        this.router = router;
        this.alertService = alertService;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        var _this = this;
        return this.auth.isLoggedIn().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (LoggedIn) {
            if (!LoggedIn) {
                _this.alertService.alerts.next(new _classes_alert__WEBPACK_IMPORTED_MODULE_6__["Alert"]('Login to access', _enums_alert_type_enum__WEBPACK_IMPORTED_MODULE_7__["AlertType"].Danger));
                _this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
                return false;
            }
            else {
                return true;
            }
        }));
    };
    AuthGuard.ctorParameters = function () { return [
        { type: _Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _Shared_Services_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] }
    ]; };
    AuthGuard = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _Shared_Services_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./ClientApp/app/guards/is-owner.guard.ts":
/*!************************************************!*\
  !*** ./ClientApp/app/guards/is-owner.guard.ts ***!
  \************************************************/
/*! exports provided: IsOwnerGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IsOwnerGuard", function() { return IsOwnerGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Shared/Services/auth.service */ "./ClientApp/app/Shared/Services/auth.service.ts");
/* harmony import */ var _Shared_Services_alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Shared/Services/alert.service */ "./ClientApp/app/Shared/Services/alert.service.ts");
/* harmony import */ var _classes_alert__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../classes/alert */ "./ClientApp/classes/alert.ts");
/* harmony import */ var _enums_alert_type_enum__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../enums/alert-type.enum */ "./ClientApp/enums/alert-type.enum.ts");








var IsOwnerGuard = /** @class */ (function () {
    function IsOwnerGuard(auth, router, alert) {
        this.auth = auth;
        this.router = router;
        this.alert = alert;
    }
    IsOwnerGuard.prototype.canActivate = function (next, state) {
        var _this = this;
        return this.auth.getCurrentUser().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (currUser) { return !!currUser && currUser.id === next.params.userId; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (isOwner) {
            if (!isOwner) {
                _this.alert.alerts.next(new _classes_alert__WEBPACK_IMPORTED_MODULE_6__["Alert"]('Not your profile', _enums_alert_type_enum__WEBPACK_IMPORTED_MODULE_7__["AlertType"].Danger));
                _this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            }
        }));
    };
    IsOwnerGuard.ctorParameters = function () { return [
        { type: _Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _Shared_Services_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"] }
    ]; };
    IsOwnerGuard = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _Shared_Services_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"]])
    ], IsOwnerGuard);
    return IsOwnerGuard;
}());



/***/ }),

/***/ "./ClientApp/app/interceptor.ts":
/*!**************************************!*\
  !*** ./ClientApp/app/interceptor.ts ***!
  \**************************************/
/*! exports provided: HttpErrorInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpErrorInterceptor", function() { return HttpErrorInterceptor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _Shared_Services_alert_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Shared/Services/alert.service */ "./ClientApp/app/Shared/Services/alert.service.ts");
/* harmony import */ var _classes_alert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../classes/alert */ "./ClientApp/classes/alert.ts");
/* harmony import */ var _enums_alert_type_enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../enums/alert-type.enum */ "./ClientApp/enums/alert-type.enum.ts");
/* harmony import */ var _Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Shared/Services/auth.service */ "./ClientApp/app/Shared/Services/auth.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");








var HttpErrorInterceptor = /** @class */ (function () {
    function HttpErrorInterceptor(alertServ, auth) {
        this.alertServ = alertServ;
        this.auth = auth;
    }
    HttpErrorInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        request = request.clone({
            setHeaders: {
                Authorization: "Bearer " + this.auth.getToken()
            }
        });
        return next.handle(request).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(function (err) {
            var errMessage = '';
            if (err.error instanceof ErrorEvent) {
                errMessage = "Error: " + err.error.message;
            }
            else {
                errMessage = "Error Code: " + err.status + "\nMessage: " + err.message;
            }
            _this.alertServ.alerts.next(new _classes_alert__WEBPACK_IMPORTED_MODULE_4__["Alert"](errMessage, _enums_alert_type_enum__WEBPACK_IMPORTED_MODULE_5__["AlertType"].Danger));
            return rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"].throw(err.statusText);
        }));
    };
    HttpErrorInterceptor.ctorParameters = function () { return [
        { type: _Shared_Services_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"] },
        { type: _Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"] }
    ]; };
    HttpErrorInterceptor = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_7__["Injectable"])(),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_Shared_Services_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"],
            _Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"]])
    ], HttpErrorInterceptor);
    return HttpErrorInterceptor;
}());



/***/ }),

/***/ "./ClientApp/app/login/login.component.scss":
/*!**************************************************!*\
  !*** ./ClientApp/app/login/login.component.scss ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("h2 {\n  color: #0B3C5D;\n  margin-bottom: 1em;\n}\n\n.form-wrapper {\n  min-width: 40%;\n  margin-bottom: 10%;\n  border: 1px solid #efefef;\n  padding: 1em 2em;\n  box-shadow: 0 15px 20px #efefef;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9sb2dpbi9DOlxcUHJvamVjdFxcU2lnbmFsUkNoYXRcXENsaWVudEFwcC9hcHBcXGxvZ2luXFxsb2dpbi5jb21wb25lbnQuc2NzcyIsImFwcC9sb2dpbi9DOlxcUHJvamVjdFxcU2lnbmFsUkNoYXRcXENsaWVudEFwcC9zdHlsZXNcXHZhcmlhYmxlcy5zY3NzIiwiYXBwL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0ksY0NETztFREVQLGtCQUFBO0FFREo7O0FGR0E7RUFDSSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkFBQTtFQUNBLGdCQUFBO0VBQ0EsK0JBQUE7QUVBSiIsImZpbGUiOiJhcHAvbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICcuLi8uLi9zdHlsZXMvdmFyaWFibGVzLnNjc3MnO1xyXG5cclxuaDJ7XHJcbiAgICBjb2xvcjogJHNlY29uZGFyeTtcclxuICAgIG1hcmdpbi1ib3R0b206IDFlbTtcclxufVxyXG4uZm9ybS13cmFwcGVyIHtcclxuICAgIG1pbi13aWR0aDogNDAlO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTAlO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgJGxpZ2h0LWdyZXk7XHJcbiAgICBwYWRkaW5nOiAxZW0gMmVtO1xyXG4gICAgYm94LXNoYWRvdzogMCAxNXB4IDIwcHggJGxpZ2h0LWdyZXk7XHJcbn0iLCIvLyBjb2xvcnNcclxuJHByaW1hcnk6IzMyOGNjMTtcclxuJHNlY29uZGFyeTojMEIzQzVEO1xyXG4kZ29sZDojRDlCMzEwO1xyXG4kbGlnaHQtZ3JleTojZWZlZmVmO1xyXG4kZ3JheTogZGFya2VuKCRsaWdodC1ncmV5LCAzMCUpO1xyXG4kYmxhY2s6IzFkMjczMTtcclxuXHJcbiRuYXZiYXItaGVpZ2h0OjgwcHg7XHJcbiIsImgyIHtcbiAgY29sb3I6ICMwQjNDNUQ7XG4gIG1hcmdpbi1ib3R0b206IDFlbTtcbn1cblxuLmZvcm0td3JhcHBlciB7XG4gIG1pbi13aWR0aDogNDAlO1xuICBtYXJnaW4tYm90dG9tOiAxMCU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNlZmVmZWY7XG4gIHBhZGRpbmc6IDFlbSAyZW07XG4gIGJveC1zaGFkb3c6IDAgMTVweCAyMHB4ICNlZmVmZWY7XG59Il19 */");

/***/ }),

/***/ "./ClientApp/app/login/login.component.ts":
/*!************************************************!*\
  !*** ./ClientApp/app/login/login.component.ts ***!
  \************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var _classes_alert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../classes/alert */ "./ClientApp/classes/alert.ts");
/* harmony import */ var _Shared_Services_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Shared/Services/alert.service */ "./ClientApp/app/Shared/Services/alert.service.ts");
/* harmony import */ var _enums_alert_type_enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../enums/alert-type.enum */ "./ClientApp/enums/alert-type.enum.ts");
/* harmony import */ var _Shared_Services_loading_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Shared/Services/loading.service */ "./ClientApp/app/Shared/Services/loading.service.ts");
/* harmony import */ var _Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Shared/Services/auth.service */ "./ClientApp/app/Shared/Services/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");









var LoginComponent = /** @class */ (function () {
    function LoginComponent(fb, alertService, loadingService, auth, router, route) {
        this.fb = fb;
        this.alertService = alertService;
        this.loadingService = loadingService;
        this.auth = auth;
        this.router = router;
        this.route = route;
        this.subscriptions = [];
        this.CreateForm();
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/chat';
        this.subscriptions.push(this.auth.getCurrentUser().subscribe(function (user) {
            if (!!user) {
                _this.router.navigateByUrl('/chat');
            }
        }));
    };
    LoginComponent.prototype.CreateForm = function () {
        this.loginForm = this.fb.group({
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email]],
            password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(6)]]
        });
    };
    LoginComponent.prototype.submit = function () {
        var _this = this;
        this.loadingService.isLoading.next(true);
        if (this.loginForm.valid) {
            var _a = this.loginForm.value, email = _a.email, password = _a.password;
            console.log("Email: " + email + ", pass:" + password + " ");
            this.subscriptions.push(this.auth.login(email, password).subscribe(function (success) {
                if (success) {
                    _this.router.navigate([_this.returnUrl]);
                }
                _this.loadingService.isLoading.next(false);
            }));
        }
        else {
            var failedLoginAlert = new _classes_alert__WEBPACK_IMPORTED_MODULE_3__["Alert"]('Your login or pass not good enough buddy, try again', _enums_alert_type_enum__WEBPACK_IMPORTED_MODULE_5__["AlertType"].Danger);
            this.alertService.alerts.next(failedLoginAlert);
            this.loadingService.isLoading.next(false);
        }
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    LoginComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _Shared_Services_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] },
        { type: _Shared_Services_loading_service__WEBPACK_IMPORTED_MODULE_6__["LoadingService"] },
        { type: _Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_7__["AuthService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"] }
    ]; };
    LoginComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-login',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./login.component.html */ "./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/login/login.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./login.component.scss */ "./ClientApp/app/login/login.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _Shared_Services_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"],
            _Shared_Services_loading_service__WEBPACK_IMPORTED_MODULE_6__["LoadingService"],
            _Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_7__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./ClientApp/app/message/message.component.scss":
/*!******************************************************!*\
  !*** ./ClientApp/app/message/message.component.scss ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAvbWVzc2FnZS9tZXNzYWdlLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./ClientApp/app/message/message.component.ts":
/*!****************************************************!*\
  !*** ./ClientApp/app/message/message.component.ts ***!
  \****************************************************/
/*! exports provided: MessageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageComponent", function() { return MessageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _models_Message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/Message */ "./ClientApp/app/models/Message.ts");
/* harmony import */ var _Shared_Services_chat_service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Shared/Services/chat-service.service */ "./ClientApp/app/Shared/Services/chat-service.service.ts");




var MessageComponent = /** @class */ (function () {
    function MessageComponent(chatService, _ngZone) {
        this.chatService = chatService;
        this._ngZone = _ngZone;
        this.txtMessage = '';
        this.uniqueID = new Date().getTime().toString();
        this.messages = new Array();
        this.message = new _models_Message__WEBPACK_IMPORTED_MODULE_2__["Message"]();
        this.subscribeToEvents();
    }
    MessageComponent.prototype.ngOnInit = function () {
    };
    MessageComponent.prototype.subscribeToEvents = function () {
        var _this = this;
        this.chatService.messageReceived.subscribe(function (message) {
            _this._ngZone.run(function () {
                if (message.clientuniqueid !== _this.uniqueID) {
                    message.type = "received";
                    _this.messages.push(message);
                }
            });
        });
    };
    MessageComponent.prototype.sendMessage = function () {
        if (this.txtMessage) {
            this.message = new _models_Message__WEBPACK_IMPORTED_MODULE_2__["Message"]();
            this.message.clientuniqueid = this.uniqueID;
            this.message.type = "sent";
            this.message.messageText = this.txtMessage;
            this.message.date = new Date();
            this.messages.push(this.message);
            this.chatService.sendMessage(this.message);
            this.txtMessage = '';
        }
    };
    MessageComponent.ctorParameters = function () { return [
        { type: _Shared_Services_chat_service_service__WEBPACK_IMPORTED_MODULE_3__["ChatService"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }
    ]; };
    MessageComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-message',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./message.component.html */ "./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/message/message.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./message.component.scss */ "./ClientApp/app/message/message.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_Shared_Services_chat_service_service__WEBPACK_IMPORTED_MODULE_3__["ChatService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]])
    ], MessageComponent);
    return MessageComponent;
}());



/***/ }),

/***/ "./ClientApp/app/models/Message.ts":
/*!*****************************************!*\
  !*** ./ClientApp/app/models/Message.ts ***!
  \*****************************************/
/*! exports provided: Message */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Message", function() { return Message; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var Message = /** @class */ (function () {
    function Message() {
    }
    return Message;
}());



/***/ }),

/***/ "./ClientApp/app/profile/profile.component.scss":
/*!******************************************************!*\
  !*** ./ClientApp/app/profile/profile.component.scss ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".no-photo {\n  height: 150px;\n  width: 150px;\n  background: #a3a3a3;\n  margin: 1em 0;\n  color: #ffffff;\n  border-radius: 50%;\n}\n\n.profile-pic {\n  height: 150px;\n  width: 150px;\n  margin: 1em 0;\n}\n\n.name {\n  font-size: 1.4em;\n  font-weight: 200;\n}\n\n.quote {\n  margin-bottom: 2em;\n  font-weight: 200;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9wcm9maWxlL0M6XFxQcm9qZWN0XFxTaWduYWxSQ2hhdFxcQ2xpZW50QXBwL2FwcFxccHJvZmlsZVxccHJvZmlsZS5jb21wb25lbnQuc2NzcyIsImFwcC9wcm9maWxlL3Byb2ZpbGUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDSSxhQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtBQ0RKOztBREdBO0VBQ0ksYUFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0FDQUo7O0FERUE7RUFDSSxnQkFBQTtFQUNBLGdCQUFBO0FDQ0o7O0FEQ0E7RUFDSSxrQkFBQTtFQUNBLGdCQUFBO0FDRUoiLCJmaWxlIjoiYXBwL3Byb2ZpbGUvcHJvZmlsZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgJy4uLy4uL3N0eWxlcy92YXJpYWJsZXMuc2Nzcyc7XHJcblxyXG4ubm8tcGhvdG8ge1xyXG4gICAgaGVpZ2h0OiAxNTBweDtcclxuICAgIHdpZHRoOiAxNTBweDtcclxuICAgIGJhY2tncm91bmQ6ICRncmF5O1xyXG4gICAgbWFyZ2luOiAxZW0gMDtcclxuICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG59XHJcbi5wcm9maWxlLXBpYyB7XHJcbiAgICBoZWlnaHQ6IDE1MHB4O1xyXG4gICAgd2lkdGg6IDE1MHB4O1xyXG4gICAgbWFyZ2luOiAxZW0gMDtcclxufVxyXG4ubmFtZSB7XHJcbiAgICBmb250LXNpemU6IDEuNGVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDIwMDtcclxufVxyXG4ucXVvdGUge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDIwMDtcclxufSIsIi5uby1waG90byB7XG4gIGhlaWdodDogMTUwcHg7XG4gIHdpZHRoOiAxNTBweDtcbiAgYmFja2dyb3VuZDogI2EzYTNhMztcbiAgbWFyZ2luOiAxZW0gMDtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbn1cblxuLnByb2ZpbGUtcGljIHtcbiAgaGVpZ2h0OiAxNTBweDtcbiAgd2lkdGg6IDE1MHB4O1xuICBtYXJnaW46IDFlbSAwO1xufVxuXG4ubmFtZSB7XG4gIGZvbnQtc2l6ZTogMS40ZW07XG4gIGZvbnQtd2VpZ2h0OiAyMDA7XG59XG5cbi5xdW90ZSB7XG4gIG1hcmdpbi1ib3R0b206IDJlbTtcbiAgZm9udC13ZWlnaHQ6IDIwMDtcbn0iXX0= */");

/***/ }),

/***/ "./ClientApp/app/profile/profile.component.ts":
/*!****************************************************!*\
  !*** ./ClientApp/app/profile/profile.component.ts ***!
  \****************************************************/
/*! exports provided: ProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileComponent", function() { return ProfileComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Shared/Services/auth.service */ "./ClientApp/app/Shared/Services/auth.service.ts");
/* harmony import */ var _Shared_Services_loading_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Shared/Services/loading.service */ "./ClientApp/app/Shared/Services/loading.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");





var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(auth, loading, route) {
        this.auth = auth;
        this.loading = loading;
        this.route = route;
        this.subs = [];
        this.loading.isLoading.next(true);
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subs.push(this.auth.getCurrentUser().subscribe(function (currentUser) {
            _this.currentUser = currentUser;
            _this.loading.isLoading.next(false);
        }));
        this.subs.push(this.route.paramMap.subscribe(function (params) {
            var userId = params.get('userId');
            _this.subs.push(_this.auth.getUser(userId).subscribe(function (user) {
                _this.user = user;
            }));
        }));
    };
    ProfileComponent.prototype.ngOnDestroy = function () {
        this.subs.forEach(function (sub) { return sub.unsubscribe(); });
    };
    ProfileComponent.ctorParameters = function () { return [
        { type: _Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] },
        { type: _Shared_Services_loading_service__WEBPACK_IMPORTED_MODULE_3__["LoadingService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] }
    ]; };
    ProfileComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-profile',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./profile.component.html */ "./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/profile/profile.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./profile.component.scss */ "./ClientApp/app/profile/profile.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"],
            _Shared_Services_loading_service__WEBPACK_IMPORTED_MODULE_3__["LoadingService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]])
    ], ProfileComponent);
    return ProfileComponent;
}());



/***/ }),

/***/ "./ClientApp/app/signup/signup.component.scss":
/*!****************************************************!*\
  !*** ./ClientApp/app/signup/signup.component.scss ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("h2 {\n  color: #0B3C5D;\n  margin-bottom: 1em;\n}\n\n.form-wrapper {\n  min-width: 40%;\n  margin-bottom: 10%;\n  border: 1px solid #efefef;\n  padding: 1em 2em;\n  box-shadow: 0 15px 20px #efefef;\n}\n\n.first-name {\n  margin-right: 0.5em;\n}\n\n.last-name {\n  margin-left: 0.5em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaWdudXAvQzpcXFByb2plY3RcXFNpZ25hbFJDaGF0XFxDbGllbnRBcHAvYXBwXFxzaWdudXBcXHNpZ251cC5jb21wb25lbnQuc2NzcyIsImFwcC9zaWdudXAvQzpcXFByb2plY3RcXFNpZ25hbFJDaGF0XFxDbGllbnRBcHAvc3R5bGVzXFx2YXJpYWJsZXMuc2NzcyIsImFwcC9zaWdudXAvc2lnbnVwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0ksY0NETztFREVQLGtCQUFBO0FFREo7O0FGR0E7RUFDSSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkFBQTtFQUNBLGdCQUFBO0VBQ0EsK0JBQUE7QUVBSjs7QUZHQTtFQUNJLG1CQUFBO0FFQUo7O0FGR0E7RUFDSSxrQkFBQTtBRUFKIiwiZmlsZSI6ImFwcC9zaWdudXAvc2lnbnVwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCAnLi4vLi4vc3R5bGVzL3ZhcmlhYmxlcy5zY3NzJztcclxuXHJcbmgye1xyXG4gICAgY29sb3I6ICRzZWNvbmRhcnk7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxZW07XHJcbn1cclxuLmZvcm0td3JhcHBlciB7XHJcbiAgICBtaW4td2lkdGg6IDQwJTtcclxuICAgIG1hcmdpbi1ib3R0b206IDEwJTtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICRsaWdodC1ncmV5O1xyXG4gICAgcGFkZGluZzogMWVtIDJlbTtcclxuICAgIGJveC1zaGFkb3c6IDAgMTVweCAyMHB4ICRsaWdodC1ncmV5O1xyXG59XHJcblxyXG4uZmlyc3QtbmFtZSB7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDAuNWVtO1xyXG59XHJcblxyXG4ubGFzdC1uYW1lIHtcclxuICAgIG1hcmdpbi1sZWZ0OiAwLjVlbTtcclxufSIsIi8vIGNvbG9yc1xyXG4kcHJpbWFyeTojMzI4Y2MxO1xyXG4kc2Vjb25kYXJ5OiMwQjNDNUQ7XHJcbiRnb2xkOiNEOUIzMTA7XHJcbiRsaWdodC1ncmV5OiNlZmVmZWY7XHJcbiRncmF5OiBkYXJrZW4oJGxpZ2h0LWdyZXksIDMwJSk7XHJcbiRibGFjazojMWQyNzMxO1xyXG5cclxuJG5hdmJhci1oZWlnaHQ6ODBweDtcclxuIiwiaDIge1xuICBjb2xvcjogIzBCM0M1RDtcbiAgbWFyZ2luLWJvdHRvbTogMWVtO1xufVxuXG4uZm9ybS13cmFwcGVyIHtcbiAgbWluLXdpZHRoOiA0MCU7XG4gIG1hcmdpbi1ib3R0b206IDEwJTtcbiAgYm9yZGVyOiAxcHggc29saWQgI2VmZWZlZjtcbiAgcGFkZGluZzogMWVtIDJlbTtcbiAgYm94LXNoYWRvdzogMCAxNXB4IDIwcHggI2VmZWZlZjtcbn1cblxuLmZpcnN0LW5hbWUge1xuICBtYXJnaW4tcmlnaHQ6IDAuNWVtO1xufVxuXG4ubGFzdC1uYW1lIHtcbiAgbWFyZ2luLWxlZnQ6IDAuNWVtO1xufSJdfQ== */");

/***/ }),

/***/ "./ClientApp/app/signup/signup.component.ts":
/*!**************************************************!*\
  !*** ./ClientApp/app/signup/signup.component.ts ***!
  \**************************************************/
/*! exports provided: SignupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupComponent", function() { return SignupComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm5/forms.js");
/* harmony import */ var _Shared_Services_alert_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Shared/Services/alert.service */ "./ClientApp/app/Shared/Services/alert.service.ts");
/* harmony import */ var _classes_alert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../classes/alert */ "./ClientApp/classes/alert.ts");
/* harmony import */ var _enums_alert_type_enum__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../enums/alert-type.enum */ "./ClientApp/enums/alert-type.enum.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
/* harmony import */ var _Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Shared/Services/auth.service */ "./ClientApp/app/Shared/Services/auth.service.ts");
/* harmony import */ var _Shared_Services_loading_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Shared/Services/loading.service */ "./ClientApp/app/Shared/Services/loading.service.ts");









var SignupComponent = /** @class */ (function () {
    function SignupComponent(fb, alertService, loadingService, auth, router, route) {
        this.fb = fb;
        this.alertService = alertService;
        this.loadingService = loadingService;
        this.auth = auth;
        this.router = router;
        this.route = route;
        this.subscriptions = [];
        this.CreateForm();
    }
    SignupComponent.prototype.ngOnInit = function () {
    };
    SignupComponent.prototype.CreateForm = function () {
        this.signupForm = this.fb.group({
            firstName: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            nicname: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email]],
            password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(6)]]
        });
    };
    SignupComponent.prototype.submit = function () {
        var _this = this;
        if (this.signupForm.valid) {
            var _a = this.signupForm.value, firstName = _a.firstName, nicname = _a.nicname, email = _a.email, password = _a.password;
            this.subscriptions.push(this.auth.signup(firstName, nicname, email, password).subscribe(function (success) {
                if (success) {
                    _this.router.navigate(['/chat']);
                }
                _this.loadingService.isLoading.next(false);
            }));
        }
        else {
            var failedSignUpAlert = new _classes_alert__WEBPACK_IMPORTED_MODULE_4__["Alert"]('Give me valid name, email and password next time partner.', _enums_alert_type_enum__WEBPACK_IMPORTED_MODULE_5__["AlertType"].Danger);
            this.alertService.alerts.next(failedSignUpAlert);
        }
    };
    SignupComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    SignupComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _Shared_Services_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"] },
        { type: _Shared_Services_loading_service__WEBPACK_IMPORTED_MODULE_8__["LoadingService"] },
        { type: _Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_7__["AuthService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] }
    ]; };
    SignupComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-signup',
            template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! raw-loader!./signup.component.html */ "./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/signup/signup.component.html")).default,
            styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(/*! ./signup.component.scss */ "./ClientApp/app/signup/signup.component.scss")).default]
        }),
        Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _Shared_Services_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"],
            _Shared_Services_loading_service__WEBPACK_IMPORTED_MODULE_8__["LoadingService"],
            _Shared_Services_auth_service__WEBPACK_IMPORTED_MODULE_7__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"]])
    ], SignupComponent);
    return SignupComponent;
}());



/***/ }),

/***/ "./ClientApp/classes/SignUpVM.ts":
/*!***************************************!*\
  !*** ./ClientApp/classes/SignUpVM.ts ***!
  \***************************************/
/*! exports provided: SignUpVM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignUpVM", function() { return SignUpVM; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var SignUpVM = /** @class */ (function () {
    function SignUpVM(firstName, NicName, email, password) {
        this.FirstName = firstName;
        this.NicName = NicName;
        this.Email = email;
        this.Password = password;
    }
    return SignUpVM;
}());



/***/ }),

/***/ "./ClientApp/classes/User.ts":
/*!***********************************!*\
  !*** ./ClientApp/classes/User.ts ***!
  \***********************************/
/*! exports provided: User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var User = /** @class */ (function () {
    function User(_a) {
        var firstName = _a.firstName, lastName = _a.lastName, photoUrl = _a.photoUrl;
        this.firstName = firstName;
        this.nicname = lastName;
        this.photoUrl = photoUrl;
    }
    return User;
}());



/***/ }),

/***/ "./ClientApp/classes/alert.ts":
/*!************************************!*\
  !*** ./ClientApp/classes/alert.ts ***!
  \************************************/
/*! exports provided: Alert */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Alert", function() { return Alert; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _enums_alert_type_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums/alert-type.enum */ "./ClientApp/enums/alert-type.enum.ts");


var Alert = /** @class */ (function () {
    function Alert(text, type) {
        if (type === void 0) { type = _enums_alert_type_enum__WEBPACK_IMPORTED_MODULE_1__["AlertType"].Success; }
        this.text = text;
        this.type = type;
    }
    return Alert;
}());



/***/ }),

/***/ "./ClientApp/classes/loginvm.ts":
/*!**************************************!*\
  !*** ./ClientApp/classes/loginvm.ts ***!
  \**************************************/
/*! exports provided: Loginvm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Loginvm", function() { return Loginvm; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var Loginvm = /** @class */ (function () {
    function Loginvm(email, password) {
        this.email = email;
        this.password = password;
    }
    return Loginvm;
}());



/***/ }),

/***/ "./ClientApp/classes/message.ts":
/*!**************************************!*\
  !*** ./ClientApp/classes/message.ts ***!
  \**************************************/
/*! exports provided: Message */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Message", function() { return Message; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./User */ "./ClientApp/classes/User.ts");


var Message = /** @class */ (function () {
    function Message(message, createAt, sender) {
        this.message = message;
        this.createAt = createAt;
        this.sender = new _User__WEBPACK_IMPORTED_MODULE_1__["User"](sender);
    }
    return Message;
}());



/***/ }),

/***/ "./ClientApp/enums/alert-type.enum.ts":
/*!********************************************!*\
  !*** ./ClientApp/enums/alert-type.enum.ts ***!
  \********************************************/
/*! exports provided: AlertType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlertType", function() { return AlertType; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var AlertType;
(function (AlertType) {
    AlertType["Success"] = "success";
    AlertType["Danger"] = "danger";
})(AlertType || (AlertType = {}));


/***/ }),

/***/ "./ClientApp/environments/environment.ts":
/*!***********************************************!*\
  !*** ./ClientApp/environments/environment.ts ***!
  \***********************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./ClientApp/main.ts":
/*!***************************!*\
  !*** ./ClientApp/main.ts ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/__ivy_ngcc__/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./ClientApp/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./ClientApp/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/app.component.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/app.component.html ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ngx-loading [show] = \"loading\" [config]=\"\"></ngx-loading>\r\n<div class=\"alert-wrapper\">\r\n    <alert *ngFor=\"let alert of alerts\" [type]=\"alert.type\" dismissOnTimeout=\"5000\" class=\"text-center\">\r\n        {{alert.text}}\r\n    </alert>\r\n</div>\r\n<router-outlet></router-outlet>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/chat/chat.component.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/chat/chat.component.html ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-navbar></app-navbar>\n<div class=\"container-wrapper container d-flex\">\n  <app-chatroom-list class=\"w-25\"></app-chatroom-list>\n  <app-chatroom-window class=\"w-75\"></app-chatroom-window>\n\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/chat/components/chat-input/chat-Input.component.html":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/chat/components/chat-input/chat-Input.component.html ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"new-message-wraper d-flex\">\r\n  <div class=\"input-group\">\r\n    <input [(ngModel)]=\"newMessagetext\" type=\"text\" class=\"form-control\" placeholder=\"Enter a new Meme\" (keyup.enter)=\"submit(newMessage.value)\" #newMessage>\r\n    <div class=\"input-group-append\">\r\n      <button class=\"btn btn-primary\" type=\"button\" (click)=\"submit(newMessage.value)\" >Enter</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/chat/components/chat-message/chat-message.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/chat/components/chat-message/chat-message.component.html ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"chat-message d-flex\">\n  <div class=\"image-wrapper\" [routerLink]=\"'/profile/' + message.sender.id\">\n    <img [src]=\"message.sender.photoUrl\" class=\"rounded-circle\">\n  </div>\n  <div class=\"bubble d-flex flex-column\">\n    <div class=\"d-flex align-items-baseline\">\n     <span class=\"name\"> <a [routerLink]=\"'/profile/' + message.sender.id\">{{message.sender.firstName}} {{message.sender.nicname}}</a></span><span class=\"timestamp\">{{message.createAt | date:'medium'}}</span>\n    </div>\n    <div class=\"message\">\n      {{message.message}}\n    </div>\n  </div>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/chat/components/chatroom-list/chatroom-list.component.html":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/chat/components/chatroom-list/chatroom-list.component.html ***!
  \************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"h-100 d-flex flex-column\">\n  <div class=\"chatroom-list\">\n  <ng-container *ngFor=\"let chatRoom of rooms\">\n    <div class=\"chatroom-list-item\">\n      <a [routerLink]=\"['/chat', chatRoom.id]\">{{ chatRoom.name }}</a>\n    </div>\n  </ng-container>\n</div>\n<app-room-input></app-room-input>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/chat/components/chatroom-title-bar/chatroom-title-bar.component.html":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/chat/components/chatroom-title-bar/chatroom-title-bar.component.html ***!
  \**********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"room-title\">\n  <h4>{{title}}</h4>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/chat/components/chatroom-window/chatroom-window.component.html":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/chat/components/chatroom-window/chatroom-window.component.html ***!
  \****************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"h-100 d-flex flex-column chat-window\">\n  <ng-container *ngIf=\"!chatroom else chatMessages\">\n    <div class=\"select-room h-100 w100 d-flex justify-content-center align-items-center\">\n      <div class=\"select-room-message\">\n        Select room\n      </div>\n    </div>\n  </ng-container>\n</div>\n<ng-template #chatMessages>\n  <app-chatroom-title-bar [title]=\"chatroom.name\"></app-chatroom-title-bar>\n<div class=\"message-wrapper h-100\" #scrollContainer>\n  <ng-container *ngIf=\"messages.length > 0 else noMessages\">\n    <ng-container *ngFor= \"let message of messages\">\n      <app-chat-message [message] = \"message\"></app-chat-message>\n    </ng-container>\n  </ng-container>\n</div>\n<app-chat-input></app-chat-input>\n</ng-template>\n\n<ng-template #noMessages>\n  <div class=\"select-room h-100 w100 d-flex justify-content-center align-items-center\">\n    <div class=\"select-room-message\">\n      No Messages\n    </div>\n  </div>\n</ng-template>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/chat/components/room-input/room-input.component.html":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/chat/components/room-input/room-input.component.html ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"new-room-wraper d-flex\">\n  <div class=\"input-group\">\n    <input [(ngModel)]=\"newMessageText\" type=\"text\" class=\"form-control\" placeholder=\"Enter a new Meme\" (keyup.enter)=\"submit(newMessage.value)\" #newMessage>\n    <div class=\"input-group-append\">\n      <button class=\"btn btn-primary\" type=\"button\" (click)=\"submit(newMessage.value)\" >Enter</button>\n    </div>\n  </div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/components/navbar/navbar.component.html":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/components/navbar/navbar.component.html ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<nav class=\"navbar navbar-expand-sm navbar-primary bg-primary\">\r\n    <div class=\"container\">\r\n       <span class=\"navbar-brand\">CoreSignalrChat</span>\r\n       <div class=\"page-links\">\r\n          <ul class=\"navbar-nav\" *ngIf=\"!!currentUser else loggedOut\">\r\n            <li class=\"nav-item\">\r\n                <a [routerLink]=\"'/profile/' + currentUser.id\" routerLinkActive=\"active\" class=\"nav-link\">Profile</a>\r\n            </li>\r\n            <li class=\"nav-item\">\r\n                  <a routerLink=\"/chat\" routerLinkActive=\"active\" class=\"nav-link\">rooms</a>\r\n              </li>\r\n              <li class=\"nav-item\">\r\n                <a class=\"nav-link\" (click)=\"auth.logout()\">Logout</a>\r\n            </li>\r\n          </ul>\r\n       </div>\r\n    </div>\r\n</nav>\r\n\r\n<ng-template #loggedOut>\r\n    <ul class=\"navbar-nav\">\r\n        <li class=\"nav-item\">\r\n            <a routerLink=\"/login\" routerLinkActive=\"active\" class=\"nav-link\">Login</a>\r\n        </li>\r\n        <li class=\"nav-item\">\r\n          <a routerLink=\"/signup\" routerLinkActive=\"active\" class=\"nav-link\">Sign up</a>\r\n      </li>\r\n    </ul>\r\n</ng-template>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/edit-profile/edit-profile.component.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/edit-profile/edit-profile.component.html ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-navbar></app-navbar>\n<div class=\"container\">\n  <div class=\"row justify-content-center\">\n    <div class=\"col-xs-12 col-sm-8 col-md-6\" *ngIf=\"currentUser else noPhoto\" >\n        <img *ngIf=\"!downloadUrl\" [src]=\"currentUser.photoUrl\" alt=\"profile-pic\" class=\"rounded-circle mx-auto d-block profile-pic\">\n        <img *ngIf=\"downloadUrl && downloadUrl.length > 0\" [src]=\"downloadUrl\" alt=\"profile-pic\" class=\"rounded-circle mx-auto d-block profile-pic\">\n    </div>\n  </div>\n  <div class=\"row justify-content-center\" *ngIf=\"currentUser\">\n    <div class=\"col-xs-12 col-sm-8 col-md-6\">\n      <input type=\"file\" (change)=\"uploadFile($event)\">\n    </div>\n  </div>\n  <div class=\"row justify-content-center\" *ngIf=\"currentUser\">\n    <div class=\"col-xs-12 col-sm-8 col-md-6 justify-content-center d-flex\">\n      <input type=\"text\" [(ngModel)]=\"currentUser.firstName\">\n    </div>\n  </div>\n  <div class=\"row justify-content-center\" *ngIf=\"currentUser\">\n    <div class=\"col-xs-12 col-sm-8 col-md-6 text-center quote\">\n      <input type=\"text\" [(ngModel)]=\"currentUser.quote\">\n    </div>\n  </div>\n  <div class=\"row justify-content-center\" *ngIf=\"currentUser\">\n    <div class=\"col-xs-12 col-sm-8 col-md-6 text-center bio\">\n      <textarea rows=\"5\" [(ngModel)]=\"currentUser.bio\"></textarea>\n    </div>\n  </div>\n  <div class=\"row justify-content-center\" *ngIf=\"currentUser\">\n    <div class=\"col-xs-12 col-sm-8 col-md-6 justify-content-center text-center\">\n      <button class=\"btn btn-primary\" (click)=\"save()\">Save</button>\n    </div>\n  </div>\n</div>\n\n<ng-template #noPhoto>\n<div class=\"no-photo d-flex justify-content-center align-items-center\">\n  No Photo\n</div>\n</ng-template>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/login/login.component.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/login/login.component.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-navbar></app-navbar>\n<div class=\"container-wrapper d-flex justify-content-center align-items-center\">\n  <div class=\"form-wrapper text-center userForm\">\n    <h2 class=\"text-center\">Login</h2>\n    <form [formGroup]=\"loginForm\" (submit)=\"submit()\" novalidate>\n      <div class=\"form-group\">\n        <input type=\"email\" class=\"form-control\" id=\"email-input\" placeholder=\"Enter Email\" formControlName=\"email\">\n      </div>\n      <div class=\"form-group\">\n        <input type=\"password\" class=\"form-control\" id=\"password-input\" placeholder=\"Password\" formControlName=\"password\">\n      </div>\n      <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n    </form>\n    <small><a routerLink=\"/signup\">Need an Account?</a></small>\n  </div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/message/message.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/message/message.component.html ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container-wrapper\">\n  <h3 class=\" text-center chat_header\">Chat Application</h3>\n  <div class=\"messaging\">\n    <div class=\"inbox_msg\">\n      <div class=\"mesgs\">\n        <div class=\"msg_history\">\n          <div *ngFor=\"let msg of messages\">\n          <div class=\"incoming_msg\" *ngIf=\"msg.type == 'received'\">\n            <div class=\"incoming_msg_img\"> </div>\n            <div class=\"received_msg\">\n              <div class=\"received_withd_msg\">\n                <p>\n                 {{msg.messageText}}\n                </p>\n                <span class=\"time_date\"> {{msg.date | date:'medium'}} </span>\n              </div>\n            </div>\n          </div>\n          <div class=\"outgoing_msg\" *ngIf=\"msg.type == 'sent'\">\n            <div class=\"sent_msg\">\n              <p>\n                  {{msg.messageText}}\n              </p>\n              <span class=\"time_date\"> {{msg.date | date:'medium'}}</span>\n            </div>\n          </div>\n        </div>\n        </div>\n        <div class=\"type_msg\">\n          <div class=\"input_msg_write\">\n            <input type=\"text\" class=\"write_msg\" [value]=\"txtMessage\"\n            (input)=\"txtMessage=$event.target.value\" (keydown.enter)=\"sendMessage()\" placeholder=\"Type a message\" />\n            <button class=\"msg_send_btn\" type=\"button\"  (click)=\"sendMessage()\"><i class=\"fa fa-paper-plane-o\" aria-hidden=\"true\"></i></button>\n          </div>\n        </div>\n      </div>\n    </div>\n\n  </div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/profile/profile.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/profile/profile.component.html ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-navbar></app-navbar>\n<div class=\"container\">\n  <div class=\"row justify-content-center\">\n    <div *ngIf=\"true else noPhoto\" class=\"col-xs-12 col-sm-8 col-md-6\">\n      <img [src] =\"user?.photoUrl\" alt=\"profile-pic\" class=\"rounded-circle mx-auto d-block profile-pic\">\n    </div>\n  </div>\n  <div class=\"row justify-content-center\">\n    <div class=\"col-xs-12 col-sm-8 col-md-6 text-center name\">\n      {{user?.firstName}} {{user?.nicname}}\n    </div>\n  </div>\n  <div class=\"row justify-content-center\">\n    <div class=\"col-xs-12 col-sm-8 col-md-6 text-center quote\">\n      <blockquote class=\"blockquote\">\n        <p class=\"mb-0\">\n          \"{{user?.quote}}\"\n        </p>\n      </blockquote>\n\n    </div>\n  </div>\n  <div class=\"row justify-content-center\">\n    <div class=\"col-xs-12 col-sm-8 col-md-6 text-center bio\">\n      {{user?.bio}}\n    </div>\n  </div>\n  <div class=\"row justify-content-center\" *ngIf=\"user?.id === currentUser?.id\">\n    <div class=\"col-xs-12 col-sm-8 col-md-6 text-center edit-button\">\n      <button [routerLink]=\"'/profile/' + currentUser?.id + '/edit'\" class=\"btn bg-primary\">Edit Profile</button>\n    </div>\n  </div>\n</div>\n\n<ng-template #noPhoto>\n  <div class=\"no-photo d-flex justify-content-center align-items-center\">\n    No Photo\n  </div>\n</ng-template>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/signup/signup.component.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./ClientApp/app/signup/signup.component.html ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-navbar></app-navbar>\n<div class=\"container-wrapper container d-flex justify-content-center align-items-center\">\n  <div class=\"form-wrapper text-center userForm\">\n    <h2 class=\"text-center\">Sign Up</h2>\n    <form [formGroup]=\"signupForm\" (submit)=\"submit()\" novalidate>\n      <div class=\"name-wrapper d-flex\">\n        <div class=\"form-group first-name\">\n          <input type=\"text\" class=\"form-control\" id=\"first-name-input\" placeholder=\"First Name\" formControlName=\"firstName\">\n        </div>\n        <div class=\"form-group nickname\">\n          <input type=\"text\" class=\"form-control\" id=\"nickname-input\" placeholder=\"Nickname\" formControlName=\"nicname\">\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <input type=\"email\" class=\"form-control\" id=\"email-input\" placeholder=\"Enter Email\" formControlName=\"email\">\n      </div>\n      <div class=\"form-group\">\n        <input type=\"password\" class=\"form-control\" id=\"password-input\" placeholder=\"Password\" formControlName=\"password\">\n      </div>\n      <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n    </form>\n    <small><a routerLink=\"/login\">Already have an Account?</a></small>\n  </div>\n</div>");

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ 0:
/*!*********************************!*\
  !*** multi ./ClientApp/main.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Project\SignalRChat\ClientApp\main.ts */"./ClientApp/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map