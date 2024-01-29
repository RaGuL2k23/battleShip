"use strict";
(self["webpackChunkwebpack_demo"] = self["webpackChunkwebpack_demo"] || []).push([["ragul"],{

/***/ "./src/ragul.js":
/*!**********************!*\
  !*** ./src/ragul.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ragul_dropdown1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ragul_dropdown1 */ "./node_modules/ragul_dropdown1/index.js");

(0,ragul_dropdown1__WEBPACK_IMPORTED_MODULE_0__["default"])('.dropdown') //wow my module working


/***/ }),

/***/ "./node_modules/ragul_dropdown1/index.js":
/*!***********************************************!*\
  !*** ./node_modules/ragul_dropdown1/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function toggleDropdown(selector) {
  const dropdowns = document.querySelectorAll(selector);

  dropdowns.forEach((dropdown) => {
    const content = dropdown.querySelector('.content');
    dropdown.addEventListener('click', () => {
      content.classList.toggle('visible');
    });
  });
}
 
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toggleDropdown);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/ragul.js"));
/******/ }
]);
//# sourceMappingURL=ragul.bundle.js.map