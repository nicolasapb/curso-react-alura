"use strict";

System.register(["./View"], function (_export, _context) {
    "use strict";

    var View, _createClass, MensagemView;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_View2) {
            View = _View2.View;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("MensagemView", MensagemView = function (_View) {
                _inherits(MensagemView, _View);

                function MensagemView(elemento) {
                    _classCallCheck(this, MensagemView);

                    return _possibleConstructorReturn(this, (MensagemView.__proto__ || Object.getPrototypeOf(MensagemView)).call(this, elemento));
                }

                _createClass(MensagemView, [{
                    key: "template",
                    value: function template(model) {
                        return model.texto ? "<p class=\"alert alert-info\">" + model.texto + "</p>" : "<p></p>";
                    }
                }]);

                return MensagemView;
            }(View));

            _export("MensagemView", MensagemView);
        }
    };
});
//# sourceMappingURL=MensagemView.js.map