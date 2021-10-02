(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{1146:function(module,exports,__webpack_require__){"use strict";(function(module){(0,__webpack_require__(374).configure)([__webpack_require__(1147),__webpack_require__(1148)],module,!1)}).call(this,__webpack_require__(106)(module))},1147:function(module,exports){function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=function(){return[]},webpackEmptyContext.resolve=webpackEmptyContext,module.exports=webpackEmptyContext,webpackEmptyContext.id=1147},1148:function(module,exports,__webpack_require__){var map={"./UseDrags.stories.tsx":1162};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=1148},1161:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var preview_namespaceObject={};__webpack_require__.r(preview_namespaceObject),__webpack_require__.d(preview_namespaceObject,"parameters",(function(){return parameters}));__webpack_require__(22),__webpack_require__(5),__webpack_require__(46),__webpack_require__(501),__webpack_require__(510),__webpack_require__(42),__webpack_require__(1144),__webpack_require__(1145),__webpack_require__(500);var client_api=__webpack_require__(1170),types=__webpack_require__(1168),esm=__webpack_require__(4),parameters={actions:{argTypesRegex:"^on[A-Z].*"},controls:{matchers:{color:/(background|color)$/i,date:/Date$/}}};function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.keys(preview_namespaceObject).forEach((function(key){var value=preview_namespaceObject[key];switch(key){case"args":case"argTypes":return esm.a.warn("Invalid args/argTypes in config, ignoring.",JSON.stringify(value));case"decorators":return value.forEach((function(decorator){return Object(client_api.c)(decorator,!1)}));case"loaders":return value.forEach((function(loader){return Object(client_api.d)(loader,!1)}));case"parameters":return Object(client_api.e)(function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}({},value),!1);case"argTypesEnhancers":return value.forEach((function(enhancer){return Object(client_api.a)(enhancer)}));case"argsEnhancers":return value.forEach((function(enhancer){return Object(client_api.b)(enhancer)}));case"render":return Object(types.setGlobalRender)(value);case"globals":case"globalTypes":var v={};return v[key]=value,Object(client_api.e)(v,!1);default:return console.log(key+" was not supported :( !")}}))},1162:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"Base",(function(){return UseDrags_stories_Base}));__webpack_require__(16),__webpack_require__(1149),__webpack_require__(5),__webpack_require__(8),__webpack_require__(7),__webpack_require__(17),__webpack_require__(12),__webpack_require__(11),__webpack_require__(15),__webpack_require__(14),__webpack_require__(6),__webpack_require__(25);var react=__webpack_require__(0),POINTER_START_EVENTS=(__webpack_require__(510),__webpack_require__(42),__webpack_require__(21),__webpack_require__(1150),__webpack_require__(87),__webpack_require__(27),__webpack_require__(502),["mousedown","touchstart"]),POINTER_MOVE_EVENTS=["mousemove","touchmove"],POINTER_END_EVENTS=["mouseup","touchend"],TouchEvent=window.TouchEvent;function getClientCoords(e){if(TouchEvent&&e instanceof TouchEvent){if(e.touches.length>0)return{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY};if(e.changedTouches.length>0)return{clientX:e.changedTouches[0].clientX,clientY:e.changedTouches[0].clientY}}else if(e instanceof MouseEvent)return"mousedown"!==e.type&&e.preventDefault(),{clientX:e.clientX,clientY:e.clientY}}function on(element,events,handler){events.forEach((function(event){element.addEventListener(event,handler)}))}function off(element,events,handler){events.forEach((function(event){element.removeEventListener(event,handler)}))}var defaultRefFunction=function defaultRefFunction(){throw new Error("Cannot call an event handler while rendering.")};var useDragsEvent=Symbol("useDragsEvent");function oldIosFix(e){e[useDragsEvent]&&e.preventDefault()}var isPatchedIos=!1,ua=window.navigator.userAgent,isSafari=-1!==ua.indexOf("Safari")&&-1===ua.indexOf("Chrome"),safariVersion=ua.match(/Version\/(.*?) /),isOldSafari=isSafari&&safariVersion&&parseInt(safariVersion[1],10)<13;function useDragged(elRef,onDrag){var lastCoords=Object(react.useRef)(null),firstCoords=Object(react.useRef)(null),cb=function useEventCallback(fn){var dependencies=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],ref=Object(react.useRef)(defaultRefFunction);return Object(react.useEffect)((function(){ref.current=fn}),[fn].concat(dependencies)),Object(react.useCallback)((function(){return ref.current.apply(void 0,arguments)}),[ref])}(onDrag);Object(react.useEffect)((function(){var el=elRef.current;if(el)return el.style.touchAction="none",on(el,POINTER_START_EVENTS,onPointerStart),isPatchedIos||function patchIos(){isOldSafari&&document.addEventListener("touchmove",oldIosFix,{passive:!1}),isPatchedIos=!0}(),function(){off(el,POINTER_START_EVENTS,onPointerStart),off(document.documentElement,POINTER_END_EVENTS,onPointerEnd),off(document.documentElement,POINTER_MOVE_EVENTS,onPointerMove),el.style.touchAction=null};function onPointerMove(e){if(e[useDragsEvent]=!0,lastCoords.current){var _getClientCoords=getClientCoords(e),clientX=_getClientCoords.clientX,clientY=_getClientCoords.clientY,deltaX=clientX-lastCoords.current.x,deltaY=clientY-lastCoords.current.y,offsetX=clientX-firstCoords.current.x,offsetY=clientY-firstCoords.current.y;cb({el:el,first:!1,last:!1,deltaX:deltaX,deltaY:deltaY,offsetX:offsetX,offsetY:offsetY,clientX:clientX,clientY:clientY}),lastCoords.current={x:clientX,y:clientY}}}function onPointerEnd(e){var _getClientCoords2=getClientCoords(e),clientX=_getClientCoords2.clientX,clientY=_getClientCoords2.clientY,deltaX=clientX-lastCoords.current.x,deltaY=clientY-lastCoords.current.y,offsetX=clientX-firstCoords.current.x,offsetY=clientY-firstCoords.current.y;firstCoords.current=null,lastCoords.current=null,cb({el:el,first:!1,last:!0,deltaX:deltaX,deltaY:deltaY,offsetX:offsetX,offsetY:offsetY,clientX:clientX,clientY:clientY}),off(document.documentElement,POINTER_END_EVENTS,onPointerEnd),off(document.documentElement,POINTER_MOVE_EVENTS,onPointerMove)}function onPointerStart(e){if(!(e instanceof MouseEvent&&0!==e.button)){e.stopPropagation();var _getClientCoords3=getClientCoords(e),clientX=_getClientCoords3.clientX,clientY=_getClientCoords3.clientY;firstCoords.current={x:clientX,y:clientY},lastCoords.current=firstCoords.current,cb({el:el,first:!0,last:!1,deltaX:0,deltaY:0,offsetX:0,offsetY:0,clientX:clientX,clientY:clientY}),on(document.documentElement,POINTER_END_EVENTS,onPointerEnd),on(document.documentElement,POINTER_MOVE_EVENTS,onPointerMove)}}}),[elRef,cb])}var jsx_runtime=__webpack_require__(329);function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null==_i)return;var _s,_e,_arr=[],_n=!0,_d=!1;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{_n||null==_i.return||_i.return()}finally{if(_d)throw _e}}return _arr}(arr,i)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}__webpack_exports__.default={title:"UseDrags",argTypes:{onDrag:{action:"dragged"}}};var UseDrags_stories_Base=function Base(_ref){var onDrag=_ref.onDrag,elRef=Object(react.useRef)(null),_useState2=_slicedToArray(Object(react.useState)(!1),2),isDragging=_useState2[0],setIsDragging=_useState2[1],_useState4=_slicedToArray(Object(react.useState)({x:0,y:0}),2),coords=_useState4[0],setCoords=_useState4[1];return useDragged(elRef,(function(ev){setCoords((function(_ref2){var x=_ref2.x,y=_ref2.y;return{x:x+ev.deltaX,y:y+ev.deltaY}})),ev.first&&setIsDragging(!0),ev.last&&setIsDragging(!1),onDrag&&onDrag(ev)})),Object(jsx_runtime.jsx)("div",{style:{width:"300px",height:"300px",border:"1px solid black"},children:Object(jsx_runtime.jsx)("div",{ref:elRef,style:{width:"20px",height:"20px",border:isDragging?"10px solid pink":"2px solid green",background:isDragging?"blue":"yellow",transition:"border .3s, background .3s",cursor:isDragging?"grabbing":"pointer",transform:"translate3d("+coords.x+"px, "+coords.y+"px, 0)"}})})};UseDrags_stories_Base.displayName="Base",UseDrags_stories_Base.parameters=Object.assign({storySource:{source:"({ onDrag }) => {\n  const elRef = useRef<HTMLDivElement>(null);\n  const [isDragging, setIsDragging] = useState(false);\n  const [coords, setCoords] = useState({ x: 0, y: 0 });\n\n  useDrags(elRef, (ev) => {\n    setCoords(({ x, y }) => ({ x: x + ev.deltaX, y: y + ev.deltaY }));\n\n    if (ev.first) {\n      setIsDragging(true);\n    }\n\n    if (ev.last) {\n      setIsDragging(false);\n    }\n\n    onDrag && onDrag(ev);\n  });\n\n  return (\n    <div style={{ width: '300px', height: '300px', border: '1px solid black' }}>\n      <div\n        ref={elRef}\n        style={{\n          width: '20px',\n          height: '20px',\n          border: isDragging ? '10px solid pink' : '2px solid green',\n          background: isDragging ? 'blue' : 'yellow',\n          transition: 'border .3s, background .3s',\n          cursor: isDragging ? 'grabbing' : 'pointer',\n          transform: `translate3d(${coords.x}px, ${coords.y}px, 0)`,\n        }}\n      />\n    </div>\n  );\n}"}},UseDrags_stories_Base.parameters);try{UseDrags_stories_Base.displayName="Base",UseDrags_stories_Base.__docgenInfo={description:"",displayName:"Base",props:{onDrag:{defaultValue:null,description:"",name:"onDrag",required:!0,type:{name:"(ev: any) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["stories/UseDrags.stories.tsx#Base"]={docgenInfo:UseDrags_stories_Base.__docgenInfo,name:"Base",path:"stories/UseDrags.stories.tsx#Base"})}catch(__react_docgen_typescript_loader_error){}},561:function(module,exports,__webpack_require__){__webpack_require__(562),__webpack_require__(720),__webpack_require__(721),__webpack_require__(1152),__webpack_require__(1153),__webpack_require__(1158),__webpack_require__(1159),__webpack_require__(1157),__webpack_require__(1154),__webpack_require__(1160),__webpack_require__(1155),__webpack_require__(1156),__webpack_require__(1161),module.exports=__webpack_require__(1146)},631:function(module,exports){},721:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__(374)}},[[561,2,3]]]);